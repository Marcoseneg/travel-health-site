import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024,
// WHO. Framing reflects Swiss BAG schedule. Notable: Uganda is a yellow-fever
// risk country — vaccine recommended for all travelers AND a YF certificate is
// required for entry. Malaria is high risk year-round, country-wide (incl.
// Kampala). Schistosomiasis risk in Lake Victoria and other freshwater.
export const uganda: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Yellow fever",
    "Typhoid",
    "Routine vaccines",
  ],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera", "Meningococcal"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Use bottled or treated water, avoid ice from unverified sources, and eat thoroughly cooked food served hot. Strict food and water precautions reduce the risk of traveler's diarrhea, hepatitis A, typhoid, and cholera — particularly important outside well-run lodges and hotels. Cholera transmission occurs in some districts.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria is high risk year-round and country-wide, including Kampala. Use DEET or picaridin repellent, cover up at dusk and after dark, and sleep under an insecticide-treated net. Daytime protection also reduces dengue risk.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/uganda",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever vaccination required for entry",
      message:
        "Uganda requires proof of yellow fever vaccination for all arriving travelers aged 1 year and older, regardless of where you are coming from. Carry your International Certificate of Vaccination or Prophylaxis (ICVP, the 'yellow card'). The vaccine must be given at an approved Swiss YF vaccination centre at least 10 days before arrival. The certificate is valid for life. Travelers with a medical contraindication need a documented exemption.",
      source: "WHO / Uganda Ministry of Health",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Cholera transmission in some districts",
      message:
        "Cholera transmission has been reported in parts of Uganda. The oral cholera vaccine may be considered for travelers to affected areas, those staying in conditions with poor sanitation, aid and healthcare workers, or travelers with increased individual risk. Strict food and water hygiene remains the primary protection.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/uganda",
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
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Recommended for all travelers aged 9 months and older — Uganda is a yellow-fever risk country. A vaccination certificate is also REQUIRED for entry (see country alert). Give at an approved Swiss YF centre at least 10 days before travel; certificate valid for life.",
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
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking and remote travel, small children, those working with animals, cavers — bats). Post-exposure care and rabies immunoglobulin can be hard to obtain locally.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Consider for travelers to areas with active transmission, aid and healthcare workers, those staying in poor sanitary conditions, or with increased individual risk. No internal disease page — discuss with your travel clinic.",
    },
    {
      name: "Meningococcal",
      audience: "specific",
      note: "Consider for travelers to the northern regions during the dry season (December–June, the African 'meningitis belt' fringe), for longer stays, or close contact with the local population.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk year-round throughout the entire country, including the capital Kampala and all safari and gorilla-trekking destinations. P. falciparum (the most dangerous species) predominates and is chloroquine-resistant. Continuous chemoprophylaxis is recommended for essentially all travelers, in addition to strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk area", value: "Entire country, year-round, incl. Kampala" },
        { label: "Species", value: "P. falciparum predominant; also vivax/ovale/malariae" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis (atovaquone-proguanil, doxycycline, or mefloquine) + bite protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/uganda",
    },
    yellowFever: {
      riskSummary:
        "Uganda is a yellow-fever risk country. Vaccination is recommended for all travelers aged 9 months and older, and a vaccination certificate is required for entry for travelers aged 1 year and older (see country alert). Give the vaccine at an approved Swiss YF centre at least 10 days before arrival; certificate is valid for life.",
      keyFacts: [
        { label: "Risk", value: "Endemic — domestic transmission risk" },
        { label: "Vaccine", value: "Recommended for all travelers ≥9 months" },
        { label: "Entry rule", value: "Certificate required for all arrivals ≥1 year" },
        { label: "Timing", value: "≥10 days before travel; valid for life" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/uganda",
    },
    dengue: {
      riskSummary:
        "Dengue transmission occurs and outbreaks have been reported. Risk is lower than in Southeast Asia but real — the Aedes mosquito bites during the daytime, so day-time bite prevention complements the dusk-to-dawn protection used for malaria.",
      keyFacts: [
        { label: "Distribution", value: "Sporadic; periodic outbreaks" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
        { label: "Prevention", value: "Repellent and covering up by day" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
