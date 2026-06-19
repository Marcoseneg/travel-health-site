import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Central African Republic), CDC Yellow Book
// 2024, EKRM/HealthyTravel (Swiss travel medicine authority). Framing
// reflects Swiss BAG schedule. Notable: yellow fever vaccination certificate
// REQUIRED for entry; high chloroquine-resistant malaria year-round
// country-wide; ongoing instability and very limited healthcare access.
export const centralAfricanRepublic: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Use bottled or treated water, avoid ice and raw produce, and eat only thoroughly cooked food. Healthcare access is severely limited — carry a personal medical kit and arrange evacuation insurance. Avoid wading or swimming in fresh water (schistosomiasis risk).",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — chloroquine-resistant malaria risk is high year-round and country-wide, and antimalarial prophylaxis is recommended for all travelers. Dengue and tsetse-fly-borne sleeping sickness are also present. Use DEET or picaridin repellent, cover up, and sleep under an insecticide-treated net.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/central-african-republic",

  countryAlerts: [
    {
      level: "warning",
      title: "Security situation — check travel advice before booking",
      message:
        "The Central African Republic experiences armed conflict, banditry, and major restrictions on movement; medical and evacuation capacity is extremely limited. The Swiss FDFA advises against travel to most of the country. Consult current FDFA travel advice and arrange comprehensive evacuation insurance before any trip.",
      source: "Swiss FDFA / EKRM",
      sourceUrl: "https://www.eda.admin.ch/eda/en/fdfa/representations-and-travel-advice.html",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Yellow fever vaccination certificate required for entry",
      message:
        "The Central African Republic requires proof of yellow fever vaccination for all arriving travelers aged 9 months and older. Carry your International Certificate of Vaccination (yellow card). The vaccine must be given at least 10 days before arrival to be valid, and in Switzerland is only available at approved yellow-fever vaccination centres.",
      source: "CDC / WHO IHR yellow fever requirements",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/central-african-republic",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Meningitis belt — dry season risk",
      message:
        "The Central African Republic sits in or adjacent to the African meningitis belt, where meningococcal disease risk rises during the dry season (roughly December to June). Meningococcal vaccination (ACWY) is recommended, especially for longer stays or close contact with the local population.",
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
      note: "Recommended for all travelers. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Required for entry (certificate checked, ≥9 months) AND medically recommended — the country is yellow-fever endemic. Single dose gives lifelong protection; must be given ≥10 days before arrival. In Switzerland, available only at approved yellow-fever vaccination centres.",
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
      note: "Polio (a booster is advised — poliovirus has circulated recently), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure MMR and polio are up to date.",
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
      note: "Rabid dogs are common and post-exposure treatment is rarely available outside larger urban facilities. Pre-exposure vaccination is recommended for long stays, remote travel, cyclists/bikers, animal workers, and young children.",
    },
    {
      name: "Meningococcal",
      audience: "specific",
      note: "Recommended (ACWY) for travel during the dry season (December–June), and for longer stays or close local contact, given proximity to the meningitis belt.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "CDC reports no current active cholera transmission and the vaccine is generally not recommended; reassess if an outbreak is declared or for high-risk humanitarian/healthcare work.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk in all areas year-round, including the capital Bangui. P. falciparum predominates and is chloroquine-resistant. Continuous antimalarial chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine, or tafenoquine) is recommended for all travelers, combined with strict mosquito-bite prevention. Seek medical attention urgently for any fever during or up to a year after travel.",
      keyFacts: [
        { label: "Risk", value: "High, all areas, year-round" },
        { label: "Species", value: "Mainly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis + bite protection for all travelers" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/central-african-republic",
    },
    yellowFever: {
      riskSummary:
        "The Central African Republic is yellow-fever endemic and the vaccine is medically recommended for all travelers ≥9 months. A vaccination certificate is also REQUIRED for entry (all arrivals ≥9 months). Vaccinate at least 10 days before arrival; see the country alert above.",
      keyFacts: [
        { label: "Risk", value: "Endemic (vaccine recommended)" },
        { label: "Entry rule", value: "Certificate required, ≥9 months" },
        { label: "Timing", value: "≥10 days before arrival" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/central-african-republic",
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
