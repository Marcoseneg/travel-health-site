// ─────────────────────────────────────────────────────────────────────────────
// Zika risk by country, for the /diseases/zika risk map.
//
// Zika shares the Aedes vector with dengue/chikungunya, so the geographic
// footprint is similar; levels are calibrated to Zika's own epidemiology — the
// Americas (the 2015–16 epidemic zone, congenital Zika) weighted highest, SE
// Asia endemic at lower intensity, Africa (the virus's origin) mostly low/
// under-reported, and Pacific islands that saw outbreaks. Current global Zika
// transmission is low, but the travel-relevant RISK (especially in pregnancy)
// persists across the competent-vector belt.
//
// Sources: CDC Zika travel guidance; WHO/PAHO Zika situation reports; ECDC.
// PHYSICIAN REVIEW PENDING — levels are a defensible first pass for travel use.
// Keys must match the NAME property from countries.geojson exactly.
// ─────────────────────────────────────────────────────────────────────────────

export type ZikaRisk = "high" | "moderate" | "low" | "none";

export const zikaRiskByCountry: Record<string, ZikaRisk> = {
  // ── Americas — the 2015–16 epidemic zone ──
  "Brazil": "high",
  "Colombia": "high",
  "Venezuela": "high",
  "Mexico": "high",
  "Honduras": "high",
  "Guatemala": "high",
  "Nicaragua": "high",
  "El Salvador": "high",
  "Ecuador": "high",
  "Dominican Rep.": "high",
  "Haiti": "high",
  "Costa Rica": "moderate",
  "Panama": "moderate",
  "Belize": "moderate",
  "Peru": "moderate",
  "Bolivia": "moderate",
  "Paraguay": "moderate",
  "Guyana": "moderate",
  "Suriname": "moderate",
  "Cuba": "moderate",
  "Jamaica": "moderate",
  "Trinidad and Tobago": "moderate",
  "Argentina": "low",

  // ── South / Southeast Asia — endemic, lower intensity ──
  "Thailand": "high",
  "Indonesia": "moderate",
  "Philippines": "moderate",
  "Vietnam": "moderate",
  "Malaysia": "moderate",
  "Cambodia": "moderate",
  "Singapore": "moderate",
  "Laos": "low",
  "Myanmar": "low",
  "India": "moderate",
  "Bangladesh": "moderate",
  "Pakistan": "low",
  "Nepal": "low",
  "Sri Lanka": "low",

  // ── Africa — virus origin, mostly low / under-reported ──
  "Cape Verde": "moderate",
  "Angola": "moderate",
  "Gabon": "moderate",
  "Guinea-Bissau": "moderate",
  "Nigeria": "low",
  "Kenya": "low",
  "Tanzania": "low",
  "Uganda": "low",
  "Senegal": "low",
  "Côte d'Ivoire": "low",
  "Cameroon": "low",
  "Ethiopia": "low",
  "Burkina Faso": "low",
  "Mali": "low",
  "Dem. Rep. Congo": "low",
  "Central African Rep.": "low",
  "Ghana": "low",
  "Guinea": "low",
  "Sierra Leone": "low",
  "Liberia": "low",
  "Benin": "low",
  "Togo": "low",
  "Mozambique": "low",

  // ── Pacific Islands — past outbreaks ──
  "Papua New Guinea": "moderate",
  "Solomon Is.": "moderate",
  "Vanuatu": "moderate",
  "Fiji": "moderate",
};

export const ZIKA_LEGEND = [
  { level: "high", label: "High risk", color: "rgba(219, 39, 119, 0.85)" },
  { level: "moderate", label: "Moderate risk", color: "rgba(244, 114, 182, 0.78)" },
  { level: "low", label: "Low / sporadic", color: "rgba(251, 182, 206, 0.7)" },
  { level: "none", label: "No known risk", color: "rgba(100, 116, 139, 0.3)" },
] as const;
