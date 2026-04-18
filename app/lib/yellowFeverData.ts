export type YellowFeverRisk = "required" | "recommended" | "generally-not" | "none";

// Keys must match the NAME property from countries.geojson exactly
export const yellowFeverByCountry: Record<string, YellowFeverRisk> = {
  // ── Africa — Endemic / Required ──
  "Angola": "required",
  "Benin": "required",
  "Burkina Faso": "required",
  "Burundi": "required",
  "Cameroon": "required",
  "Central African Rep.": "required",
  "Chad": "required",
  "Congo": "required",
  "Dem. Rep. Congo": "required",
  "Côte d'Ivoire": "required",
  "Eq. Guinea": "required",
  "Gabon": "required",
  "Gambia": "required",
  "Ghana": "required",
  "Guinea": "required",
  "Guinea-Bissau": "required",
  "Liberia": "required",
  "Mali": "required",
  "Mauritania": "required",
  "Niger": "required",
  "Nigeria": "required",
  "Senegal": "required",
  "Sierra Leone": "required",
  "S. Sudan": "required",
  "Sudan": "required",
  "Togo": "required",
  "Uganda": "required",

  // ── Africa — Recommended ──
  "Ethiopia": "recommended",
  "Kenya": "recommended",
  "Rwanda": "recommended",
  "Tanzania": "recommended",
  "Zambia": "recommended",
  "Somalia": "recommended",
  "Eritrea": "generally-not",

  // ── South America — Required / Recommended ──
  "Brazil": "recommended",
  "Bolivia": "recommended",
  "Colombia": "recommended",
  "Ecuador": "recommended",
  "French Guiana": "required",
  "Guyana": "required",
  "Peru": "recommended",
  "Suriname": "required",
  "Venezuela": "recommended",
  "Paraguay": "recommended",
  "Panama": "recommended",
  "Argentina": "recommended",
  "Trinidad and Tobago": "recommended",

  // Everything else defaults to "none" in the component
};

export const YELLOW_FEVER_COLORS: Record<YellowFeverRisk, string> = {
  required: "rgba(245, 158, 11, 0.75)",
  recommended: "rgba(251, 191, 36, 0.55)",
  "generally-not": "rgba(253, 224, 71, 0.35)",
  none: "rgba(0, 0, 0, 0)",
};

export const YELLOW_FEVER_LEGEND = [
  { level: "required", label: "Required for entry", color: "rgba(245, 158, 11, 0.9)" },
  { level: "recommended", label: "Recommended", color: "rgba(251, 191, 36, 0.75)" },
  { level: "generally-not", label: "Generally not required", color: "rgba(253, 224, 71, 0.55)" },
  { level: "none", label: "Not applicable", color: "rgba(100, 116, 139, 0.3)" },
];
