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
    category: "Mosquito-borne viral",

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
    category: "Vaccine-preventable",
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
    category: "Food & waterborne",
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
    category: "Vaccine-preventable",
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
    category: "Animal exposure",
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
    category: "Food & waterborne",
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
};

export const DISEASE_LIST = Object.keys(diseases);
