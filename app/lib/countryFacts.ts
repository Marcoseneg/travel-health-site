// ─────────────────────────────────────────────────────────────────────────────
// Country facts — currently just the destination summary shown under the
// country name. A 1–2 sentence description with relevant travel-health context
// (mosquito-borne activity, altitude, dengue resurgence, etc.).
//
// Keyed by SUPPORTED_COUNTRIES slug. A country with no entry simply shows no
// description. These are general, descriptive summaries — confirm specifics
// against CDC / WHO / EKRM before relying on them for an individual trip.
// ─────────────────────────────────────────────────────────────────────────────

export type CountryFacts = {
  /** 1–2 sentence destination description with relevant travel-health context. */
  summary?: string;
};

export const COUNTRY_FACTS: Record<string, CountryFacts> = {
  // ── West Africa ──────────────────────────────────────────────────────────
  benin: { summary: "A West African country with year-round, high malaria risk and endemic yellow fever (vaccination required for entry). Food- and water-borne illness is also common." },
  "burkina-faso": { summary: "A Sahelian country with year-round high malaria risk and endemic yellow fever (vaccination required). It lies in the meningitis belt, with seasonal risk in the dry season." },
  "cape-verde": { summary: "An Atlantic island nation off West Africa, certified malaria-free by WHO in 2024. Dengue occurs intermittently; overall a lower-risk destination than the mainland." },
  "cote-divoire": { summary: "A West African country with year-round high malaria risk and endemic yellow fever (vaccination required). Food- and water-borne illness is common." },
  gambia: { summary: "A small West African country with year-round high malaria risk and endemic yellow fever, peaking in the rainy season." },
  ghana: { summary: "A West African country with year-round high malaria risk and endemic yellow fever (vaccination required). Dengue and food- and water-borne illness also occur." },
  guinea: { summary: "A West African country with year-round high malaria risk and endemic yellow fever (vaccination required). Lassa fever is present and it has a history of Ebola outbreaks." },
  "guinea-bissau": { summary: "A West African country with year-round high malaria risk and endemic yellow fever. Health infrastructure is limited." },
  liberia: { summary: "A West African country with year-round high malaria risk and endemic yellow fever (vaccination required). Lassa fever is endemic and it has a history of Ebola outbreaks." },
  mali: { summary: "A Sahelian country with year-round high malaria risk and endemic yellow fever (vaccination required). It sits in the meningitis belt, with seasonal dry-season risk." },
  mauritania: { summary: "A largely desert country where malaria risk concentrates in the south and rainy season, with yellow fever risk in the south. The arid north is lower risk." },
  niger: { summary: "A Sahelian country with year-round high malaria in the south, meningitis-belt seasonal risk, and yellow fever considerations. The desert north is lower risk." },
  nigeria: { summary: "Africa's most populous country, with year-round high malaria risk and endemic yellow fever (vaccination required). Lassa fever, meningitis in the north, and food- and water-borne illness are also concerns." },
  senegal: { summary: "A West African country with year-round malaria (higher in the south and rainy season) and endemic yellow fever (vaccination required). Dengue also occurs." },
  "sierra-leone": { summary: "A West African country with year-round high malaria risk and endemic yellow fever (vaccination required). Lassa fever is endemic and it has a history of Ebola outbreaks." },
  togo: { summary: "A West African country with year-round high malaria risk and endemic yellow fever (vaccination required). Food- and water-borne illness is common." },

  // ── Central Africa ───────────────────────────────────────────────────────
  angola: { summary: "A Central/Southern African country with year-round high malaria risk and endemic yellow fever (vaccination required); past urban YF outbreaks. Cholera also occurs." },
  cameroon: { summary: "A Central African country with year-round high malaria risk and endemic yellow fever (vaccination required), across terrain from coast to highlands." },
  "central-african-republic": { summary: "A Central African country with year-round high malaria risk and endemic yellow fever (vaccination required). Healthcare is very limited and security is a serious concern." },
  chad: { summary: "A Sahelian country with year-round high malaria in the south, meningitis-belt seasonal risk, and endemic yellow fever. The desert north is lower risk." },
  congo: { summary: "A Central African country (Republic of the Congo) with year-round high malaria risk and endemic yellow fever (vaccination required)." },
  "dr-congo": { summary: "A vast Central African country with year-round high malaria risk and endemic yellow fever (vaccination required). Recurrent Ebola, cholera, and mpox outbreaks occur." },
  "equatorial-guinea": { summary: "A Central African country with year-round high malaria risk and endemic yellow fever (vaccination required)." },
  gabon: { summary: "A heavily forested Central African country with year-round high malaria risk and endemic yellow fever (vaccination required). Dengue and chikungunya also occur." },
  "sao-tome-and-principe": { summary: "An island nation in the Gulf of Guinea with malaria risk (reduced by control efforts) and yellow fever considerations — lower risk than the mainland." },

  // ── East Africa & Indian Ocean ───────────────────────────────────────────
  burundi: { summary: "An East African country with year-round high malaria risk in most areas. Yellow fever vaccination may be required for entry." },
  comoros: { summary: "An Indian Ocean island nation with year-round malaria risk and recurring chikungunya and dengue. Health infrastructure is limited." },
  djibouti: { summary: "A small, hot East African country with malaria (higher in the rainy season), dengue, and a history of cholera; the arid climate limits some transmission." },
  eritrea: { summary: "A Horn of Africa country with malaria risk below ~2,200 m (Asmara's highlands are lower risk) and yellow fever considerations. Food- and water-borne illness is common." },
  ethiopia: { summary: "A highland Horn of Africa country where malaria risk is mainly below ~2,000 m (Addis Ababa and the highlands are lower risk). Altitude illness is a consideration in the mountains." },
  madagascar: { summary: "An Indian Ocean island with year-round malaria in coastal/lowland areas and recurring plague and chikungunya; the central highlands are lower malaria risk." },
  malawi: { summary: "An East/Southern African country with year-round high malaria, especially along the lake and lowlands. Schistosomiasis is a risk in Lake Malawi." },
  mauritius: { summary: "An Indian Ocean island with no malaria and generally low disease risk, aside from occasional dengue/chikungunya. A relatively low-risk destination." },
  mozambique: { summary: "A long East African coastal country with year-round high malaria risk and periodic cholera outbreaks. Yellow fever proof may be required from endemic countries." },
  reunion: { summary: "A French Indian Ocean island with no malaria but recurring mosquito-borne outbreaks of dengue and chikungunya. Healthcare is to French standards." },
  rwanda: { summary: "A high-altitude East African country where malaria risk is in the lower areas (Kigali and the highlands are lower). Yellow fever vaccination is required for entry." },
  seychelles: { summary: "An Indian Ocean archipelago with no malaria and generally low disease risk, aside from occasional dengue. A low-risk destination with good facilities." },
  somalia: { summary: "A Horn of Africa country with year-round malaria risk, cholera outbreaks, and very limited healthcare; security is a major concern." },
  "south-sudan": { summary: "A young East African country with year-round high malaria, endemic yellow fever, recurrent cholera, and very limited healthcare; security is a concern." },
  uganda: { summary: "An East African country with year-round high malaria in most areas (the southwest highlands are lower). Yellow fever vaccination is required, and Ebola/Marburg outbreaks occur." },
  zambia: { summary: "A Southern/East African country with year-round high malaria and periodic cholera outbreaks. Schistosomiasis is a risk in lakes and rivers." },

  // ── Southern Africa ──────────────────────────────────────────────────────
  botswana: { summary: "A Southern African country where malaria is seasonal in the north (Okavango, Chobe) and low elsewhere — a relatively low-risk safari destination." },
  lesotho: { summary: "A high-altitude mountain kingdom encircled by South Africa, with no malaria and low overall disease risk. Cold- and altitude-related considerations apply in the highlands." },
  namibia: { summary: "A largely arid Southern African country where malaria is seasonal in the north and along rivers; the central and southern desert is low risk." },
  zimbabwe: { summary: "A Southern African country with seasonal malaria in lower-lying areas (Victoria Falls, the Zambezi valley) and low risk in the highveld. Cholera outbreaks occur periodically." },
  eswatini: { summary: "A small Southern African kingdom with low-level seasonal malaria in the eastern lowveld and low risk elsewhere." },

  // ── North Africa ─────────────────────────────────────────────────────────
  algeria: { summary: "A large, mostly desert North African country with low mosquito-borne disease risk (malaria-free). Travelers' diarrhea is the main concern." },
  egypt: { summary: "A predominantly desert country centered on the Nile and Red Sea resorts. Travelers' diarrhea is the most common issue; mosquito-borne disease risk is low." },
  libya: { summary: "A North African desert country with low mosquito-borne disease risk; travelers' diarrhea is the main health issue. Security is a significant concern." },
  morocco: { summary: "A North African destination of cities, coast, and Atlas Mountains with a temperate-to-arid climate. Food- and water-borne illness is the main traveler concern; mosquito-borne disease risk is low." },
  sudan: { summary: "A North/East African country with year-round malaria in much of the country, endemic yellow fever in the south, and recurrent cholera and dengue. The desert north is lower risk." },
  tunisia: { summary: "A North African Mediterranean country with low mosquito-borne disease risk. Travelers' diarrhea is the most common issue." },

  // ── South Asia ───────────────────────────────────────────────────────────
  afghanistan: { summary: "A mountainous country with seasonal malaria below ~2,000 m and frequent food- and water-borne illness. Healthcare is very limited and security is a major concern." },
  bangladesh: { summary: "A low-lying South Asian country with year-round dengue (large seasonal epidemics), malaria in the hill districts, and frequent food- and water-borne illness." },
  bhutan: { summary: "A Himalayan kingdom where altitude illness is the consideration in the mountains; malaria and dengue risk is limited to the southern lowlands. Most tourist areas are low risk." },
  india: { summary: "A large, varied subcontinent where food- and water-borne illness is the most common traveler problem, alongside year-round dengue and seasonal mosquito-borne risk across many regions." },
  nepal: { summary: "A Himalayan country where altitude illness is the defining risk for trekkers, alongside food- and water-borne illness in Kathmandu and seasonal dengue in the lowland Terai." },
  pakistan: { summary: "A large South Asian country with seasonal malaria, year-round urban dengue, and frequent typhoid (including drug-resistant strains) and other food- and water-borne illness." },

  // ── Southeast Asia ───────────────────────────────────────────────────────
  cambodia: { summary: "A Southeast Asian country with year-round dengue, malaria in forested and border areas (including drug-resistant strains), and common food- and water-borne illness." },
  indonesia: { summary: "A sprawling tropical archipelago, from Bali to remote islands, with year-round dengue activity and malaria risk that rises sharply in the eastern provinces (Papua). Risk varies widely by island." },
  laos: { summary: "A landlocked Southeast Asian country with year-round dengue, rural malaria, and Japanese encephalitis in rice-growing areas. Food- and water-borne illness is common." },
  malaysia: { summary: "A Southeast Asian country with year-round dengue nationwide and malaria mainly in the forests of Borneo (including monkey-borne P. knowlesi). Cities are dengue-focused." },
  myanmar: { summary: "A Southeast Asian country with year-round dengue, malaria in rural and border areas, and common food- and water-borne illness. Health infrastructure is limited." },
  philippines: { summary: "An island nation with year-round dengue nationwide, malaria in some rural areas (notably Palawan), and frequent food- and water-borne illness." },
  thailand: { summary: "A tropical Southeast Asian destination with year-round mosquito-borne disease activity in the lowlands — dengue is the dominant risk, and chikungunya also circulates. Health risks vary substantially by season, region, and traveler activity." },
  "timor-leste": { summary: "A Southeast Asian island nation with year-round dengue and malaria risk and limited health infrastructure." },
  vietnam: { summary: "A long, tropical-to-subtropical country where dengue is the dominant mosquito-borne risk — especially in the south and during the rainy season. Food- and water-borne illness is also common." },

  // ── East Asia ────────────────────────────────────────────────────────────
  china: { summary: "A vast country spanning many climates; risk is generally low in major cities. Dengue occurs in the south, Japanese encephalitis in rural areas, and altitude illness applies to Tibet and the western highlands." },
  "north-korea": { summary: "An East Asian country with limited seasonal malaria in some southern areas and very limited, hard-to-access healthcare. Travel is highly restricted." },
  "south-korea": { summary: "A developed East Asian country with low overall disease risk — limited seasonal malaria near the northern border and occasional Japanese encephalitis. Excellent healthcare." },

  // ── Central Asia ─────────────────────────────────────────────────────────
  tajikistan: { summary: "A mountainous Central Asian country with low malaria risk (largely eliminated), food- and water-borne illness, and altitude considerations in the Pamirs." },

  // ── Western Asia / Middle East ───────────────────────────────────────────
  iran: { summary: "A large Western Asian country with low mosquito-borne disease risk in most areas; limited seasonal malaria in the southeast. Travelers' diarrhea is the main concern." },
  iraq: { summary: "A Western Asian country with low mosquito-borne disease risk; travelers' diarrhea is the main health issue. Security varies by region." },
  "saudi-arabia": { summary: "A largely desert country with low general disease risk; malaria persists in the southwest (Jazan). Meningitis vaccination is required for Hajj/Umrah pilgrims, and MERS-CoV circulates." },
  yemen: { summary: "A Western Asian country with year-round malaria, recurrent cholera and dengue/chikungunya, and a collapsed health system amid ongoing conflict." },

  // ── Central America & Caribbean ──────────────────────────────────────────
  belize: { summary: "A Central American/Caribbean country with year-round dengue, limited rural malaria, and food- and water-borne illness." },
  "costa-rica": { summary: "A Central American country with year-round dengue in the lowlands and limited malaria; the Central Valley and highlands are lower risk. Generally good healthcare." },
  "dominican-republic": { summary: "A Caribbean nation sharing Hispaniola, with year-round dengue, malaria in some rural areas, and food- and water-borne illness. Resort areas are lower malaria risk." },
  guatemala: { summary: "A Central American country with year-round dengue in the lowlands, limited malaria, and altitude considerations in the highlands. Food- and water-borne illness is common." },
  haiti: { summary: "A Caribbean nation on Hispaniola with year-round malaria (unusual for the Caribbean), dengue, recurrent cholera, and very limited healthcare; security is a concern." },
  honduras: { summary: "A Central American country with year-round dengue, malaria in rural and coastal areas, and food- and water-borne illness." },
  mexico: { summary: "A large, varied country where dengue occurs in coastal and lowland areas and malaria is limited to a few rural states; the central highlands and cities are lower risk. Travelers' diarrhea is common." },
  nicaragua: { summary: "A Central American country with year-round dengue, limited rural malaria, and food- and water-borne illness." },
  panama: { summary: "A Central American country with dengue, malaria in eastern and border regions (Darién), and a yellow fever entry rule for travelers from endemic areas. Panama City is lower risk." },

  // ── South America ────────────────────────────────────────────────────────
  bolivia: { summary: "An Andean and Amazonian country where risk depends on altitude: yellow fever and malaria in the eastern lowlands, dengue in the tropics, and altitude illness in La Paz and the highlands." },
  brazil: { summary: "A vast, climatically diverse country spanning Amazon rainforest, Atlantic coast, and highland cities. Yellow fever and dengue are the headline mosquito-borne risks, with malaria concentrated in the Amazon basin." },
  colombia: { summary: "A climatically diverse country with year-round dengue, malaria and yellow fever in Amazon and Pacific lowlands, and altitude considerations in Bogotá and the Andes." },
  ecuador: { summary: "A compact but varied country: yellow fever and malaria in the Amazon, dengue on the coast, altitude illness in Quito and the Andes, plus unique considerations for the Galápagos." },
  guyana: { summary: "A South American country with year-round malaria in the interior, dengue on the coast, and endemic yellow fever (vaccination required)." },
  paraguay: { summary: "A landlocked South American country with year-round dengue (large epidemics) and low malaria risk; a yellow fever entry rule applies for travelers from endemic areas." },
  peru: { summary: "An Andean and Amazonian country where risk hinges on altitude: yellow fever and malaria in the low-lying jungle, altitude sickness in Cusco and the highlands, and dengue in coastal and Amazon cities." },
  suriname: { summary: "A South American country with malaria in the interior, year-round dengue, and endemic yellow fever (vaccination required)." },
  venezuela: { summary: "A South American country with year-round dengue, resurgent malaria (notably in the southeast), endemic yellow fever, and a strained health system." },

  // ── Africa (already-detailed sample) ─────────────────────────────────────
  kenya: { summary: "An East African hub for safari and coast travel. Malaria is present year-round in most lowland areas (Nairobi's highlands are lower risk), with dengue on the coast and yellow fever considerations inland." },
  tanzania: { summary: "An East African destination combining safari, Zanzibar's coast, and Kilimanjaro. Malaria is a year-round risk across most of the country, and yellow fever vaccination is often required for entry." },
  "south-africa": { summary: "A temperate destination with developed infrastructure where malaria is limited to the northeast (Kruger and the Lowveld) and overall disease risk is low. Excellent private healthcare in major centers." },

  // ── Europe ───────────────────────────────────────────────────────────────
  albania: { summary: "A Southeast European country with low mosquito-borne disease risk; travelers' diarrhea is the main concern. A generally low-risk Mediterranean destination." },

  // ── Melanesia / Pacific ──────────────────────────────────────────────────
  "papua-new-guinea": { summary: "A Melanesian country with year-round high malaria risk across most lowland areas, year-round dengue, and very limited rural healthcare." },
  "solomon-islands": { summary: "A Melanesian island nation with year-round malaria risk among the highest in the Pacific, plus dengue. Health infrastructure is limited." },
  vanuatu: { summary: "A Melanesian archipelago with year-round malaria risk on most islands (lower on some) and recurring dengue." },
};
