import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Yellow Book 2024 / CDC Travelers' Health,
// PAHO/WHO cholera updates. Framing reflects the Swiss BAG schedule. Notable:
// malaria present countrywide (P. falciparum ~99%, chloroquine-sensitive);
// ongoing cholera transmission tied to displacement and the security crisis;
// very limited healthcare and significant civil unrest / gang violence. No
// yellow fever risk in country; YF certificate only required if arriving from a
// YF-endemic country.
export const haiti: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Hepatitis B",
    "Cholera",
    "Rabies",
    "Dengue",
  ],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Strict food and water precautions are essential given ongoing cholera transmission and limited sanitation: drink only bottled, boiled, or reliably treated water, avoid ice and raw or undercooked food, and wash or disinfect hands frequently. These measures also reduce the risk of traveler's diarrhea, hepatitis A, and typhoid. Avoid wading in floodwater (leptospirosis).",
  mosquito:
    "Malaria is present countrywide, so day-and-night mosquito protection plus prophylaxis is needed (DEET or picaridin repellent, long sleeves, bed nets, protection at dawn and dusk). Year-round dengue and Zika risk make daytime bite prevention important everywhere, including coastal and cruise-port areas such as Labadee.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/haiti",

  countryAlerts: [
    {
      level: "warning",
      title: "Ongoing cholera transmission",
      message:
        "Cholera is actively transmitted in Haiti, with localized outbreaks continuing in displacement sites amid the humanitarian and security crisis. Drink only safe water, eat well-cooked food, and maintain strict hand hygiene. Oral cholera vaccination should be discussed with a travel medicine specialist, particularly for aid workers, longer stays, or those working in or near affected communities.",
      source: "PAHO / WHO cholera updates",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Security and limited healthcare",
      message:
        "Haiti faces severe civil unrest and gang violence, and access to medical care is very limited. Travelers should check current government travel advice before any trip, ensure comprehensive travel and medical-evacuation insurance, and recognize that local treatment for malaria or other emergencies may be hard to obtain.",
      source: "EKRM / travel advisories",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever — entry certificate only if arriving from a risk country",
      message:
        "There is no yellow fever risk in Haiti and the vaccine is not recommended for the destination itself. A YF vaccination certificate is required only for travelers arriving from (or transiting) a country with yellow fever transmission risk. Direct travel from Switzerland is not affected.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/haiti",
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
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles protection is up to date.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended given poor sanitary conditions — particularly for long-term travelers, those visiting friends and relatives, and travelers to rural areas.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually covered.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Oral cholera vaccination should be considered given active transmission — particularly for aid and humanitarian workers, longer stays, and those working in or near affected communities. Discuss with a travel medicine specialist.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Particularly recommended given limited local access to reliable post-exposure treatment: for long stays, high individual risk (cycling/motorbike trips, remote areas, infants and children, those working with animals). Dogs are the main rabies vector.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga® vaccination is currently recommended only for travelers with documented prior dengue infection who will be exposed in a region with high dengue transmission.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Malaria risk is present throughout the country at all elevations, including coastal and cruise-port areas such as Labadee. The parasite is almost entirely P. falciparum (~99%) and remains chloroquine-sensitive. Chemoprophylaxis is recommended for all travelers, alongside consistent mosquito-bite prevention. Seek medical attention promptly for any fever during or after travel.",
      keyFacts: [
        { label: "Risk areas", value: "Countrywide, all elevations incl. Labadee" },
        { label: "Parasite", value: "P. falciparum (~99%), chloroquine-sensitive" },
        { label: "Prevention", value: "Chemoprophylaxis for all travelers + mosquito protection" },
        { label: "After travel", value: "Any fever needs urgent medical assessment" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/haiti",
    },
    dengue: {
      riskSummary:
        "Endemic year-round, with peaks during and after the rainy season. Transmission occurs throughout the country. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide" },
        { label: "Season", value: "Year-round; peaks in rainy season" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    zika: {
      riskSummary:
        "Zika transmission has been reported in Haiti. Because Zika infection in pregnancy can cause serious birth defects, pregnant travelers are advised not to travel to areas with risk; those planning pregnancy should discuss timing and precautions with their doctor. Zika can also be sexually transmitted, so condom use and bite prevention are advised for couples.",
      keyFacts: [
        { label: "Pregnancy", value: "Avoid travel if pregnant; risk of birth defects" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
        { label: "Sexual", value: "Can be sexually transmitted — use condoms" },
      ],
      cdcMapUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/haiti",
    },
  },
};
