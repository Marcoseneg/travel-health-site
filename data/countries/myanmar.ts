import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024.
// Framing reflects Swiss BAG schedule. Notable: malaria more widespread than
// in neighbouring countries — transmission in most regions with the major
// cities of Yangon and Mandalay generally low/no-risk — and documented
// chloroquine + mefloquine resistance; no domestic yellow fever risk but a
// YF certificate is required when arriving from a YF-risk country; year-round
// dengue. Note the CDC destination URL uses the country name "burma".
export const myanmar: CountryInfo = {
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
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid. CDC notes cholera transmission in Burma, so food and water hygiene is especially important.",
  mosquito:
    "Dengue circulates year-round, including in Yangon and Mandalay, so daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential. Malaria is present across most rural regions — protect at dawn and dusk and discuss chemoprophylaxis for rural travel, along with Japanese encephalitis precautions.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/burma",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry certificate",
      message:
        "Myanmar (Burma) requires a yellow fever vaccination certificate from travelers arriving from a country with risk of yellow fever transmission. There is no yellow fever in Myanmar itself. Direct travel from Switzerland is not affected.",
      source: "WHO / EKRM",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Cholera transmission reported",
      message:
        "CDC reports cholera transmission in Burma. The main protection is strict food and water hygiene; cholera vaccination may be discussed with your travel medicine specialist for higher-risk itineraries (long stays, work in affected or low-resource areas).",
      source: "CDC Travelers' Health",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/burma",
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
      note: "CDC recommends Hepatitis B for unvaccinated travelers of all ages. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually already covered; older travelers should check their status.",
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
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Rabid dogs are commonly found in Burma and reliable post-exposure care can be hard to access.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending a month or more in rural areas, or shorter stays involving extensive rural/outdoor exposure or an uncertain itinerary. Risk varies by region and season.",
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
        "Malaria is more widespread than in neighbouring countries, with transmission across most rural regions of the country. Higher risk in border and hill states such as Bago, Tanintharyi, Kachin, Kayah, Kayin, and Shan; chemoprophylaxis is recommended for travel into rural areas. The large cities of Yangon (Rangoon) and Mandalay are generally low/no-risk. Chloroquine and mefloquine resistance are documented.",
      keyFacts: [
        { label: "Higher risk", value: "Rural areas; Bago, Tanintharyi, Kachin, Kayah, Kayin, Shan" },
        { label: "Lower/no risk", value: "Yangon (Rangoon), Mandalay city" },
        { label: "Resistance", value: "Chloroquine & mefloquine resistant" },
        { label: "Prevention", value: "Chemoprophylaxis for rural travel; bite protection throughout" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/burma",
    },
    dengue: {
      riskSummary:
        "Endemic year-round throughout Myanmar, with peaks during the rainy season. Yangon, Mandalay, and other towns all have transmission. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide, incl. Yangon & Mandalay" },
        { label: "Season", value: "Year-round; peaks in rainy season" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. A YF certificate is required for travelers arriving from a YF-risk country. See country alert for details. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/burma",
    },
    chikungunya: {
      riskSummary:
        "Sporadic transmission via the same daytime Aedes mosquito as dengue, so dengue bite-prevention measures also protect against chikungunya. Routine vaccination is generally not recommended; it may be considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
