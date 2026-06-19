import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (https://www.healthytravel.ch, Swiss travel
// medicine authority), CDC Travelers' Health & Yellow Book 2024, WHO. Framing
// reflects Swiss BAG schedule. Notable: yellow fever endemic and recommended
// for all travelers; malaria high-risk country-wide year-round; northern
// Nigeria lies in the meningitis belt; poliovirus and cholera circulate; mpox
// is endemic.
export const nigeria: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential, especially outside major hotels. Use bottled or reliably treated water, avoid ice and raw foods from unverified sources, and maintain careful hand hygiene. Cholera transmission is widespread, so preventing diarrheal disease, hepatitis A, typhoid, and cholera is a priority.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential. Malaria risk is high year-round, country-wide, so DEET or picaridin repellent, long clothing, and an insecticide-treated bed net are needed alongside chemoprophylaxis. Dengue, Zika, and chikungunya also circulate. Meningococcal disease (airborne) peaks in the dry season in the north, and mpox circulates endemically.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/nigeria",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever endemic — vaccination recommended; entry rule from endemic countries",
      message:
        "Yellow fever is endemic in Nigeria and vaccination is recommended for all travelers aged 9 months and older. Nigeria requires a YF certificate from travelers arriving from a country with yellow fever transmission risk; direct travel from Switzerland is not subject to the entry requirement, but vaccination is still strongly advised on medical grounds. Carry your International Certificate of Vaccination or Prophylaxis (yellow card).",
      source: "CDC / WHO International Health Regulations",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/nigeria",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Meningitis belt — seasonal meningococcal risk (north)",
      message:
        "Northern Nigeria lies in the African meningitis belt. Epidemics of meningococcal disease occur during the dry season, roughly December to June. Meningococcal vaccination (quadrivalent ACWY) is recommended for travelers visiting affected areas during this period, for longer stays, and for close contact with the local population.",
      source: "CDC / EKRM",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Poliovirus circulation — ensure booster",
      message:
        "Vaccine-derived poliovirus has been detected in Nigeria. Travelers should ensure their polio immunization is up to date; a single lifetime adult booster is recommended for travel to affected countries per Swiss BAG and WHO guidance.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/nigeria",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Nigeria. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Recommended for all travelers aged 9 months and older (yellow fever is endemic). A certificate is required for entry if arriving from a YF-risk country. Single dose gives lifelong protection; must be given at a licensed Swiss YF centre ≥10 days before travel.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers to Nigeria, especially those visiting rural areas, staying with friends and relatives, or in poor hygienic conditions.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio (booster recommended — vaccine-derived poliovirus circulates), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
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
      note: "Quadrivalent ACWY vaccination recommended for travel to northern Nigeria during the dry season (December–June), for longer stays, and for close contact with the local population — the north is in the meningitis belt.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Consider for travelers going to areas of active transmission (widespread in Nigeria), aid/relief workers, and those staying in conditions with poor water and sanitation.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk throughout Nigeria, all regions, year-round. Chloroquine-resistant P. falciparum predominates. Chemoprophylaxis is recommended for essentially all travelers in addition to strict mosquito-bite prevention.",
      keyFacts: [
        { label: "Risk area", value: "All regions, year-round" },
        { label: "Species", value: "Predominantly P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/nigeria",
    },
    yellowFever: {
      riskSummary:
        "Yellow fever is endemic in Nigeria. Vaccination is recommended for all travelers aged 9 months and older. A certificate is required for entry if arriving from a YF-risk country (see country alert).",
      keyFacts: [
        { label: "Status", value: "Endemic" },
        { label: "Recommended", value: "All travelers ≥9 months" },
        { label: "Entry rule", value: "Cert required if arriving from YF country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/nigeria",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/africa.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Africa (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue circulates in Nigeria, transmitted by daytime-biting Aedes mosquitoes. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Vector", value: "Aedes mosquitoes — bite during daytime" },
        { label: "Prevention", value: "Daytime repellent, covering clothing" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya circulates in Nigeria, spread by the same daytime-biting Aedes mosquitoes as dengue, so the same bite-prevention measures apply. Vaccination may be considered for extended stays or in outbreak settings (see EKRM statement).",
      keyFacts: [
        { label: "Vector", value: "Aedes mosquitoes — bite during daytime" },
        { label: "Prevention", value: "Daytime repellent; vaccine in outbreaks/long stays" },
      ],
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
