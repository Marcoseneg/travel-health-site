// ─────────────────────────────────────────────────────────────────────────────
// Resources — the practical, scannable, downloadable counterpart to Insights.
//
// Insights = "interesting" (long-form physician analysis).
// Resources = "useful" (one practical question, answered in ~2 minutes, with a
// PDF you can print). Content is STRUCTURED (typed blocks), not free markdown —
// that deliberately keeps every resource short and document-like rather than a
// 2,500-word article.
// ─────────────────────────────────────────────────────────────────────────────

// Sidebar sections — the persistent left-hand navigation. Each granular topic
// (category) belongs to one section.
export type SectionKey = "before" | "preventing" | "special" | "during" | "kits" | "after";

export const SECTIONS: { key: SectionKey; label: string; icon: string }[] = [
  { key: "before", label: "Before you travel", icon: "🧳" },
  { key: "preventing", label: "Preventing infections", icon: "🛡️" },
  { key: "special", label: "Special travellers", icon: "👪" },
  { key: "during", label: "During your trip", icon: "🤒" },
  { key: "kits", label: "Travel kits & checklists", icon: "📋" },
  { key: "after", label: "After you return", icon: "🩺" },
];

export type ResourceCategoryKey =
  | "mosquitoes" | "vaccines" | "food-water" | "travel-kit"
  | "vfr" | "children" | "pregnancy" | "altitude-diving"
  | "animals" | "insurance" | "during-trip" | "post-travel";

export type ResourceCategory = { key: ResourceCategoryKey; label: string; icon: string; blurb: string; section: SectionKey; color: string; soft: string };

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  { key: "mosquitoes", label: "Mosquitoes", icon: "🦟", blurb: "Repellents, nets, bite prevention", section: "preventing", color: "#0d9488", soft: "rgba(13,148,136,0.12)" },
  { key: "food-water", label: "Food & water", icon: "🚰", blurb: "Safe eating & drinking", section: "preventing", color: "#2563eb", soft: "rgba(37,99,235,0.11)" },
  { key: "animals", label: "Animals", icon: "🐕", blurb: "Bites, rabies, stings", section: "preventing", color: "#d97706", soft: "rgba(217,119,6,0.13)" },
  { key: "vaccines", label: "Vaccines", icon: "💉", blurb: "Before-travel immunisations", section: "before", color: "#db2777", soft: "rgba(219,39,119,0.11)" },
  { key: "insurance", label: "Insurance", icon: "🛡️", blurb: "Cover & emergencies", section: "before", color: "#4f46e5", soft: "rgba(79,70,229,0.11)" },
  { key: "vfr", label: "Visiting family", icon: "👪", blurb: "VFR travellers", section: "special", color: "#7c3aed", soft: "rgba(124,58,237,0.11)" },
  { key: "children", label: "Children", icon: "🧒", blurb: "Travelling with kids", section: "special", color: "#16a34a", soft: "rgba(22,163,74,0.12)" },
  { key: "pregnancy", label: "Pregnancy", icon: "🤰", blurb: "Pregnancy & travel", section: "special", color: "#e11d48", soft: "rgba(225,29,72,0.11)" },
  { key: "during-trip", label: "During your trip", icon: "🤒", blurb: "Diarrhoea, fever, jet lag", section: "during", color: "#ea580c", soft: "rgba(234,88,12,0.12)" },
  { key: "altitude-diving", label: "Altitude & diving", icon: "🏔️", blurb: "Heights & depths", section: "during", color: "#0891b2", soft: "rgba(8,145,178,0.12)" },
  { key: "travel-kit", label: "Travel kit", icon: "🧳", blurb: "What to pack", section: "kits", color: "#ca8a04", soft: "rgba(202,138,4,0.13)" },
  { key: "post-travel", label: "After travel", icon: "🩺", blurb: "Fever & illness after you return", section: "after", color: "#dc2626", soft: "rgba(220,38,38,0.11)" },
];

