import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (https://www.healthytravel.ch — Swiss travel
// medicine authority), CDC Travelers' Health & Yellow Book 2024, WHO. Framing
// reflects Swiss BAG schedule. Notable: yellow fever endemic and required for
// entry; high year-round country-wide malaria (chloroquine-resistant
// P. falciparum); recurrent Ebola (incl. Bundibugyo virus) and Mpox outbreaks;
// widespread cholera; severely limited healthcare and ongoing instability in
// the east. AI-drafted — pending physician review.
export const drCongo: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential — use bottled or reliably treated water, avoid ice and raw produce, and eat only thoroughly cooked food. Cholera transmission is widespread, so hygiene is critical. Healthcare access is severely limited; comprehensive travel and repatriation insurance is essential.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide. Use DEET or picaridin repellent, cover up at dawn and dusk, and sleep under an insecticide-treated net. The same precautions also reduce dengue. Active outbreaks of Ebola (Bundibugyo virus) and Mpox have been reported in recent years.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/democratic-republic-of-congo",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever vaccination required for entry",
      message:
        "A valid yellow fever vaccination certificate is required for all travelers aged 9 months and older entering the Democratic Republic of the Congo. The certificate becomes valid 10 days after vaccination and is valid for life. Yellow fever is also endemic, so the vaccine is medically recommended regardless of the entry rule.",
      source: "CDC / WHO",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/democratic-republic-of-congo",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Ebola and Mpox outbreaks",
      message:
        "The DRC has recurrent outbreaks of Ebola (including Bundibugyo virus disease) and Mpox. Risk to ordinary travelers is generally low, but check current CDC and WHO notices before travel, avoid contact with sick people and with wild or bush-meat animals, and practice strict hand hygiene. Aid and health workers face higher risk and should seek specialist advice.",
      source: "CDC Travel Health Notices / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/notices",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Cholera widespread",
      message:
        "Active cholera transmission is widespread. Adhere strictly to safe food and water practices. Oral cholera vaccine may be recommended for some travelers — discuss with your travel medicine specialist.",
      source: "CDC / WHO",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/democratic-republic-of-congo",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Instability and limited medical care",
      message:
        "Security conditions are volatile, particularly in the eastern provinces, and medical infrastructure is severely limited nationwide. Serious cases usually require evacuation. Consult Swiss FDFA travel advice, arrange comprehensive insurance with repatriation cover, and carry a personal medical kit including standby malaria treatment if advised.",
      source: "EKRM / HealthyTravel; Swiss FDFA",
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
      note: "Required for entry (certificate for all travelers ≥9 months) and medically recommended — the DRC is yellow-fever-endemic. Single dose gives lifelong protection. Administered in Switzerland only at approved yellow fever vaccination centres.",
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
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. A polio booster may be advised; ensure measles protection is current.",
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
      name: "Meningococcal",
      audience: "specific",
      note: "Consider for travel during the dry season (December–June) to areas of the African meningitis belt, and for longer or close-contact stays. ACWY conjugate vaccine.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Oral cholera vaccine may be considered given widespread transmission, particularly for aid/health workers and those in poor sanitary conditions. Discuss individual risk with your travel medicine specialist.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk throughout the country, year-round, including Kinshasa. The predominant parasite is the dangerous P. falciparum, with chloroquine resistance documented. Chemoprophylaxis is recommended for all travelers in addition to strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk", value: "High, country-wide, year-round" },
        { label: "Parasite", value: "Mainly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/democratic-republic-of-congo",
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
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/democratic-republic-of-congo",
    },
    dengue: {
      riskSummary:
        "Dengue transmission occurs, carried by daytime-biting Aedes mosquitoes. The same bite-prevention measures used against malaria also protect against dengue.",
      keyFacts: [
        { label: "Vector", value: "Aedes mosquito — bites during daytime" },
        { label: "Prevention", value: "Daytime repellent and covering up" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
