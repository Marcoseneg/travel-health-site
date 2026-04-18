export type DiseaseInfo = {
  label: string;
  icon: string;
  category: string;
  transmission: string;
  prevention: string;
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
    symptoms: "Fever, chills, headache, muscle aches, fatigue. Symptoms typically appear 7–30 days after infection. Can be life-threatening if untreated.",
    treatment: "Artemisinin-based combination therapies (ACTs) are first-line treatment. Prompt diagnosis and treatment are critical.",
    regions: "Sub-Saharan Africa (highest risk), South/Southeast Asia, Central/South America, parts of the Middle East and Oceania.",
    vaccineAvailable: false,
    riskLevel: "high",
  },
  dengue: {
    label: "Dengue Fever",
    icon: "🦟",
    category: "Mosquito-borne virus",
    transmission: "Transmitted by Aedes aegypti and Aedes albopictus mosquitoes, which bite primarily during the day.",
    prevention: "Mosquito avoidance (repellent, protective clothing, screens). Dengvaxia vaccine available in some countries for previously infected individuals.",
    symptoms: "High fever, severe headache, pain behind the eyes, joint/muscle pain, rash, mild bleeding. Severe dengue can cause hemorrhage and shock.",
    treatment: "No specific antiviral treatment. Supportive care with hydration and pain management (avoid aspirin/NSAIDs). Hospitalization for severe cases.",
    regions: "Tropical and subtropical regions worldwide, especially Southeast Asia, Latin America, the Caribbean, and the Pacific Islands.",
    vaccineAvailable: true,
    riskLevel: "high",
  },
  chikungunya: {
    label: "Chikungunya",
    icon: "🦟",
    category: "Mosquito-borne virus",
    transmission: "Transmitted by Aedes mosquitoes, the same species that spread dengue and Zika. Daytime biters.",
    prevention: "Mosquito avoidance measures. Ixchiq vaccine approved in some countries for travelers ≥18 years.",
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
    symptoms: "Most infections are asymptomatic. Symptomatic cases: fever, headache, vomiting, confusion, seizures, encephalitis. 20–30% fatality rate in encephalitis cases.",
    treatment: "No specific antiviral. Supportive intensive care for encephalitis (seizure management, airway protection, ICP management).",
    regions: "East/Southeast Asia and the Western Pacific, especially rural agricultural areas. Seasonal (monsoon/post-monsoon).",
    vaccineAvailable: true,
    riskLevel: "moderate",
  },
};

export const DISEASE_LIST = Object.keys(diseases);
