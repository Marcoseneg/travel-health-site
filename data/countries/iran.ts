import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Iran), CDC Yellow Book 2024,
// EKRM/HealthyTravel (Swiss travel medicine authority). Framing reflects the
// Swiss BAG schedule. Notable: malaria is limited and seasonal, with the only
// area warranting chemoprophylaxis being Sistan-Baluchestan (Pakistan border);
// no yellow fever risk. Iran is an AI-generated draft pending physician review.
export const iran: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Typhoid",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Rabies",
  ],
  malariaRisk: "limited",
  yellowFever: "none",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — particularly relevant when staying with relatives or eating outside major hotels.",
  mosquito:
    "Daytime mosquito protection (DEET or picaridin repellent, long sleeves) is advisable as dengue and leishmaniasis (sand flies) occur in parts of the country. In the southeastern malaria area, also protect at dawn and dusk. Standard bite precautions also reduce the risk of tick-borne Crimean-Congo hemorrhagic fever during outdoor and rural exposure.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/iran",

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
      note: "Recommended for most travelers, especially those visiting friends and relatives, staying in rural areas, or in poorer hygienic conditions.",
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
      note: "Particularly recommended for long stays, high individual risk regardless of duration (cycling/motorbike trips, hiking or work in remote areas, infants and children, those working with animals). Rabid dogs are commonly found in Iran.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is limited and confined to the south and southeast. The only area where chemoprophylaxis is advised is Sistan-Baluchestan province on the Pakistan border. Historically there was low seasonal risk (roughly March–November) in rural parts of Fars, southern Hormozgan, and Kerman, where mosquito-bite prevention alone is sufficient. Tehran, Isfahan, Shiraz, and other main cities are no-risk. Predominantly Plasmodium vivax.",
      keyFacts: [
        { label: "Chemoprophylaxis", value: "Sistan-Baluchestan (Pakistan border)" },
        { label: "Low/seasonal", value: "Rural Fars, S. Hormozgan, Kerman — bite prevention only" },
        { label: "No risk", value: "Tehran, Isfahan, Shiraz, main cities" },
        { label: "Species", value: "Mainly P. vivax" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/iran",
    },
    dengue: {
      riskSummary:
        "Sporadic dengue risk reported, mainly in the south. Risk for typical travelers is low, but daytime mosquito-bite prevention is the main protection where present.",
      keyFacts: [
        { label: "Distribution", value: "Mainly southern areas" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Iran. Vaccination is not recommended for direct travel from Switzerland and is not an entry requirement for direct travelers.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/iran",
    },
  },
};
