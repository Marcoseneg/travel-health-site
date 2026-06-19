import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch) and CDC Yellow Book 2024 / CDC Travelers'
// Health. Framing reflects the Swiss BAG schedule. Notable: malaria is low
// and limited to parts of Alajuela and Limón provinces; dengue is strong and
// year-round, with Zika/chikungunya via the same daytime Aedes mosquito.
// AI-drafted, pending physician review.
export const costaRica: CountryInfo = {
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
    "Tap water is treated and generally safe in San José and major tourist areas, but in rural areas use bottled or filtered water and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid.",
  mosquito:
    "Year-round dengue risk — including in tourist areas on both the Pacific and Caribbean coasts — means daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential. The same Aedes mosquito transmits Zika and chikungunya and bites by day. Zika is particularly relevant for pregnant travelers or those planning pregnancy.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/costa-rica",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry rule — only if arriving from a risk country",
      message:
        "Costa Rica requires proof of yellow fever vaccination from travelers (aged 9 months and older) arriving from or having recently stayed in a country with risk of yellow fever transmission in Africa or South America. There is no yellow fever risk within Costa Rica itself, and travelers arriving directly from Switzerland are not affected. Confirm current requirements with your travel medicine specialist before departure.",
      source: "Costa Rica Ministry of Health / WHO",
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
      note: "Recommended for long-term travelers, those visiting friends and relatives, anyone staying in poor hygienic conditions or visiting rural areas, or with individual risk factors.",
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
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking and wildlife exposure in remote areas, infants and children, those working with animals, cavers — bats!).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Overall risk is low and limited. CDC notes residual transmission mainly in parts of Alajuela and Limón provinces, where chemoprophylaxis may be discussed. The major tourist destinations — San José, the Central Valley, and the main Pacific and Caribbean beach resorts — are low- or no-risk and require mosquito protection only. Predominantly P. falciparum and P. vivax.",
      keyFacts: [
        { label: "Limited risk", value: "Parts of Alajuela and Limón provinces" },
        { label: "Low/no risk", value: "San José, Central Valley, main beach resorts" },
        { label: "Species", value: "P. falciparum, P. vivax" },
        { label: "Prevention", value: "Mosquito protection; chemoprophylaxis only for specific rural areas" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/costa-rica",
    },
    dengue: {
      riskSummary:
        "Endemic year-round throughout Costa Rica, including popular destinations on both the Pacific and Caribbean coasts, with peaks during the rainy season (roughly May–November). Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide, both coasts and lowlands" },
        { label: "Season", value: "Year-round; peaks May–November (rainy season)" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    zika: {
      riskSummary:
        "Zika circulates in Costa Rica via the same daytime Aedes mosquito as dengue. Because Zika infection in pregnancy can cause severe birth defects, pregnant travelers are generally advised to avoid non-essential travel, and couples planning pregnancy should follow current EKRM/CDC waiting-period advice after travel.",
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
        "No yellow fever risk in Costa Rica. A vaccination certificate is required only for travelers arriving from or having recently stayed in a country with risk of yellow fever transmission. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/costa-rica",
    },
  },
};
