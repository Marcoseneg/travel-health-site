export type ArticleCategory =
  | "gear-review"
  | "destination-guide"
  | "prevention"
  | "travel-story"
  | "explainer";

export type Article = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  tags: string[];
  readingTime: number; // minutes
  coverGradient: string; // CSS gradient for the card header
  featured?: boolean;
};

export const CATEGORY_LABELS: Record<ArticleCategory, { label: string; color: string }> = {
  "gear-review": { label: "Gear review", color: "#38bdf8" },
  "destination-guide": { label: "Destination guide", color: "#34d399" },
  prevention: { label: "Prevention", color: "#f59e0b" },
  "travel-story": { label: "Travel story", color: "#a78bfa" },
  explainer: { label: "Explainer", color: "#fb923c" },
};

export const articles: Article[] = [
  {
    id: "best-deet-sprays-2026",
    date: "2026-04-12",
    title: "The 5 best DEET sprays for tropical travel, tested",
    subtitle:
      "A physician's hands-on comparison of concentration, duration, smell, and skin feel — from 20% to 98.1% DEET.",
    category: "gear-review",
    tags: ["mosquito protection", "gear", "DEET"],
    readingTime: 8,
    coverGradient: "linear-gradient(135deg, #0c4a6e 0%, #164e63 100%)",
    featured: true,
  },
  {
    id: "cuba-travel-health-2026",
    date: "2026-04-01",
    title: "Cuba: hurricanes, healthcare, and what travelers actually need",
    subtitle:
      "Navigating Cuba's dual healthcare system, hurricane season prep, and the surprisingly limited pharmacy options. A practical guide.",
    category: "destination-guide",
    tags: ["Cuba", "Caribbean", "hurricane season"],
    readingTime: 12,
    coverGradient: "linear-gradient(135deg, #1e3a5f 0%, #0f2027 100%)",
    featured: true,
  },
  {
    id: "malaria-prophylaxis-compared",
    date: "2026-03-18",
    title: "Malarone vs. Doxycycline vs. Mefloquine: which prophylaxis is right for you?",
    subtitle:
      "Side effects, cost, dosing schedules, and contraindications — a clinical comparison of the three main malaria prevention drugs.",
    category: "prevention",
    tags: ["malaria", "prophylaxis", "medication"],
    readingTime: 10,
    coverGradient: "linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)",
    featured: true,
  },
  {
    id: "altitude-sickness-peru",
    date: "2026-03-05",
    title: "Altitude sickness in Peru: Cusco, Machu Picchu, and the 3,400m question",
    subtitle:
      "How to acclimatize properly, when to use Acetazolamide, and why coca tea probably doesn't help as much as you think.",
    category: "destination-guide",
    tags: ["Peru", "altitude", "acclimatization"],
    readingTime: 9,
    coverGradient: "linear-gradient(135deg, #3b0764 0%, #1e1b4b 100%)",
  },
  {
    id: "permethrin-clothing-guide",
    date: "2026-02-20",
    title: "Permethrin-treated clothing: the invisible armor against mosquitoes and ticks",
    subtitle:
      "How to treat your own clothes, which products work best, and how long the treatment actually lasts in real-world conditions.",
    category: "gear-review",
    tags: ["permethrin", "mosquito protection", "ticks", "gear"],
    readingTime: 7,
    coverGradient: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
  },
  {
    id: "travelers-diarrhea-survival",
    date: "2026-02-08",
    title: "The traveler's diarrhea survival guide: prevention, self-treatment, and when to worry",
    subtitle:
      "ORS, Loperamide, antibiotics, and the red flags that mean you need medical care — from a physician who has been there.",
    category: "prevention",
    tags: ["travelers diarrhea", "food safety", "self-treatment"],
    readingTime: 11,
    coverGradient: "linear-gradient(135deg, #78350f 0%, #451a03 100%)",
  },
  {
    id: "safari-health-kit",
    date: "2026-01-22",
    title: "What's in my safari medical kit (and what most people forget)",
    subtitle:
      "A physician's packing list for East Africa — beyond the obvious first aid basics.",
    category: "gear-review",
    tags: ["safari", "medical kit", "packing", "Africa"],
    readingTime: 6,
    coverGradient: "linear-gradient(135deg, #713f12 0%, #422006 100%)",
  },
  {
    id: "japanese-encephalitis-who-needs-it",
    date: "2026-01-10",
    title: "Japanese Encephalitis vaccine: do you actually need it?",
    subtitle:
      "The cost is high, the risk feels abstract, and most travelers skip it. Here's how to decide if you're one of the ones who shouldn't.",
    category: "explainer",
    tags: ["Japanese Encephalitis", "vaccine", "Asia"],
    readingTime: 8,
    coverGradient: "linear-gradient(135deg, #1e3a5f 0%, #172554 100%)",
  },
];
