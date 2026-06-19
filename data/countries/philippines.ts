import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health — Philippines
// (https://wwwnc.cdc.gov/travel/destinations/traveler/none/philippines), CDC
// Yellow Book 2024, EKRM/HealthyTravel (https://www.healthytravel.ch). Framing
// reflects the Swiss BAG schedule. Notable: malaria risk is confined to Palawan
// and parts of Mindanao; Manila, Cebu, and Bohol are no-risk. Dengue is endemic
// nationwide, and rabies is common in dogs.
export const philippines: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Hepatitis B",
    "Rabies",
    "Japanese encephalitis",
    "Chikungunya",
    "Dengue",
  ],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — especially relevant when eating outside major hotels and resorts.",
  mosquito:
    "Dengue circulates year-round across the islands including urban areas, so daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential everywhere, including Manila and the resort islands. For travel to rural Palawan or parts of Mindanao, also protect at dawn and dusk for malaria and discuss chemoprophylaxis with a travel medicine specialist beforehand.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/philippines",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry rule",
      message:
        "The Philippines requires a yellow fever vaccination certificate from travelers arriving from (or who have transited through) a country with risk of yellow fever transmission. There is no yellow fever risk within the Philippines itself, and direct travel from Switzerland is not affected.",
      source: "WHO / Philippine immigration guidance",
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
      note: "Recommended for long-term travelers, visiting friends and relatives, those staying in poor hygienic conditions, or with individual risk factors.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in the Swiss childhood schedule since 1998 — younger travelers usually covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Rabies in dogs is common throughout the Philippines and is a leading cause of human rabies in the region.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending a month or more in rural rice-growing or pig-farming areas, or with high-risk rural itineraries. Not needed for typical urban or beach-resort stays.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga® vaccination currently recommended only for travelers with documented prior dengue infection who will be exposed in a region with high dengue transmission.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "Vaccination indicated during chikungunya outbreaks; may also be considered for countries with elevated risk (see EKRM statement).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is confined to defined areas — mainly rural Palawan province and parts of the Mindanao island group — with chloroquine resistance documented. There is no risk in Metropolitan Manila, Cebu, Bohol, or other urban centers, and most popular destinations are low- or no-risk. Chemoprophylaxis is recommended for travel to risk areas in Palawan and Mindanao; bite protection is the priority elsewhere.",
      keyFacts: [
        { label: "Risk areas", value: "Rural Palawan and parts of Mindanao" },
        { label: "No risk", value: "Manila, Cebu, Bohol, urban centers" },
        { label: "Resistance", value: "Chloroquine resistance documented" },
        { label: "Prevention", value: "Prophylaxis for Palawan/Mindanao; bite protection elsewhere" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/philippines",
    },
    dengue: {
      riskSummary:
        "Endemic year-round throughout the Philippines, including Manila and all major tourist destinations, with peaks during the rainy season. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide, all major cities and islands" },
        { label: "Season", value: "Year-round; peaks in rainy season" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Transmission occurs with periodic outbreaks across the Philippines. The same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination considered in outbreak settings or for some longer stays (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in the Philippines. A vaccination certificate is required only for travelers arriving from, or transiting through, a country with yellow fever transmission risk. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/philippines",
    },
  },
};
