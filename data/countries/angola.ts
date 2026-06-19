import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Angola) + CDC Yellow Book 2024;
// EKRM/HealthyTravel (Swiss travel medicine authority, https://www.healthytravel.ch).
// Framing reflects Swiss BAG schedule. Notable: yellow fever is ENDEMIC and a
// valid YF vaccination certificate is REQUIRED for entry for all travelers
// ≥9 months. Malaria risk is HIGH year-round, country-wide. Draft brief —
// pending physician review.
export const angola: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Use bottled or treated water, avoid ice and raw produce, and eat only thoroughly cooked food. Cholera transmission occurs, and healthcare access outside Luanda is limited.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide. Use DEET- or picaridin-based repellent, sleep under treated bed nets, and wear long sleeves at dusk and dawn. Daytime protection also reduces dengue risk.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/angola",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever certificate required for entry",
      message:
        "Angola is yellow-fever endemic and requires proof of yellow fever vaccination for all arriving travelers aged 9 months and older, regardless of country of departure. This means Swiss travelers must be vaccinated and carry a valid International Certificate of Vaccination (the yellow card) — the certificate is valid for life and becomes effective 10 days after vaccination. Plan vaccination well ahead of departure at a licensed Swiss YF vaccination center.",
      source: "CDC / WHO — Angola entry requirements",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/angola",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "High malaria risk — chemoprophylaxis advised",
      message:
        "Malaria is present throughout Angola year-round with chloroquine-resistant P. falciparum. Continuous chemoprophylaxis is recommended for essentially all itineraries. Discuss the regimen (atovaquone-proguanil, doxycycline, or mefloquine) with your travel medicine specialist.",
      source: "EKRM / CDC Yellow Book 2024",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Required for entry AND medically recommended — Angola is YF-endemic. All travelers ≥9 months need a single dose with a valid certificate (effective 10 days after vaccination, lifelong validity). Administered only at licensed Swiss YF vaccination centers; check for contraindications (age >60, immunosuppression, egg allergy).",
    },
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers given limited food/water hygiene, especially those visiting smaller cities, rural areas, or staying with friends and relatives.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (adults need a one-time booster), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Particularly recommended for long stays, remote travel with limited access to care, cycling/motorbike trips, children, and those working with animals. Post-exposure care and immunoglobulin are often unavailable in Angola, strengthening the case for pre-exposure vaccination.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Oral cholera vaccine may be considered for travelers heading to areas with active transmission or working in relief/healthcare settings, or with elevated individual risk.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk throughout the entire country, year-round, including Luanda. Chloroquine-resistant P. falciparum predominates. Continuous chemoprophylaxis plus consistent mosquito-bite prevention is recommended for essentially all travelers.",
      keyFacts: [
        { label: "Risk area", value: "Entire country, year-round (incl. Luanda)" },
        { label: "Species", value: "P. falciparum (chloroquine-resistant)" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
        { label: "Prevention", value: "Chemoprophylaxis + bed nets + repellent" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/angola",
    },
    yellowFever: {
      riskSummary:
        "Angola is yellow-fever endemic. Vaccination is medically recommended for all travelers ≥9 months and a valid YF certificate is REQUIRED for entry for all arrivals regardless of origin (including direct travel from Switzerland). The certificate is lifelong and effective 10 days after vaccination.",
      keyFacts: [
        { label: "Status", value: "Endemic" },
        { label: "Entry rule", value: "Certificate required for all travelers ≥9 months" },
        { label: "Validity", value: "Lifelong; effective 10 days post-dose" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/angola",
    },
    dengue: {
      riskSummary:
        "Dengue transmission occurs, carried by daytime-biting Aedes mosquitoes. Same daytime bite-prevention measures used against malaria mosquitoes also reduce dengue risk.",
      keyFacts: [
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
        { label: "Prevention", value: "Daytime repellent, covering clothing" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
