import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024,
// WHO Polio IHR Emergency Committee (PHEIC, updated 2026). Framing reflects
// Swiss BAG schedule. Notable: chloroquine-resistant malaria in the
// Chittagong Hill Tracts and eastern/northern border districts (Dhaka itself
// is risk-free); year-round dengue with large urban outbreaks; WHO lists
// Bangladesh among polio-affected states — a one-time adult booster is
// reasonable. No YF risk; certificate only required if arriving from a
// YF-endemic country.
export const bangladesh: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Typhoid",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Rabies",
    "Japanese encephalitis",
    "Cholera",
    "Dengue",
  ],
  malariaRisk: "present",
  yellowFever: "none",
  foodWater:
    "Traveler's diarrhea, typhoid, and hepatitis A are common. Use bottled or properly treated water, avoid ice from unverified sources, and stick to thoroughly cooked food and fruit you peel yourself. Cholera circulates in some divisions, so careful food and water hygiene is especially important outside major hotels.",
  mosquito:
    "Dengue is endemic year-round with very large urban outbreaks (notably in Dhaka), so daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential everywhere. For rural rice-growing areas add dawn/dusk and overnight protection for Japanese encephalitis, and for the eastern hill and border districts also for malaria.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/bangladesh",

  countryAlerts: [
    {
      level: "info",
      title: "Polio — WHO recommends a booster for some travelers",
      message:
        "Bangladesh is among the states WHO lists as affected by poliovirus under the standing public-health emergency. Travelers should be fully immunized against polio per the Swiss BAG schedule; adults who completed their childhood series are generally advised to have had one lifetime IPV booster. Discuss documentation in an International Certificate of Vaccination (ICVP) with your travel medicine specialist if you plan a long stay.",
      source: "WHO Polio IHR Emergency Committee / CDC",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever — certificate only if arriving from a risk country",
      message:
        "There is no yellow fever risk in Bangladesh. A YF vaccination certificate is required only for travelers arriving from (or transiting more than 12 hours through) a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
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
      note: "Recommended for most travelers to Bangladesh, and particularly for those visiting friends and relatives, staying in rural areas, or with longer stays. Note: an extensively drug-resistant (XDR) typhoid strain circulates in the region — prevention through food/water hygiene and vaccination matters.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (plus adult booster — see alert), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Confirm measles (MMR) protection given ongoing global resurgence.",
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
      note: "Consider for travelers spending extended time (typically a month or more, or shorter with high-risk rural exposure) in rice-growing and pig-farming areas during transmission season. Not needed for short urban itineraries.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "May be considered for aid/relief workers or travelers heading to areas of active transmission under poor sanitary conditions. Not needed for typical tourist travel.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga® vaccination is currently considered only for travelers with documented prior dengue infection who will have substantial exposure in a high-transmission setting (see EKRM statement).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Chloroquine-resistant malaria is present, concentrated in the eastern and northern hill and border districts. The Chittagong Hill Tracts (Rangamati, Bandarban, Khagrachari) carry the highest risk; Cox's Bazar, and parts of Mymensingh, Rangpur and Sylhet divisions also have risk. Dhaka and most central plains are risk-free. Chemoprophylaxis is recommended for the higher-risk hill/border areas; elsewhere mosquito-bite protection is the main measure.",
      keyFacts: [
        { label: "Highest risk", value: "Chittagong Hill Tracts (Rangamati, Bandarban, Khagrachari)" },
        { label: "Also risk", value: "Cox's Bazar; parts of Mymensingh, Rangpur, Sylhet" },
        { label: "No risk", value: "Dhaka and most central plains" },
        { label: "Species", value: "Mostly P. falciparum; some P. vivax (chloroquine-resistant)" },
        { label: "Prevention", value: "Chemoprophylaxis for hill/border areas; bite protection elsewhere" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/bangladesh",
    },
    dengue: {
      riskSummary:
        "Endemic year-round with large seasonal outbreaks, especially in Dhaka and other urban centers; risk peaks during and after the monsoon (roughly June–October). Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide; major urban outbreaks in Dhaka" },
        { label: "Season", value: "Year-round; peaks June–October (monsoon)" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Bangladesh. A YF certificate is required only for travelers arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/bangladesh",
    },
    chikungunya: {
      riskSummary:
        "Transmission occurs with periodic outbreaks, including significant urban activity in Dhaka in recent years. Same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
