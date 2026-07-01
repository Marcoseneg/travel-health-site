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

// Traveler-facing status you assign editorially (the feed doesn't provide it).
export type OutbreakStatus = "ongoing" | "increasing" | "stable" | "controlled";

export const STATUS_META: Record<OutbreakStatus, { label: string; color: string }> = {
  ongoing: { label: "Ongoing outbreak", color: "#ef4444" },
  increasing: { label: "Increasing", color: "#f97316" },
  stable: { label: "Stable", color: "#eab308" },
  controlled: { label: "Controlled", color: "#16a34a" },
};

// Un-classified alerts (no status set) render neutral on the map + legend.
export const REPORTED_META = { label: "Reported", color: "#64748b" };

export type OutbreakCuration = {
  /** Drop this alert from the list and the map. */
  hidden?: boolean;
  /** Plain-language rewrite of the feed title. */
  title?: string;
  /** Traveler-friendly rewrite of the feed summary. */
  summary?: string;
  /** Traveler-facing status → colors the map marker + legend. */
  status?: OutbreakStatus;
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
