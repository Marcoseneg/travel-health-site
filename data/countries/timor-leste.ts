import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health — Timor-Leste (East Timor)
// (https://wwwnc.cdc.gov/travel/destinations/traveler/none/east-timor), CDC
// Yellow Book 2024, WHO, EKRM/HealthyTravel (https://www.healthytravel.ch).
// Framing reflects the Swiss BAG schedule. Notable: malaria risk is present
// across the country (chloroquine-resistant P. falciparum and P. vivax); dengue
// is year-round; rabies activity is increasing with reported vaccine shortages.
export const timorLeste: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Hepatitis B",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Rabies",
    "Japanese encephalitis",
    "Chikungunya",
    "Dengue",
  ],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — important throughout Timor-Leste, where sanitation infrastructure is limited outside Dili.",
  mosquito:
    "Dengue circulates year-round, so daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential everywhere including Dili. Malaria risk is present across the country, so also protect at dawn and dusk and discuss chemoprophylaxis with a travel medicine specialist before departure, particularly for rural stays.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/east-timor",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry rule",
      message:
        "Timor-Leste requires a yellow fever vaccination certificate from travelers arriving from (or who have transited through) a country with risk of yellow fever transmission. There is no yellow fever risk within Timor-Leste itself, and direct travel from Switzerland is not affected.",
      source: "WHO / Timor-Leste immigration guidance",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Rabies — reported vaccine shortages",
      message:
        "Increased human rabies cases have been reported in Timor-Leste, and access to post-exposure rabies vaccine and immunoglobulin can be limited locally. Travelers at higher risk should consider pre-exposure vaccination before departure and plan for medical evacuation in the event of an animal bite.",
      source: "CDC Travelers' Health",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/east-timor",
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
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "all",
      note: "CDC recommends Hepatitis B for unvaccinated travelers of all ages to Timor-Leste. Routine in the Swiss childhood schedule since 1998 — younger travelers usually covered; older travelers should check their status.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for most travelers, especially those visiting smaller cities or rural areas, staying with friends or relatives, or with individual risk factors.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Human rabies cases are increasing in Timor-Leste and post-exposure care can be hard to access — see country alert.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending a month or more in rural rice-growing or pig-farming areas, or with high-risk rural itineraries (camping, unscreened accommodation). Not needed for typical short urban stays.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga® vaccination currently recommended only for travelers with documented prior dengue infection who will be exposed in a region with high dengue transmission.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "Vaccination indicated during chikungunya outbreaks; may also be considered for countries with elevated risk (see EKRM statement). Timor-Leste has experienced chikungunya activity.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Malaria risk is present across Timor-Leste, including rural areas, with chloroquine-resistant Plasmodium falciparum and P. vivax circulating. Chemoprophylaxis is recommended for most travelers; the choice of regimen should be discussed with a travel medicine specialist before departure, alongside consistent mosquito-bite protection.",
      keyFacts: [
        { label: "Distribution", value: "Present throughout the country, incl. rural areas" },
        { label: "Species", value: "Chloroquine-resistant P. falciparum and P. vivax" },
        { label: "Prevention", value: "Chemoprophylaxis recommended plus bite protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/east-timor",
    },
    dengue: {
      riskSummary:
        "Endemic year-round in Timor-Leste, including Dili, with peaks during the rainy season. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide, incl. Dili" },
        { label: "Season", value: "Year-round; peaks in rainy season" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Timor-Leste has experienced chikungunya transmission, including a recent outbreak. The same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Timor-Leste. A vaccination certificate is required only for travelers arriving from, or transiting through, a country with yellow fever transmission risk. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/east-timor",
    },
  },
};
