import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Iraq), CDC Yellow Book 2024,
// EKRM/HealthyTravel (Swiss travel medicine authority). Framing reflects the
// Swiss BAG schedule. Notable: no current malaria transmission (CDC lists no
// malaria information); no yellow fever risk; ongoing instability — keep advice
// general and conservative. Iraq is an AI-generated draft pending physician review.
export const iraq: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Typhoid",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Rabies",
    "Cholera",
  ],
  malariaRisk: "none",
  yellowFever: "none",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard precautions reduce the risk of traveler's diarrhea, hepatitis A, typhoid, and cholera — particularly relevant when staying with relatives or in areas with limited sanitation.",
  mosquito:
    "Mosquito and sand-fly bite protection (DEET or picaridin repellent, long sleeves) is advisable, as dengue and leishmaniasis occur in parts of the country. Standard bite precautions also reduce the risk of tick-borne Crimean-Congo hemorrhagic fever during outdoor and rural exposure.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/iraq",

  countryAlerts: [],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all unvaccinated travelers aged 1 year or older. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, especially those visiting friends and relatives or smaller cities and rural areas.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles protection is up to date.",
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
      note: "Discuss pre-exposure vaccination for long stays or high individual risk (remote-area travel, infants and children, those working with animals). Rabid dogs are commonly found in Iraq.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "May be considered for travelers going to areas of active transmission, aid/relief workers, or those staying in conditions with poor water and sanitation.",
    },
  ],

  diseases: {
    dengue: {
      riskSummary:
        "Dengue is transmitted by mosquitoes in parts of the country. Risk for typical travelers is generally low, but daytime mosquito-bite prevention is the main protection where present.",
      keyFacts: [
        { label: "Mosquito", value: "Aedes — bites during daytime" },
        { label: "Prevention", value: "Repellent, long sleeves" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Iraq. Vaccination is not recommended for direct travel from Switzerland and is not an entry requirement for direct travelers (only required when arriving from a country with yellow fever risk).",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/iraq",
    },
  },
};
