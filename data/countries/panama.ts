import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch) and CDC Yellow Book 2024 / CDC Travelers'
// Health. Framing reflects the Swiss BAG schedule. Notable: yellow fever
// vaccine IS recommended for mainland areas east of the Canal Zone (Darién,
// Guna Yala/Kuna Yala, eastern Panamá/Colón) but NOT for Panama City, the
// Canal Zone, or the western tourist areas; malaria is limited to specific
// provinces. AI-drafted, pending physician review.
export const panama: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Hepatitis B",
    "Rabies",
    "Yellow fever",
  ],
  malariaRisk: "limited",
  yellowFever: "required-or-recommended",
  foodWater:
    "Tap water is treated and generally safe in Panama City and major tourist areas, but in rural areas use bottled or filtered water and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid.",
  mosquito:
    "Year-round dengue, Zika, and chikungunya risk means daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential — including in Panama City. For travel to eastern provinces (Darién, Guna Yala) and other rural risk areas, also protect at dawn/dusk for malaria. Zika is particularly relevant for pregnant travelers or those planning pregnancy.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/panama",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever — recommended for areas east of the Canal Zone",
      message:
        "CDC recommends yellow fever vaccination for travelers visiting mainland areas east of the Canal Zone — including Darién, the Guna Yala (Kuna Yala) comarca, and eastern parts of Panamá and Colón provinces. It is NOT recommended for Panama City, the Canal Zone, areas west of the Canal, the Balboa district, or the San Blas / Pearl Islands. Discuss your specific itinerary with your travel medicine specialist.",
      source: "CDC Yellow Book 2024",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever entry rule — also if arriving from a risk country",
      message:
        "In addition to the regional recommendation above, Panama may require proof of yellow fever vaccination from travelers arriving from or transiting a country with risk of yellow fever transmission. Travelers arriving directly from Switzerland whose itinerary stays west of the Canal are not affected by the entry rule.",
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
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "specific",
      note: "Recommended for travel to mainland areas east of the Canal Zone (Darién, Guna Yala, eastern Panamá/Colón). Not needed for Panama City, the Canal, or western tourist areas. A single dose generally provides lifelong protection; must be given at a designated Swiss yellow fever vaccination centre at least 10 days before travel, which also issues the international certificate.",
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
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas such as Darién, infants and children, those working with animals, cavers — bats!).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is limited to specific provinces, mainly in the east. CDC recommends chemoprophylaxis for the eastern provinces and comarcas — including Darién, Emberá, and Guna Yala (Kuna Yala) — and for several others (Bocas del Toro, Chiriquí, Colón, Ngäbe-Buglé, Panamá Oeste, Veraguas). There is no malaria transmission in the Canal Zone or in Panama City. Transmission is overwhelmingly P. vivax (≈97%).",
      keyFacts: [
        { label: "Chemoprophylaxis", value: "Darién, Emberá, Guna Yala; also Bocas del Toro, Chiriquí, Colón, Ngäbe-Buglé, Panamá Oeste, Veraguas" },
        { label: "No risk", value: "Canal Zone, Panama City" },
        { label: "Species", value: "≈97% P. vivax, ≈3% P. falciparum" },
        { label: "Prevention", value: "Chemoprophylaxis for listed areas; mosquito protection elsewhere" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/panama",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/panama.jpg",
      mapCaption: "Malaria risk areas in Panama (CDC).",
    },
    dengue: {
      riskSummary:
        "Endemic year-round throughout Panama, including Panama City and Caribbean and Pacific coastal areas, with peaks during the rainy season (roughly May–November). Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide incl. Panama City and coasts" },
        { label: "Season", value: "Year-round; peaks May–November (rainy season)" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    zika: {
      riskSummary:
        "Zika circulates in Panama via the same daytime Aedes mosquito as dengue. Because Zika infection in pregnancy can cause severe birth defects, pregnant travelers are generally advised to avoid non-essential travel, and couples planning pregnancy should follow current EKRM/CDC waiting-period advice after travel.",
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
        "Yellow fever vaccination is recommended for mainland areas east of the Canal Zone (Darién, Guna Yala, eastern Panamá/Colón) but NOT for Panama City, the Canal Zone, or western tourist areas. A certificate may additionally be required when arriving from a country with risk of yellow fever transmission. See country alerts for the regional detail.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/panama",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/panama.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Panama (CDC).",
    },
  },
};
