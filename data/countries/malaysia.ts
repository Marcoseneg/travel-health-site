import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health — Malaysia
// (https://wwwnc.cdc.gov/travel/destinations/traveler/none/malaysia), CDC
// Yellow Book 2024, EKRM/HealthyTravel (https://www.healthytravel.ch). Framing
// reflects the Swiss BAG schedule. Notable: malaria risk is limited to rural,
// forested areas (mainly zoonotic P. knowlesi in Borneo); Kuala Lumpur, Penang,
// and George Town are no-risk. Dengue is endemic nationwide.
export const malaysia: CountryInfo = {
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
  malariaRisk: "limited",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — especially relevant when eating outside major hotels and in rural areas.",
  mosquito:
    "Dengue circulates year-round across Malaysia including urban areas, so daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential — including in Kuala Lumpur, Penang, and the cities. For travel into rural, forested areas, especially in Sabah and Sarawak (Borneo), also protect at dawn and dusk for zoonotic malaria and Japanese encephalitis.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/malaysia",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry rule",
      message:
        "Malaysia requires a yellow fever vaccination certificate from travelers arriving from (or who have transited through) a country with risk of yellow fever transmission. There is no yellow fever risk within Malaysia itself, and direct travel from Switzerland is not affected.",
      source: "WHO / Malaysian immigration guidance",
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
      note: "Recommended for long-term travelers, visiting friends and relatives, those staying in poor hygienic conditions, or with individual risk factors — especially for travel to rural areas.",
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
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Increased human rabies cases have been reported in Sarawak.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending a month or more in rural rice-growing or pig-farming areas, or with high-risk rural itineraries (camping, unscreened accommodation). Not needed for typical urban stays.",
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
        "Risk is limited to rural, forested areas, and is mainly zoonotic Plasmodium knowlesi transmitted from macaques — most relevant in the interior of Sabah and Sarawak (Borneo). There is no risk in Kuala Lumpur, Penang State, Penang Island, or George Town. Chemoprophylaxis may be discussed for travelers spending significant time in rural, forested areas; bite protection is the priority elsewhere.",
      keyFacts: [
        { label: "Limited risk", value: "Rural, forested areas (esp. Sabah & Sarawak interior)" },
        { label: "No risk", value: "Kuala Lumpur, Penang, George Town, urban areas" },
        { label: "Species", value: "Mainly zoonotic P. knowlesi (from macaques)" },
        { label: "Prevention", value: "Bite protection; prophylaxis for rural forest exposure" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/malaysia",
    },
    dengue: {
      riskSummary:
        "Endemic year-round throughout Malaysia, including Kuala Lumpur and all major cities, with peaks during the rainy season. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide, all major cities" },
        { label: "Season", value: "Year-round; peaks in rainy season" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Transmission occurs with periodic outbreaks across Malaysia. The same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Malaysia. A vaccination certificate is required only for travelers arriving from, or transiting through, a country with yellow fever transmission risk. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/malaysia",
    },
  },
};
