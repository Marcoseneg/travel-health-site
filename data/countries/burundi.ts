import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (https://www.healthytravel.ch — Swiss travel
// medicine authority), CDC Travelers' Health & Yellow Book 2024, WHO. Framing
// reflects Swiss BAG schedule. Notable: yellow fever endemic and required for
// entry; high year-round country-wide malaria (chloroquine-resistant
// P. falciparum); periodic cholera transmission. AI-drafted — pending physician
// review.
export const burundi: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential — use bottled or reliably treated water, avoid ice and raw produce, and eat only thoroughly cooked food. These measures reduce traveler's diarrhea, hepatitis A, typhoid, and cholera (periodic transmission reported around Bujumbura).",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria transmission is high year-round, country-wide. Use DEET or picaridin repellent, cover up at dawn and dusk, and sleep under an insecticide-treated net.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/burundi",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever vaccination required for entry",
      message:
        "A valid yellow fever vaccination certificate is required for all travelers aged 9 months and older entering Burundi. The certificate becomes valid 10 days after vaccination and is valid for life. Yellow fever is also endemic, so the vaccine is medically recommended regardless of the entry rule.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/burundi",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Cholera transmission",
      message:
        "Cholera transmission has been reported in the Bujumbura area and surrounding divisions. Adhere strictly to safe food and water practices; oral cholera vaccine may be considered for some travelers.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/burundi",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to East Africa. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Required for entry (certificate for all travelers ≥9 months) and medically recommended — Burundi is yellow-fever-endemic. Single dose gives lifelong protection. Administered in Switzerland only at approved yellow fever vaccination centres.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, especially those visiting rural areas, staying with friends and relatives, or in poor hygienic conditions.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles protection is up to date.",
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
      note: "Recommended for longer stays, remote travel, cycling/motorbike trips, work with animals, and for children. Rabid dogs are present and post-exposure care is hard to obtain locally.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Oral cholera vaccine may be considered for travel to areas with active transmission (e.g. Bujumbura), or for aid/health workers and those in poor sanitary conditions. Discuss individual risk with your travel medicine specialist.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk throughout the country, year-round, including Bujumbura. The predominant parasite is the dangerous P. falciparum, with chloroquine resistance present. Chemoprophylaxis is recommended for all travelers in addition to strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk", value: "High, country-wide, year-round" },
        { label: "Parasite", value: "Mainly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/burundi",
    },
    yellowFever: {
      riskSummary:
        "Yellow fever is endemic. Vaccination is recommended for all travelers aged 9 months and older, and a valid certificate is required for entry. A single dose provides lifelong protection. See country alert for entry details.",
      keyFacts: [
        { label: "Risk", value: "Endemic" },
        { label: "Entry rule", value: "Certificate required (≥9 months)" },
        { label: "Vaccine", value: "One dose, lifelong validity" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/burundi",
    },
  },
};
