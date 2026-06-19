import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (https://www.healthytravel.ch, Swiss travel
// medicine authority), CDC Travelers' Health & Yellow Book 2024, WHO. Framing
// reflects Swiss BAG schedule. Notable: yellow fever recommended for travel to
// the south (Sahara only is exempt), entry cert required from YF-endemic
// countries; malaria present nearly country-wide (peaks in the rainy season);
// southern Mauritania touches the meningitis belt.
export const mauritania: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Yellow fever (south)", "Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "present",
  yellowFever: "required-or-recommended",
  foodWater:
    "Use bottled or reliably treated water, avoid ice and raw foods from unverified sources, and maintain careful hand hygiene. Healthcare access is limited, so preventing traveler's diarrhea, hepatitis A, and typhoid is a priority.",
  mosquito:
    "Mosquito-bite prevention is essential, particularly in southern regions where malaria is present and risk concentrates in the rainy season (July–October). Use DEET or picaridin repellent, long clothing, and an insecticide-treated bed net, alongside chemoprophylaxis where indicated. Dengue also circulates.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/mauritania",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever — recommended in the south; entry cert from endemic countries",
      message:
        "Yellow fever vaccination is recommended for travelers aged 9 months and older visiting areas south of the Sahara; it is not needed for itineraries limited to the Sahara Desert. Mauritania requires a YF certificate from travelers arriving from a country with yellow fever transmission risk. Direct travel from Switzerland is not subject to the entry requirement.",
      source: "CDC / WHO International Health Regulations",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/mauritania",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Meningitis belt — seasonal meningococcal risk (south)",
      message:
        "Southern Mauritania touches the African meningitis belt. Epidemics of meningococcal disease occur during the dry season, roughly December to June. Meningococcal vaccination (quadrivalent ACWY) is recommended for travelers visiting affected areas during this period, for longer stays, and for close contact with the local population.",
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
      note: "Recommended for all travelers to Mauritania. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
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
      note: "Polio, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "specific",
      note: "Recommended for travelers aged 9 months and older visiting areas south of the Sahara; not needed for Sahara-only itineraries. Required for entry if arriving from a YF-risk country. Must be given at a licensed Swiss YF centre ≥10 days before travel.",
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
      note: "Quadrivalent ACWY vaccination recommended for travel to the south during the dry season (December–June), for longer stays, and for close contact with the local population.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Consider for travelers going to areas of active transmission, aid/relief workers, and those staying in conditions with poor water and sanitation.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Malaria is present in nearly all of Mauritania, with the exception of the far-northern Dakhlet Nouadhibou and Tiris Zemmour regions. Risk is highest in the south and concentrates during the rainy season (July–October). Chloroquine-resistant P. falciparum predominates. Discuss chemoprophylaxis based on itinerary and season.",
      keyFacts: [
        { label: "Risk area", value: "All except Dakhlet Nouadhibou & Tiris Zemmour" },
        { label: "Season", value: "Peaks in rainy season (Jul–Oct), south" },
        { label: "Species", value: "Predominantly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/mauritania",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/mauritania.jpg",
      mapCaption: "Malaria risk areas in Mauritania (CDC).",
    },
    yellowFever: {
      riskSummary:
        "Yellow fever transmission risk exists in southern Mauritania. Vaccination is recommended for travelers aged 9 months and older going south of the Sahara, and a certificate is required for entry if arriving from a YF-risk country (see country alert).",
      keyFacts: [
        { label: "Status", value: "Risk in the south (south of Sahara)" },
        { label: "Recommended", value: "Travelers ≥9 months to the south" },
        { label: "Entry rule", value: "Cert required if arriving from YF country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/mauritania",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/mauritania.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Mauritania (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue circulates in Mauritania, transmitted by daytime-biting Aedes mosquitoes. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Vector", value: "Aedes mosquitoes — bite during daytime" },
        { label: "Prevention", value: "Daytime repellent, covering clothing" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
