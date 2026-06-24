// ─────────────────────────────────────────────────────────────────────────────
// Oropouche fever risk by country, for the /diseases/oropouche map.
//
// Oropouche is long endemic in the Amazon basin (Brazil, Peru, Bolivia) and
// neighbouring South America; the 2023–24 outbreak expanded transmission within
// Brazil and into the Caribbean (notably Cuba). Spread by Culicoides midges.
//
// Sources: PAHO/WHO Oropouche epidemiological alerts (2024); CDC; ECDC.
// PHYSICIAN REVIEW PENDING — emerging picture, levels are a first pass.
// Keys must match the NAME property from countries.geojson exactly.
// ─────────────────────────────────────────────────────────────────────────────

export type OropoucheRisk = "high" | "moderate" | "low" | "none";

export const oropoucheRiskByCountry: Record<string, OropoucheRisk> = {
  // ── High — Amazon-basin endemic core ──
  "Brazil": "high",
  "Peru": "high",
  "Bolivia": "high",

  // ── Moderate — endemic foci / 2024 outbreak spread ──
  "Ecuador": "moderate",
  "Colombia": "moderate",
  "Venezuela": "moderate",
  "Cuba": "moderate",
  "Panama": "moderate",

  // ── Low — sporadic / historical detections ──
  "Trinidad and Tobago": "low",
  "Guyana": "low",
  "Suriname": "low",
};

export const OROPOUCHE_LEGEND = [
  { level: "high", label: "High risk", color: "rgba(194, 65, 12, 0.85)" },
  { level: "moderate", label: "Moderate risk", color: "rgba(249, 115, 22, 0.78)" },
  { level: "low", label: "Low / sporadic", color: "rgba(254, 215, 170, 0.78)" },
  { level: "none", label: "No known risk", color: "rgba(100, 116, 139, 0.3)" },
] as const;
