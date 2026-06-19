import type { CountryInfo } from "./types";

// ── Venezuela (South America) — full brief ──────────────────────────────────
// Sources: CDC Travelers' Health (Venezuela) & CDC Yellow Book 2024;
// EKRM/HealthyTravel (https://www.healthytravel.ch); WHO International Travel
// and Health; PAHO. Framing reflects the Swiss BAG schedule and Swiss travel
// medicine practice.
//
// Notable points captured:
//   • Yellow fever recommended for most travellers; not for the central
//     coastal/capital belt (Distrito Capital, Aragua, Carabobo, Miranda,
//     Vargas, Yaracuy) nor for the high Andes, Falcón/Lara, Margarita Island,
//     Caracas, or Valencia. Certificate required when arriving from Brazil.
//   • Malaria below 1,700 m and at Angel Falls (Canaima/Bolívar) — a popular
//     destination — with significant P. falciparum (~25%). Major resurgence in
//     recent years; the interior/mining south is highest.
//   • Strong dengue/Zika/chikungunya; the health system is severely strained,
//     which raises the importance of prevention and good travel insurance.
export const venezuela: CountryInfo = {
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
    "Standard tropical food and water precautions throughout, particularly outside major cities. Use bottled or filtered water for drinking and brushing teeth. These precautions reduce traveler's diarrhea, hepatitis A, and typhoid risk. Note that medical supplies and safe water can be unreliable in parts of the country.",
  mosquito:
    "Strict mosquito-bite prevention is essential. Venezuela has year-round dengue, Zika, and chikungunya plus substantial malaria below 1,700 m, including at Angel Falls (Canaima). Daytime-biting Aedes mosquitoes (dengue, Zika, chikungunya) require day protection; Anopheles (malaria) bite from dusk into the night. Use DEET 30%+ or picaridin 20%, long sleeves at peak biting times, and screened or air-conditioned rooms. Permethrin-treated clothing for the interior and Canaima.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/venezuela",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever — recommended for most areas; certificate from Brazil",
      message:
        "CDC recommends yellow fever vaccination for most travellers to Venezuela below 2,300 m, excluding the central coastal/capital belt and certain low-risk areas (see disease detail). A vaccination certificate is required for travellers arriving from Brazil. Travellers arriving directly from Switzerland are not subject to the entry requirement but should be vaccinated if visiting risk areas. Allow ≥10 days between vaccination and travel.",
      source: "Venezuelan health authorities / WHO IHR",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/venezuela",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Malaria resurgence — interior and Angel Falls",
      message:
        "Venezuela has seen a major malaria resurgence, with the highest transmission in the southern interior and mining areas of Bolívar and Amazonas states. Risk extends to all areas below 1,700 m and specifically to Angel Falls (Canaima), a popular destination. About a quarter of cases are P. falciparum. Chemoprophylaxis is recommended for travel to risk areas — discuss a regimen with your travel medicine specialist.",
      source: "CDC Travelers' Health / PAHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/venezuela",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Recommended for most travel below 2,300 m. Not recommended for the central coastal/capital belt (Distrito Capital, Aragua, Carabobo, Miranda, Vargas, Yaracuy), the high Andes above 2,300 m, Falcón and Lara states, Margarita Island, Caracas, or Valencia. A single dose gives lifelong protection; give ≥10 days before travel at an authorised Swiss YF centre. Live vaccine: contraindicated in immunosuppression and pregnancy; caution in adults >60 starting a primary series. Certificate required when arriving from Brazil.",
    },
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Venezuela. Not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination. Two doses 6–12 months apart give long-term protection; a single dose covers the trip.",
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
      note: "Recommended for long-stay travelers, those visiting friends and relatives, off-the-beaten-track itineraries, and travelers with reduced gastric acidity. Less essential for short stays in tourist hubs.",
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
        "Yellow fever vaccination is recommended for most travel in Venezuela below 2,300 m. It is not recommended for the central coastal/capital belt (Distrito Capital, Aragua, Carabobo, Miranda, Vargas, Yaracuy), the high Andes, Falcón and Lara, Margarita Island, Caracas, or Valencia. A certificate is required when arriving from Brazil.",
      keyFacts: [
        { label: "Vaccine", value: "Single dose, lifelong protection" },
        { label: "Timing", value: "≥10 days before travel" },
        { label: "Recommended", value: "Most areas <2,300 m" },
        { label: "Not needed", value: "Caracas, Valencia, Margarita Is., capital/coastal belt, >2,300 m" },
        { label: "Entry rule", value: "Certificate required if arriving from Brazil" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/venezuela",
    },
    malaria: {
      riskSummary:
        "Malaria occurs in all areas below 1,700 m and specifically at Angel Falls (Canaima), with the heaviest transmission in the southern interior and mining areas of Bolívar and Amazonas states amid a multi-year resurgence. No risk above 2,300 m in Mérida/Táchira/Trujillo, in Falcón and Lara, on Margarita Island, or in Caracas and Valencia. About 75% of cases are P. vivax and 25% P. falciparum; parasites are chloroquine-resistant. Chemoprophylaxis is recommended for risk-area travel.",
      keyFacts: [
        { label: "Risk", value: "All areas <1,700 m; Angel Falls (Canaima)" },
        { label: "Highest", value: "Bolívar & Amazonas interior/mining areas" },
        { label: "No risk", value: "Caracas, Valencia, Margarita Is., Falcón/Lara, >2,300 m" },
        { label: "Species", value: "~75% P. vivax, ~25% P. falciparum (chloroquine-resistant)" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/venezuela",
    },
    dengue: {
      riskSummary:
        "Dengue is endemic with year-round transmission and rainy-season peaks. Risk is present countrywide in the lowlands including Caracas. Daytime mosquito-bite prevention is the main protection for every traveler.",
      keyFacts: [
        { label: "Distribution", value: "Lowlands countrywide incl. Caracas" },
        { label: "Vector", value: "Aedes aegypti — daytime biter" },
        { label: "Season", value: "Year-round; rainy-season peaks" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya circulates in Venezuela and shares the same daytime Aedes vector as dengue, so dengue prevention also protects against it. Joint pain can persist for months. CDC considers routine vaccination generally not recommended; it may be discussed for outbreak settings or extended stays (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    zika: {
      riskSummary:
        "Zika is transmitted by daytime Aedes mosquitoes in the lowlands. Pregnancy and pre-conception planning are the key clinical concerns: pregnant women should avoid travel to Venezuela, and couples should use condoms during travel and for 3 months after return.",
    },
  },
};
