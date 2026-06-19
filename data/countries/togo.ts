import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Togo) + CDC Yellow Book 2024;
// EKRM/HealthyTravel (https://www.healthytravel.ch); WHO. Framing reflects
// Swiss BAG schedule. Notable: yellow fever required for entry (all arriving
// travelers ≥9 months); high chloroquine-resistant P. falciparum malaria year-
// round in all regions; meningitis-belt country (dry season Dec–Jun); cholera
// activity in the Maritime region; Lassa fever a regional concern.
export const togo: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential — use bottled or properly treated water, avoid ice, and eat only thoroughly cooked, hot food. These measures reduce the risk of traveler's diarrhea, hepatitis A, typhoid, and cholera (cholera has been active in the Maritime region around Lomé). Healthcare access is limited, so carry a personal medical kit including standby treatment for traveler's diarrhea.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential and required year-round: malaria risk (chloroquine-resistant P. falciparum) is high across the entire country with no low-risk areas. Use DEET or picaridin repellent, sleep under an insecticide-treated net, and wear covering clothing. The same measures also protect against other mosquito-borne infections such as dengue.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/togo",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever vaccination certificate required for entry",
      message:
        "Togo requires proof of yellow fever vaccination for all arriving travelers aged 9 months and older. The vaccine must be given at least 10 days before arrival to be valid. Swiss travelers must receive it at an approved yellow fever vaccination center and carry the international certificate (carnet jaune).",
      source: "CDC Travelers' Health / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/togo",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Cholera in the Maritime region; Lassa fever",
      message:
        "Cholera has been reported in Togo's Maritime region (including around Lomé), reinforcing the need for strict food and water hygiene. Lassa fever (rodent-borne) is also a regional concern. Avoid contact with rodents and bushmeat; the cholera vaccine may be considered for higher-risk travelers.",
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
      note: "Required for entry AND medically recommended for all travelers ≥9 months. Give at least 10 days before travel at a Swiss-approved YF center; carry the international certificate.",
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
      name: "Meningococcal",
      audience: "specific",
      note: "Togo lies in the African meningitis belt. Quadrivalent (ACWY) vaccination is recommended for travel during the dry season (December–June), for longer stays, and for close contact with the local population.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Consider for travel to the Maritime region during active transmission, for aid/health workers, and for those staying in areas with poor sanitation. Oral vaccine (Dukoral) per EKRM guidance.",
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
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/togo",
    },
    yellowFever: {
      riskSummary:
        "Togo is in the yellow fever endemic zone, and vaccination is medically recommended for all travelers ≥9 months. It is also required for entry. Vaccinate at least 10 days before travel and carry the international certificate.",
      keyFacts: [
        { label: "Status", value: "Endemic — vaccine recommended" },
        { label: "Entry rule", value: "Certificate required for entry" },
        { label: "Timing", value: "≥10 days before arrival" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/togo",
    },
    dengue: {
      riskSummary:
        "Dengue and other mosquito-borne viral infections occur in the West African region, transmitted by daytime-biting Aedes mosquitoes. The same mosquito-bite prevention used for malaria also protects against dengue.",
      keyFacts: [
        { label: "Mosquito", value: "Aedes — bites during daytime" },
        { label: "Prevention", value: "Daytime repellent and covering clothing" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
