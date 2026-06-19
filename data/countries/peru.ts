import type { CountryInfo } from "./types";

// ── Peru (South America) — full brief ───────────────────────────────────────
// Sources: CDC Travelers' Health & Yellow Book (Peru, 2024/2026 update), WHO,
// EKRM/HealthyTravel (https://www.healthytravel.ch) — Swiss travel medicine
// authority. Framing reflects Swiss BAG schedule.
// Notable points captured:
//   • Yellow fever is recommended for the Amazon/jungle lowlands (e.g. Loreto,
//     Madre de Dios, Amazonas, San Martín, Ucayali below ~2300 m) but NOT for
//     Lima, Cusco, Machu Picchu, the Inca Trail, Lake Titicaca, or highlands.
//   • Malaria risk is in the Amazon lowlands east of the Andes (notably Loreto
//     — Iquitos — and Madre de Dios — Puerto Maldonado); Lima, Cusco, Machu
//     Picchu and Lake Titicaca are NO-risk.
//   • Dengue is a strong nationwide threat in low-altitude areas; Peru has seen
//     large recent epidemics.
//   • ALTITUDE illness is a major practical concern for the classic Cusco /
//     Sacred Valley / Machu Picchu / Titicaca itinerary.
export const peru: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Hepatitis B", "Routine vaccines"],
  vaccinesConsider: ["Typhoid", "Yellow fever", "Rabies", "Chikungunya"],
  malariaRisk: "limited",
  yellowFever: "required-or-recommended",
  foodWater:
    "Food and water precautions are important throughout Peru, especially outside the main tourist hotels and in rural or Amazon regions. Use bottled or filtered water for drinking and brushing teeth, avoid ice from unverified sources, and be cautious with raw produce and street food. These measures reduce the risk of traveler's diarrhea, hepatitis A, and typhoid.",
  mosquito:
    "Mosquito-bite protection is essential in the Amazon and other low-altitude regions. Daytime-biting Aedes mosquitoes spread dengue, Zika, and chikungunya; dusk-to-dawn Anopheles spread malaria in the Amazon lowlands. Use DEET 30%+ or picaridin, long sleeves, and permethrin-treated clothing for any jungle travel. The high-altitude tourist core (Cusco, Sacred Valley, Machu Picchu, Lake Titicaca) is essentially free of these mosquito-borne diseases.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/peru",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever — regional recommendation",
      message:
        "Yellow fever vaccination is recommended for travel to the Amazon/jungle lowlands below about 2300 m (e.g. Loreto, Madre de Dios, Amazonas, San Martín, Ucayali, Junín and Cusco jungle areas). It is NOT recommended for travel limited to Lima, Cusco city, Machu Picchu, the Inca Trail, Lake Titicaca, or other highland areas. Give the single dose at an authorized Swiss YF center at least 10 days before travel; lifelong protection.",
      source: "CDC Yellow Book / EKRM",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/peru",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Altitude illness — Cusco, Machu Picchu, Titicaca",
      message:
        "Cusco (~3400 m), the Sacred Valley, the Inca Trail, and Lake Titicaca (~3800 m) sit at high altitude, where acute mountain sickness is common. Plan a gradual ascent and acclimatization days, avoid heavy exertion and alcohol on arrival, and discuss preventive acetazolamide (Diamox) with your travel physician — especially if flying straight into Cusco. Seek care for severe headache, breathlessness at rest, or confusion.",
      source: "EKRM / HealthyTravel",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "warning",
      title: "Dengue activity",
      message:
        "Peru has experienced large dengue epidemics in recent years, with widespread transmission in low-altitude coastal and jungle regions. Practice strict daytime mosquito-bite prevention in all areas below ~2000 m.",
      source: "PAHO / CDC Travel Health Notices",
      sourceUrl: "https://wwwnc.cdc.gov/travel/notices",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers aged 1 year and older. Note for Swiss travelers: hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "all",
      note: "CDC recommends hepatitis B for unvaccinated travelers. Routine in the Swiss BAG childhood schedule — younger travelers are usually already covered; older travelers can consider it per individual risk and stay duration.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Measles-Mumps-Rubella, Diphtheria-Tetanus-Pertussis, Polio, Varicella — per Swiss BAG schedule. Ensure both MMR doses are documented.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "specific",
      note: "Recommended for travel to the Amazon/jungle lowlands below ~2300 m (Loreto, Madre de Dios, Amazonas, San Martín, Ucayali and similar). NOT recommended for Lima, Cusco, Machu Picchu, the Inca Trail, or Lake Titicaca. Single dose ≥10 days before travel at an authorized Swiss YF center; lifelong protection. Live vaccine — contraindicated in immunosuppressed patients, pregnancy, and primary vaccination in adults >60.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-term travelers, those visiting friends and relatives, off-the-beaten-track and Amazon itineraries, or stays in poorer hygienic conditions.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Pre-exposure recommended for long stays, cyclists, motorcyclists, hikers/trekkers in remote areas, young children, animal workers, and cavers (bat exposure — vampire-bat-transmitted rabies occurs in the Amazon). Pre-exposure simplifies post-bite management.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "Same daytime Aedes vector as dengue, with elevated risk in low-altitude regions. Vaccination may be considered for extended stays in high-incidence areas or during outbreaks (see EKRM statement).",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga® vaccination currently recommended only for travelers with documented prior dengue infection who will be exposed in a high-transmission region. Not for first-time visitors.",
    },
  ],

  diseases: {
    yellowFever: {
      riskSummary:
        "Yellow fever is endemic in Peru's Amazon/jungle lowlands. Vaccination is recommended for travel below ~2300 m in regions such as Loreto, Madre de Dios, Amazonas, San Martín, and Ucayali. It is NOT recommended for Lima, Cusco city, Machu Picchu, the Inca Trail, or Lake Titicaca. The classic highland tourist circuit therefore does not require YF vaccine unless it is combined with a jungle extension.",
      keyFacts: [
        { label: "Recommended", value: "Amazon/jungle lowlands <2300 m (Loreto, Madre de Dios, etc.)" },
        { label: "Not needed", value: "Lima, Cusco, Machu Picchu, Inca Trail, Titicaca" },
        { label: "Vaccine", value: "Single dose, lifelong protection" },
        { label: "Timing", value: "≥10 days before travel" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/peru",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/peru.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Peru (CDC).",
    },
    malaria: {
      riskSummary:
        "Malaria risk is confined to the Amazon lowlands east of the Andes below ~2500 m — highest in Loreto (Iquitos) and Madre de Dios (Puerto Maldonado), with rare cases reported in Tumbes and Piura. Lima, Cusco, Machu Picchu, the Inca Trail, Lake Titicaca, and the highland tourist core are NO-risk. P. vivax predominates, with P. falciparum mainly in Loreto. Itinerary determines whether prophylaxis is needed.",
      keyFacts: [
        { label: "High risk", value: "Amazon lowlands <2500 m: Loreto (Iquitos), Madre de Dios (Puerto Maldonado)" },
        { label: "Low/rare", value: "Tumbes, Piura" },
        { label: "No risk", value: "Lima, Cusco, Machu Picchu, Inca Trail, Lake Titicaca" },
        { label: "Species", value: "P. vivax predominant; P. falciparum in Loreto" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil or doxycycline for the Amazon" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/peru",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/peru.jpg",
      mapCaption: "Malaria risk areas in Peru (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue is endemic in Peru's low-altitude coastal and jungle regions, with large epidemics in recent years and year-round transmission that peaks in the warm, rainy season. Risk is highest below ~2000 m; the high-altitude tourist core is essentially dengue-free. Daytime mosquito protection is essential for any lowland or Amazon travel.",
      keyFacts: [
        { label: "Distribution", value: "Coastal & jungle areas below ~2000 m" },
        { label: "Season", value: "Year-round; rainy-season peaks; recent epidemics" },
        { label: "Vector", value: "Aedes aegypti — daytime biter" },
        { label: "Low/no risk", value: "Cusco, Machu Picchu, Titicaca (high altitude)" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya circulates in Peru's low-altitude regions, sharing the same daytime Aedes vector as dengue, so the same bite-prevention measures apply. Joint pain can persist for months after the acute illness. Vaccination is considered for extended stays in high-incidence areas or during outbreaks (see EKRM statement).",
      keyFacts: [
        { label: "Distribution", value: "Low-altitude coastal & jungle regions" },
        { label: "Vector", value: "Aedes — bites during daytime" },
        { label: "Symptoms", value: "Fever + prolonged joint pain" },
      ],
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
