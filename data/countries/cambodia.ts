import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024.
// Framing reflects Swiss BAG schedule. Notable: malaria confined to rural
// and forested pockets with Phnom Penh, Siem Reap and Angkor no-risk, and
// documented chloroquine + mefloquine resistance; no domestic yellow fever
// risk but a YF certificate is required when arriving from a YF-risk
// country; year-round dengue.
export const cambodia: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Hepatitis B",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Rabies",
    "Japanese encephalitis",
    "Dengue",
  ],
  malariaRisk: "limited",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — especially relevant when eating at street stalls and in smaller towns and rural areas.",
  mosquito:
    "Dengue circulates year-round, including in Phnom Penh and Siem Reap, so daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential. For trips into rural and forested areas, also protect at dawn and dusk against malaria and Japanese encephalitis.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/cambodia",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry certificate",
      message:
        "Cambodia requires a yellow fever vaccination certificate from travelers (over 1 year of age) arriving from a country with risk of yellow fever transmission, or who transited more than 12 hours through the airport of such a country. There is no yellow fever in Cambodia itself. Direct travel from Switzerland is not affected.",
      source: "WHO / EKRM",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to tropical and subtropical countries. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "all",
      note: "Recommended for unvaccinated travelers. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually already covered; older travelers should check their status.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for most travelers, particularly those visiting friends and relatives, smaller cities or rural areas, long-term travelers, or those with individual risk factors.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Rabid dogs are commonly found in Cambodia and reliable post-exposure care can be hard to access outside major cities.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending a month or more in rural areas, or shorter stays involving extensive rural/outdoor exposure. Not needed for a short Phnom Penh / Angkor itinerary.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga® vaccination currently recommended only for travelers with documented prior dengue infection who will be exposed in a region with high dengue transmission.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is confined to rural and forested pockets, with falciparum malaria concentrated in forested border areas. There is no risk in Phnom Penh, Siem Reap, or the Angkor Wat temple complex — the core tourist itinerary needs mosquito protection only. Chemoprophylaxis is recommended for travel into rural and forested areas; chloroquine and mefloquine resistance are documented.",
      keyFacts: [
        { label: "Higher risk", value: "Rural & forested areas, esp. border zones" },
        { label: "No risk", value: "Phnom Penh, Siem Reap, Angkor Wat" },
        { label: "Resistance", value: "Chloroquine & mefloquine resistant" },
        { label: "Prevention", value: "Chemoprophylaxis for rural/forest travel; bite protection elsewhere" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/cambodia",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/cambodia.jpg",
      mapCaption: "Malaria risk areas in Cambodia (CDC).",
    },
    dengue: {
      riskSummary:
        "Endemic year-round throughout Cambodia, with peaks during the rainy season. Phnom Penh, Siem Reap, and other towns all have transmission. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide, incl. Phnom Penh & Siem Reap" },
        { label: "Season", value: "Year-round; peaks in rainy season" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. A YF certificate is required for travelers arriving from a YF-risk country (or transiting >12 hours through such an airport). See country alert for details. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/cambodia",
    },
    chikungunya: {
      riskSummary:
        "Sporadic transmission with periodic outbreaks via the same daytime Aedes mosquito as dengue, so dengue bite-prevention measures also protect against chikungunya. Routine vaccination is generally not recommended; it may be considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
