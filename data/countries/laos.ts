import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024.
// Framing reflects Swiss BAG schedule. Notable: malaria concentrated in
// southern provinces with Vientiane and Luang Prabang no-risk, and
// documented chloroquine + mefloquine resistance; no domestic yellow fever
// risk but a YF certificate is required when arriving from a YF-risk
// country; year-round dengue.
export const laos: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Hepatitis B",
    "Rabies",
    "Japanese encephalitis",
    "Dengue",
  ],
  malariaRisk: "limited",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — especially relevant when eating at street stalls and in rural areas.",
  mosquito:
    "Dengue circulates year-round, including in Vientiane and Luang Prabang, so daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential. For trips to the southern provinces and rural areas, also protect at dawn and dusk against malaria and Japanese encephalitis.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/laos",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry certificate",
      message:
        "Laos requires a yellow fever vaccination certificate from travelers arriving from a country with risk of yellow fever transmission. There is no yellow fever in Laos itself. Direct travel from Switzerland is not affected.",
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
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for most travelers, particularly those visiting rural areas, staying with friends and relatives, long-term travelers, or those with individual risk factors.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually already covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Rabid dogs are commonly found in Laos and reliable post-exposure care can be hard to access in rural areas.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending a month or more in rural areas, or shorter stays involving extensive rural/outdoor exposure. Not needed for a short urban itinerary.",
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
        "Risk is concentrated in the southern provinces (e.g. Attapeu, Champasak, Khammouane, Salavan, Savannakhet, Sekong), with only rare cases in the north. There is no risk in Vientiane or Luang Prabang — mosquito protection only. Chemoprophylaxis is recommended for travel into the southern provinces; chloroquine and mefloquine resistance are documented.",
      keyFacts: [
        { label: "Higher risk", value: "Southern provinces (Champasak, Savannakhet, Salavan, Sekong, etc.)" },
        { label: "No risk", value: "Vientiane, Luang Prabang" },
        { label: "Resistance", value: "Chloroquine & mefloquine resistant" },
        { label: "Prevention", value: "Chemoprophylaxis for southern provinces; bite protection elsewhere" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/laos",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/laos.jpg",
      mapCaption: "Malaria risk areas in Laos (CDC).",
    },
    dengue: {
      riskSummary:
        "Endemic year-round throughout Laos, with peaks during the rainy season. Vientiane, Luang Prabang, and other towns all have transmission. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide, incl. Vientiane & Luang Prabang" },
        { label: "Season", value: "Year-round; peaks in rainy season" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. A YF certificate is required for travelers arriving from a YF-risk country. See country alert for details. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/laos",
    },
    chikungunya: {
      riskSummary:
        "Sporadic transmission via the same daytime Aedes mosquito as dengue, so dengue bite-prevention measures also protect against chikungunya. Routine vaccination is generally not recommended; it may be considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
