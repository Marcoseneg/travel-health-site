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
    date: "2026-05-09",
    title: "Anti-Brumm vs NoBite vs Care Plus: a Swiss physician's repellent guide",
    subtitle:
      "Why I keep recommending Anti-Brumm Forte for most travelers — and the situations where I switch to picaridin or higher-concentration DEET.",
    category: "gear-review",
    tags: ["mosquito protection", "DEET", "picaridin", "permethrin", "Swiss"],
    readingTime: 5,
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

For most Swiss travelers heading to a malaria or dengue zone, I recommend **Anti-Brumm Forte** (30% DEET) — available everywhere, well-tolerated, 6–8 hours of protection.

I switch to **Care Plus 50% DEET** for high-intensity exposure (Amazon, jungle treks). I recommend **NoBite Skin** (20% icaridin) for travelers who can't tolerate DEET.

For clothing, I always recommend **NoBite Clothes** (permethrin) as a separate, complementary layer.

---

## What's in your local pharmacy

| Product | Active ingredient | Skin or clothes | Adults | Pregnancy | Children | Approx. CHF |
|---|---|---|---|---|---|---|
| Anti-Brumm Forte | 30% DEET | Skin | ✓ Default | OK | From 2y | ~15 |
| Anti-Brumm Classic | 20% DEET | Skin | OK (lower potency) | OK | From 2y | ~12 |
| Care Plus 50% DEET | 50% DEET | Skin | High-intensity | OK | Limit to 30% | ~20 |
| NoBite Skin | 20% icaridin | Skin | DEET alternative | ✓ Preferred by some | From 2y | ~15 |
| Autan Active | 20% icaridin | Skin | DEET alternative | ✓ Preferred by some | From 2y | ~11 |
| NoBite Clothes | Permethrin | Clothes only | Second layer | OK once dry | OK on cloth | ~25 |

*Prices vary 10–30% between Swiss pharmacies; ranges are approximate.*

## Why Anti-Brumm Forte is my default

I send 80% of patients to Anti-Brumm Forte.

**Availability.** Every pharmacy in Switzerland stocks it. Migros and Coop pharmacies carry it. No shopping around.

**Effective duration.** 30% DEET protects for 6–8 hours. Higher concentrations extend duration somewhat, but with diminishing returns.

**Tolerability.** Spray (most travelers prefer it over creams), less greasy than older DEET formulas, smells like DEET but not aggressive.

**Trust.** On the Swiss market for decades. Manufactured by Hermes Arzneimittel. Older Swiss travelers especially recognize and trust the brand.

Downside: it's still DEET. Damages plastics (don't spray on synthetic watch straps or sunglasses frames) and has a noticeable smell. Universal DEET issues, not Anti-Brumm specific.

## When I switch to Care Plus 50%

For high-intensity exposure: Amazon basin, Papua New Guinea, Borneo interior — dense round-the-clock biting pressure where the extra 2–3 hours per application matters.

Also for travelers who sweat heavily (perspiration shortens duration) or for multi-day treks where reapplication is logistically difficult.

100% DEET isn't usually necessary — diminishing returns and increased skin sensitization. The exception is treating gear, where permethrin is better anyway.

## When I recommend picaridin instead

Picaridin (also called icaridin) is essentially equivalent to DEET at 20%. The differences are sensory: no smell, doesn't damage plastics, lighter on skin.

Situations where I specifically recommend it:

- **Pregnancy** — DEET is officially safe at standard concentrations (per WHO/CDC), but several pregnant patients feel uncomfortable applying it. I prescribe whichever gives them confidence to actually use it.
- **Travelers who hate DEET smell.** Real complaint. If smell is the difference between using and forgetting, switch.
- **People with watches or sunglasses they care about.** DEET damages plastics; picaridin doesn't.

What picaridin doesn't replace: extreme high-intensity exposure (Amazon-class), where 50% DEET still wins.

## Permethrin-treated clothing — the underused second layer

The recommendation patients haven't heard. Permethrin kills (or paralyzes) insects on contact with treated fabric. It goes on clothes, not skin.

**Why it matters:** mosquitoes and ticks contact your clothing first. Permethrin-treated clothing kills them before they bite. Combined with skin repellent, total protection is significantly higher than either alone.

