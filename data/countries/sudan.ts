import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Sudan) and Yellow Book 2024; WHO; EKRM /
// HealthyTravel (https://www.healthytravel.ch); Swiss FDFA travel advice.
// Framing reflects Swiss BAG schedule. Notable: yellow-fever vaccine
// recommended south of the Sahara (not for Khartoum/desert), not required for
// entry; meningitis-belt country; widespread cholera; high malaria; ongoing
// armed conflict since 2023.
export const sudan: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever (south)", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential — active cholera transmission is widespread. Drink only bottled or treated water, avoid ice and unpeeled produce, and eat thoroughly cooked food. Healthcare access is severely limited; the country has been affected by ongoing armed conflict since 2023.",
  mosquito:
    "Aggressive mosquito-bite prevention (DEET or picaridin repellent, long sleeves, treated bed nets) is essential — malaria risk is high in most areas. Dengue and sand-fly-borne leishmaniasis also occur; avoid tick bites (Crimean-Congo hemorrhagic fever, African tick-bite fever). Meningococcal disease risk rises in the dry season.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/sudan",

  countryAlerts: [
    {
      level: "warning",
      title: "Armed conflict — travel strongly discouraged",
      message:
        "Sudan has been affected by widespread armed conflict since April 2023, with severe disruption to infrastructure and healthcare. The Swiss Federal Department of Foreign Affairs (FDFA) advises against travel. Anyone who must travel should arrange comprehensive security and medical-evacuation support in advance.",
      source: "Swiss FDFA / EDA travel advice",
      sourceUrl: "https://www.eda.admin.ch",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Cholera — widespread active transmission",
      message:
        "Active cholera transmission is widespread in Sudan. Maintain strict food and water hygiene; the oral cholera vaccine may be considered for aid/health workers and those in higher-risk settings.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/sudan",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever — recommended south of the Sahara",
      message:
        "YF vaccine is recommended for travelers ≥9 months going to areas south of the Sahara Desert; it is not needed for Khartoum or the desert/northern areas. A YF certificate is NOT required for entry from Switzerland, but may be required if arriving from another YF-risk country.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/sudan",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Meningitis belt — seasonal meningococcal risk",
      message:
        "Sudan lies in the African meningitis belt. Meningococcal vaccination is recommended for travelers visiting affected areas during the dry season (roughly December–June) and for close contact with the local population.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/sudan",
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
      audience: "specific",
      note: "Recommended for travelers ≥9 months going south of the Sahara Desert; not needed for Khartoum or the northern desert areas. Not required for entry from Switzerland (see country alert).",
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
      note: "Polio basic immunization (a single adult booster is advised — enhanced polio precautions apply), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
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
        "Malaria risk is high in all areas of Sudan. P. falciparum strongly predominates (~90%) and is chloroquine-resistant. Chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine or tafenoquine) is recommended for all travelers, together with aggressive bite prevention.",
      keyFacts: [
        { label: "Risk area", value: "All areas, high risk" },
        { label: "Species", value: "P. falciparum ~90%, P. vivax 5–10%" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis for all travelers + bite protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/sudan",
    },
    yellowFever: {
      riskSummary:
        "Yellow fever vaccine is recommended for travelers ≥9 months going to areas south of the Sahara Desert; it is not needed for Khartoum or the northern desert areas. Not required for entry from Switzerland, but a certificate may be required if arriving from another YF-risk country.",
      keyFacts: [
        { label: "CDC", value: "Recommended south of the Sahara" },
        { label: "No risk", value: "Khartoum / northern desert areas" },
        { label: "Entry rule", value: "Not required from Switzerland" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/sudan",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/sudan.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Sudan (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue is transmitted by daytime-biting Aedes mosquitoes and occurs in Sudan, including periodic outbreaks (notably in eastern areas around Port Sudan). Daytime mosquito-bite prevention is the main protection alongside malaria measures.",
      keyFacts: [
        { label: "Distribution", value: "Present; periodic outbreaks (e.g. east)" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
