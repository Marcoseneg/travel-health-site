import type { Insight } from "./types";

export const climateChangeVectorBorne: Insight = {
  id: "climate-change-vector-borne",
  date: "2026-04-15",
  title: "Climate change and dengue: what the models show",
  subtitle:
    "A look at how temperature and rainfall projections are reshaping where vector-borne disease risk will fall.",
  category: "data-insight",
  author: "Dr. Marco Seneghini, MD",
  readingTime: 7,
  tags: ["climate", "modeling", "dengue", "malaria"],
  coverGradient: "linear-gradient(135deg, #0891b2, #0e7490)",
  content: `Vector-borne disease risk is unusually sensitive to climate because the mosquito, the pathogen, and the biting rate all respond to temperature. Modeling studies converge on a consistent picture: the **map of risk is shifting**, not simply growing.

## Why temperature matters so much

- **Extrinsic incubation period.** Warmer temperatures let the virus replicate faster inside the mosquito, so a higher fraction of mosquitoes become infectious within their lifespan.
- **Biting frequency** rises with temperature up to a thermal optimum (around 29 °C for *Aedes aegypti*–borne dengue).
- **The relationship is hump-shaped:** beyond the optimum, transmission falls. Some currently hot regions may become *less* suitable while cooler regions become *more* suitable.

## What the projections suggest

- A **net expansion** of the population at risk for dengue and an extension of transmission seasons in temperate zones.
- **Altitude shifts:** highland areas previously protected by cool temperatures (parts of the East African and Andean highlands) face rising suitability.
- For **malaria**, the picture is more mixed — some regions gain suitability, others lose it as they exceed thermal limits or dry out.

## How to read this as a traveler

Models describe **suitability**, not certainty. Local control, urbanization, and surveillance heavily modify real risk. The practical takeaway: **check current, season-specific guidance** for your destination rather than relying on historical "this region is/ isn't risky" assumptions.

**Bottom line:** climate is widening and shifting the risk map. Static mental models age badly — current data beats reputation.`,
};
