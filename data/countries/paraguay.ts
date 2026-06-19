import type { CountryInfo } from "./types";

// ── Paraguay (South America) — full brief ───────────────────────────────────
// Sources: CDC Travelers' Health (Paraguay) & CDC Yellow Book 2024;
// EKRM/HealthyTravel (https://www.healthytravel.ch); WHO International Travel
// and Health; PAHO. Framing reflects the Swiss BAG schedule and Swiss travel
// medicine practice.
//
// Notable points captured:
//   • Paraguay was certified malaria-free by WHO in 2018 (first country in
//     the Americas in 45 years). Risk is now effectively absent for typical
//     travellers; we mark malaria "limited" and frame it accordingly.
//   • Yellow fever recommended for most travellers (Paraguay has had YF
//     activity historically); not needed for visits limited to Asunción.
//   • Certificate required when arriving from Bolivia, Brazil, Peru, or
//     Venezuela.
//   • Strong dengue with major periodic epidemics; Zika and chikungunya
//     present.
export const paraguay: CountryInfo = {
  vaccinesRecommended: [
    "Yellow fever",
    "Hepatitis A",
    "Routine vaccines (MMR, Tdap, varicella, polio, COVID-19)",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Typhoid",
    "Rabies",
    "Dengue (selective)",
  ],
  malariaRisk: "limited",
  yellowFever: "required-or-recommended",
  foodWater:
    "Standard food and water precautions, particularly outside Asunción and in rural areas. Use bottled or filtered water for drinking and brushing teeth in rural regions. These precautions reduce traveler's diarrhea, hepatitis A, and typhoid risk.",
  mosquito:
    "Mosquito-bite prevention is the central protection in Paraguay because dengue is common and can cause large epidemics, with Zika and chikungunya also present. The daytime-biting Aedes mosquito spreads all three, so day protection matters: DEET 30%+ or picaridin 20%, long sleeves, and screened or air-conditioned rooms. Malaria is no longer a practical concern for travellers (see below).",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/paraguay",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever — certificate on entry from neighbouring countries",
      message:
        "Paraguay requires proof of yellow fever vaccination for travellers arriving from Bolivia, Brazil, Peru, or Venezuela. Travellers arriving directly from Switzerland are not subject to the entry requirement, but CDC recommends YF vaccination for most travellers to Paraguay other than those limiting their visit to Asunción. Allow ≥10 days between vaccination and travel.",
      source: "Paraguayan health authorities / WHO IHR",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/paraguay",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Malaria-free since 2018; dengue is the main mosquito risk",
      message:
        "Paraguay was certified malaria-free by the WHO in 2018 — the first country in the Americas to achieve this in 45 years. Malaria chemoprophylaxis is not routinely needed. Dengue, by contrast, causes recurrent large epidemics; daytime mosquito-bite prevention is the priority.",
      source: "WHO / PAHO",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Recommended for most travelers to Paraguay; not needed for visits limited to Asunción. A single dose gives lifelong protection. Must be given ≥10 days before travel at an authorised Swiss YF centre. Live vaccine: contraindicated in immunosuppression and pregnancy; caution in adults >60 starting a primary series. Certificate required when arriving from Bolivia, Brazil, Peru, or Venezuela.",
    },
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Paraguay. Not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination. Two doses 6–12 months apart give long-term protection; a single dose covers the trip.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, polio, COVID-19 — per Swiss BAG schedule. Both MMR doses are essential. Adults with a completed polio primary series should have had at least one IPV booster as adults.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider for travelers who may receive medical or dental care, get tattoos or piercings, have new sexual contacts, or stay longer. Part of the routine Swiss childhood schedule since 2019 — most younger travelers are already protected.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-stay travelers, those visiting friends and relatives, off-the-beaten-track itineraries, and travelers with reduced gastric acidity. Less essential for short stays in tourist hubs.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Pre-exposure recommended for long stays, cyclists, motorcyclists, hikers in remote areas, young children, animal workers, and cavers (bat exposure). Pre-exposure simplifies post-bite management — only 2 vaccine doses needed afterwards and no immunoglobulin.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga is recommended only for travelers with a documented prior dengue infection who will be exposed during an outbreak or extended stay. Not for first-time visitors — primary infection after vaccination can be more severe.",
    },
  ],

  diseases: {
    yellowFever: {
      riskSummary:
        "Paraguay has had yellow fever activity historically, and CDC recommends vaccination for most travellers, excluding those who limit their visit to Asunción. A vaccination certificate is required when arriving from Bolivia, Brazil, Peru, or Venezuela.",
      keyFacts: [
        { label: "Vaccine", value: "Single dose, lifelong protection" },
        { label: "Timing", value: "≥10 days before travel" },
        { label: "Recommended", value: "Most travellers (not Asunción-only)" },
        { label: "Not needed", value: "Visits limited to Asunción" },
        { label: "Entry rule", value: "Certificate if arriving from Bolivia, Brazil, Peru, Venezuela" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/paraguay",
    },
    malaria: {
      riskSummary:
        "Paraguay was certified malaria-free by the WHO in 2018 and there is no ongoing local transmission relevant to travellers. Chemoprophylaxis is not routinely recommended. Historically, the limited risk had been in eastern rural departments (e.g. Alto Paraná, Caaguazú, Canindeyú); insect-bite precautions remain sensible for dengue regardless.",
      keyFacts: [
        { label: "Status", value: "WHO-certified malaria-free (2018)" },
        { label: "Risk now", value: "No ongoing transmission for travellers" },
        { label: "Prophylaxis", value: "Not routinely needed" },
        { label: "Historic areas", value: "Eastern rural depts (Alto Paraná, Caaguazú, Canindeyú)" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/paraguay",
    },
    dengue: {
      riskSummary:
        "Dengue is endemic in Paraguay and causes recurrent large epidemics, with peaks in the hot rainy months (roughly December–May). Risk is present countrywide including Asunción. Daytime mosquito-bite prevention is the main protection for every traveler.",
      keyFacts: [
        { label: "Distribution", value: "Countrywide incl. Asunción" },
        { label: "Vector", value: "Aedes aegypti — daytime biter" },
        { label: "Season", value: "Peaks Dec–May; periodic large epidemics" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya circulates in Paraguay and shares the same daytime Aedes vector as dengue, so dengue prevention also protects against it. Joint pain can persist for months. CDC considers routine vaccination generally not recommended; it may be discussed for outbreak settings or extended stays (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    zika: {
      riskSummary:
        "Zika is transmitted by daytime Aedes mosquitoes in Paraguay. Pregnancy and pre-conception planning are the key clinical concerns: pregnant women should avoid travel to Paraguay, and couples should use condoms during travel and for 3 months after return.",
    },
  },
};
