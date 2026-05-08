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
  /** Full article body in Markdown. When omitted, the slug page shows a
   *  "Coming soon" state — useful for placeholder articles in the index. */
  content?: string;
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
    content: `# How to choose your malaria prophylaxis — Atovaquone-Proguanil, Doxycycline, or Mefloquine

*A practical comparison from a Swiss travel medicine physician.*

---

## TL;DR

For most travelers preparing for a typical 1–3 week trip, **atovaquone-proguanil** (Malarone) is the default — best tolerated, simplest schedule, fewest hassles.

Switch to **doxycycline** if cost matters, the trip is long, or you want the bonus protection it offers against leptospirosis and rickettsial infections (relevant for adventure travel).

Switch to **mefloquine** for trips longer than 3 weeks where weekly dosing meaningfully improves compliance — provided you have no history of depression, anxiety, psychosis, or seizures.

For pregnancy, mefloquine is the option of choice in the second and third trimesters. Atovaquone-proguanil is generally avoided; doxycycline is contraindicated.

These three drugs are the realistic options in Switzerland today. Chloroquine is essentially obsolete — Plasmodium falciparum, the species responsible for nearly all severe malaria, is resistant almost everywhere it occurs.

---

## A 30-second framework

Before reading the rest, ask yourself three questions:

1. **How long is the trip?** Under 3 weeks → daily dosing is fine. Over 3 weeks → weekly dosing is worth considering.
2. **Any psychiatric history?** Even mild depression or anxiety in your past medical record rules out mefloquine.
3. **Pregnant or planning conception?** Talk to a travel medicine specialist — drug choice is more constrained.

Most people answer: short trip, no psych history, not pregnant. For them, atovaquone-proguanil is the right answer.

---

## Side-by-side comparison

| | Atovaquone-Proguanil | Doxycycline | Mefloquine |
|---|---|---|---|
| **Brand name** | Malarone | (generic) | Lariam |
| **Dose** | 250/100 mg, 1 tablet daily | 100 mg daily | 250 mg weekly |
| **Start before travel** | 1–2 days | 1–2 days | 2–3 weeks |
| **Continue after return** | 7 days | 4 weeks | 4 weeks |
| **Take with food?** | Yes — fatty meal improves absorption | Yes, with full glass of water, sit upright 30 min | Either way |
| **Cost in CH** | ~CHF 50–80 / week | ~CHF 1–3 / week | ~CHF 10–15 / week |
| **Most common side effect** | Mild GI upset | Sun sensitivity, GI upset | Vivid dreams, dizziness |
| **Serious concern** | Rare | Esophageal irritation if taken incorrectly | Rare neuropsychiatric reactions |
| **Pregnancy** | Generally avoided | Contraindicated | OK in 2nd/3rd trimester |
| **Children** | From 5 kg | Contraindicated under age 8 | From 5 kg |
| **Diving** | Fine | Fine (the contraindication is a myth) | Avoid — dizziness risk |

---

## Atovaquone-Proguanil (Malarone)

**Why it's my default for most travelers.** Excellent tolerability profile, very short pre-travel lead time, only 7 days of post-travel dosing, and effective against all common Plasmodium species including chloroquine-resistant P. falciparum.

**Dosing.** One adult tablet (250 mg atovaquone / 100 mg proguanil) daily, with food. Take it at the same time every day to keep blood levels stable. Start 1–2 days before entering the malaria area, continue daily throughout, and continue for 7 days after leaving. The short post-travel period is a real advantage — most patients actually finish the course.

**Side effects.** Most are mild and GI-related: nausea, abdominal discomfort, occasionally diarrhea. Headache is reported in around 10%. Mouth ulcers occasionally. Very rarely: elevated liver enzymes. Vivid dreams happen but less prominently than with mefloquine. Most patients tolerate it without complaint.

**The downsides.**
- **Cost.** Significantly more expensive than the alternatives. For a 2-week trip with the surrounding lead-in and follow-up, you're looking at roughly CHF 150–200. Long trips become expensive quickly.
- **Daily dosing.** Easy for short trips, harder to sustain for months.
- **Take with food** — patients who skip breakfast and dose on an empty stomach absorb less, so this matters.

**Who I don't prescribe it to.**
- Severe renal impairment (creatinine clearance <30 ml/min) — the proguanil component accumulates.
- Pregnancy — limited safety data.
- Patients who genuinely cannot afford it for a long trip.

**Practical tip.** I tell patients to set a daily phone alarm and pair the dose with a fixed daily meal — breakfast usually works. Missing a dose by a few hours is fine; missing a whole day, take it as soon as you remember and continue normally. Don't double up.

---

## Doxycycline

**Where it shines.** Cheap, well-studied, broadly active. Good choice for budget travelers, long trips where mefloquine isn't appropriate, and adventure travel where the bonus antimicrobial coverage matters.

**Dosing.** 100 mg once daily. Start 1–2 days before, continue daily throughout, continue for 4 weeks (28 days) after leaving the malaria area. The long tail is the main compliance challenge — by week 3 of being home, many patients stop.

**The bonus protection nobody mentions.** Doxycycline also covers:
- Leptospirosis (relevant for fresh-water exposure, jungle trekking, flooding)
- Rickettsial infections (African tick-bite fever especially — common in safari travelers in southern Africa)
- Some other zoonoses

For a backpacker doing a 4-week trip through east Africa with hiking and water exposure, this matters.

**The sun sensitivity issue.** Real. Around 5–20% of users develop a phototoxic skin reaction — looks like an exaggerated sunburn, often on areas the patient didn't think were that exposed (back of hands, tops of feet, neck). It's manageable: high-SPF sunscreen on every exposed area, every day, reapplied; long sleeves and hats; shade during peak hours. Most patients can take doxycycline through a tropical trip without significant sunburn if they're careful. A minority cannot tolerate the photosensitivity at all and need to switch.

**Esophageal irritation.** Take with a full glass of water, do not lie down for at least 30 minutes after. Patients who take it at bedtime and immediately go to sleep can develop esophageal ulceration — uncommon but unpleasant. Morning dosing with breakfast is safer.

**Other side effects.**
- GI upset (food helps).
- Vaginal candidiasis in women — common enough that I warn patients and consider whether they want a fluconazole tablet to carry "just in case".
- Tooth discoloration in children under 8 — absolute contraindication.
- Pregnancy — contraindicated all trimesters.

**The diving myth.** A persistent myth claims doxycycline is contraindicated for divers. It is not. The confusion comes from mefloquine, which IS contraindicated in diving due to dizziness and altered consciousness risk. Doxycycline has no such concern. Divers can and do use it.

**Who I prescribe it to.**
- Cost-sensitive travelers.
- Long trips (3+ weeks) where mefloquine is contraindicated.
- Adventure trips with relevant bonus-coverage indications.
- Travelers who specifically ask for it after reading about the comparison.

---

## Mefloquine (Lariam)

**The honest version.** Mefloquine has a reputation problem in 2026. Years of negative coverage — particularly around US military use — have made many travelers refuse it on sight, and many GPs have stopped offering it. That said, it remains the right answer for specific situations, and the side-effect risk needs context, not dismissal or hyperbole.

**Where it's genuinely the best option.**
- **Long trips (3+ weeks)** where weekly dosing is much more sustainable than daily. Six months in rural Africa? Mefloquine is realistic; doxycycline daily for half a year often isn't.
- **Pregnancy in the 2nd or 3rd trimester** when travel to a malaria-endemic area cannot be avoided. Atovaquone-proguanil and doxycycline are both off the table.
- **Cost-constrained long trips** where Malarone would be unaffordable and doxycycline is contraindicated for some other reason.

**Dosing.** 250 mg once weekly, same day every week. Start 2–3 weeks before travel — this is critical. The long lead-in lets you detect intolerance before you're in a malaria zone. Continue weekly throughout, then for 4 more weekly doses after leaving.

**The "test run" approach.** Because side effects typically appear in the first 2–3 doses, taking the first weeks of mefloquine before departure gives you a chance to switch if you don't tolerate it. I tell patients: "If you have any unusual dreams, anxiety, dizziness, or mood change in the first three weeks, call me immediately and we'll switch you to atovaquone-proguanil before you leave."

**Side effects, in honest categories.**
- **Common and mild:** vivid dreams (around 30%), mild dizziness, nausea, headache. Often settles after the first few doses.
- **Uncommon but notable:** anxiety, insomnia, low mood. Reason to switch.
- **Rare but serious:** psychosis, seizures, severe depression. Estimated incidence around 1 in 10,000–13,000. Much more likely with personal or family psychiatric history — which is why screening matters.

**Absolute contraindications.**
- Personal history of depression, anxiety disorder, psychosis, schizophrenia, or any serious psychiatric condition.
- History of seizures or epilepsy.
- Cardiac conduction abnormalities.
- Hypersensitivity to mefloquine or quinine-class drugs.

**Relative contraindications worth discussing.**
- First trimester of pregnancy (now considered probably safe by WHO and CDC, but data still accumulating).
- Activities requiring fine coordination or alertness (pilots, divers).

**My honest take as a prescribing physician.** Mefloquine is a useful drug that I prescribe for the right patient. I screen carefully for psychiatric history (often the patient has forgotten or didn't think a years-old episode of depression mattered — it does). I always do the 2–3 week pre-travel run. And I'm very comfortable switching patients off it if they report any neuropsychiatric symptoms, no matter how minor.

---

## Specific scenarios

These cover most of what I see in clinic.

### The 10-day Tanzania safari

Atovaquone-proguanil. Short trip, daily dosing is fine, the cost (~CHF 100–120 total) is rounding error compared to the rest of a safari budget. Excellent tolerability matters when you're paying premium for the experience.

### The 6-month research trip in West Africa

Mefloquine, assuming clean psychiatric history. Six months of daily Malarone is roughly CHF 1,500. Six months of daily doxycycline carries cumulative photosensitivity risk and compliance burden. Weekly mefloquine — once you've established tolerance over the first 2–3 weeks — is practical and sustainable.

### The pregnant woman with unavoidable travel

Specialist consult. Pre-travel obstetric assessment, malaria-zone specifics, gestational age, alternatives to travel, all need weighing. If prophylaxis is needed and we're past the first trimester, mefloquine is the answer. If first trimester or any complications — case-by-case decision.

### The diver

Doxycycline (no issue) or atovaquone-proguanil. Mefloquine is out — dizziness underwater is dangerous.

### The backpacker on a budget, 4 weeks Southeast Asia

Doxycycline. Cheap, daily dosing manageable for the trip duration, adventure-related bonus coverage useful. Counsel on sun protection and esophageal safety.

### The patient with a history of depression

Atovaquone-proguanil for short trips. Doxycycline for longer trips. Mefloquine is contraindicated regardless of how distant or mild the psychiatric history was. This isn't an area to negotiate.

### Children

Under 8 years old: doxycycline is contraindicated (tooth discoloration). Atovaquone-proguanil from 5 kg, mefloquine from 5 kg, both with weight-based dosing. Pediatric formulations exist for atovaquone-proguanil. For most pediatric travelers, AP is the simplest choice.

### The traveler who's read about mefloquine and is scared

Don't argue. If atovaquone-proguanil or doxycycline are appropriate alternatives for their itinerary, prescribe one of those. The therapeutic relationship matters more than winning an argument about a specific drug.

---

## Practical FAQ

**What if I miss a dose?** Atovaquone-proguanil and doxycycline: take it as soon as you remember if it's the same day, otherwise skip and continue normally. Don't double up. Mefloquine: same — take the missed dose as soon as you remember, then resume the weekly schedule from that day.

**Can I drink alcohol?** Yes for all three, in moderation. Heavy drinking interferes with all of them and is its own risk on travel. No specific drug-alcohol interaction worth special concern.

**What about sunscreen with doxycycline?** Use SPF 50, broad-spectrum, applied every morning to all exposed skin including hands, feet, neck, ears. Reapply every 2 hours if outdoors. Hats and long sleeves help most. Prevention is much easier than treating a phototoxic burn.

**When should I actually start the drug?** Atovaquone-proguanil and doxycycline: 1–2 days before entering the malaria area is sufficient. Mefloquine: 2–3 weeks before. If you find out 4 days before departure that you need mefloquine, you don't have enough lead time — switch to a different drug.

**What if I get sick anyway?** Prophylaxis reduces but does not eliminate malaria risk. Any febrile illness during or up to 3 months after travel to a malaria area is malaria until proven otherwise. Get a blood film immediately. This is true even if you took every dose perfectly.

**Can I stop the drug early because I left the malaria zone?** No. The post-travel continuation is to clear parasites that may have been incubating in your liver during exposure. Stopping early defeats much of the point of taking it at all.

**Standby emergency self-treatment — when?** For travelers heading to remote areas where medical care is more than 24 hours away, I sometimes prescribe artemether-lumefantrine as standby treatment in addition to prophylaxis. This is a separate decision from prophylaxis choice and worth discussing with a travel medicine specialist before any remote travel.

---

## When to come see a travel medicine physician

If your trip involves any of: pregnancy, young children, complex medical history, planned diving or other special activities, immunosuppression, or destinations with complicated regional malaria patterns — book a consultation. The 30-minute appointment will save you a lot of guesswork and may catch contraindications you didn't know to mention.

For a straightforward 2-week beach holiday in a low-risk area, your GP can prescribe and you'll be fine. For most other trips, the consultation is worth it.

---

*This guide is general information and does not substitute for individualized medical advice. Drug choice should always be made with a prescribing physician who knows your medical history.*
`,
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