**The product:** **NoBite Clothes** spray. Treat clothes yourself: lay flat, spray evenly until damp, dry overnight. Lasts 4–6 washes. About CHF 25 per 100 ml bottle.

**Best for:** high-risk malaria areas, tick-exposed travelers (forest hiking in central Europe in tick season), and high-biting-pressure travel where DEET alone isn't quite enough.

**Important:** permethrin is toxic to cats. Don't treat clothes near cats. Once dry, the residual on adult clothing is generally fine.

## Children

- **Under 2 months:** no chemical repellent. Physical barriers only.
- **2 months to 12 years:** 10–30% DEET, or 20% picaridin. Apply by adult.
- **Over 12 years:** adult dosing.

Anti-Brumm 20% or NoBite Skin 20% icaridin. Apply to your hands first, then to the child — never spray into a child's face.

Avoid sunscreen + repellent combos. Always apply sunscreen first, wait 15–20 minutes, then repellent on top.

## Quick scenarios

- **Tanzania safari** — Anti-Brumm Forte for skin, NoBite Clothes treatment for safari clothes.
- **Vietnam backpacking** — Anti-Brumm Forte. The 30% concentration handles daytime Aedes (dengue) and evening Anopheles (malaria) equally.
- **Amazon expedition** — Care Plus 50% for skin, NoBite Clothes for everything fabric. Bring two of each.
- **Swiss tick season** — Anti-Brumm Forte for legs and arms, NoBite Clothes for trousers and socks.
- **Pregnancy** — NoBite Skin or Autan (picaridin).
- **Family with kids** — Anti-Brumm 20% for kids, Forte for adults.

## A few questions

**How often do I reapply?** 30% DEET, 6–8 hours. 50% DEET, 8–10 hours. Picaridin 20%, 6–8 hours. Reapply earlier if heavily sweating or swimming.

**Sunscreen first or repellent first?** Sunscreen first. Wait 15–20 minutes. Repellent on top. Opposite order reduces sunscreen efficacy.

**Citronella, plant-based, ultrasonic devices?** Don't work well enough for high-risk travel. Save the money.

**My DEET ruined my watch strap. Can I get it back?** No. Apply only to skin or fabric, never to plastic.

---

Buy your repellent in Switzerland before you leave. The Anti-Brumm Forte you grab at your local Apotheke costs CHF 15 and lasts the whole trip — easiest decision in your travel prep.
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
    date: "2026-05-09",
    title: "Malarone vs. Doxycycline vs. Mefloquine: a physician's straight take",
    subtitle:
      "Why I prescribe Malarone first for most travelers — and the specific situations where I switch.",
    category: "prevention",
    tags: ["malaria", "prophylaxis", "Malarone", "doxycycline", "mefloquine"],
    readingTime: 5,
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

For most travelers I see, I prescribe **Malarone** (atovaquone-proguanil). It's the cleanest option — best tolerated, simplest schedule, fewest hassles.

I switch to **doxycycline** when cost matters or the trip is long. I reach for **mefloquine** only in a few specific situations.

This is the framework I actually use in clinic, not a textbook comparison.

---

## Why Malarone is my default

When a patient walks in and asks "what should I take?", my opening assumption is Malarone. I've prescribed it hundreds of times.

**Tolerability** is the main reason. A drug the patient stops taking on day three because of nausea provides zero protection. Malarone is the best-tolerated of the three — most patients report mild stomach upset at worst.

**The schedule is short.** One tablet daily, starting one day before, ending one week after. The week-after window is the part that actually gets followed. With doxycycline you go four weeks. With mefloquine, four more weekly doses.

**No screening branches.** No psychiatric history check, no diving exclusion, no age cutoff under 8. Almost every adult is a candidate.

**Speed.** A patient who walks in three days before departure can start tomorrow. The other two need a longer runway.

The downside is cost — about CHF 50–80 per week of trip. For a 10-day Tanzania safari, that's small change. For a six-month research stay, it becomes prohibitive. That's where I switch.

## When I switch to doxycycline

Cost-driven. Specifically when:

