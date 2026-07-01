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
  /** Drop this alert from the list (and, later, the map). */
  hidden?: boolean;
  // ── country-tag overrides (consumed by countryTagger) ──
  add?: string[];
  remove?: string[];
  replace?: string[];
  // ── reserved for upcoming slices ──
  // title?: string; summary?: string;
  // status?: "ongoing" | "increasing" | "stable" | "controlled";
  // pinned?: boolean; coords?: { lat: number; lng: number };
};

const CURATION = overrides as unknown as Record<string, OutbreakCuration>;

export function curationFor(id: string): OutbreakCuration | undefined {
  return CURATION[id];
}

export function isHidden(id: string): boolean {
  return CURATION[id]?.hidden === true;
}
