import type { CountryInfo } from "./types";

// ── India ──────────────────────────────────────────────────────────────────
// Sources: EKRM/HealthyTravel (Swiss travel medicine authority), CDC
// Yellow Book 2024, WHO IHR. Framing reflects Swiss BAG schedule and
// Swiss-traveler specifics (e.g. polio entry rule for arrivals from
// polio-affected countries, yellow fever quarantine threat at DEL/MAA/BOM).
export const india: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Typhoid",
    "Routine vaccines",
  ],
  vaccinesConsider: ["Rabies", "Hepatitis B", "Japanese encephalitis", "Chikungunya", "Dengue"],
  malariaRisk: "present",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Use bottled or filtered water, avoid ice, raw produce, and street food in all settings — including major cities and high-end accommodations. Foodborne illness affects most travelers regardless of accommodation level.",
  mosquito:
    "Year-round dengue and chikungunya risk requires daytime mosquito protection (DEET or picaridin repellent, long sleeves). For rural travel and stays >1 month in transmission areas, also protect at dawn/dusk for malaria and Japanese encephalitis. Sleep under treated bed nets in lower-quality accommodations.",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/india",

  countryAlerts: [
    {
      level: "info",
      title: "Polio entry rule for arrivals from affected countries",
      message:
        "Travelers arriving in India from Afghanistan, Cameroon, DRC, Madagascar, Malawi, Mozambique, Nigeria, Pakistan, Somalia, Republic of Congo, or Syria are advised to carry an international vaccination certificate showing polio vaccination preferably 4 weeks but not more than 1 year before travel. Those without documentation may receive a dose of oral polio vaccine on arrival. Direct travel from Switzerland is not affected.",
      source: "EKRM / Indian Government polio entry requirement",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to tropical and subtropical countries. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination. Two doses (0 and 6–12 months) provide long-term protection; a single dose is effective for short trips.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for all travelers with stays longer than 1 week. India has among the highest typhoid incidence globally, and risk extends to major cities and high-end accommodation, not just rural areas.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Strongly consider pre-exposure vaccination for: long stays; trips with high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). India accounts for roughly one-third of global rabies deaths, and post-exposure rabies immunoglobulin can be hard to obtain locally.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in Swiss childhood schedule since 1998 — younger travelers usually covered.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Recommended for travelers spending >1 month in rural rice-growing areas during transmission season (mainly May–October, varies by region). Highest risk in the Terai (Uttar Pradesh, Bihar) and Northeast states. Not needed for typical urban or short-stay tourist itineraries.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga® vaccination currently recommended only for travelers with documented prior dengue infection who will be exposed in a region with high dengue transmission.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "Vaccination indicated during chikungunya outbreaks; may also be considered for countries with elevated risk (see EKRM statement).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is altitude- and region-dependent. High and moderate risk concentrated in eastern and northeastern states <2500m; the rest of the country including major cities is low risk (mosquito protection only). No risk above 2500m in Himachal Pradesh, Jammu, Kashmir, and Sikkim. Discuss chemoprophylaxis with a travel medicine specialist based on specific destinations — many tourist routes are low-risk.",
      keyFacts: [
        { label: "High risk", value: "<2500m in parts of east and northeast" },
        { label: "Moderate risk", value: "<2500m in further parts of east and northeast" },
        { label: "Low risk", value: "<2500m elsewhere — Delhi, Mumbai, Kolkata, Rajasthan, Andaman/Nicobar Islands" },
        { label: "No risk", value: ">2500m in Himachal Pradesh, Jammu, Kashmir, Sikkim" },
        { label: "Species", value: "P. vivax (60–65%), P. falciparum (35–40%)" },
        { label: "Resistance", value: "Chloroquine-resistant — use AP, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/india",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/india.jpg",
      mapCaption: "Malaria risk areas in India (CDC).",
    },
    dengue: {
      riskSummary:
        "Endemic and rising. Year-round risk in southern India; northern India sees monsoon-driven peaks (June–October). Major urban outbreaks have become common, including Delhi, Mumbai, Bangalore, Kolkata. Qdenga® vaccine currently recommended only for travelers with prior documented dengue infection who will be in high-transmission regions; daytime mosquito-bite prevention is the main protection for everyone else.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide; all major cities" },
        { label: "Season (north)", value: "June–November (monsoon-driven)" },
        { label: "Season (south)", value: "Year-round" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country, but India enforces a strict entry rule: travelers arriving within 6 days from a yellow-fever-endemic country (or in transit through one) without a valid YF vaccination certificate face 6 days of quarantine. Quarantine facilities exist only at Delhi (DEL), Chennai (MAA), and Mumbai (BOM) airports — at other airports, travelers are deported. India only accepts single-page YF certificates in Hindi, English, and French. Direct flights from Switzerland are not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/india",
    },
    chikungunya: {
      riskSummary:
        "Recurrent outbreaks across India, distribution similar to dengue (urban and peri-urban). Same daytime Aedes mosquito vector means dengue precautions also protect against chikungunya. Vaccination considered in outbreak settings or for elevated individual risk (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
