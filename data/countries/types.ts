// ─────────────────────────────────────────────────────────────────────────────
// Country health data
// ─────────────────────────────────────────────────────────────────────────────
//
// SCHEMA NOTES
//
// Two layers of fields per country:
//
//   1. CORE FIELDS (always required) — used by the globe coloring,
//      itinerary summary, and any code that doesn't need rich detail.
//      Simple enums and string arrays.
//
//   2. DETAILED FIELDS (all optional) — used by the country detail page
//      when present. CDC-aligned, deliberately lightweight: brief summaries
//      and outbound links. Depth is opt-in via clicking through to:
//        - Internal disease pages (/diseases/[slug]) for clinical detail
//        - CDC Yellow Book / Travelers' Health pages for maps & definitive guidance
//
// CONTENT SOURCES
// All CDC content is US Government work and public domain. Swiss BAG
// (Bundesamt für Gesundheit) publications are also in the public domain.
// We cite both, never reproduce verbatim, and link to originals.
//
// HOW TO ADD A CDC MAP TO A DISEASE
// -----------------------------------------------------------------------------
// 1. Open the CDC page for that country, e.g.
//    https://wwwnc.cdc.gov/travel/destinations/traveler/none/afghanistan
// 2. Right-click on the malaria/YF map image → "Copy Image Address"
// 3. Paste into `cdcMapImageUrl`. Example:
//      malaria: { ..., cdcMapImageUrl: "https://wwwnc.cdc.gov/travel/.../map.png" }
// 4. Or self-host: download the image, save to `public/maps/malaria/<slug>.png`,
//    set `localMapImageUrl: "/maps/malaria/<slug>.png"`. Self-hosted is preferred
//    long-term; hotlinking can break if CDC restructures URLs.
// 5. If the image URL is wrong/broken, the page automatically falls back to
//    the text-only view with the existing "View on CDC ↗" link.
//
// ─────────────────────────────────────────────────────────────────────────────

// ── Core types (existing, unchanged) ──────────────────────────────────────────
export type CountryInfo = {
  vaccinesRecommended: string[];
  vaccinesConsider: string[];
  malariaRisk: "none" | "limited" | "present" | "high";
  yellowFever: "none" | "possible" | "required-or-recommended";
  foodWater: string;
  mosquito: string;

  // ── Provenance / editorial review ───────────────────────────────────────────
  // New AI-drafted briefs are marked "draft" until a clinician signs off, so the
  // UI can surface a "pending physician review" notice and keep the
  // physician-built promise honest. lastReviewed is a human date like "June 2026".
  reviewStatus?: "draft" | "reviewed";
  lastReviewed?: string;

  // ── Optional CDC-aligned detail fields ──────────────────────────────────────
  cdcCountryUrl?: string;
  countryAlerts?: CountryAlert[];
  vaccinesDetail?: VaccineEntry[];
  diseases?: {
    malaria?: DiseaseSummary;
    yellowFever?: DiseaseSummary;
    dengue?: DiseaseSummary;
    chikungunya?: DiseaseSummary;
    zika?: DiseaseSummary;
  };
};

export type CountryAlert = {
  level: "info" | "warning";
  title: string;
  message?: string;
  source?: string;
  sourceUrl?: string;
  date?: string;
};

export type VaccineEntry = {
  name: string;
  slug?: string;            // links to /diseases/[slug] if a page exists
  audience: "all" | "specific";
  note?: string;            // brief: "for stays >1 week", "long-term stays"
};

export type DiseaseSummary = {
  riskSummary: string;        // 1-2 short sentences, plain English
  cdcMapUrl?: string;         // direct link to CDC's relevant page (text + map)
  // Optional inline map images. localMapImageUrl is preferred over
  // cdcMapImageUrl when both are set. If neither loads, the card renders
  // text-only without a broken-image gap.
  cdcMapImageUrl?: string;    // hotlinked from CDC (may fail if blocked)
  localMapImageUrl?: string;  // path under /public/maps/... (self-hosted)
  mapCaption?: string;        // optional small caption under the image
  // Optional structured key facts. When present, renders as a small
  // labeled-row table inside the disease card. Use sparingly — 3–5 facts max.
  // Examples: { label: "Regions", value: "Below 2000m" }, { label: "Season",
  // value: "April–December" }, { label: "Resistance", value: "Chloroquine" }.
  keyFacts?: KeyFact[];
};

export type KeyFact = {
  label: string;  // short, ALL CAPS in render — keep <= 12 chars (e.g. "Season")
  value: string;  // the data point — keep concise, ideally < 40 chars
};

// ─────────────────────────────────────────────────────────────────────────────
