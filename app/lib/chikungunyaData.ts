export type ChikungunyaRisk = "high" | "moderate" | "low" | "none";

// Keys must match the NAME property from countries.geojson exactly
export const chikungunyaRiskByCountry: Record<string, ChikungunyaRisk> = {
  // ── South / Southeast Asia (original endemic zone) ──
  "India": "high",
  "Bangladesh": "high",
  "Thailand": "high",
  "Indonesia": "moderate",
  "Philippines": "moderate",
  "Cambodia": "moderate",
  "Myanmar": "moderate",
  "Malaysia": "moderate",
  "Laos": "moderate",
  "Vietnam": "moderate",
  "Pakistan": "moderate",
  "Nepal": "low",
  "Sri Lanka": "moderate",
  "Timor-Leste": "low",
  "Bhutan": "low",

  // ── Africa ──
  "Kenya": "high",
  "Tanzania": "high",
  "Mozambique": "high",
  "Dem. Rep. Congo": "moderate",
  "Congo": "moderate",
  "Nigeria": "moderate",
  "Cameroon": "moderate",
  "Senegal": "moderate",
  "Chad": "low",
  "Gabon": "moderate",
  "Central African Rep.": "low",
  "Madagascar": "moderate",
  "Comoros": "moderate",
  "Ethiopia": "moderate",
  "Sudan": "low",
  "S. Sudan": "low",
  "Uganda": "moderate",
  "Rwanda": "low",
  "Burundi": "low",
  "Malawi": "low",
  "Zambia": "low",
  "Zimbabwe": "low",
  "Angola": "low",
  "Côte d'Ivoire": "low",
  "Ghana": "low",
  "Guinea": "low",
  "Sierra Leone": "low",
  "Benin": "low",
  "Togo": "low",
  "Burkina Faso": "low",

  // ── Americas (spread since 2013) ──
  "Brazil": "high",
  "Colombia": "moderate",
  "Dominican Rep.": "moderate",
  "Haiti": "moderate",
  "Venezuela": "moderate",
  "Paraguay": "moderate",
  "Bolivia": "low",
  "Ecuador": "low",
  "Peru": "low",
  "Mexico": "low",
  "Guatemala": "low",
  "Honduras": "low",
  "Nicaragua": "low",
  "Costa Rica": "low",
  "Panama": "low",
  "Suriname": "low",
  "Guyana": "low",

  // ── Oceania ──
  "Papua New Guinea": "low",

  // ── Western Asia ──
  "Yemen": "low",
  "Saudi Arabia": "low",
};

export const CHIKUNGUNYA_COLORS: Record<ChikungunyaRisk, string> = {
  high: "rgba(168, 85, 247, 0.7)",
  moderate: "rgba(192, 132, 252, 0.55)",
  low: "rgba(216, 180, 254, 0.35)",
  none: "rgba(0, 0, 0, 0)",
};

export const CHIKUNGUNYA_LEGEND = [
  { level: "high", label: "High / active outbreaks", color: "rgba(168, 85, 247, 0.85)" },
  { level: "moderate", label: "Moderate / endemic", color: "rgba(192, 132, 252, 0.75)" },
  { level: "low", label: "Low / sporadic", color: "rgba(216, 180, 254, 0.55)" },
  { level: "none", label: "No chikungunya", color: "rgba(100, 116, 139, 0.3)" },
];
