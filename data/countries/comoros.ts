import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024,
// WHO. Framing reflects Swiss BAG schedule. Notable: NO domestic yellow-fever
// risk, but a YF certificate may be required if arriving from an endemic
// country. Malaria is present country-wide year-round (chloroquine-resistant
// P. falciparum). No active cholera transmission per CDC. Healthcare facilities
// on the islands are limited — evacuation may be needed for serious illness.
export const comoros: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies"],
  malariaRisk: "high",
  yellowFever: "possible",
  foodWater:
    "Use bottled or treated water, avoid ice from unverified sources, and eat thoroughly cooked food served hot. Strict food and water precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid. Healthcare facilities are limited.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — both malaria and dengue are present. Use DEET or picaridin repellent, cover up at dusk and after dark, and sleep under an insecticide-treated net. Daytime protection also reduces dengue risk.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/comoros",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever certificate only if arriving from a risk country",
      message:
        "Comoros has no domestic yellow fever risk and the vaccine is not routinely recommended for travel from Switzerland. However, a YF vaccination certificate may be required if you are arriving from — or have recently transited — a country with yellow fever transmission risk. Direct travel from Switzerland is not affected.",
      source: "WHO / Comoros entry requirements",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Limited healthcare — plan for evacuation",
      message:
        "Medical facilities on the Comoros islands are limited, and serious illness or injury may require evacuation to Mayotte, Réunion, or further afield. Ensure travel insurance includes medical evacuation, and carry an adequate personal supply of any regular and standby medication (including malaria chemoprophylaxis).",
      source: "EKRM / HealthyTravel",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to tropical and subtropical countries. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, particularly those visiting rural areas, staying with friends and relatives, on longer trips, or in poor hygienic conditions.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles (MMR) protection is complete before departure.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in the Swiss childhood schedule since 1998 — younger travelers usually covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking and remote travel, small children, those working with animals). Dogs are commonly infected and post-exposure care is hard to obtain locally given limited healthcare.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Malaria is present throughout all islands of Comoros year-round. P. falciparum (the most dangerous species) predominates and is chloroquine-resistant. Chemoprophylaxis is recommended for travelers, particularly for overnight stays outside well-protected resorts, alongside strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk area", value: "All islands, year-round" },
        { label: "Species", value: "P. falciparum predominant; rare vivax/malariae" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis (atovaquone-proguanil, doxycycline, or mefloquine) + bite protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/comoros",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Comoros, and the vaccine is not routinely recommended for travel from Switzerland. A YF certificate may be required only if you arrive from — or have recently transited — a country with yellow fever transmission risk (see country alert). Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Risk", value: "None — no domestic transmission" },
        { label: "Vaccine", value: "Not routinely recommended" },
        { label: "Entry rule", value: "Certificate only if arriving from a YF-risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/comoros",
    },
    dengue: {
      riskSummary:
        "Dengue is present and transmitted by the daytime-biting Aedes mosquito, with periodic outbreaks across the Indian Ocean islands. Day-time bite prevention complements the dusk-to-dawn protection used for malaria.",
      keyFacts: [
        { label: "Distribution", value: "Present; periodic outbreaks" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
        { label: "Prevention", value: "Repellent and covering up by day" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya is present in the Indian Ocean region and Comoros has experienced significant outbreaks. It shares the same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination may be considered in outbreak settings (see EKRM statement).",
      keyFacts: [
        { label: "Distribution", value: "Present; history of large outbreaks" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
        { label: "Prevention", value: "Bite protection; vaccine in outbreak settings" },
      ],
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
