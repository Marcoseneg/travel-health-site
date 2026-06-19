import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Yellow Book 2024 / CDC Travelers' Health,
// PAHO. Framing reflects the Swiss BAG schedule. Notable: malaria limited to a
// few rural southern states (Chiapas, Campeche, southern Chihuahua); all major
// resorts and cities (Cancún, Riviera Maya, Los Cabos, Mexico City) are
// no-risk. Strong year-round dengue with periodic chikungunya and Zika
// activity. No yellow fever risk in country; YF certificate only required if
// arriving from a YF-endemic country.
export const mexico: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Hepatitis B",
    "Rabies",
    "Chikungunya",
    "Dengue",
  ],
  malariaRisk: "limited",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — particularly relevant outside large hotels and all-inclusive resorts and when eating from street vendors.",
  mosquito:
    "Year-round dengue risk — with periodic chikungunya and Zika activity — means daytime mosquito protection (DEET or picaridin repellent, long sleeves) is important, including in coastal resort areas such as Cancún, the Riviera Maya, and Puerto Vallarta. For travel to the few rural malaria-risk states (Chiapas, Campeche, southern Chihuahua), also protect at dawn and dusk.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/mexico",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever — entry certificate only if arriving from a risk country",
      message:
        "There is no yellow fever risk in Mexico and the vaccine is not recommended for the destination itself. A YF vaccination certificate is required only for travelers arriving from (or transiting) a country with yellow fever transmission risk. Direct travel from Switzerland is not affected.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/mexico",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers from one year of age. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles protection is up to date.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-term travelers, those visiting friends and relatives, travelers to rural areas, or those staying in poor hygienic conditions.",
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
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking or caving in remote areas, infants and children, those working with animals). Stray dogs and bats are the main rabies vectors.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "Vaccination indicated during chikungunya outbreaks; may also be considered for travelers with elevated exposure (see EKRM statement). Cases in 2025 were reported from Chiapas, Quintana Roo, and Yucatán.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga® vaccination is currently recommended only for travelers with documented prior dengue infection who will be exposed in a region with high dengue transmission.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is limited to a few rural southern states; all major tourist destinations are no-risk. Chemoprophylaxis is recommended only for rural areas of Chiapas, Campeche, and southern Chihuahua. Low-risk states (Oaxaca, Sinaloa, Sonora, Tabasco) need mosquito protection only. The popular resort and city destinations — Cancún, Riviera Maya, Cozumel, Los Cabos, Puerto Vallarta, Mexico City, and the U.S.–Mexico border — have no malaria transmission. Where present, the parasite is almost entirely P. vivax.",
      keyFacts: [
        { label: "Risk areas", value: "Rural Chiapas, Campeche, southern Chihuahua" },
        { label: "Low risk", value: "Oaxaca, Sinaloa, Sonora, Tabasco" },
        { label: "No risk", value: "Cancún, Riviera Maya, Los Cabos, Mexico City, border" },
        { label: "Parasite", value: "P. vivax (~100%)" },
        { label: "Prevention", value: "Prophylaxis only for risk states; mosquito protection otherwise" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/mexico",
    },
    dengue: {
      riskSummary:
        "Endemic year-round, with peaks during and after the rainy season (roughly June–November). Transmission is concentrated in coastal and lowland areas, including the major resort regions of the Yucatán Peninsula and the Pacific coast. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide; highest in coastal/lowland areas" },
        { label: "Season", value: "Year-round; peaks June–November" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Sporadic transmission with periodic outbreaks; cases in 2025 were reported from Chiapas, Quintana Roo, and Yucatán. The same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination is considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    zika: {
      riskSummary:
        "Zika transmission has been reported in Mexico. Because Zika infection in pregnancy can cause serious birth defects, pregnant travelers are advised not to travel to areas with risk; those planning pregnancy should discuss timing and precautions with their doctor. Zika can also be sexually transmitted, so condom use and bite prevention are advised for couples.",
      keyFacts: [
        { label: "Pregnancy", value: "Avoid travel if pregnant; risk of birth defects" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
        { label: "Sexual", value: "Can be sexually transmitted — use condoms" },
      ],
      cdcMapUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/mexico",
    },
  },
};