export const CATEGORY_BY_KEY: Record<ResourceCategoryKey, ResourceCategory> = Object.fromEntries(
  RESOURCE_CATEGORIES.map((c) => [c.key, c])
) as Record<ResourceCategoryKey, ResourceCategory>;

// ── Content blocks — the only shapes a resource can use (keeps them short) ────
export type TierTone = "best" | "good" | "weak";
export type ResourceBlock =
  | { type: "prose"; label?: string; text: string }
  | { type: "tiers"; label?: string; items: { name: string; tag?: string; tone?: TierTone }[] }
  | { type: "checklist"; label?: string; items: string[] }
  | { type: "points"; label?: string; items: string[] }
  | { type: "quotes"; label?: string; items: string[] };

export type ResourceDownload = { label: string; lang?: string; href?: string };

export type Resource = {
  id: string;
  title: string;
  category: ResourceCategoryKey;
  readingTime: number;
  summary: string;          // one-line, shown on the card
  intentLabel?: string;     // e.g. "When to use" / "Who is this for"
  intent?: string;
  badges?: string[];        // e.g. "Checklist", "Multilingual"
  blocks: ResourceBlock[];
  downloads?: ResourceDownload[];
  source?: { label: string; url?: string };
};

export const RESOURCES: Resource[] = [
  {
    id: "mosquito-bite-prevention",
    title: "How to protect against mosquito bites",
    category: "mosquitoes",
    readingTime: 3,
    summary: "Repellents, clothing, nets and timing — everything that actually reduces bites.",
    intentLabel: "When to use",
    intent: "Travelling to areas with malaria, dengue, chikungunya or Zika.",
    badges: ["Checklist"],
    blocks: [
      {
        type: "tiers",
        label: "Best repellents",
        items: [
          { name: "DEET 30–50%", tag: "First choice", tone: "best" },
          { name: "Picaridin (Icaridin) 20%", tag: "Good alternative", tone: "good" },
        ],
      },
      { type: "tiers", label: "Less effective — skip these", items: [{ name: "Citronella", tone: "weak" }, { name: "Essential oils", tone: "weak" }, { name: "Vitamin-B / ultrasound apps", tone: "weak" }] },
      {
        type: "points",
        label: "Cover up & treat clothing",
        items: [
          "Wear long sleeves and trousers, especially at dawn and dusk.",
          "Treat clothing and gear with permethrin — it lasts several washes.",
          "Light colours help; mosquitoes are drawn to dark fabrics.",
        ],
      },
      {
        type: "checklist",
        label: "Bed nets",
        items: [
          "Sleep under a permethrin-treated net if the room isn't screened or air-conditioned.",
          "Use a box or wedge shape so the net doesn't touch your skin.",
        ],
      },
      {
        type: "checklist",
        label: "Quick tips",
        items: [
          "Apply repellent after sunscreen, not before.",
          "Reapply after swimming or heavy sweating.",
          "Use every evening — and during the day in dengue/Zika areas (Aedes bite by day).",
          "DEET ≤30% is safe in pregnancy and from 2 months of age.",
        ],
      },
    ],
    downloads: [{ label: "PDF" }, { label: "Print version" }],
    source: { label: "WHO / Swiss EKRM", url: "https://www.healthytravel.ch" },
  },
  {
    id: "vfr-africa",
    title: "Visiting friends & relatives in Africa",
    category: "vfr",
    readingTime: 3,
    summary: "Why “I grew up there” doesn’t protect you — the malaria risk most VFR travellers miss.",
    intentLabel: "Who is this for",
    intent: "People who live in Europe and travel back to visit family in Africa (e.g. Eritrean, Somali, Nigerian communities).",
    badges: ["Country-specific", "Multilingual"],
    blocks: [
      {
        type: "quotes",
        label: "Common misconceptions",
        items: [
          "“I grew up there, I’m immune.”",
          "“I don’t need malaria tablets.”",
          "“I already had malaria once, so I’m protected.”",
        ],
      },
      {
        type: "points",
        label: "Key advice",
        items: [
          "Malaria immunity fades within 1–2 years of leaving — your risk is now like any other traveller.",
          "Children born in Europe have NO immunity and are at highest risk.",
          "Take malaria prophylaxis — VFR travellers have the most imported malaria cases.",
          "See a travel clinic 4–6 weeks before departure.",
          "Use repellent, sleep under a treated net, check routine vaccines.",
        ],
      },
    ],
    downloads: [
      { label: "PDF", lang: "English" },
      { label: "PDF", lang: "Deutsch" },
      { label: "PDF", lang: "ትግርኛ (Tigrinya)" },
      { label: "PDF", lang: "Français" },
    ],
    source: { label: "Swiss EKRM / WHO", url: "https://www.healthytravel.ch" },
  },
  {
    id: "safe-food-water",
    title: "Safe food & water abroad",
    category: "food-water",
    readingTime: 2,
    summary: "The short list that prevents most travellers' diarrhoea.",
    intentLabel: "When to use",
    intent: "Anywhere with uncertain sanitation — most of the tropics and subtropics.",
    blocks: [
      { type: "checklist", label: "Do", items: ["Drink sealed bottled, boiled or treated water.", "Eat food that's cooked and served hot.", "Peel fruit yourself.", "Wash hands / use sanitiser before eating."] },
      { type: "tiers", label: "Avoid", items: [{ name: "Ice in drinks", tone: "weak" }, { name: "Raw salads & unpeeled fruit", tone: "weak" }, { name: "Tap water (incl. brushing teeth)", tone: "weak" }, { name: "Unpasteurised dairy", tone: "weak" }] },
    ],
    downloads: [{ label: "PDF" }, { label: "Print version" }],
  },
  {
    id: "travel-first-aid-kit",
    title: "What to pack in a travel first-aid kit",
    category: "travel-kit",
    readingTime: 3,
    summary: "A practical checklist you can print and tick off.",
    intentLabel: "Who is this for",
    intent: "Any traveller heading somewhere with limited pharmacies or medical care.",
    badges: ["Checklist"],
    blocks: [
      { type: "checklist", label: "Essentials", items: ["Personal medications (in original packaging) + prescription copy", "Painkillers / fever (paracetamol, ibuprofen)", "Oral rehydration salts (ORS)", "Loperamide + an antibiotic for travellers' diarrhoea (if prescribed)", "Antihistamine; hydrocortisone cream", "Plasters, sterile gauze, tape, blister plasters", "Antiseptic wipes / gel, tweezers, scissors", "Thermometer", "Insect repellent + after-bite", "High-SPF sunscreen"] },
      { type: "points", label: "Add for the destination", items: ["Malaria standby treatment (high-risk, remote areas)", "Altitude medication (acetazolamide) for high mountains", "Sterile needle/syringe pack where care quality is poor"] },
    ],
    downloads: [{ label: "PDF checklist" }, { label: "Print version" }],
  },
  {
    id: "travel-insurance",
    title: "Do I need travel health insurance?",
    category: "insurance",
    readingTime: 2,
    summary: "What good cover looks like — and the gaps that catch travellers out.",
    intentLabel: "Who is this for",
    intent: "Anyone travelling abroad — especially outside the EU/EFTA or for adventure activities.",
    blocks: [
      {
        type: "checklist",
        label: "Make sure it covers",
        items: [
          "Emergency medical treatment and hospital stays abroad.",
          "Medical repatriation / air ambulance home.",
          "Your specific activities (diving, trekking, motorbiking).",
          "Pre-existing medical conditions — declare them.",
          "A 24/7 emergency assistance hotline.",
        ],
      },
      {
        type: "points",
        label: "Watch out for",
        items: [
          "Your normal health insurance often does NOT cover repatriation.",
          "EHIC/GHIC covers state care in the EU only — not repatriation or private clinics.",
          "Adventure sports and alcohol-related incidents are common exclusions.",
        ],
      },
    ],
    downloads: [{ label: "PDF" }],
    source: { label: "Swiss EKRM / FCDO" },
  },
  {
    id: "altitude-sickness",
    title: "Altitude sickness: how to prevent it",
    category: "altitude-diving",
    readingTime: 3,
    summary: "Ascend slowly, spot the warning signs, and know when to go down.",
    intentLabel: "When to use",
    intent: "Trips above ~2,500 m — Andes, Himalaya, Kilimanjaro, high-altitude cities.",
    badges: ["Checklist"],
    blocks: [
      {
        type: "checklist",
        label: "Prevent it",
        items: [
          "Above 3,000 m, don't raise your sleeping altitude by more than 300–500 m a day.",
          "Take a rest day every 600–900 m of ascent.",
          "Stay hydrated; avoid alcohol for the first 48 hours.",
          "Consider acetazolamide (Diamox) for rapid ascents — ask your doctor.",
        ],
      },
      {
        type: "tiers",
        label: "Warning signs",
        items: [
          { name: "Headache, nausea, dizziness, poor sleep", tag: "Mild (AMS)", tone: "good" },
          { name: "Confusion, unsteady walking, breathless at rest", tag: "Descend now", tone: "weak" },
        ],
      },
      {
        type: "points",
        label: "Golden rule",
        items: [
          "If symptoms are getting worse, DESCEND — don't go higher.",
          "Never ascend further while you have symptoms of altitude sickness.",
        ],
      },
    ],
    downloads: [{ label: "PDF" }, { label: "Print version" }],
    source: { label: "Swiss EKRM / Wilderness Medical Society" },
  },
  {
    id: "fever-after-travel",
    title: "Fever after travel: when to worry",
    category: "post-travel",
    readingTime: 2,
    summary: "A fever after the tropics can be malaria until proven otherwise — here's what to do.",
    intentLabel: "When to use",
    intent: "Any fever within 12 months of returning from a malaria-risk area — especially in the first 3 months.",
    badges: ["Red flags"],
    blocks: [
      {
        type: "points",
        label: "See a doctor urgently if you have",
        items: [
          "Fever within 3 months of leaving a malaria area — get a malaria test the same day.",
          "Fever with confusion, breathlessness, a stiff neck, or a spreading rash.",
          "Yellow eyes/skin, very dark urine, or persistent vomiting.",
        ],
      },
      {
        type: "checklist",
        label: "Tell the doctor",
        items: [
          "Exactly where you travelled and when you got back.",
          "Whether you took malaria prevention — and if you finished it.",
          "Any freshwater swimming, animal contact, or insect bites.",
        ],
      },
      {
        type: "points",
        label: "Key point",
        items: ["Malaria can appear weeks after travel and is rapidly treatable — but deadly if missed. Don't 'wait it out'."],
      },
    ],
    downloads: [{ label: "PDF" }],
    source: { label: "Swiss EKRM / WHO" },
  },
];

