import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024,
// WHO Polio IHR Emergency Committee (PHEIC, updated 2026). Framing reflects
// Swiss BAG schedule. Notable: Pakistan is one of only two countries with
// ENDEMIC wild poliovirus (WPV1) transmission — a polio booster is
// recommended, and Pakistan imposes an EXIT requirement for proof of polio
// vaccination. Chloroquine-resistant malaria in all areas below ~2,500 m
// (including cities). Ongoing XDR-typhoid outbreak. No YF risk; certificate
// only if arriving from a YF-endemic country.
export const pakistan: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Typhoid",
    "Polio booster",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Rabies",
    "Japanese encephalitis",
    "Cholera",
  ],
  malariaRisk: "present",
  yellowFever: "none",
  foodWater:
    "Traveler's diarrhea, typhoid, and hepatitis A are common. Use bottled or properly treated water, avoid ice from unverified sources, and stick to thoroughly cooked food and fruit you peel yourself. An extensively drug-resistant (XDR) typhoid strain circulates, so food/water hygiene and typhoid vaccination are especially important.",
  mosquito:
    "Dengue causes large urban outbreaks (Karachi, Lahore, Rawalpindi/Islamabad), so daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential. Malaria is present in all areas below ~2,500 m including cities, requiring dawn/dusk and overnight protection; in rural areas also protect against Japanese encephalitis. Tick precautions reduce risk of Crimean-Congo hemorrhagic fever.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/pakistan",

  countryAlerts: [
    {
      level: "warning",
      title: "Polio — booster recommended; exit requirement applies",
      message:
        "Pakistan is one of only two countries with endemic wild poliovirus (WPV1) transmission. Travelers should be fully immunized per the Swiss BAG schedule; adults who completed their childhood series should receive a one-time IPV booster before travel. Pakistan also imposes an EXIT requirement: travelers leaving the country after a stay of four weeks or more must show proof of polio vaccination received between 4 weeks and 12 months before departure, documented in an International Certificate of Vaccination (ICVP). Plan timing with your travel medicine specialist.",
      source: "WHO Polio IHR Emergency Committee / CDC",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever — certificate only if arriving from a risk country",
      message:
        "There is no yellow fever risk in Pakistan. A YF vaccination certificate is required only for travelers aged 1 year and older arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
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
      note: "Recommended for most travelers, and particularly for those visiting friends and relatives, staying in rural areas, or for longer stays. An extensively drug-resistant (XDR) typhoid strain is circulating — vaccination and strict food/water hygiene both matter.",
    },
    {
      name: "Polio booster",
      slug: "polio",
      audience: "all",
      note: "Pakistan has endemic wild poliovirus. Adults who completed their childhood polio series should receive a one-time IPV booster. Note the exit requirement for stays of four weeks or more (see alert). Document in an ICVP.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (plus booster — see above), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Confirm measles (MMR) protection given ongoing global resurgence.",
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
      note: "Particularly recommended for long stays, travel to rural areas with limited access to post-exposure care, cyclists/motorbike trips, infants and children, and those working with animals. Stray dogs are a common rabies vector.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending extended time (typically a month or more, or shorter with high-risk rural exposure) in rural rice-growing and irrigated areas during transmission season. Not needed for short urban itineraries.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "May be considered for aid/relief workers or travelers heading to areas of active transmission under poor sanitary conditions. Not needed for typical travel.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Chloroquine-resistant malaria is present in all areas, including all cities, below about 2,500 m elevation. Chemoprophylaxis is recommended for travel to risk areas; areas above 2,500 m (high-mountain regions) are risk-free. P. vivax predominates, with P. falciparum also present.",
      keyFacts: [
        { label: "Risk", value: "All areas incl. cities below ~2,500 m" },
        { label: "No risk", value: "Above ~2,500 m (high-mountain regions)" },
        { label: "Species", value: "Mostly P. vivax; ~20% P. falciparum (chloroquine-resistant)" },
        { label: "Prevention", value: "Chemoprophylaxis recommended for risk areas" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/pakistan",
    },
    dengue: {
      riskSummary:
        "Endemic with large seasonal outbreaks in major cities including Karachi, Lahore, and Rawalpindi/Islamabad; risk peaks during and after the monsoon (roughly August–November). Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Major cities: Karachi, Lahore, Rawalpindi/Islamabad" },
        { label: "Season", value: "Peaks August–November (post-monsoon)" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Pakistan. A YF certificate is required only for travelers aged 1 year and older arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/pakistan",
    },
    chikungunya: {
      riskSummary:
        "Transmission occurs with periodic outbreaks, including in southern urban centers. Same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination considered for extended stays in elevated-risk areas or outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
