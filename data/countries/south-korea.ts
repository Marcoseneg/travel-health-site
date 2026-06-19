import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024.
// Framing reflects Swiss BAG schedule. South Korea is largely low-risk with
// excellent medical care. Notable: limited P. vivax malaria in rural northern
// provinces and near the DMZ (March–December); Japanese encephalitis is a
// minor regional risk; tick-borne diseases (TBE, SFTS) for outdoor exposure.
// No yellow fever risk and no certificate required.
export const southKorea: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Typhoid",
    "Japanese encephalitis",
    "Rabies",
  ],
  malariaRisk: "limited",
  yellowFever: "none",
  foodWater:
    "Tap water in major cities is generally treated, but bottled or filtered water is a reasonable choice, and standard food-hygiene precautions still reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — most relevant outside large hotels and in smaller towns or rural areas.",
  mosquito:
    "Risk is generally low. In rural northern provinces and near the demilitarized zone, use dawn/dusk mosquito protection (DEET or picaridin repellent, long sleeves) against limited P. vivax malaria and Japanese encephalitis during the transmission season. For hiking and other rural outdoor activity, also take tick-bite precautions.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/south-korea",

  countryAlerts: [],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for most travelers, particularly those visiting smaller towns or rural areas or staying with friends and relatives. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually covered.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Consider for longer stays, those visiting friends and relatives, or travel to smaller cities and rural areas. Not needed for typical short urban itineraries.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending a month or more in rural areas, or shorter stays with significant rural/outdoor exposure during the transmission season (mainly summer and autumn). Not needed for typical urban or short-stay itineraries.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Low risk; dogs are rarely infected and the main concern is wildlife. Consider for long stays or high individual risk (extensive rural/outdoor activity, work with animals, cavers — bats).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Malaria risk is limited and seasonal (roughly March–December), confined to rural areas of the northern provinces near the demilitarized zone — parts of Gyeonggi and Gangwon provinces and rural Incheon. Only P. vivax occurs, with no documented drug resistance. Seoul and the usual tourist destinations have no transmission; mosquito-bite protection is generally sufficient for the limited-risk areas.",
      keyFacts: [
        { label: "Species", value: "P. vivax (100%)" },
        { label: "Areas", value: "Rural N. provinces near the DMZ (Gyeonggi, Gangwon, rural Incheon)" },
        { label: "Season", value: "March–December" },
        { label: "No risk", value: "Seoul and usual tourist destinations" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/south-korea",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in South Korea, and no vaccination certificate is required for entry, including for travelers arriving from yellow-fever-endemic countries.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/south-korea",
    },
  },
};
