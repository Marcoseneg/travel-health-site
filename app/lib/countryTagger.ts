// app/lib/countryTagger.ts
//
// Detects which countries an outbreak alert refers to, by scanning its
// title + summary for country names and aliases.
//
// Design choices:
//
//   1. Title hits rank higher than summary hits — an alert that names the
//      country in its title is more likely to be ABOUT that country than
//      one that just lists it among many. The country page side uses this
//      ordering to surface the most relevant alerts first.
//
//   2. No hard cap on countries per alert. A "Global Dengue" alert that
//      lists 50 countries in its summary will tag all 50; downstream
//      country pages cap their own display (e.g. 3 most recent), and rank
//      title hits above summary hits, so noise doesn't flood the UI.
//
//   3. Aliases per country handled via a static map. Most countries match
//      on their canonical label alone; only a handful need aliases (DRC,
//      Côte d'Ivoire, etc.).
//
//   4. Word-boundary regex matching to avoid "Mali" matching inside
//      "Somalia" or "Niger" matching inside "Nigeria". Single-word country
//      names (Mali, Niger, Chad) are especially prone to this.
//
//   5. Override file (data/outbreak-overrides.json) lets you manually add
//      or remove tags per alert ID. Mostly empty by default.

import { SUPPORTED_COUNTRIES } from "@/app/lib/travelData";
import overrides from "@/data/outbreak-overrides.json";

// ── Country name aliases ──────────────────────────────────────────────────
// Keys are slugs from SUPPORTED_COUNTRIES. Values are alternate strings to
// also match against. The canonical label is always added automatically.
const COUNTRY_ALIASES: Record<string, string[]> = {
  "dr-congo": [
    "Democratic Republic of the Congo",
    "Democratic Republic of Congo",
    "DRC",
    "DR Congo",
    "Congo-Kinshasa",
    "Congo (Kinshasa)",
  ],
  congo: ["Republic of the Congo", "Congo-Brazzaville", "Congo (Brazzaville)"],
  "cote-divoire": ["Côte d'Ivoire", "Cote d'Ivoire", "Ivory Coast"],
  eswatini: ["Swaziland"],
  "cape-verde": ["Cabo Verde"],
  "central-african-republic": ["CAR", "Central African Rep"],
  "equatorial-guinea": ["Equatorial Guinea"],
  // United States, United Kingdom etc. would go here when we add them
};

// ── Build the matching index at module load ───────────────────────────────
type CountryEntry = { slug: string; canonical: string; patterns: RegExp[] };

const COUNTRY_INDEX: CountryEntry[] = (() => {
  const entries: CountryEntry[] = [];
  for (const [slug, meta] of Object.entries(SUPPORTED_COUNTRIES)) {
    const canonical = (meta as { label: string }).label;
    const names = [canonical, ...(COUNTRY_ALIASES[slug] || [])];
    // Deduplicate (some labels equal aliases)
    const uniqueNames = Array.from(new Set(names));
    // Build word-boundary regex for each name. Escape regex specials.
    const patterns = uniqueNames.map(
      (n) =>
        new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")
    );
    entries.push({ slug, canonical, patterns });
  }
  // Sort longer canonicals first so multi-word names match before single
  // (e.g. "South Africa" before "Africa" — though Africa isn't a country
  // in our list, this still helps with future additions like "South Sudan"
  // vs "Sudan"). Critical for substring-prone names.
  entries.sort((a, b) => b.canonical.length - a.canonical.length);
  return entries;
})();

// ── Main API ──────────────────────────────────────────────────────────────
export function tagCountries(alert: {
  id: string;
  title: string;
  summary?: string;
}): string[] {
  // Manual overrides take full precedence
  const ov = (overrides as Record<string, { add?: string[]; remove?: string[]; replace?: string[] }>)[alert.id];
  if (ov?.replace) return ov.replace;

  const titleHits: string[] = [];
  const summaryHits: string[] = [];

  for (const entry of COUNTRY_INDEX) {
    const inTitle = entry.patterns.some((p) => p.test(alert.title));
    const inSummary = !inTitle && alert.summary
      ? entry.patterns.some((p) => p.test(alert.summary!))
      : false;
    if (inTitle) titleHits.push(entry.slug);
    else if (inSummary) summaryHits.push(entry.slug);
  }

  // Title hits always come first; summary hits fill remaining slots.
  let result = [...titleHits, ...summaryHits];

  // Apply add/remove from override file
  if (ov?.add) {
    for (const slug of ov.add) {
      if (!result.includes(slug)) result.push(slug);
    }
  }
  if (ov?.remove) {
    result = result.filter((slug) => !ov.remove!.includes(slug));
  }

  return result;
}
