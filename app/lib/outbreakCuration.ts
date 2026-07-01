// ─────────────────────────────────────────────────────────────────────────────
// Outbreak curation — the editorial layer over the ingested feed.
//
// Reads the same data/outbreak-overrides.json used for country tagging, keyed
// by alert id. Today it supports `hidden` (drop an alert from the page — e.g.
// a duplicate). The shape is intentionally extensible: title/summary/status/
// pinned/coords can be added later without touching consumers.
//
// To hide an alert: open /outbreaks?curate=1 to see each alert's id, then add
//   { "<that-id>": { "hidden": true } }
// to data/outbreak-overrides.json.
// ─────────────────────────────────────────────────────────────────────────────

import overrides from "@/data/outbreak-overrides.json";

export type OutbreakCuration = {
  /** Drop this alert from the list and the map. */
  hidden?: boolean;
  /** Plain-language rewrite of the feed title. */
  title?: string;
  /** Traveler-friendly rewrite of the feed summary. */
  summary?: string;
  /** Sort to the top of the list. */
  pinned?: boolean;
  /** Explicit map position; otherwise derived from the first tagged country. */
  coords?: { lat: number; lng: number };
  // ── country-tag overrides (consumed by countryTagger) ──
  add?: string[];
  remove?: string[];
  replace?: string[];
};

const CURATION = overrides as unknown as Record<string, OutbreakCuration>;

export function curationFor(id: string): OutbreakCuration | undefined {
  return CURATION[id];
}

export function isHidden(id: string): boolean {
  return CURATION[id]?.hidden === true;
}