- **The trip is long** (months, not weeks). Daily Malarone for half a year tips many patients to skipping prophylaxis entirely. A doxycycline tablet costs about 20 cents.
- **The traveler is a backpacker who specifically asks for it.** Cost-sensitive, generally healthy, and the bonus protection against leptospirosis and African tick-bite fever is genuinely useful for adventure travel.
- **Malarone isn't an option** because of severe kidney problems.

What I tell every doxy patient:

- Take with a full glass of water. Don't lie down for half an hour after.
- SPF 50 every day, hats, long sleeves where you can. Doxycycline makes you sunburn faster.
- Continue four weeks after leaving the malaria area. The rule that gets broken most.
- You can scuba dive on it. The "doxy is bad for divers" myth comes from confusion with mefloquine.

## When I reach for mefloquine

Three situations:

- **Long trips where weekly dosing is the difference.** Six months in rural Africa. Daily dosing isn't sustainable; weekly is.
- **Pregnancy in the second or third trimester** when travel is unavoidable.
- **Patients who already know it works for them** — long-term expats and aid workers who tolerate the weekly schedule.

The hard rule: **no mefloquine for any patient with a personal psychiatric history.** Even mild depression years ago counts. Same for seizure disorder or cardiac conduction problems. Rare neuropsychiatric reactions happen disproportionately to people with vulnerable history.

I also have patients take their first 2–3 doses at home before departure. Any unusual dreams, anxiety, or mood change, we switch them to Malarone before they leave Switzerland.

## Quick scenarios

- **10-day Tanzania safari** — Malarone. Don't overthink it.
- **6-month research trip in West Africa** — Mefloquine, after psych screen and 3-week home trial.
- **Pregnancy** — Specialist consult. If past first trimester: mefloquine.
- **Children** — Under 8, no doxycycline. Pediatric Malarone from 5 kg is the cleanest answer.
- **Diver** — Doxy or Malarone. Mefloquine is out.
- **History of depression** — Malarone for short trips, doxy for long ones. Mefloquine off the table forever.
- **4-week Southeast Asia backpacker** — Doxycycline.

## Two questions that come up every time

**What if I miss a dose?** Take it as soon as you remember the same day. Skip if you've passed into the next day's window. Never double up.

**What if I get sick anyway?** Prophylaxis reduces malaria risk by ~90%, not 100%. Any fever during or in the three months after travel to a malaria area gets a malaria blood test, immediately. Even if you took every dose perfectly. Non-negotiable.

---

If your trip involves complications — pregnancy, kids, complex medical history, immunosuppression — book a consultation. The 30 minutes is worth it.
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
    readingTime: 6,
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

Cruises aren't my favorite recommendation. Confined ship environments amplify infectious disease, the average passenger is older with chronic conditions, and the medical backup at sea is more limited than people realize.

That said — if you're going, here's what actually matters.

---

## What goes wrong on cruises

Three things cover almost everything I see in returning cruise travelers:

- **Norovirus.** Ships are uniquely vulnerable — same buffet lines, handrails, bathrooms. If you cruise enough, you'll eventually be on one when an outbreak occurs.
- **Respiratory infections.** COVID, flu, RSV all spread on ships. Older demographic means more severe outcomes.
- **Motion sickness.** Not life-threatening, but can ruin a trip. Easier to prevent than treat.

Also: port-day infections, accidents on shore excursions, and acute presentations of chronic conditions in passengers who underestimate how isolated they'll be.

## Norovirus

Wash hands frequently with soap and water — alcohol gel doesn't reliably kill norovirus. Use hand-washing stations near dining rooms. If you feel any stomach symptoms, isolate to your cabin and report it.

If you do get hit, oral rehydration is the priority (the medical center has it), don't push through (you'll feel better in 24–48 hours), and loperamide is a reasonable tool but not a cure.

## Respiratory infections

Get your flu shot before any winter cruise. COVID booster within the past year if over 65 or with chronic conditions. Wear a mask in genuinely crowded indoor spaces — embarkation lines, lobby on day one. It looks unusual on a cruise. It still works. If symptoms develop, isolate.

## Motion sickness

I have actual opinions about which products work:

