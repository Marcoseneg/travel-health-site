import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024,
// WHO. Framing reflects Swiss BAG schedule. Notable: NO domestic yellow-fever
// risk, but a YF certificate may be required if arriving from an endemic
// country. Malaria high risk year-round, country-wide. Schistosomiasis is a
// well-known risk in Lake Malawi — a common travel exposure.
export const malawi: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "possible",
  foodWater:
    "Use bottled or treated water, avoid ice from unverified sources, and eat thoroughly cooked food served hot. Strict food and water precautions reduce the risk of traveler's diarrhea, hepatitis A, typhoid, and cholera — particularly important outside well-run lodges.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria is high risk year-round and country-wide. Use DEET or picaridin repellent, cover up at dusk and after dark, and sleep under an insecticide-treated net.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/malawi",

  countryAlerts: [
    {
      level: "warning",
      title: "Schistosomiasis (bilharzia) in Lake Malawi",
      message:
        "Lake Malawi is a well-documented source of schistosomiasis (bilharzia), and infections among travelers — including those who only briefly swam, paddled, or did water sports — are common. There is no vaccine and no reliable way to tell if water is safe. Avoid swimming, wading, and other contact with the lake's freshwater. Travelers with possible exposure should discuss screening and treatment (praziquantel) with their doctor on return.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/malawi",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever certificate only if arriving from a risk country",
      message:
        "Malawi has no domestic yellow fever risk and the vaccine is not routinely recommended for travel from Switzerland. However, a YF vaccination certificate may be required if you are arriving from — or have recently transited (typically a layover over 12 hours) — a country with yellow fever transmission risk. Direct travel from Switzerland is not affected.",
      source: "WHO / Malawi entry requirements",
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
      note: "Consider for travelers to areas with active transmission, aid and healthcare workers, those staying in poor sanitary conditions, or with increased individual risk. No internal disease page — discuss with your travel clinic.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk year-round throughout the entire country, including the lakeshore and safari areas. P. falciparum (the most dangerous species) predominates and is chloroquine-resistant. Continuous chemoprophylaxis is recommended for essentially all travelers, in addition to strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk area", value: "Entire country, year-round" },
        { label: "Species", value: "P. falciparum predominant" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis (atovaquone-proguanil, doxycycline, or mefloquine) + bite protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/malawi",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Malawi, and the vaccine is not routinely recommended for travel from Switzerland. A YF certificate may be required only if you arrive from — or have recently transited — a country with yellow fever transmission risk (see country alert). Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Risk", value: "None — no domestic transmission" },
        { label: "Vaccine", value: "Not routinely recommended" },
        { label: "Entry rule", value: "Certificate only if arriving from a YF-risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/malawi",
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
