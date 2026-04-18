export type AlertSeverity = "warning" | "advisory" | "watch";

export type OutbreakAlert = {
  id: string;
  date: string; // ISO date string
  title: string;
  disease: string;
  countries: string[];
  severity: AlertSeverity;
  summary: string;
  source?: string;
  sourceUrl?: string;
  active: boolean;
};

export const outbreakAlerts: OutbreakAlert[] = [
  {
    id: "dengue-delhi-2026",
    date: "2026-04-10",
    title: "Dengue surge in Delhi NCR",
    disease: "Dengue",
    countries: ["India"],
    severity: "warning",
    summary:
      "Delhi NCR reporting a 340% increase in dengue cases compared to the same period last year. Hospitals in South Delhi and Noida are at capacity for dengue admissions. Travelers should use DEET-based repellents and wear long sleeves, particularly during daytime hours when Aedes mosquitoes are most active.",
    source: "WHO SEARO",
    sourceUrl: "https://www.who.int",
    active: true,
  },
  {
    id: "cholera-mozambique-2026",
    date: "2026-04-05",
    title: "Cholera outbreak in northern Mozambique",
    disease: "Cholera",
    countries: ["Mozambique"],
    severity: "warning",
    summary:
      "Cabo Delgado and Nampula provinces are experiencing a cholera outbreak linked to flooding and displacement. Over 2,400 cases reported since March. Travelers to northern Mozambique should ensure access to clean water, avoid raw foods, and consider oral cholera vaccination before departure.",
    source: "WHO AFRO",
    sourceUrl: "https://www.who.int",
    active: true,
  },
  {
    id: "yellow-fever-brazil-2026",
    date: "2026-03-28",
    title: "Yellow fever cases in Amazonas state",
    disease: "Yellow Fever",
    countries: ["Brazil"],
    severity: "advisory",
    summary:
      "Sporadic yellow fever cases confirmed in rural Amazonas, including one fatality in a non-vaccinated traveler. All travelers to Brazil's Amazon basin should verify yellow fever vaccination status. A single dose provides lifelong protection and is required for entry to many countries after visiting Brazil.",
    source: "PAHO",
    sourceUrl: "https://www.paho.org",
    active: true,
  },
  {
    id: "malaria-ethiopia-2026",
    date: "2026-03-15",
    title: "Rising malaria cases in western Ethiopia",
    disease: "Malaria",
    countries: ["Ethiopia"],
    severity: "advisory",
    summary:
      "Gambella and Benishangul-Gumuz regions reporting above-average malaria transmission following early rains. Travelers to western Ethiopia should use chemoprophylaxis (Atovaquone-Proguanil or Doxycycline recommended), sleep under insecticide-treated nets, and apply DEET repellent from dusk to dawn.",
    source: "CDC",
    sourceUrl: "https://www.cdc.gov",
    active: true,
  },
  {
    id: "chikungunya-colombia-2026",
    date: "2026-03-02",
    title: "Chikungunya activity in Caribbean Colombia",
    disease: "Chikungunya",
    countries: ["Colombia"],
    severity: "watch",
    summary:
      "Elevated chikungunya transmission reported in Bolívar, Atlántico, and Magdalena departments. Cases remain within expected seasonal range but trending upward. Standard mosquito avoidance measures are advised for travelers to Colombia's Caribbean coast.",
    source: "INS Colombia",
    active: true,
  },
  {
    id: "typhoid-pakistan-2026",
    date: "2026-02-18",
    title: "XDR typhoid persists in Sindh province",
    disease: "Typhoid",
    countries: ["Pakistan"],
    severity: "advisory",
    summary:
      "Extensively drug-resistant (XDR) Salmonella typhi continues to circulate in Sindh, particularly in Karachi and Hyderabad. Standard antibiotics are ineffective against XDR strains. Pre-travel typhoid vaccination (injectable Vi polysaccharide) and strict food and water hygiene are strongly recommended.",
    source: "WHO EMRO",
    sourceUrl: "https://www.who.int",
    active: true,
  },
  {
    id: "rabies-bali-2026",
    date: "2026-02-01",
    title: "Rabies exposure risk in Bali",
    disease: "Rabies",
    countries: ["Indonesia"],
    severity: "watch",
    summary:
      "Bali continues to report rabies in stray dog populations. Multiple tourist bite incidents were reported in Ubud and Seminyak in January. Pre-exposure rabies vaccination is recommended for travelers planning extended stays. Post-exposure prophylaxis (PEP) availability is limited outside Denpasar — travelers should know the nearest PEP facility before departure.",
    source: "CDC",
    sourceUrl: "https://www.cdc.gov",
    active: true,
  },
  {
    id: "dengue-thailand-2025",
    date: "2025-12-10",
    title: "Dengue season peaks in southern Thailand",
    disease: "Dengue",
    countries: ["Thailand"],
    severity: "watch",
    summary:
      "Southern provinces including Surat Thani, Krabi, and Phuket are reporting elevated dengue activity typical of the late monsoon season. Travelers to southern Thailand should maintain mosquito avoidance measures throughout the day.",
    source: "Thai MOPH",
    active: false,
  },
];