- **First-line: scopolamine patch.** Apply behind the ear several hours before boarding. Three days per patch. By far the most effective option for serious motion sickness. Prescription only.
- **Second-line: meclizine or cinnarizine.** Less drowsy than dimenhydrinate (Dramamine). OTC.
- **Wrist bands and ginger pills:** possibly placebo. If they work for you, no harm in trying.

Avoid scopolamine if you have severe glaucoma or urinary retention.

## What about the recent hantavirus story?

In May 2026, a cruise ship cluster of severe respiratory illness was attributed to hantavirus. It was extremely unusual — hantavirus on cruises is not a known pattern.

The lesson isn't "hantavirus is now a cruise risk." It's that any cluster of severe illness on a confined ship spreads before it's identified. The response is the same as ever: report symptoms early, isolate, follow medical advice.

## Port-day infectious risks

The ship is one risk environment. Ports are different.

- **Caribbean and Mexico:** dengue, chikungunya, Zika in season. Daytime mosquito repellent, light long sleeves.
- **Mediterranean:** few infectious risks. Food and water hygiene.
- **Africa:** yellow fever, malaria, typhoid depending on ports. Cruise itineraries with African ports often need pre-trip vaccinations months in advance — book early.
- **Asia:** variable. Japanese encephalitis if doing rural day excursions in monsoon season.

For tropical port days, look up each port's profile before booking. TravelMed's country pages have current vaccine recommendations.

## Pre-existing conditions

Where I see the most real medical issues. The gap between "feeling fine on land" and "managing a cardiac event at sea" is wider than people realize.

- **Diabetes** — bring twice the insulin you think you need. Pack glucagon. Most cruise lines have cabin refrigeration on request. Time-zone changes complicate dosing.
- **Cardiac conditions** — recent event (within 6 months) or unstable angina, talk to your cardiologist before booking. Cruise medical centers stabilize but cannot do cardiac catheterization.
- **Renal disease** — a few cruise lines have onboard dialysis. Most don't. Confirm before booking.
- **Anticoagulation** — bring more medication than you think. Vacation routine disruption affects compliance.

