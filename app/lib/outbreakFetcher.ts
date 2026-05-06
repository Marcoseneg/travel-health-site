// app/lib/outbreakFetcher.ts
//
// Fetches and normalizes alerts from all OUTBREAK_SOURCES.
//
// Implementation choices:
//
//   1. No XML parser dependency — uses regex extraction. RSS 2.0 and Atom
//      feeds have a small fixed set of element names we care about, so a
//      lightweight parser is appropriate. Keeps bundle size small and avoids
//      a runtime dep.
//
//   2. Parallel fetch with per-source error isolation — if one feed is
//      down/malformed, the others still render. Done via Promise.allSettled.
//
//   3. WHO DON uses a JSON REST API (Sitefinity OData). The HTML listing
//      page was switched to client-side rendering, so server-side fetches
//      returned an empty page and the previous HTML scraper silently
//      yielded zero items. The JSON API gives us clean structured data.
//
//   4. Country tagging gets extra context for WHO entries. WHO DONs often
//      describe multi-country events where the country names only appear
//      deep in the article body. The WHO parser populates a `_tagText`
//      field with the first ~1500 chars of the body, which the tagger
//      scans alongside title/summary. The field is stripped from the alert
//      before returning so it never reaches the client.
//
//   5. Caps per source — each source contributes at most 15 most recent
//      alerts to keep the aggregated list manageable.
//
//   6. Network timeouts — each feed has a 7 second budget. Slow feeds get
//      dropped rather than blocking the whole page render.

import {
  OUTBREAK_SOURCES,
  type OutbreakAlert,
  type OutbreakSource,
} from "@/app/lib/outbreakSources";
import { tagCountries } from "@/app/lib/countryTagger";

const PER_SOURCE_LIMIT = 15;
const FETCH_TIMEOUT_MS = 7000;
const SUMMARY_MAX_CHARS = 280;
const TAG_TEXT_MAX_CHARS = 1500; // extra body text passed only to the tagger

// ── Public API ────────────────────────────────────────────────────────────
export async function fetchAllOutbreaks(): Promise<OutbreakAlert[]> {
  const results = await Promise.allSettled(
    OUTBREAK_SOURCES.map((src) => fetchSource(src))
  );

  const all: OutbreakAlert[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      all.push(...r.value);
    } else {
      console.error(`[outbreaks] failed to fetch ${OUTBREAK_SOURCES[i].id}:`, r.reason);
    }
  });

  // Tag every alert with detected country slugs, then strip the internal
  // _tagText field so it never gets serialized to the client.
  return all.map((alert) => {
    const countries = tagCountries(alert);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _tagText, ...rest } = alert;
    return { ...rest, countries };
  });
}

