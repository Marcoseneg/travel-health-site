import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024.
// Framing reflects Swiss BAG schedule. Notable: yellow fever vaccination is
// REQUIRED for entry (and recommended on health grounds); high year-round
// malaria country-wide; the savanna north lies in the meningitis belt
// (seasonal meningococcal risk, dry season Dec–June); poliovirus has been
// detected — keep polio cover current.
export const benin: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Use bottled or treated water and eat only thoroughly cooked food. Traveler's diarrhea is common, and food/water hygiene reduces the risk of hepatitis A and typhoid. Avoid contact with fresh water (lakes, rivers) where schistosomiasis is a risk.",
  mosquito:
    "Strict mosquito-bite prevention is essential year-round. Malaria transmission is high country-wide — combine DEET or picaridin repellent, long clothing, and a bed net with chemoprophylaxis. Daytime protection also reduces dengue and chikungunya risk.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/benin",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever vaccination required for entry",
      message:
        "Benin requires proof of yellow fever vaccination for all travelers aged 9 months and older, regardless of where they arrive from. The vaccination certificate becomes valid 10 days after the dose and is valid for life. Plan vaccination at a Swiss yellow-fever vaccination centre well before departure.",
      source: "CDC / WHO IHR",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/benin",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Meningitis belt — seasonal meningococcal risk",
      message:
        "Northern Benin lies in the African meningitis belt, where meningococcal disease risk peaks in the dry season (December–June). Vaccination (ACWY) is recommended for travelers to affected areas during this period, for longer stays, or with close local contact.",
      source: "CDC / EKRM",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Polio — keep immunisation current",
      message:
        "Poliovirus has been detected in Benin in the past year. Ensure your polio basic immunisation (per the Swiss BAG schedule) is complete and consider a booster if your last dose was more than 10 years ago.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/benin",
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
      note: "Required for entry AND recommended on health grounds for all travelers aged 9 months and older. Benin is yellow-fever endemic. Administered at a designated Swiss yellow-fever vaccination centre; certificate valid 10 days after the dose and for life.",
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
      note: "Polio basic immunisation, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure polio cover is current (see alert).",
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
      note: "Rabid dogs are common in Benin. Pre-exposure vaccination is recommended for long stays, rural or remote travel, cycling/motorbike trips, work with animals, and for children. Post-exposure care can be hard to access locally.",
    },
    {
      name: "Meningococcal",
      audience: "specific",
      note: "ACWY vaccination recommended for travel to the meningitis belt during the dry season (December–June), for longer stays, or with close contact to the local population.",
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
        "High risk in all regions of Benin, year-round, including Cotonou and Porto-Novo. P. falciparum (the most dangerous species) predominates and is chloroquine-resistant. Chemoprophylaxis plus consistent mosquito-bite prevention is strongly recommended for all travelers.",
      keyFacts: [
        { label: "Risk", value: "High, all regions, year-round" },
        { label: "Species", value: "Mainly P. falciparum (chloroquine-resistant)" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
        { label: "Prevention", value: "Chemoprophylaxis + bite protection + bed net" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/benin",
    },
    yellowFever: {
      riskSummary:
        "Benin is yellow-fever endemic. Vaccination is required for entry and recommended on health grounds for all travelers aged 9 months and older. See country alert for entry details.",
      keyFacts: [
        { label: "Entry rule", value: "Certificate required, age ≥9 months" },
        { label: "Health advice", value: "Recommended for all travelers ≥9 months" },
        { label: "Validity", value: "From 10 days after dose; lifelong" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/benin",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/africa.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Africa (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue is transmitted year-round by daytime-biting Aedes mosquitoes. The same bite-prevention measures used for malaria help reduce risk; protection during daylight hours is the key addition.",
      keyFacts: [
        { label: "Distribution", value: "Present country-wide" },
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
