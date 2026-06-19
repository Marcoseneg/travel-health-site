import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Liberia) + CDC Yellow Book 2024;
// EKRM/HealthyTravel (https://www.healthytravel.ch); WHO. Framing reflects
// Swiss BAG schedule. Notable: yellow fever endemic (recommended for all;
// required when arriving from a YF-risk country); high chloroquine-resistant
// P. falciparum malaria year-round in all regions; Lassa fever endemic and
// history of major Ebola transmission; current clade II mpox activity.
export const liberia: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential — use bottled or properly treated water, avoid ice, and eat only thoroughly cooked, hot food. These measures reduce the risk of traveler's diarrhea, hepatitis A, typhoid, and cholera. Healthcare access is limited, so carry a personal medical kit including standby treatment for traveler's diarrhea.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential and required year-round: malaria risk (chloroquine-resistant P. falciparum) is high across the entire country with no low-risk areas. Use DEET or picaridin repellent, sleep under an insecticide-treated net, and wear covering clothing. The same measures also protect against dengue, transmitted by daytime-biting Aedes mosquitoes.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/liberia",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever — vaccine strongly recommended; certificate required from risk countries",
      message:
        "Liberia is in the yellow fever endemic zone and vaccination is recommended for all travelers ≥9 months for personal protection. A vaccination certificate is required for travelers arriving from a country with yellow fever transmission risk. The vaccine must be given at least 10 days before arrival; carry the international certificate (carnet jaune).",
      source: "CDC Travelers' Health / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/liberia",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Lassa fever, Ebola history, and mpox",
      message:
        "Lassa fever is endemic in Liberia (spread via food or surfaces contaminated by infected rodents), and the country had major Ebola transmission during the 2014–2016 West African outbreak. A clade II mpox outbreak is also ongoing (CDC Level 2). Avoid contact with rodents, bushmeat, and sick people; standard travelers are at low risk, while health and aid workers should take specific precautions.",
      source: "EKRM / CDC",
      sourceUrl: "https://www.healthytravel.ch",
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
      note: "Recommended for all travelers ≥9 months (endemic country); certificate required when arriving from a YF-risk country. Give at least 10 days before travel at a Swiss-approved YF center; carry the international certificate.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for essentially all travelers given high exposure through food and water, particularly outside major hotels, in rural areas, or when visiting friends and relatives.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (a booster is advised for this region), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
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
      note: "Recommended for longer stays, remote travel with limited medical access, cyclists/motorcyclists, children, and anyone working with animals. Post-exposure rabies immunoglobulin is often unavailable locally, which strengthens the case for pre-exposure vaccination.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Consider for aid/health workers, those staying in areas with poor sanitation or active outbreaks, or with individual risk factors. Oral vaccine (Dukoral) per EKRM guidance.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk throughout the entire country, year-round, with no low- or no-risk areas. The dominant parasite is chloroquine-resistant Plasmodium falciparum, the most dangerous form. Chemoprophylaxis is recommended for all travelers in addition to consistent mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk area", value: "All regions, year-round" },
        { label: "Parasite", value: "Mainly P. falciparum (most dangerous)" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis + mosquito protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/liberia",
    },
    yellowFever: {
      riskSummary:
        "Liberia is in the yellow fever endemic zone, and vaccination is medically recommended for all travelers ≥9 months. A certificate is required for travelers arriving from a country with YF transmission risk. Vaccinate at least 10 days before travel and carry the international certificate.",
      keyFacts: [
        { label: "Status", value: "Endemic — vaccine recommended" },
        { label: "Entry rule", value: "Required from YF-risk countries" },
        { label: "Timing", value: "≥10 days before arrival" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/liberia",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/africa.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Africa (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue is present in Liberia, transmitted by daytime-biting Aedes mosquitoes. Risk is year-round in urban and rural areas. The same mosquito-bite prevention used for malaria also protects against dengue.",
      keyFacts: [
        { label: "Distribution", value: "Present nationwide" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
        { label: "Prevention", value: "Daytime repellent and covering clothing" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