For everyone: travel insurance with **medical evacuation coverage** (not optional — standard travel insurance often doesn't cover cruise evac), a list of medications with generic names, and enough medication for the trip plus 7–10 extra days.

## What's on the ship's medical center

A typical large cruise ship has 1–2 physicians, a few nurses, basic lab capability (blood counts, troponin, urinalysis), ECG, ultrasound, often X-ray, IV fluids, oxygen, and a small pharmacy.

What they cannot do: cardiac catheterization, complex surgery, advanced imaging, complicated obstetrics, dialysis. For anything serious, you'll be evacuated — by helicopter if conditions allow, or by diverting to the nearest port.

## My cruise medical kit

- All my regular medications, original containers, in carry-on
- Backup of essentials in a separate bag
- Loperamide, oral rehydration salt sachets, paracetamol
- An antihistamine (cetirizine for daytime, diphenhydramine for sleep)
- Scopolamine patches if motion-prone
- Basic wound care, hand sanitizer, SPF 50
- Insect repellent for tropical ports

What I leave at home: pre-emptive antibiotics. Most cruise diarrhea is viral; antibiotics don't help.

## When to see the ship's doctor

Lower threshold than at home. You're paying for it, the queue is short, and conditions you'd "wait out" at home can spiral on a ship.

**Worth a visit:** new chest pain, breathlessness, palpitations; fever over 38.5°C with other symptoms; vomiting or diarrhea that doesn't settle in 24 hours; any new neurological symptom.

**Manage yourself:** mild seasickness, sunburn, minor cuts, standard cold symptoms in someone otherwise well.

## Bottom line

If you're going on a cruise — and many of my patients do, and enjoy them — go prepared. Travel insurance with evacuation. Medication redundancy. Hand hygiene taken seriously. Awareness of what the ship can and cannot do medically.

I'm not against cruises. I'm against pretending they're risk-free. The travelers who do well are the ones who know that going in and plan accordingly.
`,
  },
  {
    id: "travelling-with-children",
    date: "2026-05-10",
    title: "Travelling internationally with children: a physician's framework",
    subtitle:
      "What I tell parents about vaccines, malaria, mosquito protection, and the surprisingly high-impact things they usually overlook.",
    category: "prevention",
    tags: ["children", "family travel", "pediatric", "vaccines"],
    readingTime: 7,
    coverGradient: "linear-gradient(135deg, #831843 0%, #4c0519 100%)",
    featured: true,
    quickRecommendations: [
      { icon: "👶", scenario: "Under 6 months", recommendation: "Defer if possible", detail: "limited vaccine eligibility" },
      { icon: "📅", scenario: "Vaccines", recommendation: "Start 6–8 weeks early", detail: "spacing matters" },
      { icon: "🦟", scenario: "Repellent", recommendation: "DEET 10–30%", detail: "or picaridin 20%" },
      { icon: "💊", scenario: "Malaria zones", recommendation: "Malarone from 5 kg", detail: "doxy is out under 8y" },
      { icon: "☀️", scenario: "Sun protection", recommendation: "SPF 50, every 2h", detail: "non-negotiable" },
      { icon: "🩺", scenario: "Fever abroad", recommendation: "Low threshold", detail: "rule out malaria first" },
    ],
    content: `## The short answer

Most international travel with children goes well. The parents who do it badly are the ones who didn't plan. The parents who do it well prepared early, vaccinated on schedule, packed thoughtfully, and went.

The questions that actually matter:

- **Is your child healthy and routine vaccines up to date?**
- **Where are you going, and is malaria a factor?**
- **Are you starting at least 6–8 weeks before departure?**

If yes to all three, most destinations are reasonable. The rest is execution.

This guide covers ages 6 months to 12 years. For younger infants, my default advice is: defer non-essential international travel. The math on vaccine eligibility, fever risk, and limited medical options abroad rarely justifies it.

---

## Start 6–8 weeks before you leave

The single biggest mistake I see is parents booking the consultation 10 days before departure.

Children's travel vaccines often need spacing. A child who needs hepatitis A, typhoid, and a Japanese encephalitis primary series can't get all three in a single visit and be protected for travel three weeks later. Two months of lead time gives flexibility — for the child, the prescription system, and you.

The Swiss BAG schedule covers most routine protection. Before adding travel vaccines, confirm your child is up to date on MMR, DTaP, polio, varicella, hep B, and meningococcal. Travel medicine builds on a solid base — it doesn't substitute for one.

## Vaccines worth knowing about

**Hepatitis A** is the single most useful travel vaccine for children visiting any low- or middle-income country. Approved from 12 months, two doses 6–12 months apart, excellent tolerance.

**Yellow fever** is approved from 9 months. Below 6 months it's contraindicated — adverse events are more common, and travel to YF zones with infants under 6 months should be deferred. For 6–9 months it's a specialist conversation, weighing real exposure risk against vaccine risk.

**Typhoid** matters for longer stays and rural travel — oral capsules from age 5, injectable from age 2.

**Rabies pre-exposure** is genuinely useful for children. Kids approach animals more readily and are more likely to be bitten on the face or hands. Pre-exposure simplifies post-bite management dramatically — only two vaccine doses afterwards, no immunoglobulin needed (which is often unavailable abroad).

**Japanese encephalitis** is approved from 2 months and worth considering for rural Asia stays of more than a few weeks during transmission season.

**Tick-borne encephalitis** is on the Swiss BAG schedule from age 1 for residents of endemic areas (most of Switzerland).

## Malaria with children

If you're going to a malaria zone with children, this is the conversation worth having with a travel medicine specialist — not your GP.

**My default for children: Malarone (atovaquone-proguanil), from 5 kg.** Pediatric tablets exist at quarter-strength (62.5 mg / 25 mg) and dosing is by weight band. Tolerability is excellent, schedule is short, kids generally take it without protest.

**What I avoid:**

- Doxycycline is contraindicated under 8 years (tooth discoloration and effects on developing bone).
- Mefloquine is technically allowed from 5 kg but I rarely prescribe it for children — the neuropsychiatric side effects, while uncommon, are harder to detect in a young child who can't articulate that something feels off.

If your destination is a high-intensity malaria zone (Amazon basin, equatorial Africa) with very young children, this is a "should you go" conversation, not just a "what to take" one. Sometimes the right answer is shifting the destination.

## Mosquito and sun protection

These are non-negotiable, and parents underestimate both.

**Repellent.** DEET 10–30% or picaridin 20% — same products as adults, lower concentration. Apply yourself to your hands, then to the child. Never spray directly on a child's face. Wash off when they come back indoors.

**Permethrin-treated clothing** (NoBite Clothes spray) is genuinely valuable for kids in malaria zones. Treats their clothing and cribs, kills mosquitoes on contact before they reach skin. Don't use around cats; once dry, it's safe for kids.

**Sun protection.** SPF 50, broad spectrum, reapplied every two hours and after swimming. Under 6 months, no chemical sunscreens — physical barriers only (clothing, hats, shade). Childhood sun exposure is the single biggest risk factor for adult skin cancer; this matters more than parents realize.

Apply sunscreen first, wait 15–20 minutes, then repellent on top. Never combination products — they don't work well for either purpose.

## The flight itself

**Ear pain on descent.** A pacifier, breastfeeding, or sips from a water bottle solves it for most children. Ibuprofen 30 minutes before descent helps if your child has a cold and the eustachian tubes are inflamed.

**Motion sickness.** Dimenhydrinate (Vomex in Swiss pharmacies) from age 2, ginger sweets for older kids if you prefer non-pharmacological. Don't wait until your child feels sick — give it 30 minutes before the flight or boat.

**Jet lag.** Settles in 2–3 days for most kids. Melatonin is not routinely recommended for children — talk to your pediatrician if you want to consider it for long-haul travel.

**Cabin air is very dry.** Push fluids actively. Kids are bad at recognizing thirst at altitude.

## What goes wrong in country

The three things I actually see when families come back:

**Fever.** Lower threshold for medical evaluation than at home. From a malaria zone, any fever in a child is malaria until proven otherwise — same rule as adults, but more urgent. Carry a thermometer and the local emergency number.

**Diarrhea.** Oral rehydration salts (ORS sachets) are the priority — buy several before you leave, they're light and cheap. Loperamide is generally avoided in children under 12 for travelers' diarrhea. Antibiotics only on medical advice. Most cases resolve in 24–48 hours; the danger is dehydration in young children, which happens fast.

**Accidents.** Statistically the #1 cause of serious injury in pediatric travelers — bigger than infectious disease. Road safety in many destinations is genuinely worse than home (car seats often unavailable, traffic chaotic). Pool and beach safety. This is boring advice that prevents the worst outcomes.

**Animal bites.** Low threshold for rabies post-exposure care, especially with face or hand bites. Pre-exposure vaccination if you've done it makes this much simpler.

## What to pack

For the child:

- Their regular medications, in original containers, with backup
- Pediatric paracetamol/ibuprofen
- Oral rehydration salt sachets (2–3 per traveling child)
- Insect repellent (age-appropriate concentration)
- SPF 50 sunscreen, multiple bottles
- A digital thermometer
- Plasters, antiseptic wipes
- Any prescription antibiotics or anti-malarials

For you:

- A list of all your child's medications with generic names and doses
- Their vaccine record
- Your travel insurance information including evacuation coverage
- The local emergency number for your destination

## A few common scenarios

**6-month-old, Mediterranean beach holiday.** Fine. Sun protection critical, otherwise routine.

**2-year-old, Thailand.** Doable with planning. Hep A vaccine, Malarone if going rural, DEET 20–30%, careful sun and water hygiene.

**6-year-old, Tanzania safari.** Real planning needed. Malarone, yellow fever vaccine, rabies pre-exposure worth considering, malaria-zone-aware behavior in camp.

**10-year-old, Cuba or Caribbean cruise.** Easy. Routine vaccines current, mosquito protection, sun protection, normal travel readiness.

**Toddler with chronic condition (asthma, diabetes, allergies).** Specialist consultation, redundant medications, written care plan, evacuation insurance.

---

Most family travel goes beautifully. The parents who tell me, six weeks after returning, that they're already planning the next trip — those are the ones who started early, asked the right questions, and packed thoughtfully. The framework above is what I tell them.

Book a travel medicine consultation early. Bring your child's vaccine record. Ask about the specific destination. The 30 minutes is worth it.
`,
  },
];
