import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024,
// WHO. Framing reflects Swiss BAG schedule. Notable: NO domestic yellow-fever
// risk, but a YF certificate may be required if arriving from an endemic
// country. Malaria high risk year-round, country-wide. Cholera transmission is
// widespread with periodic outbreaks. Schistosomiasis risk in freshwater.
export const mozambique: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "possible",
  foodWater:
    "Strict food and water precautions are essential — use bottled or treated water, avoid ice from unverified sources, and eat thoroughly cooked food served hot. This reduces the risk of traveler's diarrhea, hepatitis A, typhoid, and cholera. Cholera outbreaks occur periodically and transmission is widespread.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria is high risk year-round and country-wide. Use DEET or picaridin repellent, cover up at dusk and after dark, and sleep under an insecticide-treated net. Daytime protection also reduces dengue risk.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/mozambique",

  countryAlerts: [
    {
      level: "warning",
      title: "Widespread cholera transmission",
      message:
        "Cholera transmission is widespread in Mozambique, with periodic large outbreaks. The oral cholera vaccine may be considered for travelers to affected areas, those staying in conditions with poor sanitation, aid and healthcare workers, longer-stay travelers, or those with increased individual risk. Strict food and water hygiene is the primary protection for all travelers.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/mozambique",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever certificate only if arriving from a risk country",
      message:
        "Mozambique has no domestic yellow fever risk and the vaccine is not routinely recommended for travel from Switzerland. However, a YF vaccination certificate may be required if you are arriving from — or have recently transited — a country with yellow fever transmission risk. Direct travel from Switzerland is not affected.",
      source: "WHO / Mozambique entry requirements",
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
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, particularly those visiting rural areas, staying with friends and relatives, on longer trips, or in poor hygienic conditions.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles (MMR) protection is complete before departure.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in the Swiss childhood schedule since 1998 — younger travelers usually covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking and remote travel, small children, those working with animals, cavers — bats). Post-exposure care can be hard to obtain locally.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Consider for travelers to areas with active transmission (widespread in Mozambique), aid and healthcare workers, those staying in poor sanitary conditions, or with increased individual risk. No internal disease page — discuss with your travel clinic.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk year-round throughout the entire country, including Maputo, the coastal resorts, and the Bazaruto and Quirimbas archipelagos. P. falciparum (the most dangerous species) predominates and is chloroquine-resistant. Continuous chemoprophylaxis is recommended for essentially all travelers, in addition to strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk area", value: "Entire country, year-round, incl. coastal resorts" },
        { label: "Species", value: "P. falciparum predominant" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis (atovaquone-proguanil, doxycycline, or mefloquine) + bite protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/mozambique",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Mozambique, and the vaccine is not routinely recommended for travel from Switzerland. A YF certificate may be required only if you arrive from — or have recently transited — a country with yellow fever transmission risk (see country alert). Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Risk", value: "None — no domestic transmission" },
        { label: "Vaccine", value: "Not routinely recommended" },
        { label: "Entry rule", value: "Certificate only if arriving from a YF-risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/mozambique",
    },
    dengue: {
      riskSummary:
        "Dengue transmission occurs and is mosquito-borne. The Aedes mosquito bites during the daytime, so day-time bite prevention complements the dusk-to-dawn protection used for malaria.",
      keyFacts: [
        { label: "Distribution", value: "Sporadic transmission" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
        { label: "Prevention", value: "Repellent and covering up by day" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
