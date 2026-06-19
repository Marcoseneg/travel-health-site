import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (https://www.healthytravel.ch — Swiss travel
// medicine authority), CDC Travelers' Health & Yellow Book 2024, WHO. Framing
// reflects Swiss BAG schedule. Notable: malaria risk concentrated in
// lower-altitude areas (Kigali and high-altitude Volcanoes National Park are
// low-risk); yellow fever NOT generally recommended for direct travel but a
// certificate is required if arriving from a YF-endemic country; periodic
// cholera in the Western Province. AI-drafted — pending physician review.
export const rwanda: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Yellow fever", "Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Use bottled or reliably treated water, avoid ice and raw produce, and eat thoroughly cooked food. These measures reduce traveler's diarrhea, hepatitis A, and typhoid. Periodic cholera transmission has been reported in the Western Province.",
  mosquito:
    "Malaria risk is concentrated in lower-altitude areas; Kigali and high-altitude regions (Volcanoes National Park) are low-risk. Chemoprophylaxis is recommended for low-altitude itineraries. Use DEET or picaridin repellent, cover up at dawn and dusk, and sleep under an insecticide-treated net. The same precautions also reduce dengue.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/rwanda",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever — entry certificate if arriving from a risk country",
      message:
        "There is no yellow fever risk in Rwanda, and the vaccine is generally not recommended for direct travel from Switzerland. However, a valid certificate is required for travelers aged 9 months and older arriving from (or transiting through) a yellow-fever-risk country. Plan vaccination accordingly if your itinerary includes another African destination.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/rwanda",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Cholera in Western Province",
      message:
        "Cholera transmission has been reported in parts of the Western Province. Adhere to safe food and water practices; oral cholera vaccine may be considered for travel to affected areas.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/rwanda",
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
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, especially those visiting smaller cities or rural areas or staying with friends and relatives.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles protection is up to date.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "specific",
      note: "Not generally recommended for direct travel from Switzerland (no domestic risk), but a certificate is required if arriving from a yellow-fever-risk country. Single dose gives lifelong protection. See country alert.",
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
      note: "Recommended for longer stays, remote travel, cycling/motorbike trips, work with animals, and for children. Rabid dogs are commonly found in Rwanda and post-exposure care can be hard to obtain locally.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Oral cholera vaccine may be considered for travel to areas of active transmission (e.g. Western Province), or for aid/health workers and those in poor sanitary conditions.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Present mainly in lower-altitude areas, year-round. Kigali and high-altitude regions including Volcanoes National Park (gorilla trekking) are low-risk. Chemoprophylaxis is recommended for low-altitude itineraries; the predominant parasite is P. falciparum with chloroquine resistance.",
      keyFacts: [
        { label: "Higher risk", value: "Lower-altitude areas, year-round" },
        { label: "Low risk", value: "Kigali; Volcanoes National Park (high altitude)" },
        { label: "Parasite", value: "Mainly P. falciparum, chloroquine-resistant" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine for low-altitude travel" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/rwanda",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. The vaccine is generally not recommended for direct travel from Switzerland, but a valid certificate is required for travelers ≥9 months arriving from a yellow-fever-risk country. See country alert.",
      keyFacts: [
        { label: "Risk", value: "None in country" },
        { label: "Entry rule", value: "Certificate if arriving from risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/rwanda",
    },
    dengue: {
      riskSummary:
        "Dengue transmission can occur, carried by daytime-biting Aedes mosquitoes. The same bite-prevention measures used against malaria also protect against dengue.",
      keyFacts: [
        { label: "Vector", value: "Aedes mosquito — bites during daytime" },
        { label: "Prevention", value: "Daytime repellent and covering up" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
