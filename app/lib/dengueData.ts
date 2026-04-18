export type DengueRisk = "high" | "moderate" | "low" | "none";

// Keys must match the NAME property from countries.geojson exactly
export const dengueRiskByCountry: Record<string, DengueRisk> = {
  // ── Southeast Asia (highest burden globally) ──
  "Indonesia": "high",
  "Philippines": "high",
  "Vietnam": "high",
  "Thailand": "high",
  "Malaysia": "high",
  "Cambodia": "high",
  "Laos": "high",
  "Myanmar": "high",
  "Timor-Leste": "moderate",

  // ── South Asia ──
  "India": "high",
  "Bangladesh": "high",
  "Pakistan": "high",
  "Nepal": "moderate",
  "Sri Lanka": "high",
  "Bhutan": "low",
  "Afghanistan": "low",

  // ── East Asia ──
  "China": "low",

  // ── Americas — Caribbean & Central America ──
  "Brazil": "high",
  "Colombia": "high",
  "Mexico": "high",
  "Honduras": "high",
  "Guatemala": "high",
  "Nicaragua": "high",
  "Costa Rica": "moderate",
  "Panama": "moderate",
  "Belize": "moderate",
  "Dominican Rep.": "high",
  "Haiti": "high",
  "Venezuela": "high",
  "Ecuador": "high",
  "Peru": "moderate",
  "Bolivia": "moderate",
  "Paraguay": "high",
  "Guyana": "moderate",
  "Suriname": "moderate",

  // ── Africa ──
  "Nigeria": "moderate",
  "Kenya": "moderate",
  "Tanzania": "moderate",
  "Mozambique": "moderate",
  "Ethiopia": "low",
  "Senegal": "moderate",
  "Côte d'Ivoire": "moderate",
  "Ghana": "low",
  "Cameroon": "low",
  "Angola": "low",
  "Burkina Faso": "low",
  "Mali": "low",
  "Sudan": "moderate",
  "Somalia": "moderate",
  "Dem. Rep. Congo": "low",
  "Madagascar": "low",
  "Eritrea": "low",
  "Djibouti": "moderate",

  // ── Western Asia ──
  "Saudi Arabia": "low",
  "Yemen": "moderate",

  // ── Oceania ──
  "Papua New Guinea": "moderate",
  "Solomon Is.": "moderate",
  "Vanuatu": "moderate",
};

export const DENGUE_COLORS: Record<DengueRisk, string> = {
  high: "rgba(239, 68, 68, 0.7)",
  moderate: "rgba(251, 146, 60, 0.6)",
  low: "rgba(253, 224, 71, 0.4)",
  none: "rgba(0, 0, 0, 0)",
};

export const DENGUE_LEGEND = [
  { level: "high", label: "High / endemic", color: "rgba(239, 68, 68, 0.85)" },
  { level: "moderate", label: "Moderate risk", color: "rgba(251, 146, 60, 0.8)" },
  { level: "low", label: "Low / sporadic", color: "rgba(253, 224, 71, 0.65)" },
  { level: "none", label: "No dengue", color: "rgba(100, 116, 139, 0.3)" },
];
