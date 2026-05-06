import type { CountryInfo } from "./types";

// ── Senegal (West Africa) — full brief ─────────────────────────────────────
// Sources: CDC Yellow Book 2024 (Senegal chapter), CDC Travelers' Health,
// WHO yellow fever risk map (December 2024), Swiss BAG.
export const senegal: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Use bottled or treated water and eat thoroughly cooked food. Resort areas (Saly, Cap Skirring) have safer food but precautions still apply elsewhere.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round country-wide. Meningococcal disease risk during the dry season (December–June).",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/senegal",

  vaccinesDetail: [
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Recommended for all travelers — Senegal is in the WHO yellow fever endemic zone. Vaccination is also widely required at the country borders for onward travel.",
    },
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended; risk of foodborne and waterborne illness is significant.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, polio booster, COVID-19 — per Swiss BAG schedule.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "For long stays, rural travel, occupational animal contact, or activities like cycling and hiking.",
    },
    {
      name: "Meningococcal",
      audience: "specific",
      note: "Consider for long-term stays during the dry season (December–June), especially in northern Senegal.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High year-round risk in the southern and eastern half of the country (south of The Gambia and in Matam in the northeast). Seasonal risk (June–December) in the north and northwest, including the coast north of Delta du Saloum National Park. Chemoprophylaxis recommended for most itineraries; insect-bite protection essential everywhere.",
      keyFacts: [
        { label: "High risk", value: "South & east, year-round" },
        { label: "Seasonal", value: "North/NW: high Jun–Dec, moderate Jan–May" },
        { label: "Species", value: "P. falciparum (predominant)" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/senegal",
    },
    yellowFever: {
      riskSummary:
        "Yellow fever vaccination is recommended for all travelers ≥9 months old (no contraindication). Senegal is in the WHO endemic zone; vaccination certificate is widely accepted as required for entry from neighboring countries.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/senegal",
    },
  },
};
