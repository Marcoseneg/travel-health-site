import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024.
// Framing reflects Swiss BAG schedule. Notable: malaria is limited to rare
// cases in the southern border belt below ~1,700 m (mosquito-avoidance only,
// no chemoprophylaxis for typical itineraries); the high valleys and main
// cultural circuit (Thimphu, Paro, Punakha) are malaria-free. High-altitude
// travel is common — acute mountain sickness is a practical concern on passes
// and treks. No YF risk; certificate only if arriving from a YF-endemic
// country.
export const bhutan: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Typhoid",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Rabies",
    "Japanese encephalitis",
  ],
  malariaRisk: "limited",
  yellowFever: "none",
  foodWater:
    "Traveler's diarrhea, typhoid, and hepatitis A are the main concerns. Use bottled or properly treated water, avoid ice from unverified sources, and favor thoroughly cooked food and fruit you peel yourself — particularly outside established hotels and on treks.",
  mosquito:
    "Mosquito-borne risk is low and confined to the warmer southern lowlands. There, use daytime protection (DEET or picaridin repellent, long sleeves) against dengue and at dawn/dusk against Japanese encephalitis, plus malaria bite protection. The high valleys and main cultural circuit have little to no mosquito-borne risk.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/bhutan",

  countryAlerts: [
    {
      level: "info",
      title: "Altitude — acute mountain sickness on high routes",
      message:
        "Much of Bhutan lies at altitude, and treks and road passes routinely exceed 3,000 m. Ascend gradually, allow time to acclimatize, and recognize symptoms of acute mountain sickness (headache, nausea, sleep disturbance). Discuss preventive measures and standby medication (e.g. acetazolamide) with your travel medicine specialist before a high-altitude trek.",
      source: "EKRM / CDC",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever — certificate only if arriving from a risk country",
      message:
        "There is no yellow fever risk in Bhutan. A YF vaccination certificate is required only for travelers arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      source: "CDC / WHO",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers from one year of age. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, and particularly for those staying with friends and relatives, in rural areas, or for longer stays.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Confirm measles (MMR) protection given ongoing global resurgence.",
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
      note: "Particularly recommended for long stays, treks and travel to areas with limited access to post-exposure care, cyclists, infants and children, and those working with animals. Stray dogs are the main rabies vector.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending extended time (typically a month or more, or shorter with high-risk rural exposure) in the southern agricultural lowlands during transmission season. Not needed for the high-altitude cultural circuit.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is limited to rare cases in the southern border belt below about 1,700 m — the districts of Chukha, Dagana, Pemagatshel, Samdrup Jongkhar, Samtse, Sarpang and Zhemgang. Because risk to travelers is low, CDC advises mosquito-avoidance measures only (no chemoprophylaxis) for typical itineraries; standby treatment may be discussed for prolonged rural stays in the southern belt. The high valleys and main cultural circuit (Thimphu, Paro, Punakha) are malaria-free.",
      keyFacts: [
        { label: "Where", value: "Southern border belt below ~1,700 m (7 districts)" },
        { label: "No risk", value: "High valleys: Thimphu, Paro, Punakha" },
        { label: "Species", value: "Mostly P. vivax; some P. falciparum (chloroquine-resistant)" },
        { label: "Prevention", value: "Mosquito avoidance only for most travelers" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/bhutan",
    },
    dengue: {
      riskSummary:
        "Dengue transmission occurs in the warmer southern lowlands, with seasonal activity around the monsoon. Higher-altitude areas have little to no risk. Daytime mosquito-bite prevention is the main protection where risk exists.",
      keyFacts: [
        { label: "Distribution", value: "Southern lowlands; minimal at altitude" },
        { label: "Season", value: "Mainly monsoon and post-monsoon months" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Bhutan. A YF certificate is required only for travelers arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/bhutan",
    },
  },
};
