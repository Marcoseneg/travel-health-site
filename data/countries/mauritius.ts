import type { CountryInfo } from "./types";

// ── Mauritius (Indian Ocean) — full brief ──────────────────────────────────
// Sources: CDC Travelers' Health (Mauritius destination page, 2026),
// WHO, EKRM/HealthyTravel (https://www.healthytravel.ch) — Swiss travel
// medicine authority. Framing reflects Swiss BAG schedule.
// Notable: Mauritius is malaria-free and has no yellow fever risk (a YF
// certificate is only required if arriving from a YF-endemic country).
// Dengue circulates and chikungunya outbreaks recur — daytime mosquito-bite
// prevention is the main protection for a beach itinerary.
export const mauritius: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Hepatitis B", "Routine vaccines"],
  vaccinesConsider: ["Typhoid", "Rabies", "Chikungunya"],
  malariaRisk: "none",
  yellowFever: "possible",
  foodWater:
    "Tap water in the main tourist areas and hotels is generally safe. In rural areas or if uncertain, prefer bottled or filtered water. Standard food hygiene reduces the risk of traveler's diarrhea, hepatitis A, and typhoid — particularly when eating outside major hotels and resorts.",
  mosquito:
    "No malaria risk in Mauritius. Daytime mosquito-bite prevention (DEET or picaridin repellent, long sleeves) is the key measure because of year-round dengue activity and recurring chikungunya outbreaks — both spread by Aedes mosquitoes that bite during the day. Avoid swimming in fresh water (schistosomiasis, leptospirosis).",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/mauritius",

  countryAlerts: [
    {
      level: "warning",
      title: "Chikungunya outbreak",
      message:
        "Mauritius is experiencing a chikungunya outbreak (CDC Level 2 alert, 2026). Chikungunya causes fever and often debilitating joint pain that can persist for months. All travelers should practice strict daytime mosquito-bite prevention; vaccination may be discussed for travelers at higher risk (see EKRM statement).",
      source: "CDC Travel Health Notices",
      sourceUrl: "https://wwwnc.cdc.gov/travel/notices",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever entry certificate",
      message:
        "Mauritius has no yellow fever risk, but a valid YF vaccination certificate is required for travelers aged 1 year and older arriving from (or having transited >12 hours through) a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      source: "WHO / Mauritius entry requirements",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/mauritius",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers aged 1 year and older. Note for Swiss travelers: hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "all",
      note: "CDC recommends hepatitis B for unvaccinated travelers of all ages. Routine in the Swiss BAG childhood schedule — younger travelers are usually already covered; older travelers can consider it per individual risk and stay duration.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Measles-Mumps-Rubella, Diphtheria-Tetanus-Pertussis, Polio, Varicella — per Swiss BAG schedule. Ensure both MMR doses are documented.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-term travelers, those visiting friends and relatives, staying in rural areas or poor hygienic conditions, or with individual risk factors.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Consider for long stays or higher individual risk (cycling/motorbike trips, hiking in remote areas, infants and children, animal workers). Risk on Mauritius is low but post-exposure care may require travel to a larger facility.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "Vaccination indicated during chikungunya outbreaks — an outbreak is currently ongoing (2026). May be considered for travelers at higher risk for severe disease (see EKRM statement).",
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
        "No malaria risk. Mauritius is considered malaria-free; no antimalarial prophylaxis is needed. Mosquito-bite prevention is still worthwhile because of dengue and chikungunya.",
    },
    dengue: {
      riskSummary:
        "Dengue circulates in Mauritius with year-round transmission and seasonal peaks during the warm, rainy summer months (roughly November–May). The Aedes mosquito vector bites during the day, so daytime bite prevention is the main protection for every traveler.",
      keyFacts: [
        { label: "Distribution", value: "Island-wide, incl. coastal resort areas" },
        { label: "Season", value: "Year-round; peaks Nov–May (warm/rainy)" },
        { label: "Vector", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya is a recurring threat in Mauritius, with a significant outbreak ongoing in 2026 (CDC Level 2). Same daytime Aedes vector as dengue, so the same bite-prevention measures apply. Joint pain can persist for months after the acute illness. Vaccination is considered in outbreak settings (see EKRM statement).",
      keyFacts: [
        { label: "Status", value: "Active outbreak (2026)" },
        { label: "Vector", value: "Aedes — bites during daytime" },
        { label: "Symptoms", value: "Fever + prolonged joint pain" },
      ],
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Mauritius. A YF vaccination certificate is required only for travelers aged ≥1 year arriving from, or having transited >12 hours through, a YF-risk country. Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Risk in country", value: "None" },
        { label: "Entry rule", value: "Cert required if arriving from YF-risk country" },
        { label: "From Switzerland", value: "Not affected" },
      ],
    },
  },
};
