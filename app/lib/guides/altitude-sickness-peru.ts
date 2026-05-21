import type { Article } from "./types";

// ── altitude-sickness-peru ─────────────────────────────────────────────────
export const altitudeSicknessPeru: Article = {
  id: "altitude-sickness-peru",
  date: "2026-05-21",
  title: "Altitude sickness in Peru: a physician's prevention guide",
  subtitle:
    "How to recognize it, how to prevent it, and when to descend — for Cusco, the Inca Trail, and the Peruvian Andes.",
  category: "destination-guide",
  tags: [
    "Peru",
    "altitude sickness",
    "acetazolamide",
    "Cusco",
    "Inca Trail",
    "Andes",
  ],
  readingTime: 8,
  coverGradient: "linear-gradient(135deg, #1e3a5f 0%, #0f2027 100%)",
  featured: true,
  coverImage: {
    src: "/images/articles/altitude-sickness-peru-cover.jpg",
    alt: "Machu Picchu wrapped in morning mist, with terraced ruins descending the mountainside",
    credit: "Marco Seneghini",
    focusPoint: "center 35%",
  },
  physicianTake:
    "Most travelers heading to Cusco or trekking in the Andes don't realize they're stepping straight from sea level to 3,400 m the moment they land. That single decision — flying in instead of climbing in — is what makes acetazolamide worth taking for the majority.",
  quickFacts: [
    { icon: "🏔️", label: "Threshold altitude", value: "2,500 m (8,200 ft)" },
    { icon: "⚠️", label: "High-risk above", value: "3,000 m sleeping altitude" },
    { icon: "⏱️", label: "Onset", value: "6–10 h after ascent" },
    { icon: "💊", label: "First-line prevention", value: "Acetazolamide (Diamox)" },
    { icon: "📅", label: "Start medication", value: "24 h before crossing 2,500 m" },
    { icon: "💰", label: "Approx. cost", value: "CHF 15–30 for a typical Peru trip" },
  ],
  quickRecommendations: [
    {
      icon: "✈️",
      scenario: "Flying directly to Cusco",
      recommendation: "Start acetazolamide",
      detail: "24 h before arrival, continue ~5 days",
    },
    {
      icon: "🥾",
      scenario: "Inca Trail or multi-day trek",
      recommendation: "Acclimatize in Cusco first",
      detail: "2–3 days before going higher",
    },
    {
      icon: "⚠️",
      scenario: "Sulfa allergy",
      recommendation: "Avoid acetazolamide",
      detail: "Slow ascent + ibuprofen as alternative",
    },
    {
      icon: "🚨",
      scenario: "Severe symptoms develop",
      recommendation: "Descend immediately",
      detail: "500–1,000 m, day or night",
    },
  ],
  symptomComparison: {
    mild: {
      title: "Mild (acute mountain sickness)",
      action: "Stop ascending, rest at current altitude",
      bullets: [
        "Headache, usually frontal and throbbing",
        "Nausea, sometimes vomiting",
        "Loss of appetite",
        "Fatigue, \"everything feels heavy\"",
        "Disturbed sleep, vivid or fragmented dreams",
        "Dizziness, especially on standing",
      ],
      footer: "Usually resolves with rest and 24–48 h of acclimatization at the same altitude.",
    },
    severe: {
      title: "Severe — descend immediately",
      action: "500–1,000 m down, day or night",
      bullets: [
        "Severe headache that doesn't respond to paracetamol or ibuprofen",
        "Confusion, slurred speech, or behavioral change",
        "Ataxia — difficulty walking in a straight line",
        "Shortness of breath at rest",
        "Cough, especially with frothy or pink sputum",
        "Bluish lips or face",
      ],
      footer: "Points to HACE (brain swelling) or HAPE (fluid in the lungs) — acutely life-threatening.",
    },
  },
  content: `
## The short answer

I prescribe acetazolamide for most travelers flying into Cusco, doing the Inca Trail, or trekking anywhere in the Peruvian Andes above 3,000 m. It substantially reduces the risk of altitude sickness, and the side effects are usually mild — tingly fingers, a metallic taste, more bathroom trips.

Acetazolamide is prevention, not treatment. If symptoms develop anyway, the answer is to stop ascending, rest, take paracetamol — and if things don't improve, go down.

The single biggest factor is whether you can spend a few days acclimatizing before going higher. Most Peru itineraries don't allow this, which is why I default to prescribing.

## Why altitude sickness happens

The air at altitude has the same proportion of oxygen as at sea level (21%), but at lower atmospheric pressure. Above 2,500 m, your body has to work harder to extract enough oxygen. Over hours to days, your kidneys gradually adjust your acid-base balance to allow deeper breathing. That adjustment is acclimatization — and it takes **time**, not fitness.

Marathon runners get altitude sickness just as readily as office workers. The single biggest determinant is how fast you go up, and especially how fast your *sleeping altitude* rises.

Peru is a particular problem because most travelers fly straight from Lima (sea level) to Cusco at 3,400 m. That's a single day's elevation gain that an unhurried trekker would spread over a week. Above 4,500 m — Rainbow Mountain at 5,200 m, Dead Woman's Pass at 4,215 m on the classic Inca Trail — roughly half of unacclimatized travelers develop symptoms.

## Symptoms to watch for

Symptoms typically start 6 to 10 hours after arriving at altitude. They're often dismissed as jet lag or dehydration. Recognizing them matters — continuing to ascend with mild symptoms is what turns acute mountain sickness into the dangerous forms.

<!-- SYMPTOM_COMPARISON -->

If severe symptoms develop, the treatment is immediate descent of 500 to 1,000 m — at night if necessary — plus oxygen if available. Don't wait for morning, don't debate.

## How to prevent altitude sickness

Two strategies. They work best together.

### Slow ascent

Once above 2,500 m, don't increase your sleeping altitude by more than 300–500 m per day. Take an extra rest day for every 1,000 m gained. You can climb higher during the day — "climb high, sleep low" — but where you sleep is what determines acclimatization.

This is the strategy when you have time. If you can spend 2–3 days in Cusco or the Sacred Valley before starting the Inca Trail, you've done most of the acclimatization work.

### Behavior matters

- **Hydrate aggressively.** Dry mountain air pulls fluid faster than you notice. Pale urine means you're drinking enough.
- **No alcohol for the first 48 hours** at altitude. Same for sedatives and sleeping pills — they suppress the breathing drive you actually need.
- **Don't push through symptoms.** A rest day is cheaper than an evacuation.

## Acetazolamide: when, how, and what to expect

When the itinerary doesn't allow gradual ascent — and most Peru itineraries don't — acetazolamide helps the kidneys do in 24 hours what they'd otherwise do over several days. The result is faster acclimatization and a substantially lower risk of symptoms.

**My standard prescription:**

- **Dose:** 125 mg twice daily (some travelers tolerate 250 mg twice daily — both work)
- **Start:** 24 hours before crossing 2,500 m
- **Continue:** for the full ascent, or about 5 days after reaching the highest sleeping altitude
- **Brand in Switzerland:** Diamox®

**Test it before you travel.** Take a 2–3 day trial run two weeks before departure. The small number of people with bothersome side effects — excessive urination, persistent tingling, taste changes — are much better off discovering it in Switzerland than at Cusco airport.

**Common side effects** (usually mild and reversible):

- Tingling in fingers and toes (paresthesia)
- Metallic taste, especially with carbonated drinks
- Increased urine output — important to compensate with more fluid

**Contraindications I take seriously:**

- Sulfa drug allergy — acetazolamide is a sulfonamide derivative (relative contraindication)
- Pregnancy — generally avoided
- Severe kidney or liver disease

**Alternatives if acetazolamide isn't suitable:**

- Slow ascent alone, if the itinerary permits — this is always the gold standard
- Ibuprofen prophylaxis (600 mg three times daily, starting 6 hours before ascent) has modest evidence for prevention
- For high-altitude expeditions above 5,000 m, dexamethasone is sometimes prescribed — but that needs specialist advice

Locally in Peru you'll be offered *mate de coca* (coca tea). There's modest evidence it helps with mild symptoms. It's not a substitute for acetazolamide, but it won't hurt.

## What to do if symptoms develop

The rule is simple: **don't go higher with symptoms.**

For mild symptoms:

- Stop ascending — stay at the current altitude
- Rest. Paracetamol or ibuprofen for the headache
- Hydrate
- Resume the ascent only when symptoms have *completely* cleared — not partially

If symptoms don't improve within 24 hours, or worsen at any point: descend. 500 m is usually enough to feel better. If you can't descend, oxygen helps temporarily.

For severe symptoms — confusion, severe shortness of breath, inability to walk straight: **descend now.** Day or night. This isn't the time to debate. Acetazolamide is prevention only; once altitude sickness is established, the treatment is going down, not more pills.

## Special situations worth a consultation

A few cases where I recommend a dedicated travel medicine appointment before the trip:

- **Children under 12** — acetazolamide is used off-label in pediatric travel medicine; doses and decisions need individual review
- **Pregnancy** — altitude above 3,500 m is generally avoided; acetazolamide not recommended
- **Pre-existing heart, lung, or kidney disease** — including poorly-controlled hypertension
- **Sickle cell trait** — higher risk at altitude even in carriers
- **Above 4,500 m or off the standard tourist routes** — you want emergency planning beyond what a single guide covers

## Quick reference checklist

- **Risk threshold:** 2,500 m sleeping altitude
- **High risk:** above 3,000 m, or rapid ascent like a direct flight to Cusco
- **Default prescription:** acetazolamide 125 mg twice daily, starting 24 h before reaching altitude
- **Test the medication** for 2–3 days, two weeks before departure
- **Bring:** acetazolamide, paracetamol, ibuprofen, your usual medications
- **Avoid the first 48 hours:** alcohol, sedatives, heavy exertion
- **Mild symptoms:** stop, rest, hydrate, paracetamol — resume only when fully resolved
- **Severe symptoms:** descend 500–1,000 m immediately, day or night

For non-routine cases — significant pre-existing conditions, expedition climbing, pediatric travelers — talk to a travel medicine specialist before you go. The Swiss Tropical and Public Health Institute runs a 24-hour medical emergency line at **+41 61 284 8144**.
`,
};
