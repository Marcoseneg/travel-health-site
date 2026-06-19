import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Djibouti) and Yellow Book 2024; WHO; EKRM /
// HealthyTravel (https://www.healthytravel.ch). Framing reflects Swiss BAG
// schedule. Notable: malaria risk in all (low-lying) areas, peaking with the
// rains; YF not endemic but a certificate is required for entry from a YF-risk
// country; periodic dengue and chikungunya outbreaks.
export const djibouti: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Use bottled or treated water, avoid ice and unpeeled produce, and eat thoroughly cooked food. Standard precautions reduce the risk of traveler's diarrhea, hepatitis A and typhoid. Avoid swimming or wading in fresh, unchlorinated water (schistosomiasis, leptospirosis).",
  mosquito:
    "Mosquito-bite prevention (DEET or picaridin repellent, long sleeves, treated bed nets) is essential throughout the country. Malaria transmission occurs year-round and peaks during and after the rainy season. Dengue, chikungunya and sand-fly-borne leishmaniasis also occur.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/djibouti",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever — entry certificate may be required",
      message:
        "Djibouti is not a yellow-fever-endemic country, but a vaccination certificate is required for travelers arriving from (or transiting through) a country with risk of YF transmission. Direct travel from Switzerland is not affected. Carry your International Certificate of Vaccination if combining Djibouti with other African destinations.",
      source: "WHO / Djiboutian entry requirements",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Malaria and dengue — confirm prophylaxis before travel",
      message:
        "CDC recommends antimalarial chemoprophylaxis for all travelers to Djibouti. The country has also experienced large dengue outbreaks in recent years. Discuss prophylaxis and bite-prevention measures with your travel clinic, and seek medical care for any fever during or after travel.",
      source: "CDC Travelers' Health",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/djibouti",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, especially those visiting rural areas or staying with friends and relatives.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (a single adult booster is advised — poliovirus has been detected), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in Swiss childhood schedule since 1998 — younger travelers usually covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Recommended for long stays, rural travel, cycling/motorbike trips, work with animals, and for infants and children. Rabid dogs are common in the region and post-exposure vaccine may be limited locally.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Consider for travelers to areas with active transmission, aid/health workers, and those with limited access to safe food and water. Disease is rare in ordinary tourists who maintain strict food and water hygiene.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Malaria is present year-round in all areas of this low-lying country, with transmission peaking during and after the rainy season. P. falciparum predominates (~60–70%) and is chloroquine-resistant. CDC recommends chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine or tafenoquine) for all travelers.",
      keyFacts: [
        { label: "Risk area", value: "All areas, year-round" },
        { label: "Season", value: "Peaks during/after rainy season" },
        { label: "Species", value: "P. falciparum ~60–70%, P. vivax ~30–40%" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis for all travelers + bite protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/djibouti",
    },
    yellowFever: {
      riskSummary:
        "Djibouti is not yellow-fever-endemic, and CDC does not recommend the vaccine for direct travel. A vaccination certificate is required for travelers arriving from a YF-risk country (see country alert). Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "CDC", value: "Not recommended (not endemic)" },
        { label: "Entry rule", value: "Cert required if arriving from YF-risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/djibouti",
    },
    dengue: {
      riskSummary:
        "Dengue is transmitted by daytime-biting Aedes mosquitoes and Djibouti has experienced large urban outbreaks in recent years. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Urban and lowland areas; periodic outbreaks" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya transmission occurs with periodic outbreaks (including large urban outbreaks in recent years). Same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
