import type { CountryInfo } from "./types";

// ── Madagascar (East Africa) — full brief ──────────────────────────────────
// Sources: CDC Yellow Book 2024 (Madagascar chapter), CDC Travelers' Health,
// WHO yellow fever risk map (December 2024), Swiss BAG.
export const madagascar: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "possible",
  foodWater:
    "Strict food and water precautions are essential. Use bottled or treated water and avoid raw produce. Healthcare access outside Antananarivo is limited.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential. Malaria transmission is high in coastal lowlands; the central highland plateau (including Antananarivo) is moderate risk. Chemoprophylaxis recommended for most itineraries.",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/madagascar",

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for travel to most low- and middle-income countries.",
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
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "For high-risk settings (humanitarian aid, outbreak areas).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk year-round across the country. Chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine, or tafenoquine) recommended in addition to strict mosquito-bite protection. Antananarivo and the central highlands carry moderate rather than high risk; emergency standby treatment may be discussed instead of full prophylaxis for these limited itineraries.",
      keyFacts: [
        { label: "High risk", value: "Coastal lowlands, country-wide" },
        { label: "Moderate", value: "Antananarivo + central highlands" },
        { label: "Species", value: "P. falciparum (predominant)" },
        { label: "Season", value: "Year-round" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/madagascar",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. Vaccination certificate required at entry for travelers arriving from countries with yellow fever risk (within 6 days of departure or transit through such countries).",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/madagascar",
    },
    chikungunya: {
      riskSummary:
        "Periodic chikungunya outbreaks have been reported. Vaccination may be considered during active outbreaks. Daytime mosquito-bite prevention is the main protection.",
    },
  },
};
