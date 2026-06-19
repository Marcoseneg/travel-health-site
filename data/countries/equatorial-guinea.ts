import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Equatorial Guinea), CDC Yellow Book 2024,
// EKRM/HealthyTravel (Swiss travel medicine authority). Framing reflects
// Swiss BAG schedule. Notable: yellow fever recommended for all travelers and
// a certificate is required when arriving from a YF-risk country; high
// chloroquine-resistant malaria year-round country-wide.
export const equatorialGuinea: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Use bottled or treated water, avoid ice and raw produce, and eat only thoroughly cooked food. These measures reduce traveler's diarrhea, hepatitis A, and typhoid. Avoid wading or swimming in fresh water (schistosomiasis risk).",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — chloroquine-resistant malaria risk is high year-round and country-wide, and antimalarial prophylaxis is recommended for all travelers. Dengue is also present. Use DEET or picaridin repellent, cover up, and sleep under an insecticide-treated net.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/equatorial-guinea",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever certificate required if arriving from a risk country",
      message:
        "Equatorial Guinea requires proof of yellow fever vaccination from travelers aged 9 months and older arriving from a country with risk of YF transmission. Direct travel from Switzerland does not trigger this rule, but the vaccine is still medically recommended. Carry your International Certificate of Vaccination if you have transited or stayed in a YF-risk country; give the vaccine ≥10 days before arrival.",
      source: "CDC / WHO IHR yellow fever requirements",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/equatorial-guinea",
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
      note: "Medically recommended for all travelers ≥9 months; a certificate is required if arriving from a YF-risk country. Single dose gives lifelong protection; give ≥10 days before arrival. In Switzerland, available only at approved yellow-fever vaccination centres.",
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
      note: "Rabid dogs are common in Equatorial Guinea and post-exposure treatment can be hard to obtain. Pre-exposure vaccination is recommended for long stays, remote travel, cyclists/bikers, animal workers, and young children.",
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
        "High risk in all areas year-round, including Bioko Island and the mainland (Río Muni). P. falciparum predominates and is chloroquine-resistant. Continuous antimalarial chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine, or tafenoquine) is recommended for all travelers, combined with strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk", value: "High, all areas, year-round" },
        { label: "Species", value: "Mainly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis + bite protection for all travelers" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/equatorial-guinea",
    },
    yellowFever: {
      riskSummary:
        "Equatorial Guinea is in the yellow-fever endemic zone and the vaccine is medically recommended for all travelers ≥9 months. A certificate is required only when arriving from a YF-risk country. Vaccinate at least 10 days before arrival; see the country alert above.",
      keyFacts: [
        { label: "Risk", value: "Endemic (vaccine recommended)" },
        { label: "Entry rule", value: "Certificate if from YF-risk country" },
        { label: "Timing", value: "≥10 days before arrival" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/equatorial-guinea",
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
