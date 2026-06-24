// ─────────────────────────────────────────────────────────────────────────────
// Tick-borne encephalitis (TBE) risk by country, for the /diseases/tbe map.
//
// TBE is geographically restricted to the Eurasian "tick belt" — central,
// eastern and northern Europe through Russia into northern Asia — so most of
// the world is correctly "none" and the map reads as a concentrated band.
// Levels follow ECDC surveillance and national incidence data (highest in the
// Baltics, Czechia, Slovenia, Russia; emerging/low in the UK, Netherlands,
// Belgium and the western Balkans).
//
// Sources: ECDC TBE surveillance reports; WHO position paper; national data.
// Keys must match the NAME property from countries.geojson exactly.
// ─────────────────────────────────────────────────────────────────────────────

export type TbeRisk = "high" | "moderate" | "low" | "none";

export const tbeRiskByCountry: Record<string, TbeRisk> = {
  // ── High — endemic, high incidence ──
  "Russia": "high",          // highest absolute burden; Siberian & Far Eastern subtypes
  "Czechia": "high",         // consistently highest incidence in the EU
  "Lithuania": "high",
  "Latvia": "high",
  "Estonia": "high",
  "Slovenia": "high",
  "Austria": "high",
  "Switzerland": "high",     // endemic except cantons of Genève & Ticino
  "Germany": "high",         // Bavaria & Baden-Württemberg foci
  "Poland": "high",
  "Slovakia": "high",
  "Hungary": "high",
  "Sweden": "high",          // southern & coastal, expanding
  "Finland": "high",         // Åland & coastal foci

  // ── Moderate — endemic foci, lower incidence ──
  "Norway": "moderate",
  "Denmark": "moderate",     // Bornholm + emerging foci
  "France": "moderate",      // Alsace & eastern regions
  "Italy": "moderate",       // north-east (Friuli, Trentino)
  "Croatia": "moderate",
  "Serbia": "moderate",
  "Romania": "moderate",
  "Bulgaria": "moderate",
  "Belarus": "moderate",
  "Ukraine": "moderate",
  "Kazakhstan": "moderate",
  "Mongolia": "moderate",
  "China": "moderate",       // north-east / Far-Eastern foci
  "South Korea": "moderate",
  "Japan": "moderate",       // Hokkaido — rare but present

  // ── Low — sporadic / emerging / limited foci ──
  "Netherlands": "low",      // established since ~2016, low
  "Belgium": "low",
  "United Kingdom": "low",   // TBE detected in ticks 2019+, emerging
  "Greece": "low",
  "Albania": "low",
  "Macedonia": "low",
  "Bosnia and Herz.": "low",
  "Montenegro": "low",
  "Moldova": "low",
  "North Korea": "low",
};

export const TBE_LEGEND = [
  { level: "high", label: "High risk", color: "rgba(79, 70, 229, 0.85)" },
  { level: "moderate", label: "Moderate risk", color: "rgba(129, 140, 248, 0.78)" },
  { level: "low", label: "Low / sporadic", color: "rgba(199, 210, 254, 0.72)" },
  { level: "none", label: "No known risk", color: "rgba(100, 116, 139, 0.3)" },
] as const;
