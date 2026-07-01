// ─────────────────────────────────────────────────────────────────────────────
// Disease tagging for outbreak alerts — derives a single disease label from the
// alert title so the /outbreaks filter bar can group by disease. Keyword-based
// and imperfect (like the country tagger); order matters (specific → generic).
// ─────────────────────────────────────────────────────────────────────────────

const DISEASE_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "Ebola", re: /\bebola\b/i },
  { label: "Marburg", re: /\bmarburg\b/i },
  { label: "Yellow fever", re: /\byellow fever\b/i },
  { label: "Dengue", re: /\bdengue\b/i },
  { label: "Chikungunya", re: /\bchikungunya\b/i },
  { label: "Zika", re: /\bzika\b/i },
  { label: "Malaria", re: /\bmalaria\b/i },
  { label: "Measles", re: /\bmeasles\b/i },
  { label: "Polio", re: /\bpolio\b/i },
  { label: "Cholera", re: /\bcholera\b/i },
  { label: "Mpox", re: /\bmpox\b|monkeypox/i },
  { label: "MERS-CoV", re: /\bmers\b|middle east respiratory/i },
  { label: "Avian influenza", re: /avian influenza|\bh5n1\b|\bh9n2\b|\bh7n9\b|bird flu/i },
  { label: "Influenza", re: /influenza|seasonal flu/i },
  { label: "Nipah", re: /\bnipah\b/i },
  { label: "Hantavirus", re: /\bhantavirus\b/i },
  { label: "Diphtheria", re: /\bdiphtheria\b/i },
  { label: "Meningococcal", re: /meningococcal|\bmeningitis\b/i },
  { label: "Lassa fever", re: /\blassa\b/i },
  { label: "Typhoid", re: /\btyphoid\b/i },
  { label: "Hepatitis A", re: /\bhepatitis a\b/i },
  { label: "Rabies", re: /\brabies\b/i },
  { label: "Japanese encephalitis", re: /japanese encephalitis/i },
  { label: "Oropouche", re: /\boropouche\b/i },
  { label: "West Nile", re: /\bwest nile\b/i },
  { label: "Shigella", re: /shigell/i },
  { label: "Ciguatera", re: /\bciguatera\b/i },
];

export function tagDisease(title: string): string | undefined {
  for (const d of DISEASE_PATTERNS) if (d.re.test(title)) return d.label;
  return undefined;
}
