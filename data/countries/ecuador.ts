import type { CountryInfo } from "./types";

// ── Ecuador (South America) — full brief ────────────────────────────────────
// Sources: CDC Travelers' Health (Ecuador) & CDC Yellow Book 2024;
// EKRM/HealthyTravel (https://www.healthytravel.ch); WHO International Travel
// and Health. Framing reflects the Swiss BAG schedule and Swiss travel
// medicine practice.
//
// Notable points captured:
//   • Three distinct travel zones with very different risk: the Amazon
//     (Oriente) lowlands east of the Andes (YF + malaria), the Andean
//     highlands incl. Quito ~2,850 m (no YF/malaria, altitude instead), and
//     the Galápagos (no YF, no malaria — distinct low-risk).
//   • YF recommended for the eastern Amazon provinces <2,300 m; not for
//     Quito, Guayaquil, or Galápagos.
//   • Ecuador's YF entry rule applies to travellers who spent >10 days in
//     specified endemic South American countries before arrival.
//   • Malaria mostly P. vivax, chloroquine-resistant; concentrated in
//     low-lying coastal and Amazon provinces.
export const ecuador: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines (MMR, Tdap, varicella, polio, COVID-19)",
  ],
  vaccinesConsider: [
    "Yellow fever (Amazon region)",
    "Hepatitis B",
    "Typhoid",
    "Rabies",
    "Dengue (selective)",
  ],
  malariaRisk: "present",
  yellowFever: "required-or-recommended",
  foodWater:
    "Standard food and water precautions, particularly outside major cities. Use bottled or filtered water for drinking and brushing teeth in rural regions, the coast, and the Amazon. These precautions reduce traveler's diarrhea, hepatitis A, and typhoid risk. Tap water in Quito is generally treated but bottled remains the safer choice for most travelers.",
  mosquito:
    "Mosquito-bite prevention is essential in the coastal lowlands and the Amazon (Oriente), where dengue, Zika, chikungunya, and malaria occur. Daytime-biting Aedes mosquitoes (dengue, Zika, chikungunya) require day protection; Anopheles (malaria) bite from dusk into the night. Use DEET 30%+ or picaridin 20%, long sleeves, and screened or air-conditioned rooms; permethrin-treated clothing for the Amazon. No mosquito-borne disease risk in the Andean highlands above ~2,300 m (Quito) or, in practice, the Galápagos.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/ecuador",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry rule for arrivals from endemic countries",
      message:
        "Ecuador requires proof of yellow fever vaccination for travellers (roughly ages 1–60) who spent more than 10 days in certain endemic South American countries — including Bolivia, Brazil, Colombia, and Peru — before arriving. Travellers coming directly from Switzerland are not affected. The vaccine must be given at least 10 days before entry. Carry the certificate if your itinerary chains several Andean/Amazon countries.",
      source: "Ecuadorian immigration / WHO IHR",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/ecuador",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Altitude — Quito and the Andean highlands",
      message:
        "Quito sits at about 2,850 m and other Andean destinations (Cotopaxi, Quilotoa, the Avenue of the Volcanoes) are higher. Acute mountain sickness can occur on rapid ascent. Allow time to acclimatise and discuss acetazolamide with your travel medicine specialist for fast climbs or high treks. This is a non-infectious risk, not prevented by any vaccine.",
      source: "EKRM / HealthyTravel",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Galápagos — distinct low-risk destination",
      message:
        "The Galápagos Islands have no yellow fever and no malaria, and arboviral risk is very low. Yellow fever vaccination is not recommended for travel limited to the islands. Sun protection, seasickness prevention, and standard food and water precautions are the practical concerns. Note Ecuador may ask for a YF certificate based on your prior itinerary, not the islands themselves.",
      source: "CDC Travelers' Health",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/ecuador",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Ecuador. Not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination. Two doses 6–12 months apart give long-term protection; a single dose covers the trip.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, polio, COVID-19 — per Swiss BAG schedule. Both MMR doses are essential given measles activity. Adults with a completed polio primary series should have had at least one IPV booster as adults.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "specific",
      note: "Medically advised for travel to the Amazon provinces east of the Andes below 2,300 m — Morona-Santiago, Napo, Orellana, Pastaza, Sucumbíos, Tungurahua, Zamora-Chinchipe. Not recommended for Quito, Guayaquil, the western lowlands, or the Galápagos. A single dose gives lifelong protection; give ≥10 days before travel at an authorised Swiss YF centre. Live vaccine: contraindicated in immunosuppression and pregnancy; caution in adults >60 starting a primary series.",
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
      note: "Qdenga is recommended only for travelers with a documented prior dengue infection who will be exposed in a high-transmission region (coast or Amazon). Not for first-time visitors — primary infection after vaccination can be more severe.",
    },
  ],

  diseases: {
    yellowFever: {
      riskSummary:
        "Yellow fever risk in Ecuador is in the Amazon (Oriente) lowlands east of the Andes below 2,300 m. Vaccination is recommended for the eastern provinces and not for Quito, Guayaquil, the western lowlands, or the Galápagos. An entry-certificate rule applies to travellers who spent over 10 days in certain endemic South American countries before arrival.",
      keyFacts: [
        { label: "Vaccine", value: "Single dose, lifelong protection" },
        { label: "Timing", value: "≥10 days before travel" },
        { label: "Recommended", value: "Amazon provinces <2,300 m east of Andes" },
        { label: "Risk provinces", value: "Morona-Santiago, Napo, Orellana, Pastaza, Sucumbíos, Zamora-Chinchipe, Tungurahua" },
        { label: "Not needed", value: "Quito, Guayaquil, Galápagos, >2,300 m" },
        { label: "Entry rule", value: "Certificate if >10 days in endemic SA country before arrival" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/ecuador",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/ecuador.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Ecuador (CDC).",
    },
    malaria: {
      riskSummary:
        "Malaria occurs below 1,500 m in the coastal and Amazon lowlands; there is no transmission in Quito, Guayaquil, the Galápagos, or above 2,300 m. Risk is highest in the eastern Amazon and northern coastal provinces (e.g. Esmeraldas, Morona-Santiago, Orellana, Pastaza, Sucumbíos). Most cases are P. vivax with some P. falciparum; parasites are chloroquine-resistant. Prophylaxis is reserved for higher-risk provinces; elsewhere insect precautions alone.",
      keyFacts: [
        { label: "Risk", value: "<1,500 m coastal & Amazon lowlands" },
        { label: "Higher-risk", value: "Esmeraldas, Morona-Santiago, Orellana, Pastaza, Sucumbíos" },
        { label: "No risk", value: "Quito, Guayaquil, Galápagos, >2,300 m" },
        { label: "Species", value: "~85% P. vivax, ~15% P. falciparum (chloroquine-resistant)" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine (high-risk areas)" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/ecuador",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/ecuador.jpg",
      mapCaption: "Malaria risk areas in Ecuador (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue is endemic in the coastal and Amazon lowlands with year-round transmission and rainy-season peaks; major coastal cities such as Guayaquil are affected. Risk is negligible in the high Andes (Quito) and very low in the Galápagos. Daytime mosquito-bite prevention is the main protection below ~1,800 m.",
      keyFacts: [
        { label: "Distribution", value: "Coastal & Amazon lowlands; Guayaquil" },
        { label: "Vector", value: "Aedes aegypti — daytime biter" },
        { label: "Low/none", value: "Quito and high Andes; Galápagos very low" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya circulates in the lowlands sharing the same daytime Aedes vector as dengue, so dengue prevention also protects against it. Joint pain can persist for months. CDC considers routine vaccination generally not recommended for Ecuador; it may be discussed for outbreak settings or extended stays in high-incidence areas.",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    zika: {
      riskSummary:
        "Zika is transmitted by daytime Aedes mosquitoes in the coastal and Amazon lowlands. Pregnancy and pre-conception planning are the key clinical concerns: pregnant women should avoid travel to lowland risk areas, and couples should use condoms during travel and for 3 months after return. The high Andes and Galápagos are not meaningful risk areas.",
    },
  },
};
