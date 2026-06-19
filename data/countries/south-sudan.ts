import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (South Sudan) and Yellow Book 2024; WHO; EKRM
// / HealthyTravel (https://www.healthytravel.ch); Swiss FDFA travel advice.
// Framing reflects Swiss BAG schedule. Notable: yellow-fever vaccine
// recommended AND certificate required for entry; meningitis-belt country;
// high year-round malaria; active cholera; ongoing conflict and instability.
export const southSudan: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential — active cholera transmission is widespread. Drink only bottled or treated water, avoid ice and unpeeled produce, and eat thoroughly cooked food. Healthcare access is severely limited.",
  mosquito:
    "Aggressive mosquito-bite prevention (DEET or picaridin repellent, long sleeves, treated bed nets) is essential — malaria risk is high year-round throughout the country. Dengue and other insect-borne diseases (incl. African sleeping sickness, leishmaniasis) also occur. Ongoing conflict makes much of the country unsafe.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/south-sudan",

  countryAlerts: [
    {
      level: "warning",
      title: "Armed conflict and instability — travel strongly discouraged",
      message:
        "South Sudan is affected by ongoing armed conflict, intercommunal violence and political instability. The Swiss Federal Department of Foreign Affairs (FDFA) advises against travel. Medical infrastructure is minimal and evacuation may be difficult. Anyone who must travel should arrange comprehensive security and medical-evacuation support in advance.",
      source: "Swiss FDFA / EDA travel advice",
      sourceUrl: "https://www.eda.admin.ch",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Yellow fever — vaccine recommended AND certificate required",
      message:
        "Yellow fever vaccine is recommended for all travelers ≥9 months, and South Sudan requires proof of YF vaccination for entry for all arriving travelers ≥9 months old. Carry your International Certificate of Vaccination. Vaccination must be given at an approved center at least 10 days before arrival.",
      source: "CDC / WHO / South Sudan entry requirements",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/south-sudan",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Cholera — widespread active transmission",
      message:
        "Active cholera transmission is widespread in South Sudan. Maintain strict food and water hygiene; the oral cholera vaccine may be considered for aid/health workers and those in higher-risk settings.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/south-sudan",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Meningitis belt — seasonal meningococcal risk",
      message:
        "South Sudan lies in the African meningitis belt. Meningococcal vaccination is recommended for travelers visiting affected areas during the dry season (roughly December–June) and for close contact with the local population.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/south-sudan",
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
      note: "Recommended for all travelers ≥9 months and required for entry (see country alert). Must be given at least 10 days before arrival; carry the International Certificate of Vaccination.",
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
      note: "Polio basic immunization (a single adult booster is advised — poliovirus has circulated), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
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
      note: "Recommended for long stays, rural travel, work with animals, and for infants and children. Post-exposure rabies vaccine may not be readily available in-country.",
    },
    {
      name: "Meningococcal",
      audience: "specific",
      note: "Recommended for travel to meningitis-belt areas during the dry season (December–June) and for close contact with the local population. The quadrivalent ACWY vaccine is used.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "May be considered given widespread active transmission, particularly for aid/health workers and those with limited access to safe food and water. Disease remains rare in ordinary travelers who maintain strict hygiene.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Malaria risk is high year-round in all areas of South Sudan. P. falciparum predominates and is chloroquine-resistant. Chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine or tafenoquine) is recommended for all travelers, together with aggressive bite prevention.",
      keyFacts: [
        { label: "Risk area", value: "All areas, high risk year-round" },
        { label: "Species", value: "P. falciparum predominant" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis for all travelers + bite protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/south-sudan",
    },
    yellowFever: {
      riskSummary:
        "Yellow fever vaccine is recommended for all travelers ≥9 months, and a vaccination certificate is required for entry for all arriving travelers ≥9 months old (see country alert). Plan vaccination at least 10 days before arrival.",
      keyFacts: [
        { label: "CDC", value: "Recommended for all travelers ≥9 months" },
        { label: "Entry rule", value: "Certificate required for all travelers" },
        { label: "Timing", value: "At least 10 days before arrival" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/south-sudan",
    },
    dengue: {
      riskSummary:
        "Dengue is transmitted by daytime-biting Aedes mosquitoes and occurs in South Sudan. Daytime mosquito-bite prevention is the main protection alongside malaria measures.",
      keyFacts: [
        { label: "Distribution", value: "Present; lowland and urban areas" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
