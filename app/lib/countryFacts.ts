// ─────────────────────────────────────────────────────────────────────────────
// Country facts — currently just the destination summary shown under the
// country name. A 1–2 sentence description with relevant travel-health context
// (mosquito-borne activity, altitude, dengue resurgence, etc.).
//
// Keyed by SUPPORTED_COUNTRIES slug. A country with no entry simply shows no
// description. Populated country by country.
//
// (Geographic "quick facts" — capital, currency, population, etc. — were
// prototyped here too; left out for now pending a decision on that panel.)
// ─────────────────────────────────────────────────────────────────────────────

export type CountryFacts = {
  /** 1–2 sentence destination description with relevant travel-health context. */
  summary?: string;
};

export const COUNTRY_FACTS: Record<string, CountryFacts> = {
  thailand: {
    summary:
      "A tropical Southeast Asian destination with year-round mosquito-borne disease activity in the lowlands — dengue is the dominant risk, and chikungunya also circulates. Health risks vary substantially by season, region, and traveler activity.",
  },
  brazil: {
    summary:
      "A vast, climatically diverse country spanning Amazon rainforest, Atlantic coast, and highland cities. Yellow fever and dengue are the headline mosquito-borne risks, with malaria concentrated in the Amazon basin.",
  },
  india: {
    summary:
      "A large, varied subcontinent where food- and water-borne illness is the most common traveler problem, alongside year-round dengue and seasonal mosquito-borne risk across many regions.",
  },
  peru: {
    summary:
      "An Andean and Amazonian country where risk hinges on altitude: yellow fever and malaria in the low-lying jungle, altitude sickness in Cusco and the highlands, and dengue in coastal and Amazon cities.",
  },
  tanzania: {
    summary:
      "An East African destination combining safari, Zanzibar's coast, and Kilimanjaro. Malaria is a year-round risk across most of the country, and yellow fever vaccination is often required for entry.",
  },
  kenya: {
    summary:
      "An East African hub for safari and coast travel. Malaria is present year-round in most lowland areas (Nairobi's highlands are lower risk), with dengue on the coast and yellow fever considerations inland.",
  },
  vietnam: {
    summary:
      "A long, tropical-to-subtropical country where dengue is the dominant mosquito-borne risk — especially in the south and during the rainy season. Food- and water-borne illness is also common.",
  },
  indonesia: {
    summary:
      "A sprawling tropical archipelago, from Bali to remote islands, with year-round dengue activity and malaria risk that rises sharply in the eastern provinces (Papua). Risk varies widely by island.",
  },
  egypt: {
    summary:
      "A predominantly desert country centered on the Nile and Red Sea resorts. Travelers' diarrhea is the most common issue; mosquito-borne disease risk is low compared with tropical destinations.",
  },
  morocco: {
    summary:
      "A North African destination of cities, coast, and Atlas Mountains with a temperate-to-arid climate. Food- and water-borne illness is the main traveler concern; mosquito-borne disease risk is low.",
  },
  "south-africa": {
    summary:
      "A temperate destination with developed infrastructure where malaria is limited to the northeast (Kruger and the Lowveld) and overall disease risk is low. Excellent private healthcare in major centers.",
  },
  nepal: {
    summary:
      "A Himalayan country where altitude illness is the defining risk for trekkers, alongside food- and water-borne illness in Kathmandu and seasonal dengue in the lowland Terai.",
  },
};
