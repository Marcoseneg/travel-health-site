import type { CountryInfo } from "./types";

// ── Bolivia (South America) — full brief ────────────────────────────────────
// Sources: CDC Travelers' Health (Bolivia) & CDC Yellow Book 2024;
// EKRM/HealthyTravel (https://www.healthytravel.ch); WHO International Travel
// and Health. Framing reflects the Swiss BAG schedule and Swiss travel
// medicine practice.
//
// Notable points captured:
//   • Yellow fever risk in the lowland east of the Andes (Beni, Pando, Santa
//     Cruz and designated areas of Chuquisaca, Cochabamba, La Paz, Tarija
//     below 2,300 m). La Paz city, Sucre and the Altiplano are no-risk.
//   • Bolivia requires a YF certificate for travellers heading to risk areas.
//   • Malaria below 2,500 m, overwhelmingly P. vivax (chloroquine-resistant).
//   • High altitude (La Paz ~3,600 m, Uyuni, Lake Titicaca) — altitude
//     illness is a major non-infectious risk for typical itineraries.
//   • Active chikungunya activity in Santa Cruz/Cochabamba departments.
export const bolivia: CountryInfo = {
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
    "Standard food and water precautions, particularly outside major cities and in the lowlands. Use bottled or filtered water for drinking and brushing teeth in rural regions and the Amazon basin. These precautions reduce traveler's diarrhea, hepatitis A, and typhoid risk.",
  mosquito:
    "Mosquito-bite prevention is essential below 2,500 m, where dengue, Zika, chikungunya, and malaria all occur. Daytime-biting Aedes mosquitoes (dengue, Zika, chikungunya) require day protection; Anopheles (malaria) bite from dusk into the night. Use DEET 30%+ or picaridin 20%, long sleeves at peak biting times, and screened or air-conditioned rooms. Permethrin-treated clothing for trips into the Amazon. No mosquito risk on the high Altiplano (La Paz, Uyuni, Lake Titicaca).",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/bolivia",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever certificate required for risk areas",
      message:
        "Bolivia requires proof of yellow fever vaccination for travellers age 1 year and older arriving who intend to visit a yellow-fever risk area (the lowlands below 2,300 m east of the Andes). Direct travellers staying only in La Paz, Sucre, or the high Altiplano are generally exempt, but carrying the certificate avoids problems. Allow at least 10 days between vaccination and travel for protection to develop.",
      source: "Bolivian health authorities / WHO IHR",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/bolivia",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Altitude illness — La Paz, Uyuni, Lake Titicaca",
      message:
        "Much of Bolivia's tourist circuit sits very high: La Paz (~3,600 m), Uyuni salt flats (~3,650 m), and Lake Titicaca (~3,800 m). Acute mountain sickness is common on rapid ascent. Plan a gradual itinerary, allow acclimatisation days, and discuss acetazolamide prophylaxis with your travel medicine specialist. This is a non-infectious risk and is not prevented by any vaccine.",
      source: "EKRM / HealthyTravel",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Chikungunya activity (Santa Cruz, Cochabamba)",
      message:
        "The CDC has noted increased chikungunya transmission in the Santa Cruz and Cochabamba departments. Strict daytime mosquito-bite prevention is the main protection; vaccination may be discussed for some travellers (see below).",
      source: "CDC Travel Health Notices",
      sourceUrl: "https://wwwnc.cdc.gov/travel/notices",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Medically advised for travel to areas below 2,300 m east of the Andes — Beni, Pando, Santa Cruz, and designated areas of Chuquisaca, Cochabamba, La Paz, and Tarija. Not needed for travel limited to La Paz city, Sucre, or above 2,300 m. A single dose gives lifelong protection. Must be given ≥10 days before travel at an authorised Swiss YF centre. Live vaccine: contraindicated in immunosuppression and pregnancy; caution in adults >60 starting a primary series.",
    },
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Bolivia. Not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination. Two doses 6–12 months apart give long-term protection; a single dose covers the trip.",
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
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "Vaccination may be considered during active local outbreaks (e.g. Santa Cruz/Cochabamba) or for extended stays in high-incidence areas. Not routine for short tourist visits (see EKRM statement).",
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
        "Yellow fever is endemic in Bolivia's lowlands east of the Andes below 2,300 m — Beni, Pando, Santa Cruz, and designated areas of Chuquisaca, Cochabamba, La Paz, and Tarija. La Paz city, Sucre, and the high Altiplano are no-risk. Vaccination is recommended for the risk areas and a certificate is required for travellers heading there.",
      keyFacts: [
        { label: "Vaccine", value: "Single dose, lifelong protection" },
        { label: "Timing", value: "≥10 days before travel" },
        { label: "Recommended", value: "Lowlands <2,300 m east of Andes" },
        { label: "Risk depts", value: "Beni, Pando, Santa Cruz; parts of Chuquisaca, Cochabamba, La Paz, Tarija" },
        { label: "Not needed", value: "La Paz city, Sucre, >2,300 m" },
        { label: "Entry rule", value: "Certificate required for risk-area travel (age 1+)" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/bolivia",
    },
    malaria: {
      riskSummary:
        "Malaria occurs in all areas below 2,500 m, mainly in the Amazon lowlands of the north and east (Beni, Pando, and parts of Santa Cruz, La Paz, and Cochabamba). La Paz city and areas above 2,300 m are no-risk. Roughly 99% of cases are P. vivax with rare P. falciparum; parasites are chloroquine-resistant. Prophylaxis or standby treatment depends on the specific itinerary.",
      keyFacts: [
        { label: "Risk", value: "All areas <2,500 m" },
        { label: "Main areas", value: "Amazon lowlands: Beni, Pando, lowland Santa Cruz/La Paz/Cochabamba" },
        { label: "No risk", value: "La Paz city, >2,300 m (Altiplano)" },
        { label: "Species", value: "~99% P. vivax, rare P. falciparum (chloroquine-resistant)" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/bolivia",
    },
    dengue: {
      riskSummary:
        "Dengue is endemic in the lowlands with year-round transmission and rainy-season peaks; risk is concentrated in Santa Cruz and the tropical east and north. Daytime mosquito-bite prevention is the main protection for every traveler heading below 2,000 m.",
      keyFacts: [
        { label: "Distribution", value: "Lowlands; Santa Cruz, tropical east/north" },
        { label: "Vector", value: "Aedes aegypti — daytime biter" },
        { label: "Season", value: "Year-round; peaks in the rainy season" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya circulates in the lowlands, with increased transmission noted in Santa Cruz and Cochabamba. Same daytime Aedes vector as dengue, so dengue prevention also protects against chikungunya. Joint pain can persist for months. Vaccination is considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    zika: {
      riskSummary:
        "Zika is transmitted by daytime Aedes mosquitoes in the lowlands. Pregnancy and pre-conception planning are the key clinical concerns: pregnant women should avoid travel to risk areas, and couples should use condoms during travel and for 3 months after return.",
    },
  },
};
