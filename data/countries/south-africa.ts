import type { CountryInfo } from "./types";

// ── South Africa (Southern Africa) — full brief ────────────────────────────
// Sources: CDC Yellow Book 2024 (South Africa chapter), CDC Travelers' Health,
// WHO yellow fever risk map (December 2024), Swiss BAG.
export const southAfrica: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
  vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
  malariaRisk: "limited",
  yellowFever: "possible",
  foodWater:
    "Tap water in major cities is generally safe and meets international standards. Restaurants in tourist areas have reliable food standards. Outside major centers, use bottled water.",
  mosquito:
    "Malaria risk is limited and concentrated in low-altitude eastern areas, primarily Kruger National Park and the surrounding lowveld. No risk in Cape Town, Johannesburg, Durban, or Garden Route. Chemoprophylaxis recommended for travel to malaria areas during peak season.",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/south-africa",

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
      note: "MMR, Tdap, varicella, polio booster, COVID-19 — per Swiss BAG schedule.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Consider for travel outside major tourist areas, longer stays, or visiting friends and relatives.",
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
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Malaria risk is geographically and seasonally concentrated. High risk in the lowveld of Mpumalanga (including Kruger National Park) and northeastern Limpopo from September to May; moderate risk in the same areas June to August. Lower year-round risk in northern KwaZulu-Natal (Tembe, Ndumu, iSimangaliso, Hluhluwe-iMfolozi) and elsewhere in northern Limpopo and Mpumalanga. No risk in Cape Town, Johannesburg, Durban, Garden Route, or southern South Africa.",
      keyFacts: [
        { label: "High risk", value: "Kruger + NE Limpopo (Sept–May)" },
        { label: "Moderate", value: "Same areas (Jun–Aug)" },
        { label: "Low risk", value: "Northern KwaZulu-Natal year-round" },
        { label: "No risk", value: "Cape Town, Joburg, Durban, Garden Route" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/south-africa",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/south-africa.jpg",
      mapCaption: "Malaria risk areas in South Africa (CDC).",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. A vaccination certificate is required at entry for travelers arriving from countries with yellow fever risk. Note: travelers from Zambia, Tanzania, Eritrea, Somalia, São Tomé and Príncipe, and Rwanda are exempted.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/south-africa",
    },
  },
};
