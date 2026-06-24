// ─────────────────────────────────────────────────────────────────────────────
// Japanese encephalitis (JE) risk by country, for the /diseases/japanese-encephalitis map.
//
// JE is endemic across rural East/Southeast Asia and the Western Pacific, tied
// to rice agriculture and pig farming. Highest traveler risk is in the South/
// Southeast Asian endemic belt; Japan, Korea and Taiwan are endemic but low
// traveler risk thanks to long-standing vaccination programmes.
//
// Sources: CDC Yellow Book JE country list; WHO position paper.
// Keys must match the NAME property from countries.geojson exactly.
// ─────────────────────────────────────────────────────────────────────────────

export type JapaneseEncephalitisRisk = "high" | "moderate" | "low" | "none";

export const japaneseEncephalitisRiskByCountry: Record<string, JapaneseEncephalitisRisk> = {
  // ── High — intense rural transmission ──
  "India": "high",
  "Nepal": "high",
  "Bangladesh": "high",
  "Myanmar": "high",
  "Thailand": "high",
  "Vietnam": "high",
  "Cambodia": "high",
  "Laos": "high",
  "China": "high",
  "Indonesia": "high",
  "Philippines": "high",
  "Sri Lanka": "high",

  // ── Moderate — endemic foci ──
  "Malaysia": "moderate",
  "Timor-Leste": "moderate",
  "Papua New Guinea": "moderate",
  "Bhutan": "moderate",
  "Brunei": "moderate",

  // ── Low — endemic but low traveler risk (vaccination / sporadic) ──
  "Australia": "low",       // Torres Strait endemic; 2022 mainland outbreak — low traveler risk
  "Japan": "low",
  "South Korea": "low",
  "North Korea": "low",
  "Taiwan": "low",
  "Pakistan": "low",
  "Russia": "low",          // far-eastern foci only
};

export const JAPANESE_ENCEPHALITIS_LEGEND = [
  { level: "high", label: "High risk", color: "rgba(5, 150, 105, 0.85)" },
  { level: "moderate", label: "Moderate risk", color: "rgba(52, 211, 153, 0.74)" },
  { level: "low", label: "Low / sporadic", color: "rgba(167, 243, 208, 0.72)" },
  { level: "none", label: "No known risk", color: "rgba(100, 116, 139, 0.3)" },
] as const;
