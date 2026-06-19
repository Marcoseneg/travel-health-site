import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Eswatini) + CDC Yellow Book 2024;
// EKRM/HealthyTravel (Swiss travel medicine authority, https://www.healthytravel.ch).
// Framing reflects Swiss BAG schedule. Notable: no domestic yellow fever, but a
// YF certificate is required if arriving from a YF-risk country. Malaria is
// seasonal and confined to the eastern lowveld bordering Mozambique and South
// Africa; western/central highlands are no-risk. Draft brief — pending physician
// review.
export const eswatini: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies"],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Tap water in major hotels is generally safe; otherwise use bottled or treated water. Eat thoroughly cooked food and observe standard hygiene to reduce risk of traveler's diarrhea, hepatitis A, and typhoid.",
  mosquito:
    "Malaria risk is seasonal (November–May) in the eastern lowveld bordering Mozambique and South Africa — the Lubombo region and the eastern halves of Hhohho, Manzini, and Shiselweni (incl. Big Bend, Mhlume, Tshaneni). Use DEET- or picaridin-based repellent and long sleeves at dusk and dawn; consider chemoprophylaxis when visiting affected areas in season. Western and central highlands are no-risk.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/eswatini",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever certificate if arriving from a risk country",
      message:
        "Eswatini has no domestic yellow fever transmission, so direct travel from Switzerland is not affected. However, a valid YF vaccination certificate is required for travelers aged 9 months and older arriving from (or having transited through) a country with risk of YF transmission — relevant for multi-country African itineraries.",
      source: "CDC / WHO — Eswatini entry requirements",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/eswatini",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, especially those visiting rural areas, staying with friends and relatives, or eating outside major hotels.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (adults need a one-time booster), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Recommended for long stays, remote travel, cycling/motorbike trips, children, and those engaging in activities with potential animal or wildlife contact.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Seasonal risk (November–May) confined to the eastern lowveld bordering Mozambique and South Africa — the entire Lubombo region and the eastern halves of Hhohho, Manzini and Shiselweni (incl. Big Bend, Mhlume, Tshaneni). Chloroquine-resistant P. falciparum predominates; chemoprophylaxis is recommended for these areas in season. Western and central highlands (incl. Mbabane) are no-risk.",
      keyFacts: [
        { label: "Risk area", value: "Eastern lowveld (Lubombo; E. Hhohho/Manzini/Shiselweni)" },
        { label: "Season", value: "November–May" },
        { label: "No risk", value: "Western/central highlands incl. Mbabane" },
        { label: "Species", value: "P. falciparum (chloroquine-resistant)" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/eswatini",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Eswatini. A YF certificate is required only for travelers ≥9 months arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Status", value: "No risk in country" },
        { label: "Entry rule", value: "Certificate only if arriving from a risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/eswatini",
    },
    dengue: {
      riskSummary:
        "Sporadic dengue transmission can occur, carried by daytime-biting Aedes mosquitoes. Daytime bite-prevention measures reduce risk.",
      keyFacts: [
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
        { label: "Prevention", value: "Daytime repellent, covering clothing" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
