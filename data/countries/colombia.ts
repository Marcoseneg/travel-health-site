import type { CountryInfo } from "./types";

// ── Colombia (South America) — full brief ──────────────────────────────────
// Sources: CDC Yellow Book (Colombia chapter, 2025 update), WHO International
// Travel and Health, PAHO surveillance, Colombian Ministry of Health (national
// park entry rules and inland travel certificate requirements).
//
// Notable points captured:
//   • Colombia is one of the few countries that enforces YF certificate
//     requirements for INLAND travel — not only at international entry.
//     Required for entry to all Natural National Parks and for any travel
//     by road or boat within Colombian territory.
//   • June 2025: San Andrés and Providencia (Caribbean islands) were
//     designated YF high-risk by Colombian health authorities.
//   • 2025 CDC expansion: yellow fever vaccination now recommended for
//     Barranquilla, Cali, Cartagena, and Medellín — previously not included.
export const colombia: CountryInfo = {
  vaccinesRecommended: [
    "Yellow fever",
    "Hepatitis A",
    "Routine vaccines (MMR, Tdap, varicella, polio, COVID-19)",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Rabies",
    "Typhoid",
    "Chikungunya",
    "Dengue (selective)",
  ],
  malariaRisk: "present",
  yellowFever: "required-or-recommended",
  foodWater:
    "Standard food and water precautions, particularly outside major cities and resort areas. Bottled or filtered water for drinking and brushing teeth in rural regions and the Amazon. Tap water in Bogotá and Medellín is generally safe but bottled remains the safer choice for most travelers.",
  mosquito:
    "Strict mosquito-bite prevention is essential. Colombia has year-round transmission of dengue, Zika, and chikungunya, plus malaria in low-altitude regions. Daytime-biting Aedes mosquitoes (dengue, Zika, chikungunya) require day protection; Anopheles (malaria) bite from dusk into the night. DEET 30%+ or picaridin 20%, long sleeves at peak biting times, screened or air-conditioned accommodation. Permethrin-treated clothing for any trip into the Amazon or Pacific coast.",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/colombia",

  countryAlerts: [
    {
      level: "warning",
      title: "Yellow fever certificate required for travel inside Colombia",
      message:
        "Colombia enforces yellow fever certificate requirements not only at international entry but also for travel WITHIN the country. A valid certificate is required to enter any Natural National Park, and is enforced for anyone traveling by land or water through Colombian territory — including cars, buses, and boats. Children under 1 year, adults over 60, and travelers with a documented medical contraindication are exempt.",
      source: "Colombian Ministry of Health",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/destinations/traveler/none/colombia",
    },
    {
      level: "warning",
      title: "Yellow fever activity increased in 2025",
      message:
        "Following a rise in yellow fever cases in 2025, the CDC has expanded the regions where vaccination is recommended. Vaccination is now medically advised for travel to Barranquilla, Cali, Cartagena, and Medellín — previously considered lower-risk cities. Several major national parks (Tayrona, Sierra Nevada de Santa Marta, Farallones de Cali, Chingaza) fall within high-risk areas.",
      source: "CDC Travel Health Notices",
      sourceUrl: "https://wwwnc.cdc.gov/travel/notices",
    },
    {
      level: "info",
      title: "San Andrés and Providencia now YF high-risk (June 2025)",
      message:
        "Since June 2025, the Caribbean archipelago of San Andrés and Providencia has been officially designated a yellow fever high-risk area by Colombian health authorities. Vaccination is recommended for travel to these islands. Allow ≥10 days between vaccination and departure for protective immunity to develop.",
      source: "Colombian Ministry of Health",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/colombia",
    },
  ],

  vaccinesDetail: [
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Vaccination is medically advised for all travel below 2500 m elevation, including San Andrés and Providencia. The CDC's 2025 update extends the recommendation to Barranquilla, Cali, Cartagena, and Medellín. Not recommended for travel limited to areas above 2500 m or to Bogotá. A single dose provides lifelong protection. Must be given at least 10 days before travel at an authorized Swiss YF center. Live vaccine: contraindicated in immunosuppressed patients, pregnant women, and adults >60 starting a primary series.",
    },
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Colombia. Two doses 6–12 months apart give long-term protection; a single dose covers the trip.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, polio, COVID-19 — per Swiss BAG schedule. Both doses of MMR are essential. Adults whose polio primary series is complete should have had at least one IPV booster as adults.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider for travelers who may receive medical or dental care, get tattoos or piercings, have new sexual contacts, or stay >4 weeks. Already part of routine Swiss childhood vaccination since 2019 — most younger travelers are likely already protected.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Pre-exposure recommended for long stays, cyclists, motorcyclists, hikers in remote areas, young children, animal workers, and cavers (significant bat exposure). Pre-exposure simplifies post-bite management — only 2 vaccine doses needed afterwards, and immunoglobulin is not required.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-stay travelers, those visiting friends and relatives, off-the-beaten-track itineraries, and travelers with reduced gastric acidity. Less essential for short stays in tourist hubs.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "The IXCHIQ vaccine can be considered in case of an active local outbreak or for travelers heading to high-incidence regions for extended stays. Not routine for short tourist visits.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga is recommended only for travelers with a prior confirmed dengue infection who are travelling to high-transmission regions. Two doses, 3 months apart. Not for first-time visitors — primary infection after vaccination can be more severe.",
    },
  ],

  diseases: {
    yellowFever: {
      riskSummary:
        "Yellow fever is endemic across Colombia below 2500 m elevation. Following a 2025 surge in cases, CDC has expanded vaccination recommendations to include Barranquilla, Cali, Cartagena, Medellín, and the San Andrés/Providencia archipelago. Several major national parks fall within high-risk areas. Vaccination is required not only for international entry under certain conditions but also for park entry and inland travel within Colombia.",
      keyFacts: [
        { label: "Vaccine", value: "Single dose, lifelong protection" },
        { label: "Timing", value: "≥10 days before travel" },
        { label: "Recommended", value: "All areas <2500 m + San Andrés" },
        { label: "Cities (2025 expansion)", value: "Barranquilla, Cali, Cartagena, Medellín" },
        { label: "Not needed", value: ">2500 m or Bogotá only" },
        { label: "Entry rule", value: "Required from Angola/DRC/Uganda; for park entry; for inland travel" },
        { label: "Parks at risk", value: "Tayrona, Sierra Nevada de Santa Marta, Farallones de Cali, Chingaza" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/colombia",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/colombia.jpg",
      mapCaption: "Yellow fever vaccine recommendations in Colombia (CDC).",
    },
    malaria: {
      riskSummary:
        "Malaria risk in Colombia is geographically split: high in low-altitude Pacific coast and Amazon regions, moderate in transitional areas, and absent in Bogotá and major coastal cities (Cartagena, Medellín, San Andrés). Itinerary determines whether prophylaxis is needed. P. vivax predominates in most of the country, with P. falciparum more common in the Pacific coastal regions.",
      keyFacts: [
        { label: "High risk (<1700 m)", value: "Pacific coast: Chocó, Cauca, Nariño; Amazon basin departments" },
        { label: "High risk (continued)", value: "Parts of Antioquia, Bolívar, Córdoba, Risaralda; Guaviare; border with Venezuela/Brazil/Peru" },
        { label: "Moderate", value: "Lower areas of Antioquia, Bolívar, Caquetá, Cordoba, Meta, Putumayo, Valle del Cauca" },
        { label: "Low risk", value: "Rest of country below 1700 m" },
        { label: "No risk", value: "Bogotá, Cartagena, Medellín, San Andrés" },
        { label: "Predominant species", value: "P. vivax; P. falciparum on Pacific coast" },
        { label: "Prophylaxis", value: "AP or doxycycline for high-risk regions" },
        { label: "Standby treatment", value: "Consider for moderate-risk regions" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/colombia",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/colombia.jpg",
      mapCaption: "Malaria risk areas in Colombia (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue is endemic in Colombia with year-round transmission and outbreaks during the rainy season. Risk is highest in urban areas and below 1800 m elevation. All four serotypes circulate. Daytime mosquito protection is essential for every traveler — including those staying in cities with no malaria risk.",
      keyFacts: [
        { label: "Transmission", value: "Year-round, below 1800 m" },
        { label: "Vector", value: "Aedes aegypti — daytime biter" },
        { label: "Serotypes", value: "All 4 circulating" },
        { label: "Vaccine (Qdenga)", value: "Only if previously infected" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya is endemic in Colombia following the 2014–2015 outbreak, with continued background transmission and periodic flare-ups. Same Aedes mosquito vector as dengue. Joint pain can persist for months after acute infection. The IXCHIQ vaccine is considered for outbreak settings or extended stays in high-risk regions.",
    },
    zika: {
      riskSummary:
        "Zika circulates at low background levels across Colombia following the 2015–2016 epidemic. Pregnancy and pre-conception planning remain the key clinical concerns: pregnant women should avoid travel to Colombia, and couples should use condoms during travel and for 3 months after return.",
    },
  },
};
