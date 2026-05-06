import type { CountryInfo } from "./types";

// ── Afghanistan ─────────────────────────────────────────────────────────────
// Sources: CDC Travelers' Health, CDC Yellow Book, Swiss BAG vaccination schedule.
export const afghanistan: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Typhoid",
    "Polio (booster)",
    "Measles (MMR)",
  ],
  vaccinesConsider: ["Rabies", "Hepatitis B", "Cholera"],
  malariaRisk: "present",
  yellowFever: "none",
  foodWater:
    "Use bottled or treated water. Eat thoroughly cooked food and avoid raw produce you haven't peeled yourself. Healthcare access is limited — preventing traveler's diarrhea is especially important.",
  mosquito:
    "Use DEET- or picaridin-based repellent, sleep under treated bed nets, and wear long sleeves at dusk and dawn. Particularly important in malaria-risk areas (below 2000m altitude, April–December).",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/afghanistan",

  countryAlerts: [
    {
      level: "info",
      title: "Active polio circulation",
      message:
        "Wild poliovirus continues to circulate in Afghanistan. Ensure polio vaccination is up to date. For stays longer than 4 weeks, a booster received 4 weeks to 12 months before exit may be required, documented on an International Certificate of Vaccination.",
      source: "CDC Travel Health Notices",
      sourceUrl: "https://wwwnc.cdc.gov/travel/notices",
      date: "Updated March 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for travel to most low- and middle-income countries.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for travelers eating outside major hotels/restaurants, or stays >1 week.",
    },
    {
      name: "Polio",
      slug: "polio",
      audience: "all",
      note: "Booster recommended for adults; documentation may be requested at exit for stays >4 weeks.",
    },
    {
      name: "Measles (MMR)",
      slug: "measles",
      audience: "all",
      note: "All travelers should be fully vaccinated — two documented doses for those born after 1957.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Tdap, varicella, influenza, COVID-19 — per Swiss BAG schedule.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "For long-term stays, rural travel, occupational animal exposure, or activities like cycling and hiking in remote areas.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "For high-risk settings (humanitarian aid, refugee camps, outbreak areas).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk varies sharply by altitude and season. Discuss chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine, or tafenoquine) with a travel medicine specialist before departure.",
      keyFacts: [
        { label: "Regions", value: "All areas below 2000m" },
        { label: "Above 2000m", value: "No risk" },
        { label: "Season", value: "April–December" },
        { label: "Species", value: "P. vivax (primary), P. falciparum" },
        { label: "Resistance", value: "Chloroquine-resistant" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/afghanistan",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/afghanistan.jpg",
      mapCaption: "Malaria risk areas in Afghanistan (CDC).",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. A vaccination certificate is required at entry only for travelers ≥9 months of age arriving from countries with yellow fever transmission risk.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/afghanistan",
    },
    dengue: {
      riskSummary:
        "Present, primarily in eastern provinces. No vaccine routinely recommended for travelers without prior dengue infection. Daytime mosquito-bite prevention is the main protection.",
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
