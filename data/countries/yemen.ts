import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Yemen), CDC Yellow Book 2024, WHO EMRO
// (cholera), EKRM/HealthyTravel (Swiss travel medicine authority). Framing
// reflects the Swiss BAG schedule. Notable: large ongoing cholera outbreak
// (Yemen carries one of the highest cholera burdens globally); widespread
// chloroquine-resistant P. falciparum malaria below 2,500 m; no yellow fever
// risk; ongoing conflict and severely limited healthcare — advice kept general
// and conservative. Yemen is an AI-generated draft pending physician review.
export const yemen: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Hepatitis B",
    "Typhoid",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Cholera",
    "Rabies",
  ],
  malariaRisk: "high",
  yellowFever: "none",
  foodWater:
    "Strict food and water precautions are essential given the large ongoing cholera outbreak: drink only bottled, boiled, or reliably treated water, avoid ice, and eat thoroughly cooked food. These measures also reduce the risk of traveler's diarrhea, hepatitis A, and typhoid. Healthcare access is severely limited by the ongoing conflict.",
  mosquito:
    "Rigorous mosquito protection is essential — Yemen has widespread malaria risk below 2,500 m as well as dengue, so use DEET or picaridin repellent, long sleeves, and an insecticide-treated bed net, and protect both during the day (dengue) and at dawn/dusk (malaria). Sand-fly bite precautions also reduce the risk of leishmaniasis.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/yemen",

  countryAlerts: [
    {
      level: "warning",
      title: "Ongoing cholera outbreak",
      message:
        "Yemen continues to report one of the highest cholera burdens in the world, sustained by conflict-damaged water and sanitation infrastructure. Strict safe food and water precautions are essential; cholera vaccination should be discussed with a travel clinic for travelers going to areas of active transmission, aid/relief workers, or longer stays.",
      source: "WHO EMRO / CDC",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Conflict and very limited healthcare",
      message:
        "Yemen is affected by ongoing armed conflict, with severely limited medical care and evacuation options. Most governments advise against all travel. This brief covers health risks only and does not constitute travel-security advice — consult the Swiss FDFA (EDA) travel advisories before any travel.",
      source: "EKRM / Swiss FDFA (EDA)",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all unvaccinated travelers aged 1 year or older. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "all",
      note: "Recommended given limited healthcare and the possibility of unscreened medical care. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually covered.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, especially those staying in rural areas or in conditions with poor water and sanitation.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles and polio protection are up to date (a polio booster may be advised).",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Vaccination may be considered for adults and children travelling to areas of active cholera transmission, aid/relief workers, and longer stays, given the large ongoing outbreak.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Consider pre-exposure vaccination for long stays or high individual risk, particularly where post-exposure treatment may be unavailable due to limited healthcare.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Widespread risk at all elevations below 2,500 m (8,200 ft), predominantly chloroquine-resistant Plasmodium falciparum. Chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine, or tafenoquine) is recommended for travel to risk areas, alongside strict mosquito-bite prevention. Higher-elevation areas above 2,500 m are no-risk.",
      keyFacts: [
        { label: "Risk area", value: "All elevations below 2,500 m" },
        { label: "Species", value: "Mainly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "No risk", value: "Above 2,500 m" },
        { label: "Prevention", value: "Chemoprophylaxis + bite prevention" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/yemen",
    },
    dengue: {
      riskSummary:
        "Dengue is transmitted by daytime-biting mosquitoes and occurs across the country. Daytime mosquito-bite prevention is the main protection and overlaps with malaria precautions.",
      keyFacts: [
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
        { label: "Prevention", value: "Repellent, long sleeves, bed net" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Yemen. Vaccination is not recommended for direct travel from Switzerland and is not an entry requirement.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/yemen",
    },
  },
};
