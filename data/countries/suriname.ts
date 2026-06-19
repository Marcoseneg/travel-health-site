import type { CountryInfo } from "./types";

// ── Suriname (South America) — full brief ───────────────────────────────────
// Sources: CDC Travelers' Health (Suriname) & CDC Yellow Book 2024;
// EKRM/HealthyTravel (https://www.healthytravel.ch); WHO International Travel
// and Health; PAHO. Framing reflects the Swiss BAG schedule and Swiss travel
// medicine practice.
//
// Notable points captured:
//   • Yellow fever recommended for all travellers ≥9 months; Suriname lies
//     within the YF-endemic zone. Certificate required when arriving from a
//     YF-risk country.
//   • Malaria: historically high in the forested interior (Sipaliwini near
//     French Guiana), but Suriname has reported no indigenous cases since
//     2021. Current CDC guidance is insect-bite precautions only — no
//     chemoprophylaxis. We mark malaria "present" to flag the interior history
//     while making clear prophylaxis is not currently advised.
//   • Active chikungunya transmission noted by CDC; strong dengue/Zika.
export const suriname: CountryInfo = {
  vaccinesRecommended: [
    "Yellow fever",
    "Hepatitis A",
    "Routine vaccines (MMR, Tdap, varicella, polio, COVID-19)",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Typhoid",
    "Rabies",
    "Chikungunya",
    "Dengue (selective)",
  ],
  malariaRisk: "present",
  yellowFever: "required-or-recommended",
  foodWater:
    "Standard tropical food and water precautions throughout. Use bottled or filtered water for drinking and brushing teeth, especially outside Paramaribo and in the interior. These precautions reduce traveler's diarrhea, hepatitis A, and typhoid risk.",
  mosquito:
    "Strict mosquito-bite prevention is essential. Suriname has year-round dengue and Zika with active chikungunya transmission, all spread by daytime-biting Aedes mosquitoes — so day protection matters. Use DEET 30%+ or picaridin 20%, long sleeves, and screened or air-conditioned rooms. Although locally acquired malaria has not been reported since 2021, dusk-to-dawn protection and permethrin-treated clothing remain sensible for any trip into the forested interior.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/suriname",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever — recommended countrywide; certificate on entry",
      message:
        "Suriname lies within the yellow-fever-endemic zone and CDC recommends vaccination for all travellers age 9 months and older. A vaccination certificate is required for travellers arriving from a country with risk of YF transmission. Travellers arriving directly from Switzerland are not subject to the entry requirement but should still be vaccinated for protection. Allow ≥10 days between vaccination and travel.",
      source: "Suriname health authorities / WHO IHR",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/suriname",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Malaria interrupted since 2021; chikungunya active",
      message:
        "Suriname has reported no locally acquired malaria cases since 2021, so chemoprophylaxis is not currently recommended — insect-bite precautions only. The historic risk was in the forested interior (Sipaliwini, near French Guiana). Separately, CDC has noted active chikungunya transmission; daytime mosquito-bite prevention covers both chikungunya and dengue.",
      source: "CDC Travelers' Health / PAHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/suriname",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Recommended for all travelers age 9 months and older to Suriname, which lies within the endemic zone. A single dose gives lifelong protection. Must be given ≥10 days before travel at an authorised Swiss YF centre. Live vaccine: contraindicated in immunosuppression and pregnancy; caution in adults >60 starting a primary series. Carry the certificate — it is required when arriving from a YF-risk country.",
    },
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Suriname. Not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination. Two doses 6–12 months apart give long-term protection; a single dose covers the trip.",
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
      note: "Recommended for long-stay travelers, those visiting friends and relatives, off-the-beaten-track itineraries, and travelers with reduced gastric acidity. Less essential for short stays in Paramaribo.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Pre-exposure recommended for long stays, cyclists, motorcyclists, hikers in remote areas, young children, animal workers, and cavers (bat exposure). Pre-exposure simplifies post-bite management — only 2 vaccine doses needed afterwards and no immunoglobulin.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "Vaccination may be considered during active local transmission or for extended stays in high-incidence areas. Not routine for short tourist visits (see EKRM statement).",
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
        "Suriname lies entirely within the yellow-fever-endemic zone of South America. CDC recommends vaccination for all travellers age 9 months and older. A vaccination certificate is required when arriving from a country with risk of YF transmission.",
      keyFacts: [
        { label: "Vaccine", value: "Single dose, lifelong protection" },
        { label: "Timing", value: "≥10 days before travel" },
        { label: "Recommended", value: "All travellers ≥9 months" },
        { label: "Entry rule", value: "Certificate required if arriving from a YF-risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/suriname",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/americas.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in the Americas (CDC).",
    },
    malaria: {
      riskSummary:
        "The historic malaria risk in Suriname was in the forested interior, particularly the Sipaliwini district bordering French Guiana, with limited transmission in Brokopondo, Marowijne, and Para. Paramaribo and the coastal districts were no-risk. Suriname has reported no locally acquired cases since 2021, so CDC currently advises insect-bite precautions only — no chemoprophylaxis. Confirm the current picture with your travel medicine specialist if heading deep into the interior.",
      keyFacts: [
        { label: "Current status", value: "No indigenous cases since 2021" },
        { label: "Prophylaxis", value: "Not currently recommended (bite precautions only)" },
        { label: "Historic high", value: "Sipaliwini interior (near French Guiana)" },
        { label: "Historic limited", value: "Brokopondo, Marowijne, Para" },
        { label: "No risk", value: "Paramaribo and coastal districts" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/suriname",
    },
    dengue: {
      riskSummary:
        "Dengue is endemic with year-round transmission and periodic outbreaks. Risk is present countrywide including Paramaribo. Daytime mosquito-bite prevention is the main protection for every traveler.",
      keyFacts: [
        { label: "Distribution", value: "Countrywide incl. Paramaribo" },
        { label: "Vector", value: "Aedes aegypti — daytime biter" },
        { label: "Season", value: "Year-round; periodic outbreaks" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "CDC has noted active chikungunya transmission in Suriname. The virus shares the same daytime Aedes vector as dengue, so dengue prevention also protects against it. Joint pain can persist for months. Vaccination is considered in transmission settings or for extended stays in high-incidence areas (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    zika: {
      riskSummary:
        "Zika is transmitted by daytime Aedes mosquitoes countrywide. Pregnancy and pre-conception planning are the key clinical concerns: pregnant women should avoid travel to Suriname, and couples should use condoms during travel and for 3 months after return.",
    },
  },
};
