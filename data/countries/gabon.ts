import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Gabon), CDC Yellow Book 2024,
// EKRM/HealthyTravel (Swiss travel medicine authority). Framing reflects
// Swiss BAG schedule. Notable: yellow fever vaccination certificate REQUIRED
// for entry (all travelers ≥9 months); high chloroquine-resistant malaria
// year-round country-wide; Zika present.
export const gabon: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Use bottled or treated water, avoid ice and raw produce, and eat only thoroughly cooked food. These measures reduce traveler's diarrhea, hepatitis A, and typhoid. Avoid wading or swimming in fresh water (schistosomiasis risk).",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — chloroquine-resistant malaria risk is high year-round and country-wide, and antimalarial prophylaxis is recommended for all travelers. Dengue and Zika are also present. Use DEET or picaridin repellent, cover up, and sleep under an insecticide-treated net.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/gabon",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever vaccination certificate required for entry",
      message:
        "Gabon requires proof of yellow fever vaccination for all arriving travelers aged 9 months and older, regardless of where they travel from. Carry your International Certificate of Vaccination (yellow card). The vaccine must be given at least 10 days before arrival to be valid, and in Switzerland is only available at approved yellow-fever vaccination centres.",
      source: "CDC / WHO IHR yellow fever requirements",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/gabon",
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
      note: "Required for entry (certificate checked, ≥9 months) AND medically recommended — Gabon is yellow-fever endemic. Single dose gives lifelong protection; must be given ≥10 days before arrival. In Switzerland, available only at approved yellow-fever vaccination centres.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers given widespread food and water exposure, especially those visiting rural areas, staying with friends or relatives, or on longer trips.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure MMR and polio are up to date.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Recommended for unvaccinated travelers. Routine in the Swiss childhood schedule since 1998, so younger travelers are usually covered; older travelers should check their status.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Rabid dogs are common in Gabon and post-exposure treatment can be hard to obtain. Pre-exposure vaccination is recommended for long stays, remote travel, cyclists/bikers, animal workers, and young children.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Oral vaccination may be considered for high-risk travelers (humanitarian/healthcare work, prolonged stays in areas with poor sanitation or active outbreaks).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk in all areas year-round, including Libreville and forested interior regions. P. falciparum predominates and is chloroquine-resistant. Continuous antimalarial chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine, or tafenoquine) is recommended for all travelers, combined with strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk", value: "High, all areas, year-round" },
        { label: "Species", value: "Mainly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis + bite protection for all travelers" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/gabon",
    },
    yellowFever: {
      riskSummary:
        "Gabon is yellow-fever endemic and the vaccine is medically recommended for all travelers ≥9 months. A vaccination certificate is also REQUIRED for entry (all arrivals ≥9 months). Vaccinate at least 10 days before arrival; see the country alert above.",
      keyFacts: [
        { label: "Risk", value: "Endemic (vaccine recommended)" },
        { label: "Entry rule", value: "Certificate required, ≥9 months" },
        { label: "Timing", value: "≥10 days before arrival" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/gabon",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/africa.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Africa (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue is present and transmitted by daytime-biting Aedes mosquitoes, with periodic outbreaks. Daytime mosquito-bite prevention (repellent, covering clothing) is the main protection; this also reduces other arboviral risks including Zika and chikungunya.",
      keyFacts: [
        { label: "Distribution", value: "Present countrywide" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
        { label: "Prevention", value: "Daytime bite protection" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya is present with a history of outbreaks in Gabon, sharing the same daytime Aedes vector as dengue and Zika — so dengue prevention also protects against it. Vaccination may be considered in outbreak settings (see EKRM statement).",
      keyFacts: [
        { label: "Distribution", value: "Present; past outbreaks" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
        { label: "Prevention", value: "Daytime bite protection" },
      ],
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
