import type { CountryInfo } from "./types";

// ── Albania ────────────────────────────────────────────────────────────────
// Sources: CDC Travelers' Health, CDC Yellow Book, Swiss BAG.
export const albania: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines (MMR, Tdap, varicella, polio, COVID-19)",
  ],
  vaccinesConsider: ["Hepatitis B", "Tick-borne encephalitis", "Rabies"],
  malariaRisk: "none",
  yellowFever: "possible",
  foodWater:
    "Tap water quality varies. Outside major hotels, prefer bottled or treated water and avoid uncooked produce you haven't peeled yourself. Most cooked food in restaurants is safe.",
  mosquito:
    "Tick exposure is the more relevant arthropod risk. Use repellent and check for ticks after hiking or outdoor activities, especially in spring and summer in forested areas.",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/albania",

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for travel to most low- and middle-income countries.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, polio, COVID-19 — per Swiss BAG schedule. Ensure measles immunity in particular.",
    },
    {
      name: "Tick-borne encephalitis (TBE)",
      slug: "tick-borne-encephalitis",
      audience: "specific",
      note: "Consider for travelers planning extended outdoor activity (hiking, camping, forestry) in spring through autumn.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "For long stays, rural travel, occupational animal contact, or activities like hiking and cycling in remote areas.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration.",
    },
  ],

  diseases: {
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. A vaccination certificate is required at entry only for travelers ≥1 year of age arriving from countries with yellow fever transmission risk (within 6 days of departure or transit through such countries).",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/albania",
    },
  },
};
