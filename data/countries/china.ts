import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024, WHO.
// Framing reflects Swiss BAG schedule. Notable: China was certified
// malaria-free by WHO in 2021 (no chemoprophylaxis recommended anywhere);
// residual vigilance only near the Yunnan/Southeast-Asia border due to imported
// cases. Japanese encephalitis is a risk in rural areas; dengue/chikungunya
// occur. China is a vast country, so risk is strongly region-specific.
export const china: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Typhoid",
    "Rabies",
    "Japanese encephalitis",
    "Tick-borne encephalitis",
  ],
  malariaRisk: "none",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — especially relevant when eating outside major hotels and in smaller cities or rural areas.",
  mosquito:
    "Dengue and chikungunya occur, mainly in southern and southeastern provinces and during the warmer months — daytime mosquito protection (DEET or picaridin repellent, long sleeves) is sensible there. For rural travel, particularly stays in rice-growing or pig-farming areas in summer and autumn, also protect at dawn/dusk against Japanese encephalitis.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/china",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry rule — certificate if arriving from a risk country",
      message:
        "China requires a yellow fever vaccination certificate from travelers arriving from a country with risk of yellow fever transmission. There is no yellow fever in China itself, and direct travel from Switzerland is not affected. Travelers routing through a yellow-fever-endemic country should carry their certificate.",
      source: "WHO / Chinese entry requirements",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Country is malaria-free since 2021",
      message:
        "China was certified malaria-free by WHO in 2021 after recording zero indigenous cases for several consecutive years. No malaria chemoprophylaxis is recommended for any part of the country. Imported cases still occur near the Yunnan/Southeast-Asia border, so general mosquito-bite protection remains worthwhile in those areas.",
      source: "WHO",
      sourceUrl: "https://www.who.int/news/item/30-06-2021-from-30-million-cases-to-zero-china-is-certified-malaria-free-by-who",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for essentially all travelers. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles protection in particular before travel.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually covered.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-term travelers, those visiting friends and relatives, those staying in poor hygienic conditions, and travel to smaller cities or rural areas.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Rabies in dogs is present in China; post-exposure care can be hard to access in rural areas.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending a month or more in rural areas, or shorter stays with significant rural/outdoor exposure during the transmission season (mainly summer and autumn in much of the country). Not needed for typical urban or short business itineraries.",
    },
    {
      name: "Tick-borne encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Risk in forested areas of north-eastern China (and parts of the north-west) for travelers with extensive outdoor exposure in spring/summer. The same TBE vaccine used in Switzerland applies; discuss with your travel clinic.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "China was certified malaria-free by WHO in 2021, and no malaria chemoprophylaxis is recommended for any part of the country. Imported cases continue to be detected near the Yunnan border with Laos, Myanmar, and Vietnam, so general mosquito-bite protection is still sensible there, but the risk to travelers is now very low nationwide.",
      keyFacts: [
        { label: "Status", value: "WHO-certified malaria-free since 2021" },
        { label: "Residual", value: "Imported cases near Yunnan/SE-Asia border" },
        { label: "Prophylaxis", value: "None recommended anywhere" },
        { label: "Prevention", value: "General mosquito protection near borders" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/china",
    },
    dengue: {
      riskSummary:
        "Dengue occurs in southern and southeastern China (including Guangdong, Yunnan, and Hainan) with seasonal outbreaks, mainly in the warmer months. Major northern cities such as Beijing are not transmission areas. Daytime mosquito-bite prevention is the main protection in affected regions.",
      keyFacts: [
        { label: "Distribution", value: "Southern/SE provinces (Guangdong, Yunnan, Hainan)" },
        { label: "Season", value: "Warmer months; outbreak years vary" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Sporadic transmission with occasional local outbreaks in southern China, sharing the same daytime Aedes mosquito vector as dengue. Dengue-style daytime bite prevention also protects against chikungunya. Vaccination is considered mainly in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in China. A vaccination certificate is required only for travelers arriving from a country with risk of yellow fever transmission. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/china",
    },
  },
};
