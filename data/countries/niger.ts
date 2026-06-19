import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (https://www.healthytravel.ch, Swiss travel
// medicine authority), CDC Travelers' Health & Yellow Book 2024, WHO. Framing
// reflects Swiss BAG schedule. Notable: yellow fever vaccination is mandatory
// for entry; malaria is high-risk country-wide; Niger lies in the core
// meningitis belt with seasonal meningococcal risk; cholera transmission occurs.
export const niger: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Use bottled or reliably treated water, avoid ice and raw foods from unverified sources, and maintain careful hand hygiene. Healthcare access is severely limited, and cholera transmission occurs (notably Tahoua and Zinder regions), so preventing diarrheal disease, hepatitis A, typhoid, and cholera is a priority.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential. Malaria risk is high country-wide, year-round in the populated south, so DEET or picaridin repellent, long clothing, and an insecticide-treated bed net are needed alongside chemoprophylaxis. Dengue and Zika also circulate. Meningococcal disease (airborne, not mosquito-borne) peaks in the dry season — see the meningitis belt alert.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/niger",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever vaccination required for entry",
      message:
        "Niger requires proof of yellow fever vaccination for arriving travelers aged 9 months and older, regardless of country of departure — including travelers coming directly from Switzerland. Carry your International Certificate of Vaccination or Prophylaxis (yellow card). The vaccine must be given at a licensed Swiss yellow fever vaccination centre at least 10 days before travel.",
      source: "CDC / WHO International Health Regulations",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/niger",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Meningitis belt — seasonal meningococcal risk",
      message:
        "Niger lies in the African meningitis belt. Epidemics of meningococcal disease occur during the dry season, roughly December to June. Meningococcal vaccination (quadrivalent ACWY) is recommended for travelers visiting during this period, for longer stays, and for close contact with the local population.",
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
      note: "Recommended for all travelers to Niger. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Required for entry and medically recommended for all travelers aged 9 months and older going south of the Sahara. Single dose gives lifelong protection; must be given at a licensed Swiss YF centre ≥10 days before arrival.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers to Niger, especially those visiting rural areas, staying with friends and relatives, or in poor hygienic conditions.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio (ensure a booster — wild/vaccine-derived poliovirus circulates in the region), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Recommended per individual risk and stay duration. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Consider pre-exposure vaccination for longer stays, rural travel, cyclists/motorbike riders, those working with animals, and children. Post-exposure treatment can be hard to obtain locally.",
    },
    {
      name: "Meningococcal",
      audience: "specific",
      note: "Quadrivalent ACWY vaccination recommended for travel during the dry season (December–June), for longer stays, and for close contact with the local population — Niger is in the meningitis belt.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Consider for travelers going to areas of active transmission (e.g. Tahoua, Zinder), aid/relief workers, and those staying in conditions with poor water and sanitation.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk throughout Niger, all areas. Risk is year-round in the populated southern regions and intensifies with the rains. Chloroquine-resistant P. falciparum predominates. Chemoprophylaxis is recommended for essentially all travelers in addition to strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk area", value: "All of Niger; year-round in the south" },
        { label: "Species", value: "Predominantly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/niger",
    },
    yellowFever: {
      riskSummary:
        "Yellow fever is endemic, particularly south of the Sahara. Vaccination is both required for entry and medically recommended for all travelers aged 9 months and older. See the country alert for the entry requirement.",
      keyFacts: [
        { label: "Status", value: "Endemic (south of Sahara)" },
        { label: "Entry rule", value: "Vaccination required (≥9 months)" },
        { label: "Recommended", value: "All travelers ≥9 months" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/niger",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/niger.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Niger (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue circulates in Niger, transmitted by daytime-biting Aedes mosquitoes. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Vector", value: "Aedes mosquitoes — bite during daytime" },
        { label: "Prevention", value: "Daytime repellent, covering clothing" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