// ── Per-source fetch ──────────────────────────────────────────────────────
async function fetchSource(src: OutbreakSource): Promise<OutbreakAlert[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(src.url, {
      signal: controller.signal,
      // ISR caches at the page level, but we also let Next dedupe these
      // identical fetches if multiple components ever called fetchSource.
      next: { revalidate: 21600 },
      headers: {
        // Some feeds are touchy without a UA header
        "User-Agent": "TravelMed/1.0 (https://travelmed.ch)",
        Accept:
          "application/json, application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.8",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} from ${src.url}`);
    }
    const body = await res.text();

    if (src.format === "rss" || src.format === "atom") {
      return parseRssOrAtom(body, src);
    }
    if (src.format === "json-who") {
      return parseWhoApi(body, src);
    }
    return [];
  } finally {
    clearTimeout(timer);
  }
}

// ── RSS 2.0 + Atom parser (regex-based, no dependencies) ──────────────────
function parseRssOrAtom(xml: string, src: OutbreakSource): OutbreakAlert[] {
  const items: OutbreakAlert[] = [];

  // Detect format
  const isAtom = /<feed[\s>][^]*?xmlns="http:\/\/www\.w3\.org\/2005\/Atom"/.test(xml);
  const itemTag = isAtom ? "entry" : "item";

  // Match every <item>...</item> or <entry>...</entry>
  const itemRegex = new RegExp(`<${itemTag}\\b[^>]*>([\\s\\S]*?)<\\/${itemTag}>`, "g");
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = stripCdata(extractTag(block, "title"));
    const url = isAtom
      ? extractAtomLink(block)
      : stripCdata(extractTag(block, "link"));
    const dateRaw =
      extractTag(block, "pubDate") ||
      extractTag(block, "published") ||
      extractTag(block, "updated") ||
      extractTag(block, "dc:date");
    const desc = stripCdata(
      extractTag(block, "description") ||
        extractTag(block, "summary") ||
        extractTag(block, "content")
    );

    if (!title || !url) continue;
    const publishedAt = parseDate(dateRaw);
    if (!publishedAt) continue;

    items.push({
      id: `${src.id}-${stableHash(url)}`,
      sourceId: src.id,
      title: cleanText(title),
      url: url.trim(),
      publishedAt,
      summary: desc ? truncate(stripHtml(desc), SUMMARY_MAX_CHARS) : undefined,
    });

    if (items.length >= PER_SOURCE_LIMIT) break;
  }

  return items;
}

// ── WHO Sitefinity JSON API parser ────────────────────────────────────────
// Endpoint: https://www.who.int/api/news/diseaseoutbreaknews
// Returns a JSON array of DON records. Some Sitefinity setups wrap the
// array in { value: [...] }; we handle both shapes.
//
// Field mapping:
//   Title                   → title
//   ItemDefaultUrl          → url (relative path; we prepend who.int origin)
//   PublicationDateAndTime  → publishedAt (falls back to PublicationDate)
//   Overview                → summary (HTML; stripped + truncated to ~280)
//   Overview + Epidemiology → _tagText (stripped, ~1500 chars, tagger only)
function parseWhoApi(jsonText: string, src: OutbreakSource): OutbreakAlert[] {
  const items: OutbreakAlert[] = [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return items;
  }

  const records: unknown[] = Array.isArray(parsed)
    ? parsed
    : Array.isArray((parsed as { value?: unknown[] })?.value)
      ? (parsed as { value: unknown[] }).value
      : [];

  for (const raw of records) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;

    const title = typeof r.Title === "string" ? cleanText(r.Title) : "";
    const path = typeof r.ItemDefaultUrl === "string" ? r.ItemDefaultUrl : "";
    const dateRaw =
      (typeof r.PublicationDateAndTime === "string" && r.PublicationDateAndTime) ||
      (typeof r.PublicationDate === "string" && r.PublicationDate) ||
      "";

    if (!title || !path || !dateRaw) continue;
    const publishedAt = parseDate(dateRaw);
    if (!publishedAt) continue;

    // ItemDefaultUrl is a relative path. Prepend the WHO origin.
    const url = path.startsWith("http") ? path : `https://www.who.int${path}`;

    // Build display summary (~280 chars) from Overview, falling back to Summary.
    const overview =
      (typeof r.Overview === "string" && r.Overview) ||
      (typeof r.Summary === "string" && r.Summary) ||
      "";
    const summary = overview ? truncate(stripHtml(overview), SUMMARY_MAX_CHARS) : undefined;

    // Build extended text for country tagging: combine the article's main
    // narrative fields. WHO multi-country DONs typically name the affected
    // countries in the Epidemiology or deeper Overview text, well past the
    // 280-char display cutoff.
    const epidemiology = typeof r.Epidemiology === "string" ? r.Epidemiology : "";
    const longBody = stripHtml(`${overview} ${epidemiology}`);
    const _tagText = longBody ? truncate(longBody, TAG_TEXT_MAX_CHARS) : undefined;

    items.push({
      id: `${src.id}-${stableHash(url)}`,
      sourceId: src.id,
      title,
      url,
      publishedAt,
      summary,
      _tagText,
    });

    if (items.length >= PER_SOURCE_LIMIT) break;
  }

  return items;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function extractTag(block: string, tag: string): string {
  // Handles namespaced tags too (e.g. dc:date -> we pass "dc:date" raw)
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`);
  const m = block.match(re);
  return m ? m[1].trim() : "";
}

function extractAtomLink(block: string): string {
  // Atom uses <link href="..."/> — prefer rel="alternate" or no rel attr
  const m = block.match(/<link[^>]*href="([^"]+)"[^>]*\/>/);
  return m ? m[1] : "";
}

function stripCdata(s: string): string {
  return s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanText(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function truncate(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + "…";
}

function parseDate(raw: string): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return null;
  return d.toISOString();
}

// Tiny stable hash for generating IDs from URLs (32-bit FNV-1a)
function stableHash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}
