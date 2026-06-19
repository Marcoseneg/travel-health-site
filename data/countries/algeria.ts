import type { CountryInfo } from "./types";

// ── Algeria (North Africa) — full brief ─────────────────────────────────────
// Sources: CDC Travelers' Health (Algeria destination page, 2026), WHO,
// EKRM/HealthyTravel (https://www.healthytravel.ch) — Swiss travel medicine
// authority. Framing reflects Swiss BAG schedule.
// Notable: Algeria was WHO-certified malaria-free in 2019; no yellow fever
// risk (YF certificate only if arriving from an endemic country). Main risks
// are food/water-borne illness, hepatitis A, rabies (dogs), and routine
// vaccine-preventable disease. Polio booster is emphasized owing to past
// poliovirus detection in the region.
export const algeria: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Routine vaccines (MMR, Tdap, polio)"],
  vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
  malariaRisk: "none",
  yellowFever: "possible",
  foodWater:
    "Tap water quality varies. Outside major hotels, prefer bottled or treated water and avoid raw produce you haven't peeled yourself. The risk of traveler's diarrhea is moderate; standard food-and-water precautions also reduce the risk of hepatitis A and typhoid.",
  mosquito:
    "Algeria is malaria-free, and mosquito-borne disease risk is low. Light mosquito- and sand-fly-bite precautions are still sensible during warm months — sand flies can transmit leishmaniasis in some areas.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/algeria",

  countryAlerts: [
    {
      level: "info",
      title: "Polio — booster recommended",
      message:
        "Poliovirus has been detected in the wider region in recent years. Travelers should ensure their polio immunization is complete, with at least one adult IPV booster, per Swiss BAG and WHO guidance.",
      source: "WHO / CDC",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/algeria",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever entry certificate",
      message:
        "Algeria has no yellow fever risk. A valid YF vaccination certificate is required for travelers aged ≥1 year arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      source: "WHO / Algeria entry requirements",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/algeria",
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
      note: "Measles-Mumps-Rubella, Diphtheria-Tetanus-Pertussis, Polio, Varicella — per Swiss BAG schedule. A polio booster is particularly emphasized for Algeria (see alert). Ensure both MMR doses are documented.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-term travelers, those visiting friends and relatives, traveling to rural or southern desert areas, or staying in poorer hygienic conditions.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration (medical/dental care, new sexual contacts, tattoos/piercings, stays >4 weeks). Routine in the Swiss childhood schedule — younger travelers are usually already covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Rabid dogs are commonly found in Algeria. Pre-exposure vaccination is recommended for long stays, higher individual risk (cycling/motorbike trips, hiking, young children, animal workers) or where prompt post-exposure care and immunoglobulin may be hard to access.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "No malaria risk. Algeria was certified malaria-free by the WHO in 2019; no antimalarial prophylaxis is needed.",
      keyFacts: [
        { label: "Status", value: "WHO-certified malaria-free (2019)" },
        { label: "Prophylaxis", value: "Not needed" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/algeria",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Algeria. A YF vaccination certificate is required only for travelers aged ≥1 year arriving from a YF-risk country. Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Risk in country", value: "None" },
        { label: "Entry rule", value: "Cert required if arriving from YF-risk country" },
        { label: "From Switzerland", value: "Not affected" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/algeria",
    },
  },
};
