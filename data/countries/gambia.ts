import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024.
// Framing reflects Swiss BAG schedule. Notable: yellow fever is recommended
// on health grounds (Gambia is YF endemic) and the certificate is REQUIRED
// for travelers arriving from a YF-risk country — but most Swiss tourists
// travel via a stop in a YF country, so carrying the certificate is the safe
// default. High year-round malaria country-wide; eastern Gambia borders the
// meningitis belt (seasonal meningococcal risk, dry season Dec–June).
export const gambia: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Use bottled or treated water and avoid raw produce. Resort areas have safer food but precautions still apply, reducing the risk of traveler's diarrhea, hepatitis A, and typhoid. Avoid contact with fresh water (the Gambia River, creeks) where schistosomiasis is a risk.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, including the coastal resort strip. Combine DEET or picaridin repellent, long clothing, and a bed net with chemoprophylaxis. Daytime protection also reduces dengue and chikungunya risk.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/the-gambia",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever — certificate required if arriving from a YF country",
      message:
        "The Gambia requires proof of yellow fever vaccination for travelers aged 9 months and older arriving from (or having transited) a country with yellow fever risk. It is not required for direct travel from Switzerland. However, the Gambia is itself yellow-fever endemic and CDC recommends vaccination on health grounds — and many itineraries route through a YF country, so carrying a valid certificate is the safe default. Confirm your routing with a Swiss travel medicine specialist.",
      source: "CDC / WHO IHR",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/the-gambia",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Meningitis belt — seasonal meningococcal risk",
      message:
        "Eastern Gambia borders the African meningitis belt, where meningococcal disease risk peaks in the dry season (December–June). Vaccination (ACWY) is recommended for travelers to affected areas during this period, for longer stays, or with close local contact.",
      source: "CDC / EKRM",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers aged 1 year and older. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Recommended on health grounds for all travelers aged 9 months and older (Gambia is YF endemic). A certificate is also required for entry if arriving from a YF-risk country — see country alert. Administered at a designated Swiss yellow-fever vaccination centre; certificate valid 10 days after the dose and for life.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers given widespread risk, and especially for those visiting friends and relatives, staying in rural areas, or with longer or adventurous itineraries.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunisation, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
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
      note: "Rabid dogs are common in the Gambia. Pre-exposure vaccination is recommended for long stays, rural or remote travel, cycling/motorbike trips, work with animals, and for children. Post-exposure care can be hard to access locally.",
    },
    {
      name: "Meningococcal",
      audience: "specific",
      note: "ACWY vaccination recommended for travel to meningitis-belt areas during the dry season (December–June), for longer stays, or with close contact to the local population.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Consider only for higher-risk travelers — aid/health workers, those staying in areas with active outbreaks or poor sanitation. Not needed for typical tourist itineraries.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk in all regions of the Gambia, year-round, including the coastal resort areas around Banjul and Serrekunda. P. falciparum (the most dangerous species) predominates and is chloroquine-resistant. Chemoprophylaxis plus consistent mosquito-bite prevention is strongly recommended for all travelers.",
      keyFacts: [
        { label: "Risk", value: "High, all regions, year-round" },
        { label: "Species", value: "Mainly P. falciparum (chloroquine-resistant)" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
        { label: "Prevention", value: "Chemoprophylaxis + bite protection + bed net" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/gambia-the",
    },
    yellowFever: {
      riskSummary:
        "The Gambia is yellow-fever endemic and CDC recommends vaccination on health grounds for all travelers aged 9 months and older. The certificate is required for entry only if arriving from a YF-risk country (see country alert).",
      keyFacts: [
        { label: "Health advice", value: "Recommended for all travelers ≥9 months" },
        { label: "Entry rule", value: "Required if arriving from a YF country" },
        { label: "Validity", value: "From 10 days after dose; lifelong" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/gambia-the",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/africa.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Africa (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue is transmitted by daytime-biting Aedes mosquitoes and circulates in the region. The same bite-prevention measures used for malaria help reduce risk; protection during daylight hours is the key addition.",
      keyFacts: [
        { label: "Distribution", value: "Present in the region" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
        { label: "Prevention", value: "Daytime repellent + clothing" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya circulates in the region and shares the daytime Aedes mosquito vector with dengue, so the same daytime bite-prevention measures apply. Vaccination is considered only in specific outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
