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
//   3. WHO DON has no RSS — the html-list parser scans the public listing
//      page for <article> blocks and extracts title/url/date heuristically.
//      Less reliable than RSS but better than nothing.
//
//   4. Caps per source — each source contributes at most 15 most recent
//      alerts to keep the aggregated list manageable.
//
//   5. Network timeouts — each feed has a 7 second budget. Slow feeds get
//      dropped rather than blocking the whole page render.

import {
  OUTBREAK_SOURCES,
  type OutbreakAlert,
  type OutbreakSource,
} from "@/app/lib/outbreakSources";
import { tagCountries } from "@/app/lib/countryTagger";

const PER_SOURCE_LIMIT = 15;
const FETCH_TIMEOUT_MS = 7000;

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

  // Tag every alert with detected country slugs
  return all.map((alert) => ({
    ...alert,
    countries: tagCountries(alert),
  }));
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
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.8",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} from ${src.url}`);
    }
    const body = await res.text();

    if (src.format === "rss" || src.format === "atom") {
      return parseRssOrAtom(body, src);
    }
    if (src.format === "html-list") {
      return parseHtmlList(body, src);
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
      summary: desc ? truncate(stripHtml(desc), 280) : undefined,
    });

    if (items.length >= PER_SOURCE_LIMIT) break;
  }

  return items;
}

// ── HTML listing scraper (used for WHO DON) ───────────────────────────────
// WHO DON listing page lists items in repeated link blocks. Each item is an
// anchor pointing to /emergencies/disease-outbreak-news/item/<id>. We extract
// the link, link text (title), and any nearby date.
function parseHtmlList(html: string, src: OutbreakSource): OutbreakAlert[] {
  const items: OutbreakAlert[] = [];

  // Match anchors that point to DON items, capturing href and inner text
  const linkRegex = /<a\s+[^>]*href="(\/emergencies\/disease-outbreak-news\/item\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let match: RegExpExecArray | null;
  const seen = new Set<string>();

  while ((match = linkRegex.exec(html)) !== null) {
    const path = match[1];
    if (seen.has(path)) continue;
    seen.add(path);

    const url = `https://www.who.int${path}`;
    const innerText = stripHtml(match[2]).trim();
    if (!innerText || innerText.length < 8) continue;

    // Date: look for an ISO-ish date in the surrounding 200 chars
    const surrounding = html.slice(
      Math.max(0, match.index - 250),
      Math.min(html.length, match.index + match[0].length + 250)
    );
    const dateMatch = surrounding.match(/(\d{1,2}\s+\w+\s+\d{4}|\d{4}-\d{2}-\d{2})/);
    const publishedAt = dateMatch ? parseDate(dateMatch[1]) : null;
    if (!publishedAt) continue;

    items.push({
      id: `${src.id}-${stableHash(url)}`,
      sourceId: src.id,
      title: innerText,
      url,
      publishedAt,
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
