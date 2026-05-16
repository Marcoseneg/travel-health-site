import type { Article } from "./types";

// ── cruise-health-physician-guide ─────────────────────────────────────────────────────────────────
export const cruiseHealthPhysicianGuide: Article = {
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
};
