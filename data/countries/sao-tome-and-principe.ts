import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (https://www.healthytravel.ch — Swiss travel
// medicine authority), CDC Travelers' Health & Yellow Book 2024, WHO. Framing
// reflects Swiss BAG schedule. Notable: island nation that has pursued malaria
// elimination but still has P. falciparum transmission country-wide
// (chloroquine-resistant); NO domestic yellow fever risk — vaccine generally
// not recommended, but a certificate is required if arriving from a
// YF-endemic country. AI-drafted — pending physician review.
//
// NOTE: the previous lean version set yellowFever to "required-or-recommended";
// corrected to "possible" — there is no domestic YF risk, only an entry-
// certificate requirement when arriving from an endemic country.
export const saoTomeAndPrincipe: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Yellow fever", "Hepatitis B", "Rabies"],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Use bottled or reliably treated water, avoid ice and raw produce, and eat thoroughly cooked food. These measures reduce traveler's diarrhea, hepatitis A, and typhoid.",
  mosquito:
    "Mosquito-bite prevention is essential. Malaria risk has declined significantly thanks to sustained control efforts but remains present country-wide. Use DEET or picaridin repellent, cover up at dawn and dusk, and sleep under an insecticide-treated net.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/sao-tome-and-principe",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever — entry certificate if arriving from a risk country",
      message:
        "There is no yellow fever risk in São Tomé & Príncipe, and the vaccine is generally not recommended for direct travel from Switzerland. However, a valid certificate is required for travelers aged 9 months and older arriving from (or transiting through) a yellow-fever-risk country — relevant if your itinerary includes mainland Central or West Africa.",
      source: "CDC / WHO",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/sao-tome-and-principe",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to the region. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, especially those visiting rural areas or staying with friends and relatives.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles protection is up to date.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "specific",
      note: "Not generally recommended for direct travel from Switzerland (no domestic risk), but a certificate is required if arriving from a yellow-fever-risk country. Single dose gives lifelong protection. See country alert.",
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
      note: "Consider for longer stays, remote travel, work with animals, and for children. Rabid dogs are present and post-exposure care may be limited outside urban facilities.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Present country-wide, year-round, though risk has fallen substantially after sustained elimination efforts. The predominant parasite is P. falciparum (with occasional P. malariae, P. ovale and P. vivax), and chloroquine resistance is documented. Discuss chemoprophylaxis versus standby treatment with your travel medicine specialist based on itinerary and current transmission levels.",
      keyFacts: [
        { label: "Risk", value: "Present country-wide, reduced but year-round" },
        { label: "Parasite", value: "Mainly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Bite protection; prophylaxis or standby treatment per advice" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/sao-tome-and-principe",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. The vaccine is generally not recommended for direct travel from Switzerland, but a valid certificate is required for travelers ≥9 months arriving from a yellow-fever-risk country. See country alert.",
      keyFacts: [
        { label: "Risk", value: "None in country" },
        { label: "Entry rule", value: "Certificate if arriving from risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/sao-tome-and-principe",
    },
  },
};
