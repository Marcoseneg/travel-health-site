// app/lib/outbreakSources.ts
//
// Registry of authoritative outbreak news sources.
//
// Each entry includes: a stable id, display name, RSS/feed URL, and a source
// label used in the UI. URLs verified May 2026 against each agency's RSS
// directory page. If a URL changes, update here only — no other code changes
// needed.
//
// Sources rationale:
//   ECDC Epi Updates — per-disease epidemiological updates (West Nile,
//     Mpox, etc.). Specific outbreak events, not weekly digests. The
//     CDTR weekly bulletin feed was removed because each entry covered
//     multiple unrelated topics, which read as noise on the alert page.
//   WHO DON — global Disease Outbreak News. Authoritative WHO record of
//     internationally significant outbreaks. No native RSS in 2026, so we
//     scrape the listing page.
//   CDC Travel Notices — CDC's destination-specific travel alerts. US lens
//     but global coverage.

export type OutbreakSource = {
  id: string;
  name: string;
  shortName: string; // for compact UI badges
  url: string; // feed URL (RSS/Atom) or HTML for scraping
  format: "rss" | "atom" | "html-list";
  region: "europe" | "global" | "us" | "switzerland";
};

export const OUTBREAK_SOURCES: OutbreakSource[] = [
  {
    id: "ecdc-epi",
    name: "ECDC Epidemiological Updates",
    shortName: "ECDC",
    url: "https://www.ecdc.europa.eu/en/taxonomy/term/1310/feed",
    format: "rss",
    region: "europe",
  },
  {
    id: "cdc-travel",
    name: "CDC Travel Health Notices",
    shortName: "CDC",
    url: "https://wwwnc.cdc.gov/travel/rss/notices.xml",
    format: "rss",
    region: "us",
  },
  {
    id: "who-don",
    name: "WHO Disease Outbreak News",
    shortName: "WHO",
    url: "https://www.who.int/emergencies/disease-outbreak-news",
    format: "html-list",
    region: "global",
  },
];

// The shape of an aggregated alert after parsing all sources.
export type OutbreakAlert = {
  id: string;          // stable ID built from source + URL hash
  sourceId: string;    // links to OUTBREAK_SOURCES[].id
  title: string;
  url: string;         // link to original source page
  publishedAt: string; // ISO date string
  summary?: string;    // brief excerpt from feed description (plain text)
  countries?: string[]; // detected country slugs, ranked (title hits first)
};
