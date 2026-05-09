export type ArticleCategory =
  | "gear-review"
  | "destination-guide"
  | "prevention"
  | "travel-story"
  | "explainer";

export type QuickRecCard = {
  /** Emoji shown in the round badge at top-left of the card */
  icon: string;
  /** Short uppercase tag describing when this advice applies */
  scenario: string;
  /** The actual recommendation — drug name, action, or "Avoid X" */
  recommendation: string;
  /** Optional fine-print line (e.g. generic name, dosing schedule) */
  detail?: string;
};

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
  /** Optional row of scenario→recommendation cards rendered above the
   *  markdown body. Useful for decision-oriented articles. */
  quickRecommendations?: QuickRecCard[];
  /** Optional named illustration rendered as a cover image at the top
   *  of the article. Components are mapped in the article renderer. */
  coverIllustration?: "malaria-pills" | "cruise-ship" | "repellent-sprays";
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
    date: "2026-04-30",
    title: "Anti-Brumm vs NoBite vs Care Plus: a Swiss physician's repellent guide",
    subtitle:
      "Why I keep recommending Anti-Brumm Forte for most travelers — and the situations where I switch to picaridin or higher-concentration DEET.",
    category: "gear-review",
    tags: ["mosquito protection", "DEET", "picaridin", "permethrin", "Swiss"],
    readingTime: 8,
    coverGradient: "linear-gradient(135deg, #0c4a6e 0%, #164e63 100%)",
    coverIllustration: "repellent-sprays",
    featured: true,
    quickRecommendations: [
      { icon: "⏱️", scenario: "Most travelers", recommendation: "Anti-Brumm Forte", detail: "30% DEET" },
      { icon: "🌳", scenario: "High-intensity exposure", recommendation: "Care Plus 50%", detail: "Amazon, PNG, jungle" },
      { icon: "🤰", scenario: "Pregnancy", recommendation: "NoBite Skin", detail: "20% icaridin" },
      { icon: "👶", scenario: "Children", recommendation: "Anti-Brumm 20%", detail: "or NoBite Skin" },
      { icon: "👕", scenario: "Clothing layer", recommendation: "NoBite Clothes", detail: "permethrin spray" },
      { icon: "☀️", scenario: "With sunscreen", recommendation: "Sunscreen first", detail: "wait 20 min" },
    ],
    content: `## The short answer

For most Swiss travelers heading to a malaria or dengue zone, I recommend **Anti-Brumm Forte** (30% DEET). Available in every pharmacy in Switzerland, well-tolerated, effective for 6–8 hours, costs about CHF 15.

I switch to **Care Plus 50% DEET** for high-intensity exposure — Amazon basin, Papua New Guinea, dense jungle. I recommend **NoBite Skin** (20% icaridin) for travelers who can't tolerate DEET or specifically prefer the lighter feel.

For clothing, I always recommend pretreating with **permethrin** (NoBite Clothes) as a separate, complementary layer.

This is what actually works in Swiss pharmacies, with real travelers, in 2026.

---

## Why Anti-Brumm Forte is my default

Anti-Brumm Forte (30% DEET) is the product I send 80% of my patients to buy. The reasons, in order of how much they actually matter:

**Availability.** Every pharmacy in Switzerland stocks it. Migros and Coop pharmacies carry it. The traveler doesn't need to shop around. Compare this with American brands like Off! that are difficult to find in CH or require an order from abroad.

**Effective duration.** 30% DEET protects for 6–8 hours. That's enough for a full day of sightseeing or a long evening outside. Higher concentrations (50%, 100%) extend duration somewhat, but the diminishing returns are real — going from 30% to 50% adds maybe 2 more hours, while making the skin feel a bit worse.

**Tolerability.** Patients tolerate Anti-Brumm Forte well. It's a spray (which most travelers prefer over creams), and the carrier formulation is less greasy than older DEET products. It still smells like DEET — that's chemistry, not formulation — but it's less aggressive than 100% military-grade products.

**Trust factor.** Anti-Brumm has been on the Swiss market for decades. Manufactured in Germany by Hermes Arzneimittel. Swiss travelers, especially older ones, recognize the brand and trust it. That matters for compliance.

**Cost.** About CHF 15 for a 75 ml bottle, which covers a couple of weeks of regular use.

The honest downsides: it's still DEET, which can damage plastics (don't spray it on synthetic watch straps or sunglasses frames), and it has a noticeable smell. Both are universal DEET issues, not Anti-Brumm specific.

## When I switch to Care Plus 50% DEET

For high-intensity exposure where 30% isn't quite enough:

**Amazon basin, Papua New Guinea, Borneo interior.** Dense biting pressure, often round-the-clock. The extra hours per application matter when you're hiking twelve.

**Travelers who sweat heavily.** Heavy perspiration shortens any repellent's effective duration. Higher concentration buys back some of that loss.

**Multi-day treks where reapplication is logistically difficult.**

Care Plus is a Dutch brand sold in Swiss travel pharmacies — most pharmacy chains carry it in their travel section or order it on request. About CHF 18–22 for a 100 ml bottle. Available in 30%, 40%, and 50% concentrations. The 50% is the one I prescribe for the situations above.

What about 100% DEET? Generally not necessary, and the increase in skin sensitization isn't worth the marginal duration extension. The exception is treating gear (where it doesn't touch skin) — but even there, permethrin is better.

## When I recommend picaridin instead of DEET

Picaridin (also called icaridin in Europe) is essentially equivalent to DEET in efficacy at 20% concentration. The differences are sensory: picaridin has no smell, doesn't damage plastics, and feels lighter on skin.

The Swiss-available picaridin products:

- **NoBite Skin** (20% icaridin). Spray, ~CHF 15. Available in most pharmacies.
- **Autan Active Spray** (20% icaridin). Found in Migros, Coop, and pharmacies. Slightly cheaper.

Both work equally well. Patients who try both usually develop a preference based on the smell of the carrier or the spray feel.

Situations where I specifically recommend picaridin over DEET:

**Pregnancy.** DEET is generally considered safe in pregnancy at standard concentrations — WHO and CDC both support its use. But I have several pregnant patients who feel uncomfortable applying DEET despite the evidence. For them, picaridin gives equivalent protection with less psychological burden. I prescribe whichever gives the patient the confidence to actually use it.

**Travelers who hate DEET smell.** Real complaint, not trivial. If the smell is the difference between using the product and forgetting it, switch.

**People with watches or sunglasses they care about.** DEET genuinely damages many plastics. Picaridin doesn't.

**Children, in some European guidelines.** Some pediatric guidelines prefer picaridin from age 6 months; the CDC allows DEET from 2 months. Either is reasonable.

What picaridin doesn't replace: extreme high-intensity exposure (Amazon-class), where the longer duration of 50% DEET still wins.

## Children

The basics:

- **Under 2 months:** no chemical repellent. Physical barriers only — mosquito nets over strollers, long sleeves.
- **2 months to 12 years:** 10–30% DEET, or 20% picaridin. Apply by an adult. Wash off when the child comes back indoors.
- **Over 12 years:** same as adult dosing.

I usually recommend **Anti-Brumm 20%** (the lower-concentration version) for children, or **NoBite Skin** (20% icaridin). Apply to your own hands first, then to the child — never spray directly into a child's face.

Avoid combination sunscreen + repellent products. They sound convenient but cause real problems: sunscreen needs frequent reapplication, DEET shouldn't be reapplied as often, and DEET reduces sunscreen's UV protection by about a third. Always apply sunscreen first, wait 15–20 minutes, then apply repellent on top.

## Permethrin-treated clothing — the underused second layer

This is the recommendation patients most often haven't heard about.

**What it is:** Permethrin is a different chemical class — it kills or paralyzes insects on contact with treated fabric. Unlike DEET or picaridin, it goes on clothes, not skin.

**Why it matters:** Mosquitoes and ticks contact your clothing before they reach skin. Permethrin-treated clothing kills them before they bite. Combined with a skin repellent, the protection is significantly higher than either alone.

**The Swiss product:** **NoBite Clothes** spray. Treat clothing yourself: lay it flat, spray evenly until damp, let dry overnight before wearing. One treatment lasts through 4–6 washes — about 4–6 weeks of daily wear. About CHF 25 for a 100 ml bottle, enough for a couple of outfits.

**Who benefits most:** travelers to high-risk malaria areas, tick-exposed travelers (forest hiking in central/eastern Europe in tick season), and travelers in areas with high biting pressure where DEET alone isn't quite enough.

**Important safety note:** permethrin is toxic to cats. Don't treat clothes in a household with cats nearby, and don't let cats sleep on freshly treated items. Once dry, the residual on adult clothing in normal household use is generally fine.

## Quick scenarios

**The 10-day Tanzania safari.** Anti-Brumm Forte for skin. NoBite Clothes treatment for the safari shirt and trousers worn at dawn and dusk.

**Two weeks backpacking in Vietnam.** Anti-Brumm Forte. The 30% concentration handles daytime Aedes mosquitoes (dengue, chikungunya) and evening Anopheles (malaria) equally well.

**Amazon expedition.** Care Plus 50% DEET for skin, NoBite Clothes for everything fabric. Bring two bottles of each — running out is the main risk.

**Hiking in Switzerland in tick season.** Anti-Brumm Forte for legs and arms. NoBite Clothes for hiking trousers and socks. The clothing layer is what catches ticks before they latch.

**Pregnant traveler.** NoBite Skin or Autan (picaridin). Standard reapplication frequency.

**Family with young children.** Anti-Brumm 20% for kids, Anti-Brumm Forte 30% for adults. NoBite Skin is also fine for both.

**Beach holiday with no malaria or dengue risk.** Honestly optional. Picaridin if you want comfort from bites; no repellent needed if you don't mind a few evening mosquitoes.

## Frequently asked questions

**How often do I reapply?**
Read the bottle. As a rough rule: 30% DEET, 6–8 hours. 50% DEET, 8–10 hours. Picaridin 20%, 6–8 hours. Reapply earlier if heavily sweating, swimming, or wiping skin frequently.

**Sunscreen first or repellent first?**
Sunscreen first. Wait 15–20 minutes for it to bind to skin. Then apply repellent on top. The opposite order reduces sunscreen efficacy.

**What about citronella and "natural" products?**
They don't work well enough for high-risk travel. Citronella, eucalyptus oil, and other plant-based repellents have a short-duration effect (often 30–60 minutes) but cannot match DEET or picaridin for actual disease-transmission prevention. Fine for an evening in your Swiss garden; not appropriate for malaria-zone travel.

**What about ultrasonic repellent devices?**
They don't work. Despite continued marketing, multiple studies show no measurable effect. Save the money.

**Does spraying on clothes work as well as on skin?**
Often better. DEET sprayed on clothes lasts longer than on skin (skin metabolizes it; cloth doesn't). Picaridin works similarly. But neither replaces a permethrin treatment — different mechanism.

**My DEET ruined my watch strap. Can I get it back?**
No. DEET dissolves several types of plastic and synthetic rubber. Apply only to skin or fabric, and keep it away from watch straps, eyewear frames, and synthetic strap webbing.

**What's the difference between DEET and picaridin in the field?**
For most travelers in most situations, none. They're equivalent at 20–30% concentration. The differences are sensory (smell, feel) and material (DEET damages plastics; picaridin doesn't). I prescribe whichever the patient will actually use consistently.

---

Buy your repellent in Switzerland before you leave. Pharmacy prices abroad are often higher and product reliability varies. The Anti-Brumm Forte you drop into your travel kit at the local Apotheke costs CHF 15 and lasts the whole trip — easiest decision in your travel prep.
`,
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
    date: "2026-05-03",
    title: "Malarone vs. Doxycycline vs. Mefloquine: a physician's straight take",
    subtitle:
      "Why I prescribe Malarone first for most travelers — and the specific situations where I switch.",
    category: "prevention",
    tags: ["malaria", "prophylaxis", "Malarone", "doxycycline", "mefloquine"],
    readingTime: 7,
    coverGradient: "linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)",
    coverIllustration: "malaria-pills",
    featured: true,
    quickRecommendations: [
      { icon: "⏱️", scenario: "Short trips", recommendation: "Malarone", detail: "atovaquone-proguanil" },
      { icon: "💰", scenario: "Budget travelers", recommendation: "Doxycycline" },
      { icon: "📅", scenario: "Long trips, weekly dose", recommendation: "Mefloquine" },
      { icon: "⚡", scenario: "Last-minute departure", recommendation: "Malarone or doxy" },
      { icon: "☀️", scenario: "Sun-sensitive travelers", recommendation: "Avoid doxycycline" },
      { icon: "🧠", scenario: "Psychiatric history", recommendation: "Avoid mefloquine" },
    ],
    content: `## The short answer

For most travelers I see in clinic, I prescribe **Malarone** (atovaquone-proguanil). It's the cleanest option — best tolerated, simplest schedule, fewest hassles.

I switch to **doxycycline** when cost matters or the trip is long. I reach for **mefloquine** in only a few specific situations.

This is not a textbook comparison. It's the framework I actually use when I'm sitting across from a patient who's about to fly to Africa or Asia.

---

## Why Malarone is my default

When a patient walks into my office and asks "what should I take?", my opening assumption is Malarone. I've prescribed it hundreds of times. It's the drug I'd take myself.

The reasons, in order of how much they actually matter:

**Tolerability.** This matters more than anything else. A drug with great efficacy that the patient stops taking on day three because of nausea provides zero protection. Malarone is the best-tolerated of the three. Most patients report mild stomach upset at worst. Plenty report nothing at all.

**Schedule.** One tablet daily, starting one day before the trip, ending one week after. The week-after window is the part that actually gets followed. With doxycycline you keep going for four weeks. With mefloquine, four more weekly doses. People stop. Malarone people finish.

**Simplicity in the consultation.** No psychiatric history screen needed. No "are you a diver?" branch. No "are you under eight years old?" exclusion. Almost every adult traveler is a candidate.

**Speed.** A patient who walks in three days before departure can start Malarone the next morning and be protected. The other two need a longer runway. Most last-minute travelers I see leave my clinic with Malarone.

The downside is cost — about CHF 50–80 per week of trip in Switzerland. For a 10-day Tanzania safari, that's small change compared to the rest of the trip cost. For a six-month research stay in West Africa, it becomes prohibitive. That's where I switch.

## When I switch to doxycycline

Cost-driven, mostly. Specifically when one of these is true:

**The trip is long.** Months, not weeks. Daily Malarone for half a year is expensive enough to tip many patients to skipping prophylaxis entirely — which is worse. A daily 100 mg doxycycline tablet costs about 20 cents.

**The traveler is a backpacker who specifically asks.** Many young travelers research this themselves and arrive in clinic already preferring doxy. I generally agree — they're cost-sensitive, generally healthy, and the bonus protection against leptospirosis and African tick-bite fever is genuinely useful for their style of travel.

**Malarone isn't an option** because of severe kidney problems or other contraindications.

What I tell every doxycycline patient:

- Take it with a full glass of water and don't lie down for half an hour. Otherwise you risk irritation in the throat or chest that can be unpleasant.
- Sun protection is non-negotiable. SPF 50 every day, hats, long sleeves where you can. Doxycycline makes you sunburn faster.
- Continue for four weeks after you leave the malaria area. This is the rule that gets broken most.
- Yes, you can scuba dive on it. The "doxy is bad for divers" thing is a myth from confusion with mefloquine.

## When I reach for mefloquine

Three situations, mainly:

**Long trips where weekly dosing is the difference.** Six months in rural Africa. Daily Malarone is too expensive. Daily doxycycline for half a year is real compliance work. Once-weekly mefloquine is sustainable in a way the others aren't.

**Pregnancy in the second or third trimester.** When travel can't be avoided (and ideally it should be), mefloquine is the option. Malarone has limited pregnancy safety data; doxycycline is contraindicated in pregnancy.

**Patients who already know it works for them.** A handful of long-term expats and aid workers know mefloquine well, have tolerated it before, and prefer the weekly schedule.

The hard rule: I will not prescribe mefloquine to any patient with a personal psychiatric history. Even mild depression years ago counts. Same for seizure disorder or cardiac conduction problems. The rare neuropsychiatric reactions are uncommon — but they happen, and they happen disproportionately to people with vulnerable history.

I also do something I think every prescriber should: I have patients take their first two or three doses at home, before departure. If they have any unusual dreams, anxiety, or mood change, we switch them to Malarone before they leave Switzerland. This catches almost all intolerance reactions early.

## Quick scenarios

The most common situations I actually see in clinic.

**The 10-day Tanzania safari.** Malarone. Don't overthink it.

**The six-month research trip in West Africa.** Mefloquine, after psychiatric screen and a three-week home trial.

**Pregnancy.** Specialist consult. If past first trimester and travel is unavoidable, mefloquine.

**Children.** Under eight years old, no doxycycline. Malarone from 5 kg, mefloquine from 5 kg. Pediatric Malarone is the cleanest answer for most families.

**The diver.** Doxycycline or Malarone. Mefloquine is out — dizziness underwater is dangerous.

**The patient with a history of depression.** Malarone for short trips, doxycycline for long ones. Mefloquine is off the table forever, even for "just one course."

**The four-week Southeast Asia backpacker.** Doxycycline. Cheap, the bonus antibiotic coverage helps with their style of travel, and they're typically young enough to manage the sun-protection requirement.

## Three questions that come up every consultation

**What if I miss a dose?**
Take it as soon as you remember the same day. Skip if you've already passed into the next day's window. Never double up.

**What if I get sick anyway?**
Prophylaxis reduces malaria risk by about 90%, not 100%. Any fever during or in the three months after travel to a malaria area gets a malaria blood test, immediately. Even if you took every dose perfectly. This is non-negotiable.

**Can I drink alcohol on these?**
Yes, in moderation. Heavy drinking interferes with everything and is its own bad idea on travel. No specific drug-alcohol interaction worth special concern.

---

That's the framework. For nine out of ten travelers, it leads to Malarone. For the rest, the decision is usually obvious within a sentence or two of conversation.

If your trip involves any complications — pregnancy, young children, complex medical history, immunosuppression, planned diving in malaria zones — book a travel medicine consultation. The 30 minutes is worth it.
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
  {
    id: "cruise-health-physician-guide",
    date: "2026-05-09",
    title: "Cruise health: a physician's honest take on staying healthy at sea",
    subtitle:
      "What actually goes wrong on cruises, what to pack, and what the ship's doctor can and can't do for you.",
    category: "prevention",
    tags: ["cruise", "norovirus", "motion sickness", "pre-existing conditions"],
    readingTime: 9,
    coverGradient: "linear-gradient(135deg, #0a1628 0%, #020617 100%)",
    coverIllustration: "cruise-ship",
    featured: true,
    quickRecommendations: [
      { icon: "🧼", scenario: "Norovirus", recommendation: "Soap & water", detail: "alcohol gel doesn't kill it" },
      { icon: "🩹", scenario: "Motion sickness", recommendation: "Scopolamine patch", detail: "before boarding" },
      { icon: "🦟", scenario: "Tropical ports", recommendation: "DEET / Picaridin" },
      { icon: "💊", scenario: "Chronic conditions", recommendation: "2× medication", detail: "redundancy is the rule" },
      { icon: "🚁", scenario: "Insurance", recommendation: "Medical evac coverage", detail: "not optional" },
      { icon: "🩺", scenario: "When in doubt", recommendation: "See ship's doctor", detail: "low threshold" },
    ],
    content: `## The short answer

