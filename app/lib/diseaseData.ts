export type PreventionItem = {
  type: "vaccine" | "prophylaxis" | "behavior" | "post-exposure";
  title: string;
  detail: string;
};

export type DiseaseInfo = {
  label: string;
  icon: string;
  category: string;
  transmission: string;
  prevention: string;
  preventionDetails: PreventionItem[];
  symptoms: string;
  treatment: string;
  regions: string;
  vaccineAvailable: boolean;
  riskLevel: "low" | "moderate" | "high";
};

export const diseases: Record<string, DiseaseInfo> = {
  malaria: {
    label: "Malaria",
    icon: "🦟",
    category: "Mosquito-borne parasite",
    transmission: "Transmitted through the bite of infected Anopheles mosquitoes, primarily between dusk and dawn.",
    prevention: "Chemoprophylaxis (Atovaquone-Proguanil, Doxycycline, or Mefloquine), insect repellent with DEET, permethrin-treated clothing, bed nets.",
    preventionDetails: [
      {
        type: "behavior",
        title: "Nighttime mosquito protection",
        detail: "Anopheles mosquitoes bite between dusk and dawn. Three layers of protection: (1) Clothing — wear light-colored, long-sleeved clothes from dusk. Treat clothing with permethrin. (2) Repellent — apply DEET 20–50% or Picaridin 20% to exposed skin in the evening. (3) Sleeping — use air conditioning or sleep under an insecticide-treated bed net (ITN). All three measures are recommended in every malaria area, regardless of risk level.",
      },
      {
        type: "prophylaxis",
        title: "Atovaquone/Proguanil (Malarone)",
        detail: "1 tablet daily. Start 1 day before entry, take daily during stay, continue 7 days after departure. Well-tolerated with fewest side effects. Most expensive option. Contraindications: severe renal impairment, pregnancy (relative). Take with or after food.",
      },
      {
        type: "prophylaxis",
        title: "Mefloquine (Lariam)",
        detail: "1 tablet (250 mg) weekly. Start 1–2 weeks before entry, take weekly during stay, continue 4 weeks after departure. Convenient weekly dosing. Contraindications: epilepsy, current or past psychiatric disorders. Can cause neuropsychiatric side effects (vivid dreams, anxiety, dizziness). Stop and consult a doctor if rash, vertigo, depression, or anxiety reactions occur.",
      },
      {
        type: "prophylaxis",
        title: "Doxycycline",
        detail: "1 tablet (100 mg) daily. Start 1–2 days before entry, take daily during stay, continue 4 weeks after departure. Most affordable option. Also provides some protection against bacterial infections. Contraindications: pregnancy, children <8 years. Side effects include photosensitivity (use sunscreen) and GI upset. Take with food.",
      },
      {
        type: "post-exposure",
        title: "Emergency self-treatment (standby)",
        detail: "For medium-risk areas, a standby treatment may be prescribed to carry. If fever >37.5°C persists beyond 24 hours and no doctor is reachable: (1) Artemether/Lumefantrin (Riamet): 24 tablets over 3 days — 4 tablets immediately, 4 after 8 hours, then 4 tablets morning and evening on days 2–3. (2) Atovaquone/Proguanil (Malarone): 12 tablets over 3 days — 4 tablets immediately on days 1, 2, and 3. Take with fatty food. Always seek medical attention afterward — the infection may not be fully cleared.",
      },
      {
        type: "post-exposure",
        title: "⚠ Fever after travel — urgent action",
        detail: "Malaria can appear from 7 days after first entering an endemic area, up to months after return. If you develop fever >37.5°C: seek medical attention within 24 hours and request a blood test for malaria — regardless of whether you took prophylaxis. If the test is negative or uncertain, repeat it. This applies even if you completed a full course of prophylaxis medication.",
      },
    ],
    symptoms: "Fever, chills, headache, muscle aches, fatigue. Symptoms typically appear 7–30 days after infection. Can be life-threatening if untreated.",
    treatment: "Artemisinin-based combination therapies (ACTs) are first-line treatment. Prompt diagnosis and treatment are critical.",
    regions: "Sub-Saharan Africa (highest risk), South/Southeast Asia, Central/South America, parts of the Middle East and Oceania.",
    vaccineAvailable: false,
    riskLevel: "high",
  },


  // ── Dengue ─────────────────────────────────────────────────────────────
  // Sources: SMW Eperon et al. 2024 (CC BY 4.0), WHO 2024 position paper,
  // CDC Dengue resources (US Govt — public domain).
  dengue: {
    label: "Dengue",
    icon: "🦟",
    category: "Mosquito-borne virus",

    transmission:
      "Spread by Aedes mosquitoes that bite during the day. Common in tropical and subtropical cities, peaking in the rainy season.",

    prevention:
      "Prevent daytime mosquito bites. Vaccination is recommended only for travelers with a prior dengue infection going to high-transmission regions.",

    preventionDetails: [
      {
        type: "behavior",
        title: "Daytime mosquito protection",
        detail:
          "Aedes mosquitoes bite during the day, especially morning and late afternoon. Use DEET (20–50%) or picaridin (20%) on exposed skin, wear long sleeves and trousers, and consider permethrin-treated clothing in high-risk areas.",
      },
      {
        type: "vaccine",
        title: "Qdenga® — only for those previously infected",
        detail:
          "The dengue vaccine is recommended only for travelers ≥6 years with a documented previous dengue infection AND travel to a region with high ongoing transmission. Two doses, 3 months apart. Not recommended for first-time travelers, as protection is uneven across serotypes. The older vaccine, Dengvaxia®, is no longer used.",
      },
      {
        type: "post-exposure",
        title: "Fever after travel — what to do",
        detail:
          "Any fever during or within weeks after travel should be checked by a doctor. Avoid aspirin and ibuprofen until dengue is ruled out — they can worsen bleeding risk. Use paracetamol for fever and pain.",
      },
    ],

    symptoms:
      "High fever, severe headache, muscle and joint pain, nausea, sometimes a rash. Most infections cause no symptoms at all. Severe complications are rare in travelers but more likely after a second infection.",

    treatment:
      "No specific treatment. Rest, fluids, and paracetamol for symptoms. Avoid aspirin and NSAIDs. See a doctor for any fever during or after travel.",

    regions:
      "Tropical and subtropical regions worldwide — especially South and Southeast Asia, Latin America, and the Caribbean. Cases now also appear in southern Europe and the southern United States.",

    vaccineAvailable: true,
    riskLevel: "moderate",
  },











  chikungunya: {
    label: "Chikungunya",
    icon: "🦟",
    category: "Mosquito-borne virus",
    transmission: "Transmitted by Aedes mosquitoes, the same species that spread dengue and Zika. Daytime biters.",
    prevention: "Mosquito avoidance measures. Ixchiq vaccine approved in some countries for travelers ≥18 years.",
    preventionDetails: [
      {
        type: "vaccine",
        title: "Ixchiq (live attenuated vaccine)",
        detail: "FDA-approved for adults ≥18 traveling to endemic areas. Single dose. Contains live virus — contraindicated in immunocompromised individuals and pregnancy. Most common side effects: headache, fatigue, muscle/joint pain.",
      },
      {
        type: "behavior",
        title: "Daytime mosquito avoidance",
        detail: "Same Aedes vectors as dengue — bite during the day. Use DEET or Picaridin repellent. Wear long sleeves and pants. Use screens and air conditioning.",
      },
    ],
    symptoms: "Sudden onset of fever and severe joint pain, often in hands and feet. Headache, muscle pain, rash. Joint pain may persist for months.",
    treatment: "No specific antiviral. Supportive care with rest, fluids, and analgesics (paracetamol). Avoid aspirin until dengue is ruled out.",
    regions: "Africa, Asia, the Indian subcontinent, parts of Europe, and the Americas. Rapidly expanding geographic range.",
    vaccineAvailable: true,
    riskLevel: "moderate",
  },
  "yellow-fever": {
    label: "Yellow Fever",
    icon: "🦠",
    category: "Mosquito-borne virus",
    transmission: "Transmitted by Aedes and Haemagogus mosquitoes in tropical regions of Africa and South America.",
    prevention: "Yellow fever vaccine (single dose provides lifelong protection). Required for entry into many countries. Mosquito avoidance.",
    preventionDetails: [
      {
        type: "vaccine",
        title: "Yellow fever vaccine (YF-VAX / Stamaril)",
        detail: "Single dose provides lifelong protection — no booster needed (WHO 2013). Must be administered at an approved vaccination center. International Certificate of Vaccination (yellow card) required for entry into many African and South American countries. Administer ≥10 days before travel.",
      },
      {
        type: "behavior",
        title: "Mosquito avoidance",
        detail: "Use DEET-based repellent, permethrin-treated clothing, and bed nets. Yellow fever mosquitoes bite during the day. Vaccination remains the primary and most effective prevention.",
      },
    ],
    symptoms: "Initial phase: fever, headache, muscle pain, nausea. Toxic phase (15% of cases): jaundice, bleeding, organ failure. Case fatality 20–50% in toxic phase.",
    treatment: "No specific antiviral treatment. Supportive intensive care for severe cases. Prevention through vaccination is critical.",
    regions: "Tropical regions of Africa (sub-Saharan) and South America (Amazon basin, surrounding areas).",
    vaccineAvailable: true,
    riskLevel: "high",
  },
  typhoid: {
    label: "Typhoid",
    icon: "🦠",
    category: "Food & waterborne bacterium",
    transmission: "Fecal-oral route through contaminated food and water. Caused by Salmonella typhi bacteria.",
    prevention: "Typhoid vaccine (injectable Vi polysaccharide or oral Ty21a). Safe food and water practices. Hand hygiene.",
    preventionDetails: [
      {
        type: "vaccine",
        title: "Injectable Vi polysaccharide (Typhim Vi)",
        detail: "Single intramuscular dose, ≥2 weeks before travel. ~55–72% effective. Booster every 2 years if continued exposure. For adults and children ≥2 years.",
      },
      {
        type: "vaccine",
        title: "Oral Ty21a (Vivotif)",
        detail: "4 capsules taken every other day, completed ≥1 week before travel. ~50–80% effective. Booster every 5 years. Must be refrigerated. Not for children <6 or immunocompromised individuals. Avoid antibiotics during course.",
      },
      {
        type: "behavior",
        title: "Food and water hygiene",
        detail: "Drink only bottled or boiled water. Avoid ice in drinks. Eat only thoroughly cooked foods served hot. Avoid raw vegetables, salads, and unpeeled fruits. Frequent handwashing with soap.",
      },
    ],
    symptoms: "Sustained fever, headache, abdominal pain, constipation or diarrhea, rose-colored spots on the chest. Gradual onset over 1–3 weeks.",
    treatment: "Antibiotics (azithromycin, fluoroquinolones, or ceftriaxone depending on resistance patterns). Increasing antimicrobial resistance is a concern.",
    regions: "South/Southeast Asia (highest risk), Africa, Latin America. Risk correlates with sanitation infrastructure.",
    vaccineAvailable: true,
    riskLevel: "moderate",
  },
  "hepatitis-a": {
    label: "Hepatitis A",
    icon: "💉",
    category: "Food & waterborne virus",
    transmission: "Fecal-oral route through contaminated food, water, or close personal contact with an infected person.",
    prevention: "Hepatitis A vaccine (2-dose series provides long-term protection). Safe food and water practices. Hand hygiene.",
    preventionDetails: [
      {
        type: "vaccine",
        title: "Hepatitis A vaccine (Havrix / Vaqta)",
        detail: "2-dose series: initial dose ≥2 weeks before travel, second dose 6–12 months later for long-term protection (likely lifelong). Highly effective — nearly 100% after 2 doses. Safe for ages ≥1 year. Can be given as combination vaccine with Hepatitis B (Twinrix, 3-dose series).",
      },
      {
        type: "behavior",
        title: "Food and water hygiene",
        detail: "Same precautions as typhoid: bottled/boiled water, cooked foods, avoid raw produce and ice. Hepatitis A is highly contagious — hand hygiene is critical, especially after using restrooms and before eating.",
      },
    ],
    symptoms: "Fever, fatigue, loss of appetite, nausea, abdominal pain, dark urine, jaundice. Usually self-limiting but can be severe in older adults.",
    treatment: "No specific treatment. Supportive care with rest and adequate nutrition. Most patients recover fully within weeks to months.",
    regions: "Widespread in developing countries. Higher risk in areas with poor sanitation: Africa, Asia, Central/South America.",
    vaccineAvailable: true,
    riskLevel: "moderate",
  },
  rabies: {
    label: "Rabies",
    icon: "🦠",
    category: "Animal bite or scratch",
    transmission: "Transmitted through saliva of infected mammals, usually via bites or scratches. Dogs are the most common source in endemic countries.",
    prevention: "Pre-exposure vaccination (3-dose series) for high-risk travelers. Avoid contact with stray animals. Post-exposure prophylaxis (PEP) is critical after potential exposure.",
    preventionDetails: [
      {
        type: "vaccine",
        title: "Pre-exposure prophylaxis (PrEP)",
        detail: "3-dose series on days 0, 7, and 21–28. Recommended for travelers to endemic areas with limited PEP access, extended rural stays, or high animal contact risk. Simplifies post-exposure management — eliminates need for rabies immunoglobulin (which may be unavailable).",
      },
      {
        type: "post-exposure",
        title: "Post-exposure prophylaxis (PEP)",
        detail: "After a bite or scratch: immediately wash wound with soap and water for 15 minutes. Seek medical attention urgently. Unvaccinated individuals need rabies immunoglobulin + 4-dose vaccine series. Previously vaccinated individuals need only 2 booster doses. PEP is nearly 100% effective if given promptly.",
      },
      {
        type: "behavior",
        title: "Animal avoidance",
        detail: "Do not touch, feed, or approach stray dogs, cats, monkeys, or bats. Even apparently healthy animals can carry rabies. Children are at highest risk — educate them before travel. Know the location of the nearest PEP facility at your destination.",
      },
    ],
    symptoms: "Initial: fever, headache, malaise. Progressive: anxiety, confusion, hydrophobia, paralysis. Once symptomatic, rabies is nearly always fatal.",
    treatment: "Post-exposure prophylaxis (wound washing + rabies immunoglobulin + vaccine series) is effective if given promptly before symptoms. No treatment once symptomatic.",
    regions: "Highest risk in Asia (especially India) and Africa. Present on all continents except Antarctica. Rural areas with limited access to PEP are highest risk.",
    vaccineAvailable: true,
    riskLevel: "high",
  },
  cholera: {
    label: "Cholera",
    icon: "🦠",
    category: "Food & waterborne bacterium",
    transmission: "Ingestion of water or food contaminated with Vibrio cholerae bacteria. Often linked to poor sanitation and humanitarian crises.",
    prevention: "Oral cholera vaccine (Dukoral, Vaxchora) for high-risk travelers. Safe water and food practices. Hand hygiene.",
    preventionDetails: [
      {
        type: "vaccine",
        title: "Vaxchora (oral, single dose — US)",
        detail: "Single oral dose ≥10 days before travel. FDA-approved for adults 2–64. ~90% effective at 10 days, waning over 3–6 months. Recommended for travelers to active cholera outbreak areas.",
      },
      {
        type: "vaccine",
        title: "Dukoral (oral, 2 doses — international)",
        detail: "2 oral doses given 1–6 weeks apart, completed ≥1 week before travel. Available outside the US. Provides moderate protection (~65%) for up to 2 years. Also provides some cross-protection against ETEC traveler's diarrhea.",
      },
      {
        type: "behavior",
        title: "Water and food safety",
        detail: "Drink only bottled, boiled, or chemically treated water. Avoid ice. Eat only thoroughly cooked foods. Avoid raw seafood, particularly shellfish. Frequent handwashing. Cholera risk is highest in humanitarian crisis settings and areas without water treatment.",
      },
    ],
    symptoms: "Acute watery diarrhea (rice-water stools), vomiting, rapid dehydration. Can progress to shock and death within hours if untreated.",
    treatment: "Oral rehydration salts (ORS) for mild cases. IV fluids for severe dehydration. Antibiotics (doxycycline, azithromycin) can shorten duration.",
    regions: "Sub-Saharan Africa, South/Southeast Asia, Haiti, areas affected by conflict or natural disasters.",
    vaccineAvailable: true,
    riskLevel: "moderate",
  },
  "japanese-encephalitis": {
    label: "Japanese Encephalitis",
    icon: "🦟",
    category: "Mosquito-borne virus",
    transmission: "Transmitted by Culex mosquitoes, which breed in rice paddies and stagnant water. Mainly bite from dusk to dawn.",
    prevention: "Japanese encephalitis vaccine (Ixiaro) for travelers spending extended time in rural endemic areas. Mosquito avoidance measures.",
    preventionDetails: [
      {
        type: "vaccine",
        title: "Ixiaro (inactivated vaccine)",
        detail: "2-dose series on days 0 and 28, completed ≥1 week before travel. Booster at 1 year if continued exposure. Approved for adults and children ≥2 months. Recommended for stays ≥1 month in rural endemic areas, especially during monsoon/post-monsoon season.",
      },
      {
        type: "behavior",
        title: "Evening and nighttime mosquito avoidance",
        detail: "Culex mosquitoes bite primarily from dusk to dawn. Use DEET repellent in the evening. Sleep under bed nets, particularly in rural and agricultural areas near rice paddies or pig farms (amplifying hosts).",
      },
    ],
    symptoms: "Most infections are asymptomatic. Symptomatic cases: fever, headache, vomiting, confusion, seizures, encephalitis. 20–30% fatality rate in encephalitis cases.",
    treatment: "No specific antiviral. Supportive intensive care for encephalitis (seizure management, airway protection, ICP management).",
    regions: "East/Southeast Asia and the Western Pacific, especially rural agricultural areas. Seasonal (monsoon/post-monsoon).",
    vaccineAvailable: true,
    riskLevel: "moderate",
  },

  // ── Tick-borne Encephalitis ────────────────────────────────────────────────
  // Sources: Swiss BAG/FOPH 2025 vaccination schedule (TBE recommended for
  // all of Switzerland except cantons of Genève and Ticino as of 2019);
  // FSME-Immun (Pfizer) and Encepur (GSK) prescribing information.
  tbe: {
    label: "Tick-borne Encephalitis",
    icon: "🦠",
    category: "Tick-borne virus",
    transmission:
      "Transmitted by Ixodes ricinus ticks active March–November (peak May–July). Rare cases also occur after consuming unpasteurised dairy products from infected goats, sheep, or cows. Not transmitted person-to-person.",
    prevention:
      "TBE vaccine (FSME-Immun or Encepur), tick-bite avoidance, and prompt tick removal. The Swiss BAG recommends TBE vaccination for all residents and travellers in Switzerland (except Genève and Ticino) and most of central, eastern, and northern Europe.",
    preventionDetails: [
      {
        type: "vaccine",
        title: "Standard schedule (FSME-Immun / Encepur)",
        detail:
          "3 intramuscular doses on days 0, 1–3 months, and 5–12 months. Long-term protection: booster every 10 years for all ages (Swiss BAG simplified the schedule in 2022 — previously every 3 years over age 60). Both FSME-Immun and Encepur are inactivated whole-virus vaccines and clinically equivalent. Approved from age 1 (paediatric formulations available).",
      },
      {
        type: "vaccine",
        title: "Accelerated schedule (last-minute travel)",
        detail:
          "When the standard 3-dose schedule isn't feasible: Encepur 0, 7, 21 days (officially licensed accelerated schedule), or FSME-Immun 0, 14 days. Both provide protection within 14 days of dose 2. A booster at 12–18 months consolidates long-term immunity. Useful for unvaccinated patients with imminent travel to a high-risk area in tick season.",
      },
      {
        type: "behavior",
        title: "Tick-bite avoidance",
        detail:
          "Wear long trousers tucked into socks and closed shoes when walking in forest, grassland, or scrub. Apply DEET 20–30% or Icaridin 20% to exposed skin and shoes. Permethrin-treated clothing is highly effective. Stick to marked paths. Perform a full body tick check (including scalp, armpits, groin, behind knees) within 2 hours of returning indoors and again before bed.",
      },
      {
        type: "post-exposure",
        title: "Tick removal — what to do",
        detail:
          "Remove the tick as quickly as possible: grasp it close to the skin with fine-tipped tweezers (not fingers) and pull straight upwards with steady, even pressure — no twisting, no oils, no lighters. Disinfect the bite site afterwards. Note the date and check the area for the next 6 weeks. Seek medical attention if you develop fever, headache, or expanding redness around the bite. Post-exposure TBE vaccination is NOT effective and not recommended.",
      },
      {
        type: "post-exposure",
        title: "⚠ Symptoms after a tick bite",
        detail:
          "TBE is biphasic: a flu-like illness (fever, headache, myalgia) appears 4–28 days after the bite and lasts 3–7 days, followed by a symptom-free interval. About 20–30% of symptomatic patients then progress to neurological disease (meningitis, encephalitis, myelitis) with stiff neck, severe headache, confusion, or focal weakness. Permanent neurological sequelae occur in 30–60% of CNS cases. Seek urgent medical care for any biphasic febrile illness after a tick bite, especially with neurological symptoms.",
      },
    ],
    symptoms:
      "Biphasic illness: 4–28 days after a tick bite, an initial flu-like phase with fever, headache, and muscle pain lasting up to a week. Most patients recover here. About 1 in 3 progress after a symptom-free interval to neurological disease — meningitis, encephalitis, or myelitis. Long-term neurological sequelae are common after the CNS phase.",
    treatment:
      "No specific antiviral treatment. Supportive care for the meningoencephalitic phase: hospitalisation, hydration, analgesia, anticonvulsants if seizures, ICU support for severe cases. Recovery from neurological disease is often slow and incomplete.",
    regions:
      "Endemic across central, eastern, and northern Europe — including most of Switzerland (excluding cantons of Genève and Ticino), Austria, Germany, Czech Republic, Slovakia, Hungary, Slovenia, Poland, the Baltic states, parts of Scandinavia, Russia, and into northern Asia. The Far Eastern subtype (Russia, parts of China and Japan) is more severe than the European subtype.",
    vaccineAvailable: true,
    riskLevel: "moderate",
  },

  // ── Zika ──────────────────────────────────────────────────────────────────
  // Sources: CDC Zika travel guidance; WHO Zika virus disease position;
  // CDC pre-conception waiting-period guidance (updated 2024).
  zika: {
    label: "Zika",
    icon: "🦟",
    category: "Mosquito-borne virus",
    transmission:
      "Primarily by daytime-biting Aedes mosquitoes (the same species that spread dengue and chikungunya). Also transmitted sexually (in semen and vaginal fluids for weeks to months after infection) and from mother to fetus during pregnancy.",
    prevention:
      "Strict daytime mosquito-bite prevention. No vaccine is available. Pregnancy and conception planning are the most important clinical considerations — pregnant women should avoid travel to areas with current Zika transmission.",
    preventionDetails: [
      {
        type: "behavior",
        title: "Daytime mosquito protection",
        detail:
          "Aedes mosquitoes bite mainly during the day, with peaks in early morning and late afternoon. Apply DEET 20–50% or Picaridin 20% to all exposed skin. Wear long sleeves and trousers. Stay in air-conditioned or well-screened accommodation. Same precautions as for dengue and chikungunya — they share the vector.",
      },
      {
        type: "behavior",
        title: "Pregnancy and conception planning",
        detail:
          "Pregnant women should NOT travel to areas with current Zika transmission — congenital Zika syndrome can cause microcephaly and severe brain abnormalities. Couples planning conception: women with possible exposure should wait at least 2 months before trying to conceive; men with possible exposure should wait at least 3 months and use condoms with partners who could become pregnant during that window. Discuss any Zika-area travel during the periconception period with a travel medicine specialist.",
      },
      {
        type: "behavior",
        title: "Sexual transmission prevention",
        detail:
          "Use condoms or abstain from sex during travel and for 3 months after return from a Zika area, even if asymptomatic. This applies regardless of pregnancy plans — sexual transmission has been documented for both male-to-female and female-to-male partners.",
      },
      {
        type: "post-exposure",
        title: "Symptoms after travel",
        detail:
          "Most Zika infections (~80%) cause no symptoms at all. When present, symptoms are usually mild: low-grade fever, maculopapular rash, non-purulent conjunctivitis, joint pain — lasting 2–7 days. Use paracetamol; avoid aspirin and NSAIDs until dengue is ruled out. Seek testing if symptomatic during or shortly after travel and you are pregnant or considering pregnancy.",
      },
    ],
    symptoms:
      "Asymptomatic in around 80% of infections. When symptomatic: low-grade fever, maculopapular rash, conjunctivitis, joint and muscle pain, headache. Mild and self-limiting in adults. Very rarely associated with Guillain-Barré syndrome. The major risk is congenital Zika syndrome in fetuses of infected pregnant women.",
    treatment:
      "No specific antiviral treatment. Supportive care: rest, fluids, paracetamol. Avoid aspirin and NSAIDs until dengue has been excluded. Pregnant women diagnosed with Zika need specialist obstetric follow-up with serial fetal ultrasounds.",
    regions:
      "Most of the Americas (especially Caribbean, Central America, northern South America), parts of Southeast Asia, the Pacific Islands, and sub-Saharan Africa. Outbreak intensity varies year to year; CDC and ECDC maintain country-level current-risk maps. Zika has been documented sporadically in southern Europe via local Aedes albopictus populations.",
    vaccineAvailable: false,
    riskLevel: "moderate",
  },

  // ── Mpox ──────────────────────────────────────────────────────────────────
  // Sources: WHO mpox PHEIC declarations (2022 clade IIb, 2024 clade Ib);
  // CDC mpox traveller guidance; JYNNEOS/Imvanex (Bavarian Nordic)
  // prescribing information; ECDC clade Ib updates 2024–2025.
  mpox: {
    label: "Mpox",
    icon: "🦠",
    category: "Close-contact virus",
    transmission:
      "Transmitted by direct skin-to-skin or mucosal contact with lesions, body fluids, or contaminated materials (bedding, clothing). Sexual contact is the predominant route in the current global outbreak. Respiratory transmission requires prolonged close face-to-face contact. Animal-to-human transmission occurs in endemic African regions (rodents, primates).",
    prevention:
      "JYNNEOS/Imvanex vaccine for high-risk groups, sexual-health risk reduction, and avoidance of contact with cases or potentially infected animals in endemic regions.",
    preventionDetails: [
      {
        type: "vaccine",
        title: "JYNNEOS / Imvanex (modified vaccinia Ankara)",
        detail:
          "2 subcutaneous doses, 28 days apart. Recommended for: men who have sex with men with multiple recent partners; sex workers and their clients; healthcare workers caring for confirmed cases; laboratory staff handling orthopoxviruses; close contacts of confirmed cases. Approved from age 18 (used off-label in adolescents in outbreak settings). A non-replicating vaccine — safe in immunocompromised individuals, unlike older smallpox vaccines.",
      },
      {
        type: "behavior",
        title: "Sexual health and risk reduction",
        detail:
          "During active outbreaks, reduce partner numbers, avoid sex with anyone who has unexplained rash or sores, and have open conversations about recent symptoms or exposures. Condoms reduce but do not eliminate transmission risk (skin-to-skin contact at uncovered sites can still transmit). After mpox infection, wait until all lesions have fully crusted, fallen off, and new skin has formed before resuming sexual activity (typically 2–4 weeks).",
      },
      {
        type: "behavior",
        title: "Travel to endemic areas",
        detail:
          "In endemic African regions (Central and West Africa) avoid contact with rodents and primates, do not handle bushmeat, and avoid eating undercooked wild game. Healthcare workers travelling for clinical work in outbreak settings should be vaccinated and use full PPE. Routine tourist travel to endemic countries does not require vaccination unless other risk factors apply.",
      },
      {
        type: "post-exposure",
        title: "Post-exposure vaccination",
        detail:
          "JYNNEOS given within 4 days of exposure may prevent disease; given within 4–14 days it may attenuate severity. Indicated for high-risk contacts of confirmed cases. Seek medical attention urgently if you've had close contact (sexual, household, or healthcare) with a known mpox case.",
      },
      {
        type: "post-exposure",
        title: "⚠ Symptoms after possible exposure",
        detail:
          "Incubation 5–21 days. Watch for fever, swollen lymph nodes, and a vesicular/pustular rash — in the current outbreak often starting in the genital, perianal, or oral area before spreading. Seek medical attention promptly, isolate from others (including pets), and inform the clinic in advance so they can prepare PPE.",
      },
    ],
    symptoms:
      "Fever, headache, myalgia, and characteristic lymphadenopathy (often the distinguishing feature from chickenpox or smallpox), followed by a rash that progresses from macules to papules to vesicles to pustules to crusts over 2–4 weeks. In the current global outbreak, lesions are often genital, perianal, or oral and may be limited in number. Severe disease occurs in immunocompromised patients, young children, and pregnant women.",
    treatment:
      "Mostly supportive — analgesia, wound care, and isolation until lesions fully heal. Tecovirimat (TPOXX) is reserved for severe disease, immunocompromised patients, pregnancy, or lesions in anatomically sensitive areas; clinical trial evidence has been mixed. Brincidofovir and vaccinia immunoglobulin are second-line options.",
    regions:
      "Endemic in Central and West Africa with historical clade I (more severe) and clade II (less severe) circulation. Since 2022, clade IIb has caused a sustained global outbreak primarily affecting men who have sex with men. Since 2024, clade Ib has emerged with sustained transmission in the Democratic Republic of the Congo and surrounding countries (Burundi, Rwanda, Uganda, Kenya), with travel-related cases reported worldwide.",
    vaccineAvailable: true,
    riskLevel: "moderate",
  },
};

export const DISEASE_LIST = Object.keys(diseases);