export function getResource(id: string): Resource | undefined {
  return RESOURCES.find((r) => r.id === id);
}

export function resourcesByCategory(key: ResourceCategoryKey): Resource[] {
  return RESOURCES.filter((r) => r.category === key);
}

export function sectionOfCategory(key: ResourceCategoryKey): SectionKey {
  return CATEGORY_BY_KEY[key].section;
}

export function resourcesInSection(section: SectionKey): Resource[] {
  return RESOURCES.filter((r) => CATEGORY_BY_KEY[r.category].section === section);
}

// Curated "Featured" order + a "New & updated" feed (newest first).
export const FEATURED_IDS = [
  "mosquito-bite-prevention", "vfr-africa", "travel-first-aid-kit",
  "safe-food-water", "travel-insurance", "altitude-sickness",
];

export const RESOURCE_UPDATES: { id: string; date: string; flag: "new" | "updated" }[] = [
  { id: "fever-after-travel", date: "2026-06-25", flag: "new" },
  { id: "vfr-africa", date: "2026-06-22", flag: "new" },
  { id: "mosquito-bite-prevention", date: "2026-06-20", flag: "new" },
  { id: "travel-first-aid-kit", date: "2026-06-12", flag: "updated" },
  { id: "safe-food-water", date: "2026-06-10", flag: "updated" },
];
