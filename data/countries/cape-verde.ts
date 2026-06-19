import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (https://www.healthytravel.ch, Swiss travel
// medicine authority), CDC Travelers' Health & Yellow Book 2024, WHO. Framing
// reflects Swiss BAG schedule. Cape Verde is an island nation and differs from
// mainland West Africa: WHO certified it malaria-free in January 2024, there is
// no yellow fever risk (but a YF entry certificate is required from travelers
// arriving from endemic countries), and dengue outbreaks have occurred.
export const capeVerde: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
  vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
  malariaRisk: "none",
  yellowFever: "possible",
  foodWater:
    "Use bottled or reliably treated water in less-developed areas; most resort areas have safe food and water. Standard precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — note that Shigella infections have been reported in travelers returning from Santa Maria and Boa Vista.",
  mosquito:
    "Although Cape Verde is now malaria-free, daytime mosquito-bite prevention still matters: dengue (with periodic outbreaks), Zika, and other Aedes-borne viruses occur. Use DEET or picaridin repellent and covering clothing during the day.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/cape-verde",

  countryAlerts: [
    {
      level: "info",
      title: "WHO-certified malaria-free since 2024",
      message:
        "In January 2024 the WHO certified Cabo Verde as malaria-free — only the third country in the WHO African Region to achieve this. No malaria chemoprophylaxis is needed for travel to Cape Verde. Standard mosquito-bite prevention is still advised against dengue and other Aedes-borne viruses.",
      source: "WHO",
      sourceUrl: "https://www.who.int/news/item/12-01-2024-who-certifies-cabo-verde-as-malaria-free--marking-a-historic-milestone-in-the-fight-against-malaria",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever entry certificate from endemic countries",
      message:
        "There is no yellow fever risk in Cape Verde, so vaccination is not needed for direct travel from Switzerland. However, a YF certificate is required for entry from travelers arriving from (or in transit through) a country with yellow fever transmission risk. Relevant mainly if combining Cape Verde with mainland West Africa.",
      source: "CDC / WHO International Health Regulations",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/cape-verde",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Dengue outbreaks",
      message:
        "Dengue circulates in Cape Verde and significant outbreaks have occurred in the past. Daytime mosquito-bite prevention is the main protection, as there is no specific treatment.",
      source: "CDC / EKRM",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Cape Verde. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Consider for travelers visiting less-developed areas, staying with friends and relatives, or in poor hygienic conditions. Lower priority for typical resort stays.",
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
      note: "Consider only for higher-risk profiles (long stays, working with animals, children). Rabid dogs are not commonly found in Cape Verde, so risk is lower than on the mainland.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "No malaria risk. The WHO certified Cape Verde as malaria-free in January 2024 after sustained interruption of local transmission. No chemoprophylaxis is required (a historical low-level residual focus on Santiago island was eliminated).",
      keyFacts: [
        { label: "Status", value: "Malaria-free (WHO-certified 2024)" },
        { label: "Prophylaxis", value: "Not needed" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/cape-verde",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country, so vaccination is not needed on medical grounds. A certificate is required for entry only from travelers arriving from a YF-risk country (see country alert). Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Status", value: "No risk in country" },
        { label: "Entry rule", value: "Cert required if arriving from YF country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/cape-verde",
    },
    dengue: {
      riskSummary:
        "Dengue circulates and notable outbreaks have occurred in Cape Verde. Transmitted by daytime-biting Aedes mosquitoes; daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Vector", value: "Aedes mosquitoes — bite during daytime" },
        { label: "History", value: "Periodic outbreaks" },
        { label: "Prevention", value: "Daytime repellent, covering clothing" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
