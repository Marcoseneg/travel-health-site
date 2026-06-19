import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Zimbabwe) + CDC Yellow Book 2024;
// EKRM/HealthyTravel (Swiss travel medicine authority, https://www.healthytravel.ch).
// Framing reflects Swiss BAG schedule. Notable: no domestic yellow fever, but a
// YF certificate is required if arriving from a YF-risk country. Malaria is
// seasonal in lower-altitude areas (Victoria Falls, Zambezi valley, Lake Kariba);
// Harare and the high plateau are low-risk. Periodic cholera outbreaks.
// Draft brief — pending physician review.
export const zimbabwe: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Use bottled or treated water, avoid ice from unverified sources, and eat thoroughly cooked food. Cholera outbreaks occur periodically and can be widespread — strict food and water hygiene is the main protection.",
  mosquito:
    "Mosquito-bite prevention is essential below ~1200m. Malaria risk is year-round in low-altitude areas (Zambezi valley, Lake Kariba, Victoria Falls area) and seasonal elsewhere (November–June). Harare and the high plateau are low-risk. Use DEET- or picaridin-based repellent, treated bed nets, and long sleeves at dusk and dawn.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/zimbabwe",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever certificate if arriving from a risk country",
      message:
        "Zimbabwe has no domestic yellow fever transmission, so direct travel from Switzerland is not affected. However, a valid YF vaccination certificate is required for travelers aged 9 months and older arriving from (or having transited >12 hours through) a country with risk of YF transmission — relevant for multi-country African itineraries.",
      source: "CDC / WHO — Zimbabwe entry requirements",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/zimbabwe",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Cholera transmission",
      message:
        "Active cholera transmission has been documented in Zimbabwe with periodic widespread outbreaks. Travelers should maintain strict food and water hygiene; oral cholera vaccine can be considered for higher-risk itineraries.",
      source: "CDC — Zimbabwe",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/zimbabwe",
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
      note: "Recommended for long stays, remote travel, cycling/motorbike trips, children, and those working with animals. Dog rabies is endemic in Zimbabwe. Note: counterfeit rabies vaccine has been reported locally, so pre-exposure vaccination in Switzerland is preferable for higher-risk travelers.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Oral cholera vaccine may be considered given periodic widespread outbreaks, particularly for relief/healthcare workers, longer stays, or travel to affected areas.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Present throughout the country but varies sharply by altitude and season. Year-round risk in low-lying areas including the Zambezi valley, Lake Kariba, and the Victoria Falls / Zambezi region; seasonal risk (November–June) elsewhere. Harare and the high central plateau are low-risk. Chloroquine-resistant P. falciparum predominates; chemoprophylaxis is recommended for low-altitude and seasonal-risk areas.",
      keyFacts: [
        { label: "Year-round", value: "Zambezi valley, Lake Kariba, Victoria Falls area" },
        { label: "Seasonal", value: "Much of country, November–June" },
        { label: "Low risk", value: "Harare, high central plateau" },
        { label: "Species", value: "P. falciparum (chloroquine-resistant)" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/zimbabwe",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Zimbabwe. A YF certificate is required only for travelers ≥9 months arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Status", value: "No risk in country" },
        { label: "Entry rule", value: "Certificate only if arriving from a risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/zimbabwe",
    },
    dengue: {
      riskSummary:
        "Sporadic dengue transmission occurs, carried by daytime-biting Aedes mosquitoes. Daytime bite-prevention measures reduce risk.",
      keyFacts: [
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
        { label: "Prevention", value: "Daytime repellent, covering clothing" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
