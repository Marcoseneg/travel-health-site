import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (https://www.healthytravel.ch — Swiss travel
// medicine authority), CDC Travelers' Health & Yellow Book 2024, WHO. Framing
// reflects Swiss BAG schedule. Notable: yellow fever endemic and required for
// entry; high year-round country-wide malaria (chloroquine-resistant
// P. falciparum); limited healthcare outside Brazzaville. AI-drafted — pending
// physician review.
export const congo: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential — use bottled or reliably treated water, avoid ice and raw produce, and eat only thoroughly cooked food. These measures reduce traveler's diarrhea, hepatitis A, typhoid, and cholera. Healthcare access outside Brazzaville is limited; travel and repatriation insurance is strongly advised.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide. Use DEET or picaridin repellent, cover up at dawn and dusk, and sleep under an insecticide-treated net. The same precautions also reduce dengue and chikungunya, which are transmitted by daytime-biting Aedes mosquitoes.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/congo",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever vaccination required for entry",
      message:
        "A valid yellow fever vaccination certificate is required for all travelers aged 9 months and older entering the Republic of the Congo. The certificate becomes valid 10 days after vaccination and is valid for life. Carry the original certificate with you. Yellow fever is also endemic, so the vaccine is medically recommended regardless of the entry rule.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/congo",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Limited medical infrastructure",
      message:
        "Medical care outside Brazzaville is very limited and serious cases often require evacuation. Arrange comprehensive travel-health and repatriation insurance before departure, and carry a personal medical kit including standby malaria treatment if advised by your travel medicine specialist.",
      source: "EKRM / HealthyTravel",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Central Africa. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Required for entry (certificate for all travelers ≥9 months) and medically recommended — the Republic of the Congo is yellow-fever-endemic. Single dose gives lifelong protection. Administered in Switzerland only at approved yellow fever vaccination centres.",
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
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure polio and measles protection are up to date.",
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
      note: "Oral cholera vaccine may be considered for travel to areas with active transmission or for aid/health workers and those in poor sanitary conditions. Discuss individual risk with your travel medicine specialist.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk throughout the country, year-round, including Brazzaville and Pointe-Noire. The predominant parasite is the dangerous P. falciparum, with widespread chloroquine resistance. Chemoprophylaxis is recommended for all travelers in addition to strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk", value: "High, country-wide, year-round" },
        { label: "Parasite", value: "Mainly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/republic-congo",
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
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/republic-congo",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/africa.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Africa (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue transmission occurs, carried by daytime-biting Aedes mosquitoes. The same bite-prevention measures used against malaria and chikungunya also protect against dengue.",
      keyFacts: [
        { label: "Vector", value: "Aedes mosquito — bites during daytime" },
        { label: "Prevention", value: "Daytime repellent and covering up" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya is present and transmitted by the same daytime Aedes mosquitoes as dengue, so dengue prevention also protects against chikungunya. Vaccination may be considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
