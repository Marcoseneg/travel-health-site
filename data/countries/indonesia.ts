import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health — Indonesia
// (https://wwwnc.cdc.gov/travel/destinations/traveler/none/indonesia), CDC
// Yellow Book 2024, EKRM/HealthyTravel (https://www.healthytravel.ch). Framing
// reflects the Swiss BAG schedule. Notable: malaria risk is strongly regional —
// high in Papua and eastern provinces, but Bali, Jakarta, and the Gili Islands
// are essentially no-risk. Dengue is endemic nationwide, including Bali.
export const indonesia: CountryInfo = {
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
  malariaRisk: "high",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — particularly relevant when eating outside major hotels and resorts, including the well-known 'Bali belly'.",
  mosquito:
    "Dengue circulates year-round across the archipelago including Bali and other tourist destinations, so daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential everywhere. For travel to Papua, the eastern provinces, or rural Kalimantan/Sulawesi/Sumatra, protect at dawn and dusk as well for malaria, and discuss chemoprophylaxis with a travel medicine specialist before departure.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/indonesia",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry rule",
      message:
        "Indonesia requires a yellow fever vaccination certificate from travelers arriving from (or who have transited through) a country with risk of yellow fever transmission. There is no yellow fever risk within Indonesia itself, and direct travel from Switzerland is not affected.",
      source: "WHO / Indonesian immigration guidance",
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
      note: "Recommended for long-term travelers, visiting friends and relatives, those staying in poor hygienic conditions, or with individual risk factors — especially for travel to smaller cities and rural areas.",
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
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Rabies is endemic in dogs and macaques across much of Indonesia, with notable activity in Bali and West Timor; post-exposure care can be difficult to access on smaller islands.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending a month or more in rural rice-growing or pig-farming areas, or with uncertain rural itineraries. Not needed for typical urban or beach-resort stays.",
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
        "Risk varies dramatically by region. High transmission throughout Papua and West Papua, and across the eastern provinces (Maluku, North Maluku, East Nusa Tenggara). Risk is also present in rural Kalimantan, West Nusa Tenggara, Sulawesi, and Sumatra, with low transmission in some rural parts of Java. The main tourist areas — Jakarta, Bali resort areas, Ubud, and the Gili and Thousand Islands — are essentially no-risk. Chemoprophylaxis is recommended for travel to Papua and the eastern high-risk provinces.",
      keyFacts: [
        { label: "High risk", value: "Papua, West Papua, eastern provinces (Maluku, NTT)" },
        { label: "Some risk", value: "Rural Kalimantan, Sulawesi, Sumatra, NTB, parts of Java" },
        { label: "No risk", value: "Jakarta, Bali resorts, Ubud, Gili & Thousand Islands" },
        { label: "Species", value: "P. falciparum and P. vivax predominate" },
        { label: "Prevention", value: "Prophylaxis for Papua/eastern provinces; bite protection elsewhere" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/indonesia",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/indonesia.jpg",
      mapCaption: "Malaria risk areas in Indonesia (CDC).",
    },
    dengue: {
      riskSummary:
        "Endemic year-round throughout Indonesia, including Bali and all major tourist destinations, with peaks during and after the rainy season. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide, incl. Bali and all major islands" },
        { label: "Season", value: "Year-round; peaks in/after rainy season" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Transmission occurs with periodic outbreaks across Indonesia. The same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination considered in outbreak settings or for some longer stays (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Indonesia. A vaccination certificate is required only for travelers arriving from, or transiting through, a country with yellow fever transmission risk. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/indonesia",
    },
  },
};
