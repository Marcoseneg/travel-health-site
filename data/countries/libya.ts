import type { CountryInfo } from "./types";

// ── Libya (North Africa) — full brief ───────────────────────────────────────
// Sources: CDC Travelers' Health (Libya destination page, 2026), WHO,
// EKRM/HealthyTravel (https://www.healthytravel.ch) — Swiss travel medicine
// authority. Framing reflects Swiss BAG schedule.
// Notable: Libya has no ongoing malaria transmission and no yellow fever risk
// (YF certificate only if arriving from an endemic country). Main risks are
// food/water-borne illness, hepatitis A, and rabies (dogs). Healthcare
// infrastructure has been disrupted by years of conflict — see also the FDFA
// (EDA) travel advisory before any trip.
export const libya: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
  vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
  malariaRisk: "none",
  yellowFever: "possible",
  foodWater:
    "Use bottled or treated water and eat thoroughly cooked food. Avoid raw produce you haven't peeled yourself. Standard food-and-water precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid. Healthcare infrastructure has been disrupted by years of conflict, so reliable care may be hard to access.",
  mosquito:
    "Libya has no ongoing malaria transmission, and mosquito-borne disease risk is low. Light mosquito- and sand-fly-bite precautions are sensible during warm months — sand flies can transmit leishmaniasis in some areas.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/libya",

  countryAlerts: [
    {
      level: "warning",
      title: "Check the Swiss FDFA travel advisory",
      message:
        "Libya's security situation and healthcare access have been severely affected by years of conflict, and reliable medical care may be unavailable. Consult the Swiss Federal Department of Foreign Affairs (FDFA/EDA) travel advice and arrange comprehensive travel and medical-evacuation insurance before any trip.",
      source: "Swiss FDFA (EDA) / EKRM",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever entry certificate",
      message:
        "Libya has no yellow fever risk. A valid YF vaccination certificate is required for travelers aged ≥1 year arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      source: "WHO / Libya entry requirements",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/libya",
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
      name: "Routine vaccines",
      audience: "all",
      note: "Measles-Mumps-Rubella, Diphtheria-Tetanus-Pertussis, Polio, Varicella — per Swiss BAG schedule. Ensure both MMR doses are documented.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-term travelers, those visiting friends and relatives, traveling to rural areas, or staying in poorer hygienic conditions.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration (medical/dental care — relevant given disrupted infrastructure, new sexual contacts, tattoos/piercings). Routine in the Swiss childhood schedule — younger travelers are usually already covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Rabid dogs are commonly found in Libya and post-exposure care (including immunoglobulin) may be hard to access. Pre-exposure vaccination is recommended for long stays, higher individual risk, young children, and animal workers.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "No ongoing malaria risk. There is no current local malaria transmission in Libya; no antimalarial prophylaxis is needed.",
      keyFacts: [
        { label: "Status", value: "No ongoing transmission" },
        { label: "Prophylaxis", value: "Not needed" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/libya",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Libya. A YF vaccination certificate is required only for travelers aged ≥1 year arriving from a YF-risk country. Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Risk in country", value: "None" },
        { label: "Entry rule", value: "Cert required if arriving from YF-risk country" },
        { label: "From Switzerland", value: "Not affected" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/libya",
    },
  },
};