Cruises are not my favorite recommendation. Confined ship environments amplify infectious disease, the average passenger is older with chronic conditions, and the medical backup at sea is more limited than people realize.

That said — if you're going, here's what actually matters and what to plan for. I'd rather you go prepared than not at all.

---

## What actually goes wrong on cruises

Three categories cover almost everything I see in returning cruise travelers:

**Norovirus.** The recurring villain. Ships are uniquely vulnerable — same buffet lines, same handrails, same bathrooms, hundreds of people sharing them. Outbreaks happen, get reported, and the CDC's Vessel Sanitation Program publishes them. If you go on enough cruises, you will eventually be on one when an outbreak occurs. Plan for it.

**Respiratory infections.** COVID, influenza, RSV — all spread on ships. The older passenger demographic means more severe outcomes. The pandemic-era cruise ship outbreaks were a reminder of what was already known from norovirus: confined population, shared air systems, dense social contact.

**Motion sickness.** Not life-threatening, but can ruin a trip. Easier to prevent than to treat once it's started.

**Other things that come up less often** but matter: infectious risks on port days (dengue, traveler's diarrhea), accidents on shore excursions, and acute presentations of chronic conditions in passengers who underestimate how isolated they'll be.

## Norovirus: assume it's possible, plan accordingly

The cruise norovirus playbook is well-established. Wash your hands frequently with soap and water — alcohol-based sanitizers don't reliably kill norovirus. Use the hand-washing stations near dining rooms (they exist for a reason). Don't share utensils. If you feel any stomach symptoms, isolate to your cabin and report it — yes, even though it ruins your day, because not reporting it means more people get sick.

If you do get hit:

- Oral rehydration is the priority. The ship's medical center has it.
- Don't try to push through. You'll feel better in 24–48 hours, and a day in your cabin is better than seeding your travel companions.
- Loperamide (Imodium) is a reasonable tool, not a cure.

## Respiratory infections

Respiratory illness on cruises declined in 2023–2024 as the world figured out post-pandemic protocols, then quietly came back. The basics:

- Get your flu shot before any winter cruise.
- COVID booster within the past year if you're over 65 or have chronic conditions.
- Wear a mask in genuinely crowded indoor spaces — embarkation lines, elevators during peak hours, the lobby on day one. It looks unusual on a cruise. It still works.
- If you develop symptoms, isolate. Don't be the person who joins formal night with a cough.

## Motion sickness

This is where I have actual opinions about which products work and which don't.

**First-line: scopolamine patch.** Apply behind the ear several hours before boarding. Lasts three days per patch. By far the most effective option for serious motion sickness. Available by prescription.

**Second-line: meclizine or cinnarizine.** Antihistamines, less drowsy than dimenhydrinate (Dramamine), available over the counter in most countries.

**Wrist bands and ginger pills.** Possibly placebo. If they work for you, they work for you — no harm in trying.

**Avoid scopolamine if** you have severe glaucoma or urinary retention.

## What about the recent hantavirus story?

Worth a mention because people will ask. In May 2026, a cruise ship cluster of severe respiratory illness was attributed to hantavirus and made international news. It was extremely unusual — hantavirus on cruises is not a known pattern, and the case count was small.

The general lesson is not "hantavirus is now a cruise risk." It's that any cluster of severe respiratory illness on a confined ship will spread before it's identified. That's a known pattern, and the response is the same as ever: report symptoms early, isolate, follow medical advice.

## Port-day infectious risks

The cruise itself is one risk environment. Port days are different.

**Caribbean and Mexico.** Dengue, chikungunya, and Zika in season. Same Aedes mosquitoes you'd worry about anywhere. Daytime mosquito repellent. Light long sleeves. Dengue is the most likely.

**Mediterranean.** Surprisingly few infectious risks. Food and water hygiene is the main thing.

**Africa.** Yellow fever, malaria, and typhoid depending on the specific ports. Cruise itineraries that include African ports often need pre-trip vaccinations months in advance — book your travel medicine consultation early.

**Asia.** Variable by route. Japanese encephalitis if you're doing rural day excursions in monsoon season; otherwise mostly food and water hygiene.

For any cruise with tropical port days, look up each port's health profile before booking — TravelMed's country pages have current vaccine recommendations and outbreak alerts.

## Pre-existing conditions on a cruise

This is where I see the most real medical issues. Cruises attract older travelers with chronic conditions, and the gap between "feeling fine on land" and "managing a cardiac event at sea" is wider than most people realize.

The honest version of what to plan for:

**Diabetes.** Bring twice the insulin you think you need. Pack glucagon. Tell the cruise line in advance — most have refrigeration in cabins on request. Time-zone changes complicate dosing; talk to your endocrinologist before a multi-time-zone itinerary.

**Cardiac conditions.** If you've had a recent event (within six months) or have unstable angina, talk to your cardiologist before booking. Cruise ship medical centers can stabilize, but cannot do cardiac catheterization. Helicopter evacuation from a ship at sea takes hours, not minutes.

**Renal disease.** A small number of cruise lines have onboard dialysis. Most don't. Confirm before booking.

**Mobility.** Ships are not as accessible as marketed. Plan for walking distances longer than you expect.

**Anticoagulation.** Bring more medication than you think you'll need. Don't forget that vacation can disrupt routine in ways that affect compliance.

**For everyone:**

- Travel insurance with medical evacuation coverage. Not optional. Standard travel insurance often doesn't cover cruise evacuation.
- A list of all medications with generic names, dosages, and prescribing physicians, kept in your wallet and a backup in your cabin safe.
- Enough medication for the trip plus seven to ten extra days. Connections get missed.

## What's actually on the ship's medical center

Useful expectation-setting. A typical large cruise ship medical center has:

- One or two physicians, usually with emergency or general practice background
- A few nurses
- Basic lab capability (blood counts, electrolytes, troponin, urinalysis)
- ECG, basic ultrasound, often X-ray
- IV fluids, oxygen, basic resuscitation equipment
- A small pharmacy of common medications

What they cannot do: cardiac catheterization, complex surgery, advanced imaging (CT, MRI), childbirth assistance for complicated deliveries, dialysis (with rare exceptions). For anything serious, you'll be evacuated — by helicopter if conditions allow, or by diverting to the nearest port.

The medical center charges for visits. Travel insurance usually covers it; check your policy before boarding.

## My cruise medical kit

What I'd actually pack as a physician for a typical week-long cruise:

- All my regular medications, in original containers, in carry-on
- A backup of essential medications in a separate bag
- Loperamide (Imodium) for diarrhea
- Oral rehydration salt sachets
- Acetaminophen / paracetamol
- An antihistamine (cetirizine for daytime, diphenhydramine for sleep if needed)
- Scopolamine patches if I'm prone to motion sickness
- Basic wound care: bandages, antiseptic wipes, antibiotic ointment
- Hand sanitizer (despite the norovirus caveat — it works for most other things)
- Sunscreen, SPF 50, multiple bottles
- Insect repellent for tropical ports

What I leave at home: pre-emptive antibiotics. Most cases of traveler's diarrhea on cruises are viral and antibiotics don't help. If you really need them, the ship's doctor can prescribe.

## When to use the ship's doctor

Lower threshold than you'd use at home. You're paying for it, the queue is short, and conditions you'd "wait out" at home can spiral on a ship without normal support.

Worth a visit:

- Any new chest pain, breathlessness, or palpitations
- Fever over 38.5°C, especially with other symptoms
- Vomiting or diarrhea that doesn't settle in 24 hours
- Any new neurological symptom — confusion, weakness, severe headache
- Anything you'd call your GP for at home

Manage yourself:

- Mild seasickness
- Sunburn (unless severe)
- Minor cuts and scrapes
- Standard cold symptoms in someone otherwise well

## Bottom line

If you're going on a cruise — and many of my patients do, and enjoy them — go prepared. Travel insurance with evacuation coverage. Medication redundancy. Hand hygiene taken seriously. Awareness of what the ship can and cannot do medically.

I'm not against cruises. I am against pretending they're risk-free. They're a confined environment with an older demographic and limited medical backup, and that combination has real implications. The travelers who do well are the ones who know that going in and plan accordingly.
`,
  },
];
