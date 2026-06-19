import type { CountryInfo } from "./types";

// ── Seychelles (Indian Ocean) — full brief ─────────────────────────────────
// Sources: CDC Travelers' Health (Seychelles destination page, 2026),
// WHO, EKRM/HealthyTravel (https://www.healthytravel.ch) — Swiss travel
// medicine authority. Framing reflects Swiss BAG schedule.
// Notable: Seychelles is malaria-free and has no yellow fever risk (YF
// certificate only required if arriving from a YF-endemic country).
// Dengue circulates, chikungunya outbreaks recur, and Zika has been reported —
// daytime mosquito-bite prevention is the main protection.
export const seychelles: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Hepatitis B", "Routine vaccines"],
  vaccinesConsider: ["Typhoid", "Rabies", "Chikungunya"],
  malariaRisk: "none",
  yellowFever: "possible",
  foodWater:
    "Tap water in the main tourist areas and hotels is generally safe. In more remote areas or if uncertain, prefer bottled or filtered water. Standard food hygiene reduces the risk of traveler's diarrhea, hepatitis A, and typhoid.",
  mosquito:
    "No malaria risk in Seychelles. Daytime mosquito-bite prevention (DEET or picaridin repellent, long sleeves) is the key measure because of dengue, recurring chikungunya outbreaks, and reported Zika activity — all spread by Aedes mosquitoes that bite during the day. Avoid swimming in fresh water (leptospirosis).",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/seychelles",

  countryAlerts: [
    {
      level: "warning",
      title: "Chikungunya outbreak",
      message:
        "Seychelles is experiencing a chikungunya outbreak (CDC Level 2 alert, 2026). Chikungunya causes fever and often debilitating joint pain that can persist for months. All travelers should practice strict daytime mosquito-bite prevention; vaccination may be discussed for travelers at higher risk (see EKRM statement).",
      source: "CDC Travel Health Notices",
      sourceUrl: "https://wwwnc.cdc.gov/travel/notices",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Zika — precautions for pregnancy",
      message:
        "Zika has been reported in the Seychelles. Because of the risk of birth defects, pregnant travelers should discuss their trip with a travel medicine specialist and use rigorous mosquito-bite prevention; couples planning pregnancy should follow current EKRM/BAG advice on post-travel precautions.",
      source: "EKRM / HealthyTravel",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever entry certificate",
      message:
        "Seychelles has no yellow fever risk, but a valid YF vaccination certificate is required for travelers aged 1 year and older arriving from (or having transited through) a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      source: "WHO / Seychelles entry requirements",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/seychelles",
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
      note: "CDC recommends hepatitis B for unvaccinated travelers of all ages. Routine in the Swiss BAG childhood schedule — younger travelers are usually already covered; older travelers can consider it per individual risk.",
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
      note: "Consider for long stays or higher individual risk (cycling/diving trips with land excursions, animal workers, young children). Overall risk is low and the islands are largely rabies-free, but care availability is limited.",
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
        "No malaria risk. Seychelles is considered malaria-free; no antimalarial prophylaxis is needed. Mosquito-bite prevention is still worthwhile because of dengue, chikungunya, and Zika.",
    },
    dengue: {
      riskSummary:
        "Dengue circulates in Seychelles with year-round transmission and seasonal peaks during the warm, rainy months. The Aedes mosquito vector bites during the day, so daytime bite prevention is the main protection for every traveler.",
      keyFacts: [
        { label: "Distribution", value: "Island-wide, incl. Mahé, Praslin, La Digue" },
        { label: "Season", value: "Year-round; warm/rainy peaks" },
        { label: "Vector", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya is a recurring threat in Seychelles, with an outbreak ongoing in 2026 (CDC Level 2). Same daytime Aedes vector as dengue, so the same bite-prevention measures apply. Joint pain can persist for months. Vaccination is considered in outbreak settings (see EKRM statement).",
      keyFacts: [
        { label: "Status", value: "Active outbreak (2026)" },
        { label: "Vector", value: "Aedes — bites during daytime" },
        { label: "Symptoms", value: "Fever + prolonged joint pain" },
      ],
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Seychelles. A YF vaccination certificate is required only for travelers aged ≥1 year arriving from, or having transited through, a YF-risk country. Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Risk in country", value: "None" },
        { label: "Entry rule", value: "Cert required if arriving from YF-risk country" },
        { label: "From Switzerland", value: "Not affected" },
      ],
    },
  },
};
