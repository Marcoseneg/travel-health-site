import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Somalia) and Yellow Book 2024; WHO; EKRM /
// HealthyTravel (https://www.healthytravel.ch); Swiss FDFA travel advice.
// Framing reflects Swiss BAG schedule. Notable: ongoing armed conflict and
// insecurity; malaria in all areas; active cholera transmission; poliovirus
// circulation; YF not endemic.
export const somalia: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Yellow fever", "Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Strict food and water precautions are essential — active cholera transmission is documented. Drink only bottled or treated water, avoid ice and unpeeled produce, and eat thoroughly cooked food. Healthcare access is severely limited.",
  mosquito:
    "Mosquito-bite prevention (DEET or picaridin repellent, long sleeves, treated bed nets) is essential. Malaria is present year-round in all areas. Active armed conflict makes much of the country unsafe for travel; the Swiss FDFA advises against travel to Somalia.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/somalia",

  countryAlerts: [
    {
      level: "warning",
      title: "Armed conflict and insecurity — travel strongly discouraged",
      message:
        "Somalia is affected by ongoing armed conflict, terrorism and kidnapping. The Swiss Federal Department of Foreign Affairs (FDFA) advises against all travel. Medical infrastructure is minimal and evacuation may be impossible. Anyone who must travel should arrange comprehensive security and medical-evacuation support in advance.",
      source: "Swiss FDFA / EDA travel advice",
      sourceUrl: "https://www.eda.admin.ch",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Cholera — active transmission",
      message:
        "Active cholera transmission is documented in Somalia. Maintain strict food and water hygiene; the oral cholera vaccine may be considered for aid/health workers and those in higher-risk settings.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/somalia",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever — entry certificate may be required",
      message:
        "Somalia is not yellow-fever-endemic, but a vaccination certificate is required for travelers arriving from (or transiting through) a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      source: "WHO / Somali entry requirements",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, especially those staying with friends and relatives or in poor hygienic conditions.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (a single adult booster is advised — poliovirus has circulated), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "specific",
      note: "Not recommended by CDC for the listed regions and not endemic; relevant mainly for the entry certificate when arriving from a YF-risk country (see country alert).",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in Swiss childhood schedule since 1998 — younger travelers usually covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Recommended for long stays, rural travel, work with animals, and for infants and children. Post-exposure rabies vaccine is typically not readily available in-country.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "May be considered given active transmission, particularly for aid/health workers and those with limited access to safe food and water. Disease remains rare in ordinary travelers who maintain strict hygiene.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Malaria is present year-round in all areas of Somalia. P. falciparum strongly predominates (~90%) and is chloroquine-resistant. Chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine or tafenoquine) is recommended for all travelers, together with strict bite prevention.",
      keyFacts: [
        { label: "Risk area", value: "All areas, year-round" },
        { label: "Species", value: "P. falciparum ~90%, P. vivax 5–10%" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis for all travelers + bite protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/somalia",
    },
    yellowFever: {
      riskSummary:
        "Somalia is not yellow-fever-endemic, and CDC does not recommend the vaccine for the listed regions. A vaccination certificate is required for travelers arriving from a YF-risk country (see country alert). Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "CDC", value: "Not recommended (not endemic)" },
        { label: "Entry rule", value: "Cert required if arriving from YF-risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/somalia",
    },
    dengue: {
      riskSummary:
        "Dengue is transmitted by daytime-biting Aedes mosquitoes and occurs in Somalia. Daytime mosquito-bite prevention (repellent with ≥20% DEET, protective clothing) is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Present; urban and lowland areas" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
