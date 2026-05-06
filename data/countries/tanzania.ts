import type { CountryInfo } from "./types";

// ── Tanzania (East Africa) — full brief ────────────────────────────────────
// Sources: CDC Yellow Book 2024 (Tanzania chapter), CDC Travelers' Health,
// WHO yellow fever risk map (December 2024), Swiss BAG.
export const tanzania: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Yellow fever (entry)", "Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "possible",
  foodWater:
    "Use bottled or treated water and eat thoroughly cooked food. Safari lodges and Zanzibar resorts generally have safer food but precautions still apply elsewhere.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential. Malaria is high-risk on the entire mainland (including Dar es Salaam) and on Zanzibar, Pemba, and Mafia islands. Mt Kilimanjaro climbing routes above 2500m are malaria-free. Chemoprophylaxis recommended for safari and beach itineraries.",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/tanzania",

  countryAlerts: [
    {
      level: "info",
      title: "Polio booster recommended",
      message:
        "Per WHO temporary recommendations, travelers staying in Tanzania longer than 4 weeks should have a documented polio booster within 12 months prior to exit, recorded on an International Certificate of Vaccination.",
      source: "CDC Travelers' Health",
      sourceUrl: "https://wwwnc.cdc.gov/travel/notices",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended; risk of foodborne and waterborne illness is significant.",
    },
    {
      name: "Polio (booster)",
      slug: "polio",
      audience: "all",
      note: "Adult booster recommended; required documentation for stays longer than 4 weeks.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, COVID-19 — per Swiss BAG schedule.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "specific",
      note: "Not medically recommended (low transmission risk). Required at entry only when arriving from a country with yellow fever risk; not required when arriving directly from Switzerland or other non-endemic countries.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "For long stays, rural travel, occupational animal contact, or activities like cycling and hiking.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High year-round risk on the entire mainland (including Dar es Salaam) and on Zanzibar, Pemba, Mafia, and other islands. Low risk only above 2500m elevation (e.g. upper Kilimanjaro climbing routes). Chemoprophylaxis recommended for all standard tourist itineraries.",
      keyFacts: [
        { label: "High risk", value: "Mainland + all islands" },
        { label: "Low risk", value: "Above 2500m only" },
        { label: "Species", value: "P. falciparum (predominant)" },
        { label: "Season", value: "Year-round" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/tanzania",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/tanzania.jpg",
      mapCaption: "Malaria risk areas in Tanzania (CDC).",

    },
    yellowFever: {
      riskSummary:
        "Yellow fever is not medically recommended for travel from non-endemic countries. Entry requirements vary: travelers arriving within 6 days from a YF-endemic country (or from Rwanda) without a vaccination certificate may be vaccinated on arrival. Travelers arriving directly from Switzerland do not need yellow fever vaccination either as a medical necessity or for entry. EKRM advises carrying current entry-requirement documents from the Tanzanian / Zanzibar Ministries of Health, since policies can vary at points of entry.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/tanzania",
    },
  },
};
