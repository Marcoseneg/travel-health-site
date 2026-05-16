import type { Article } from "./types";

// ── travelling-with-children ─────────────────────────────────────────────────────────────────
export const travellingWithChildren: Article = {
  id: "travelling-with-children",
  date: "2026-05-10",
  title: "Travelling internationally with children: a physician's framework",
  subtitle:
    "What I tell parents about vaccines, malaria, mosquito protection, and the surprisingly high-impact things they usually overlook.",
  category: "prevention",
  tags: ["children", "family travel", "pediatric", "vaccines"],
  readingTime: 7,
  coverGradient: "linear-gradient(135deg, #831843 0%, #4c0519 100%)",
  coverIllustration: "child-travel-kit",
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
};
