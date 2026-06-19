import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Ethiopia) and Yellow Book 2024; WHO; EKRM /
// HealthyTravel (https://www.healthytravel.ch). Framing reflects Swiss BAG
// schedule. Notable: yellow-fever vaccine recommended for most of the country
// (except Afar/Somali lowlands); meningitis-belt country; malaria in all areas
// below 2,500 m incl. Addis Ababa, with highlands above that malaria-free.
export const ethiopia: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever (most areas)", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "present",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential — active cholera transmission has been widespread, and typhoid and hepatitis A are common. Drink only bottled or treated water, avoid ice and unpeeled produce, and eat thoroughly cooked food. Healthcare access outside Addis Ababa is limited.",
  mosquito:
    "Mosquito-bite prevention (DEET or picaridin repellent, long sleeves, treated bed nets) is essential below 2,500 m, where malaria is present year-round. Addis Ababa sits just above this threshold but is treated as low/seasonal risk — confirm prophylaxis with your travel clinic. The highlands above 2,500 m are malaria-free. Dengue, chikungunya and sand-fly-borne leishmaniasis also occur in lowland areas.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/ethiopia",

  countryAlerts: [
    {
      level: "warning",
      title: "Malaria outbreak — elevated risk nationwide",
      message:
        "CDC has reported an ongoing malaria outbreak in Ethiopia, with increased case numbers across all regions. Strict mosquito-bite prevention and chemoprophylaxis for travel below 2,500 m are especially important; seek medical attention promptly for any fever during or after travel.",
      source: "CDC Travelers' Health",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/ethiopia",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever — entry certificate may be required",
      message:
        "A yellow-fever vaccination certificate is required for travelers arriving from (or transiting >12 hours through) a country with risk of YF transmission. Direct travel from Switzerland is not affected, but YF vaccine is separately recommended for most parts of Ethiopia (see disease detail). Carry your International Certificate of Vaccination if you are combining Ethiopia with other African destinations.",
      source: "WHO / Ethiopian entry requirements",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Meningitis belt — seasonal meningococcal risk",
      message:
        "Ethiopia lies in the African meningitis belt. Meningococcal vaccination is recommended for travelers visiting affected areas during the dry season (roughly December–June), and for closer contact with the local population.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/ethiopia",
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
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Recommended for all travelers ≥9 months going to areas at risk (most of the country, except the Afar and Somali lowland regions east of the Rift Valley). Also relevant for onward travel — see country alert on entry requirements.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, especially those visiting smaller cities, rural areas, or staying with friends and relatives.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (a single adult booster is advised — wild/vaccine-derived poliovirus has circulated), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
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
      note: "Recommended for long stays, rural travel, cycling/motorbike trips, work with animals, and for infants and children. Stray dogs are a common rabies vector and post-exposure vaccine may not be readily available locally.",
    },
    {
      name: "Meningococcal",
      audience: "specific",
      note: "Recommended for travel to meningitis-belt areas during the dry season (December–June) and for close contact with the local population. The quadrivalent ACWY vaccine is used.",
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
        "Malaria is present year-round in all areas below 2,500 m, including in and around the capital Addis Ababa (~2,355 m, treated as low/seasonal risk). Risk is absent above 2,500 m in the highlands. P. falciparum predominates (~70%) and is chloroquine-resistant. Chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine or tafenoquine) is recommended for lowland travel.",
      keyFacts: [
        { label: "Risk area", value: "All areas <2,500 m, incl. Addis Ababa" },
        { label: "No risk", value: "Highlands above 2,500 m" },
        { label: "Species", value: "P. falciparum ~70%, P. vivax ~30%" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis + bite protection below 2,500 m" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/ethiopia",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/ethiopia.jpg",
      mapCaption: "Malaria risk areas in Ethiopia (CDC).",
    },
    yellowFever: {
      riskSummary:
        "Yellow fever vaccine is recommended for all travelers ≥9 months going to areas at risk — most of the country, except the Afar and Somali lowland regions. A vaccination certificate is also required for travelers arriving from a YF-risk country (see country alert). Direct travel from Switzerland is not affected by the entry rule.",
      keyFacts: [
        { label: "CDC", value: "Recommended (most areas, except Afar/Somali)" },
        { label: "Entry rule", value: "Cert required if arriving from YF-risk country" },
        { label: "Age", value: "From 9 months" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/ethiopia",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/ethiopia.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Ethiopia (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue transmission occurs in lowland areas, with periodic outbreaks (e.g. in the eastern Dire Dawa / Somali region). Daytime mosquito-bite prevention is the main protection. Risk is lower in the cooler highlands.",
      keyFacts: [
        { label: "Distribution", value: "Lowland areas; periodic outbreaks" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Sporadic chikungunya transmission occurs in lowland areas, with documented outbreaks. Same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
