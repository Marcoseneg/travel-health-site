import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch) and CDC Yellow Book 2024 / CDC Travelers'
// Health. Framing reflects the Swiss BAG schedule. Notable: Belize was
// certified malaria-free by WHO in 2023, so residual malaria risk for
// travelers is negligible; dengue/Zika/chikungunya circulate year-round
// via daytime Aedes mosquitoes. AI-drafted, pending physician review.
export const belize: CountryInfo = {
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
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — especially relevant when eating outside major hotels and resorts. Avoid swimming in or swallowing fresh water (leptospirosis risk).",
  mosquito:
    "Year-round dengue, Zika, and chikungunya risk means daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential — including on the cayes and in San Pedro/Ambergris Caye. The same Aedes mosquito bites by day, so protection is needed beyond dawn and dusk. Zika is particularly relevant for pregnant travelers or those planning pregnancy.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/belize",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry rule — only if arriving from a risk country",
      message:
        "Belize may require proof of yellow fever vaccination from travelers arriving from (or transiting) a country with risk of yellow fever transmission. There is no yellow fever risk within Belize itself, and travelers arriving directly from Switzerland are not affected. Confirm current requirements with your travel medicine specialist before departure.",
      source: "WHO / CDC Travelers' Health",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Malaria-free certification",
      message:
        "Belize was certified malaria-free by the WHO in 2023. Routine malaria chemoprophylaxis is generally no longer indicated for tourist travel; mosquito-bite protection remains the priority for dengue and other arboviruses. Discuss any rural or long-term itineraries with your travel medicine specialist.",
      source: "WHO",
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
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Post-exposure care may be hard to obtain in remote areas.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Belize was certified malaria-free by the WHO in 2023, so risk to travelers is now negligible. Historically transmission was confined to inland rural districts (Cayo, Stann Creek, Toledo), with Belize City, San Pedro/Ambergris Caye, and the cayes considered no-risk. Routine chemoprophylaxis is generally not indicated; mosquito-bite protection remains worthwhile.",
      keyFacts: [
        { label: "Status", value: "WHO-certified malaria-free (2023)" },
        { label: "Historic risk", value: "Inland rural districts (Cayo, Stann Creek, Toledo)" },
        { label: "No risk", value: "Belize City, San Pedro/Ambergris Caye, the cayes" },
        { label: "Prevention", value: "Mosquito protection; chemoprophylaxis generally not indicated" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/belize",
    },
    dengue: {
      riskSummary:
        "Endemic year-round throughout Belize, including coastal resort areas and the cayes, with peaks during the rainy season (roughly June–November). Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide incl. coast and cayes" },
        { label: "Season", value: "Year-round; peaks in rainy season (Jun–Nov)" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    zika: {
      riskSummary:
        "Zika circulates in Belize via the same daytime Aedes mosquito as dengue. Because Zika infection in pregnancy can cause severe birth defects, pregnant travelers are generally advised to avoid non-essential travel, and couples planning pregnancy should follow current EKRM/CDC waiting-period advice after travel.",
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
        "No yellow fever risk in Belize. A vaccination certificate may be required only if arriving from or transiting a country with risk of yellow fever transmission. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/belize",
    },
  },
};
