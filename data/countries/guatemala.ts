import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch) and CDC Yellow Book 2024 / CDC Travelers'
// Health. Framing reflects the Swiss BAG schedule. Notable: malaria is
// limited to specific rural lowland departments (almost all P. vivax), with
// Antigua, Guatemala City, and Lake Atitlán no-risk; dengue/Zika/chikungunya
// circulate year-round via daytime Aedes. AI-drafted, pending physician review.
export const guatemala: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Hepatitis B",
    "Rabies",
  ],
  malariaRisk: "limited",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — especially relevant when eating outside major hotels and in rural areas.",
  mosquito:
    "Year-round dengue, Zika, and chikungunya risk means daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential. For travel to rural lowland departments, also protect at dawn/dusk for malaria. Zika is particularly relevant for pregnant travelers or those planning pregnancy.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/guatemala",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry rule — only if arriving from a risk country",
      message:
        "Guatemala may require proof of yellow fever vaccination from travelers arriving from or transiting a country with risk of yellow fever transmission. There is no yellow fever risk within Guatemala itself, and travelers arriving directly from Switzerland are not affected. Confirm current requirements with your travel medicine specialist before departure.",
      source: "WHO / CDC Travelers' Health",
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
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure MMR is complete given rising measles activity globally.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-term travelers, those visiting friends and relatives, anyone staying in poor hygienic conditions or visiting smaller towns and rural areas, or with individual risk factors.",
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
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Stray dogs are common rabies vectors.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is limited to specific rural lowland departments — CDC recommends chemoprophylaxis for Alta Verapaz, Baja Verapaz, Escuintla, Izabal, and Petén (the department containing Tikal). The main highland tourist areas — Antigua, Guatemala City, and Lake Atitlán — are no-risk. Transmission is almost entirely P. vivax (≈99%).",
      keyFacts: [
        { label: "Risk areas", value: "Alta Verapaz, Baja Verapaz, Escuintla, Izabal, Petén" },
        { label: "No risk", value: "Antigua, Guatemala City, Lake Atitlán" },
        { label: "Species", value: "≈99% P. vivax" },
        { label: "Prevention", value: "Chemoprophylaxis for listed rural departments; mosquito protection elsewhere" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/guatemala",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/guatemala.jpg",
      mapCaption: "Malaria risk areas in Guatemala (CDC).",
    },
    dengue: {
      riskSummary:
        "Endemic year-round, with peaks during the rainy season (roughly May–November). Transmission is concentrated in lower-altitude areas; the highland cities are cooler and lower-risk but not zero. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Year-round, mainly lowlands" },
        { label: "Season", value: "Peaks May–November (rainy season)" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    zika: {
      riskSummary:
        "Zika circulates in Guatemala via the same daytime Aedes mosquito as dengue, mainly in lowland areas. Because Zika infection in pregnancy can cause severe birth defects, pregnant travelers are generally advised to avoid non-essential travel, and couples planning pregnancy should follow current EKRM/CDC waiting-period advice after travel.",
      keyFacts: [
        { label: "Vector", value: "Aedes aegypti — daytime biting" },
        { label: "Pregnancy", value: "Avoid non-essential travel if pregnant" },
        { label: "Prevention", value: "Strict daytime bite protection; safe-sex precautions" },
      ],
      cdcMapUrl: "https://www.cdc.gov/zika/geo/index.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya circulates via the same daytime Aedes mosquito as dengue, so dengue prevention also protects against chikungunya. Vaccination is generally not recommended for routine travel but may be considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Guatemala. A vaccination certificate may be required only if arriving from or transiting a country with risk of yellow fever transmission. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/guatemala",
    },
  },
};
