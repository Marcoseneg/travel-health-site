import type { CountryInfo } from "./types";

// ── Morocco (North Africa) — full brief ────────────────────────────────────
// Sources: CDC Yellow Book 2024 (Morocco chapter), CDC Travelers' Health,
// WHO yellow fever risk map, Swiss BAG.
export const morocco: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
  vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
  malariaRisk: "none",
  yellowFever: "possible",
  foodWater:
    "Use bottled water; tap water quality varies, especially outside major cities. Be cautious with raw produce, salads, and unpasteurized dairy. Traveler's diarrhea is common — many short-stay travelers experience it at least once.",
  mosquito:
    "No malaria. General mosquito-bite prevention reasonable during warm months in rural areas.",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/morocco",

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, polio, COVID-19 — per Swiss BAG schedule. Ensure measles immunity.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Consider for long stays, travelers visiting friends and relatives, or those eating outside major tourist hotels.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "For long stays, rural travel, occupational animal contact, or activities like cycling and hiking. Stray dogs are common.",
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
        "No yellow fever risk in country. A vaccination certificate may be required at entry for travelers arriving from countries with yellow fever risk.",
    },
  },
};
