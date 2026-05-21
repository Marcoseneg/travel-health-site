import type { Article } from "./types";

// ── malaria-prophylaxis-compared ─────────────────────────────────────────────────────────────────
export const malariaProphylaxisCompared: Article = {
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
  
  quickFacts: [
    { icon: "🦟", label: "Risk areas", value: "Sub-Saharan Africa, parts of Asia & Latin America" },
    { icon: "💊", label: "First-line Rx", value: "Atovaquone-proguanil (Malarone)" },
    { icon: "⏱️", label: "Start prophylaxis", value: "1–2 days before travel" },
    { icon: "🌙", label: "Continue after", value: "7 days post-exposure (Malarone)" },
    { icon: "⚠️", label: "Avoid in", value: "Pregnancy (doxy), seizure history (mefloquine)" },
    { icon: "💰", label: "Approx. cost", value: "CHF 50–80 for a 2-week trip" },
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
};
