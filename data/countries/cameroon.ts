import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Cameroon), CDC Yellow Book 2024,
// EKRM/HealthyTravel (Swiss travel medicine authority). Framing reflects
// Swiss BAG schedule. Notable: yellow fever vaccination certificate REQUIRED
// for entry (all travelers ≥1 year); high chloroquine-resistant malaria
// year-round country-wide; meningococcal risk in the far-north meningitis
// belt during the dry season.
export const cameroon: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Use bottled or treated water, avoid ice and raw produce, and eat only thoroughly cooked food. These measures reduce traveler's diarrhea, hepatitis A, typhoid, and cholera. Avoid wading or swimming in fresh water (schistosomiasis risk).",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — chloroquine-resistant malaria risk is high year-round and country-wide, and antimalarial prophylaxis is recommended for all travelers. Dengue is also present. Use DEET or picaridin repellent, cover up, and sleep under an insecticide-treated net.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/cameroon",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever vaccination certificate required for entry",
      message:
        "Cameroon requires proof of yellow fever vaccination for all arriving travelers aged 1 year and older, regardless of where they travel from. Carry your International Certificate of Vaccination (yellow card). Plan ahead: the vaccine must be given at least 10 days before arrival to be valid, and in Switzerland it is only available at approved yellow-fever vaccination centres.",
      source: "CDC / WHO IHR yellow fever requirements",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/cameroon",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Meningitis belt — far-north regions",
      message:
        "Northern Cameroon lies in the African meningitis belt, where meningococcal disease risk rises during the dry season (roughly December to June). Meningococcal vaccination (ACWY) is recommended for travel to these regions, especially for longer stays or close contact with the local population.",
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
      note: "Recommended for all travelers to Cameroon. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Required for entry (certificate checked) AND medically recommended — Cameroon is yellow-fever endemic. Single dose gives lifelong protection; must be given ≥10 days before arrival. In Switzerland, available only at approved yellow-fever vaccination centres.",
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
      note: "Polio (a booster is advised — wild/vaccine-derived poliovirus has circulated), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure MMR and polio are up to date.",
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
      note: "Rabid dogs are common in Cameroon and post-exposure treatment can be hard to obtain outside major cities. Pre-exposure vaccination is recommended for long stays, remote travel, cyclists/bikers, animal workers, and young children.",
    },
    {
      name: "Meningococcal",
      audience: "specific",
      note: "Recommended (ACWY) for travel to the far-north meningitis belt during the dry season (December–June), and for longer stays or close local contact.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Cholera transmission is presumed present. Oral vaccination may be considered for high-risk travelers (humanitarian/healthcare work, prolonged stays in areas with poor sanitation or active outbreaks).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk in all areas of Cameroon year-round, including cities. P. falciparum predominates and is chloroquine-resistant. Continuous antimalarial chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine, or tafenoquine) is recommended for all travelers, combined with strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk", value: "High, all areas, year-round" },
        { label: "Species", value: "Mainly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis + bite protection for all travelers" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/cameroon",
    },
    yellowFever: {
      riskSummary:
        "Cameroon is yellow-fever endemic and the vaccine is medically recommended for all travelers ≥9 months. A vaccination certificate is also REQUIRED for entry (all arrivals ≥1 year). Vaccinate at least 10 days before arrival; see the country alert above.",
      keyFacts: [
        { label: "Risk", value: "Endemic (vaccine recommended)" },
        { label: "Entry rule", value: "Certificate required, ≥1 year" },
        { label: "Timing", value: "≥10 days before arrival" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/cameroon",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/africa.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Africa (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue is present and transmitted by daytime-biting Aedes mosquitoes. Daytime mosquito-bite prevention (repellent, covering clothing) is the main protection; this also reduces other arboviral risks.",
      keyFacts: [
        { label: "Distribution", value: "Present countrywide" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
        { label: "Prevention", value: "Daytime bite protection" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
