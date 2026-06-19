import type { CountryInfo } from "./types";

// ── Réunion (Indian Ocean, French overseas department) — full brief ─────────
// Sources: CDC Travelers' Health (Réunion destination page, 2026), WHO,
// EKRM/HealthyTravel (https://www.healthytravel.ch) — Swiss travel medicine
// authority. Framing reflects Swiss BAG schedule.
// Notable: Réunion has no malaria and no yellow fever risk (YF certificate
// only required if arriving from a YF-endemic country). It is best known for
// major chikungunya epidemics (the 2005–2006 outbreak affected roughly a
// third of the population) and recurring dengue — daytime mosquito-bite
// prevention is essential. As a French department, healthcare is excellent.
export const reunion: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Hepatitis B", "Routine vaccines"],
  vaccinesConsider: ["Typhoid", "Rabies", "Chikungunya"],
  malariaRisk: "none",
  yellowFever: "possible",
  foodWater:
    "As a French overseas department, Réunion has good sanitation and tap water in built-up areas is generally safe. Standard food hygiene still reduces the risk of traveler's diarrhea and hepatitis A. Excellent French-standard healthcare is available.",
  mosquito:
    "No malaria risk on Réunion. Daytime mosquito-bite prevention (DEET or picaridin repellent, long sleeves) is essential because of recurring chikungunya epidemics and year-round dengue — both spread by Aedes mosquitoes that bite during the day. Avoid swimming in fresh water (leptospirosis).",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/reunion",

  countryAlerts: [
    {
      level: "warning",
      title: "Chikungunya — epidemic-prone island",
      message:
        "Réunion has a history of large chikungunya epidemics (the 2005–2006 epidemic affected about a third of the population, and renewed activity has occurred in recent years). Chikungunya causes fever and often debilitating joint pain that can last for months. Practice strict daytime mosquito-bite prevention; vaccination may be discussed for travelers at higher risk (see EKRM statement).",
      source: "Santé publique France / CDC",
      sourceUrl: "https://wwwnc.cdc.gov/travel/notices",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever entry certificate",
      message:
        "Réunion has no yellow fever risk. As a French territory, a YF vaccination certificate may be required for travelers aged ≥1 year arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      source: "WHO / French entry requirements",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/reunion",
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
      note: "Recommended mainly for those visiting friends and relatives, staying in poorer hygienic conditions, or with individual risk factors. Less essential for standard tourist stays given the island's good sanitation.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Réunion is considered rabies-free; pre-exposure vaccination is generally not needed for a trip limited to the island. Consider it for itineraries combining Réunion with higher-risk destinations.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "Réunion is one of the prime examples of chikungunya risk. Vaccination is indicated during outbreaks and may be considered for travelers at higher risk for severe disease (see EKRM statement).",
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
        "No malaria risk. Réunion has no local malaria transmission; no antimalarial prophylaxis is needed. Mosquito-bite prevention is still essential because of chikungunya and dengue.",
    },
    dengue: {
      riskSummary:
        "Dengue circulates on Réunion with recurring seasonal outbreaks, especially during the warm, rainy southern-hemisphere summer (roughly January–May). The Aedes mosquito vector bites during the day, so daytime bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Island-wide, incl. coastal towns" },
        { label: "Season", value: "Peaks Jan–May (warm/rainy summer)" },
        { label: "Vector", value: "Aedes albopictus — daytime biter" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Réunion is historically associated with massive chikungunya epidemics — the 2005–2006 outbreak infected roughly a third of the island's population, with renewed activity in recent years. Same daytime Aedes vector as dengue. Joint pain can persist for months. Vaccination is considered in outbreak settings and for higher-risk travelers (see EKRM statement).",
      keyFacts: [
        { label: "History", value: "Major 2005–2006 epidemic; recurring activity" },
        { label: "Vector", value: "Aedes albopictus — daytime biter" },
        { label: "Symptoms", value: "Fever + prolonged joint pain" },
      ],
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk on Réunion. A YF vaccination certificate may be required for travelers aged ≥1 year arriving from a YF-risk country. Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Risk in country", value: "None" },
        { label: "Entry rule", value: "Cert may be required if arriving from YF-risk country" },
        { label: "From Switzerland", value: "Not affected" },
      ],
    },
  },
};
