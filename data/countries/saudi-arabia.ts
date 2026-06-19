import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Saudi Arabia), CDC Yellow Book 2024, Saudi
// Ministry of Health Hajj/Umrah health requirements, EKRM/HealthyTravel (Swiss
// travel medicine authority). Framing reflects the Swiss BAG schedule. Notable:
// MANDATORY quadrivalent meningococcal (ACWY) vaccination for Hajj/Umrah
// pilgrims, plus polio (and sometimes seasonal) requirements; malaria limited
// to the southwest (Asir/Jazan near the Yemen border). Saudi Arabia is an
// AI-generated draft pending physician review.
export const saudiArabia: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Typhoid",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Rabies",
    "Meningococcal (ACWY)",
  ],
  malariaRisk: "limited",
  yellowFever: "none",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — particularly relevant for pilgrims in crowded conditions and those staying with relatives or in rural areas.",
  mosquito:
    "Daytime mosquito protection (DEET or picaridin repellent, long sleeves) is advisable, as dengue occurs particularly in the west (e.g. Jeddah, Mecca). In the southwestern malaria area near the Yemen border, also protect at dawn and dusk. Standard bite precautions also reduce the risk of leishmaniasis and tick-borne Crimean-Congo hemorrhagic fever.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/saudi-arabia",

  countryAlerts: [
    {
      level: "warning",
      title: "Hajj/Umrah: mandatory meningococcal (ACWY) vaccination",
      message:
        "All pilgrims travelling for Hajj or Umrah must present a valid certificate of quadrivalent meningococcal (ACWY) vaccination. The dose must be given at least 10 days before arrival and within the last 3–5 years (depending on the vaccine type). This is an entry requirement enforced for the pilgrim visa — plan vaccination timing with your travel clinic well in advance.",
      source: "Saudi Ministry of Health / CDC",
      sourceUrl:
        "https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/Hajj-Health-Requirements-English-language.pdf",
      date: "Hajj 2026 (1447H)",
    },
    {
      level: "info",
      title: "Hajj/Umrah: polio and other pilgrim requirements",
      message:
        "Pilgrims arriving from countries with ongoing poliovirus circulation must show proof of polio vaccination, and Saudi authorities may require additional vaccinations (e.g. seasonal influenza, COVID-19, or yellow fever for arrivals from risk countries) depending on the season and country of origin. Requirements are updated annually by the Saudi Ministry of Health — confirm the current rules before each pilgrimage season.",
      source: "Saudi Ministry of Health",
      sourceUrl:
        "https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/Hajj-Health-Requirements-English-language.pdf",
      date: "Updated annually",
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
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, especially those visiting friends and relatives or rural areas.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles protection is up to date.",
    },
    {
      name: "Meningococcal (ACWY)",
      audience: "specific",
      note: "MANDATORY entry requirement for Hajj and Umrah pilgrims: quadrivalent (ACWY) vaccine, given at least 10 days before arrival and within the last 3–5 years. Also worth considering for other travelers in close-contact or crowded settings (see EKRM guidance). No dedicated disease page — discuss with your travel clinic.",
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
      note: "Consider pre-exposure vaccination for long stays or activities that increase exposure to potentially rabid animals (remote-area travel, infants and children, those working with animals).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is limited to the southwest — the Asir and Jazan regions near the Yemen border. There is no malaria transmission in Jeddah, Mecca, Medina, Riyadh, or Ta'if, so standard Hajj/Umrah and business itineraries are no-risk. Chemoprophylaxis is recommended only for travel to the affected southwestern areas.",
      keyFacts: [
        { label: "Risk area", value: "Asir and Jazan (Yemen border)" },
        { label: "No risk", value: "Jeddah, Mecca, Medina, Riyadh, Ta'if" },
        { label: "Prevention", value: "Chemoprophylaxis for SW border areas only" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/saudi-arabia",
    },
    dengue: {
      riskSummary:
        "Dengue occurs, particularly in the west of the country (e.g. Jeddah and the Mecca region), with year-round transmission and seasonal peaks. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Mainly western Saudi Arabia (Jeddah, Mecca)" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Saudi Arabia. Vaccination is not recommended for direct travel from Switzerland. A YF certificate may be required for arrivals from countries with yellow fever risk — relevant for some pilgrims travelling via or from endemic regions.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/saudi-arabia",
    },
  },
};
