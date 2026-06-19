import type { CountryInfo } from "./types";

// ── Guyana (South America) — full brief ─────────────────────────────────────
// Sources: CDC Travelers' Health (Guyana) & CDC Yellow Book 2024;
// EKRM/HealthyTravel (https://www.healthytravel.ch); WHO International Travel
// and Health. Framing reflects the Swiss BAG schedule and Swiss travel
// medicine practice.
//
// Notable points captured:
//   • Yellow fever recommended for all travellers ≥9 months; Guyana lies
//     wholly within the YF-endemic zone. Certificate required when arriving
//     from a YF-risk country.
//   • Malaria risk in the whole country EXCEPT Georgetown and New Amsterdam;
//     the forested interior is the high-risk zone. P. falciparum is a large
//     share (~40%) — clinically important for prophylaxis choice.
//   • Strong dengue/Zika; same tropical food-and-water cautions.
export const guyana: CountryInfo = {
  vaccinesRecommended: [
    "Yellow fever",
    "Hepatitis A",
    "Routine vaccines (MMR, Tdap, varicella, polio, COVID-19)",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Typhoid",
    "Rabies",
    "Dengue (selective)",
  ],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Standard tropical food and water precautions throughout. Use bottled or filtered water for drinking and brushing teeth, especially outside Georgetown and in the interior. These precautions reduce traveler's diarrhea, hepatitis A, and typhoid risk.",
  mosquito:
    "Strict mosquito-bite prevention is essential. Guyana has year-round dengue and Zika plus malaria across most of the country. Daytime-biting Aedes mosquitoes (dengue, Zika) require day protection; Anopheles (malaria) bite from dusk into the night. Use DEET 30%+ or picaridin 20%, long sleeves at peak biting times, and screened or air-conditioned rooms. Permethrin-treated clothing is strongly advised for any trip into the forested interior.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/guyana",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever — recommended countrywide; certificate on entry",
      message:
        "Guyana lies within the yellow-fever-endemic zone and CDC recommends vaccination for all travellers age 9 months and older. A vaccination certificate is required for travellers arriving from a country with risk of YF transmission. Travellers arriving directly from Switzerland are not subject to the entry requirement but should still be vaccinated for protection. Allow ≥10 days between vaccination and travel.",
      source: "Guyana health authorities / WHO IHR",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/guyana",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Malaria in the interior — falciparum significant",
      message:
        "Malaria occurs throughout Guyana except the cities of Georgetown and New Amsterdam, and the forested interior carries substantial risk. Roughly 40% of cases are P. falciparum, the potentially severe form, so chemoprophylaxis is recommended for travel into risk areas. Discuss a regimen and timing with your travel medicine specialist before departure.",
      source: "CDC Travelers' Health",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/guyana",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Recommended for all travelers age 9 months and older to Guyana, which lies within the endemic zone. A single dose gives lifelong protection. Must be given ≥10 days before travel at an authorised Swiss YF centre. Live vaccine: contraindicated in immunosuppression and pregnancy; caution in adults >60 starting a primary series. Carry the certificate — it is required when arriving from a YF-risk country.",
    },
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Guyana. Not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination. Two doses 6–12 months apart give long-term protection; a single dose covers the trip.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, polio, COVID-19 — per Swiss BAG schedule. Both MMR doses are essential. Adults with a completed polio primary series should have had at least one IPV booster as adults.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider for travelers who may receive medical or dental care, get tattoos or piercings, have new sexual contacts, or stay longer. Part of the routine Swiss childhood schedule since 2019 — most younger travelers are already protected.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for most travelers, especially those visiting friends and relatives, smaller towns, or rural and interior areas, and those with reduced gastric acidity.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Pre-exposure recommended for long stays, cyclists, motorcyclists, hikers in remote areas, young children, animal workers, and cavers (bat exposure). Pre-exposure simplifies post-bite management — only 2 vaccine doses needed afterwards and no immunoglobulin.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga is recommended only for travelers with a documented prior dengue infection who will be exposed in a high-transmission region. Not for first-time visitors — primary infection after vaccination can be more severe.",
    },
  ],

  diseases: {
    yellowFever: {
      riskSummary:
        "Guyana lies entirely within the yellow-fever-endemic zone of South America. CDC recommends vaccination for all travellers age 9 months and older. A vaccination certificate is required when arriving from a country with risk of YF transmission.",
      keyFacts: [
        { label: "Vaccine", value: "Single dose, lifelong protection" },
        { label: "Timing", value: "≥10 days before travel" },
        { label: "Recommended", value: "All travellers ≥9 months" },
        { label: "Entry rule", value: "Certificate required if arriving from a YF-risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/guyana",
    },
    malaria: {
      riskSummary:
        "Malaria occurs throughout Guyana except in the cities of Georgetown and New Amsterdam, with the forested interior carrying the highest risk. Around 60% of cases are P. vivax and 40% P. falciparum — the significant falciparum share makes chemoprophylaxis important for interior travel. Parasites are chloroquine-resistant.",
      keyFacts: [
        { label: "Risk", value: "Whole country except Georgetown & New Amsterdam" },
        { label: "Highest risk", value: "Forested interior" },
        { label: "No risk", value: "Georgetown, New Amsterdam" },
        { label: "Species", value: "~60% P. vivax, ~40% P. falciparum (chloroquine-resistant)" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/guyana",
    },
    dengue: {
      riskSummary:
        "Dengue is endemic with year-round transmission and outbreaks every few years. Risk is present countrywide including Georgetown. Daytime mosquito-bite prevention is the main protection for every traveler.",
      keyFacts: [
        { label: "Distribution", value: "Countrywide, year-round" },
        { label: "Vector", value: "Aedes aegypti — daytime biter" },
        { label: "Pattern", value: "Outbreaks every 2–5 years" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya circulates in the region and shares the same daytime Aedes vector as dengue, so dengue prevention also protects against it. Joint pain can persist for months. Vaccination is considered in outbreak settings or for extended stays in high-incidence areas (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    zika: {
      riskSummary:
        "Zika is transmitted by daytime Aedes mosquitoes countrywide. Pregnancy and pre-conception planning are the key clinical concerns: pregnant women should avoid travel to Guyana, and couples should use condoms during travel and for 3 months after return.",
    },
  },
};
