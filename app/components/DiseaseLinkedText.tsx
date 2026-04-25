"use client";

import Link from "next/link";
import { diseases } from "../lib/diseaseData";

// Build a lookup of disease label → slug
const DISEASE_LOOKUP: { label: string; slug: string }[] = Object.entries(diseases)
  .map(([slug, d]) => ({ label: d.label, slug }))
  // Sort by label length descending so "Japanese Encephalitis" matches before "Encephalitis"
  .sort((a, b) => b.label.length - a.label.length);

// Also add common alternate names
const ALTERNATE_NAMES: { label: string; slug: string }[] = [
  { label: "malaria", slug: "malaria" },
  { label: "dengue", slug: "dengue" },
  { label: "chikungunya", slug: "chikungunya" },
  { label: "yellow fever", slug: "yellow-fever" },
  { label: "typhoid", slug: "typhoid" },
  { label: "hepatitis A", slug: "hepatitis-a" },
  { label: "rabies", slug: "rabies" },
  { label: "cholera", slug: "cholera" },
  { label: "Japanese encephalitis", slug: "japanese-encephalitis" },
  { label: "Zika", slug: "dengue" }, // link Zika mentions to dengue (similar vector)
];

const ALL_TERMS = [...DISEASE_LOOKUP, ...ALTERNATE_NAMES]
  .sort((a, b) => b.label.length - a.label.length);

/**
 * Renders text with disease names auto-linked to their disease pages.
 * Usage: <DiseaseLinkedText text="Risk of malaria and dengue in this region." />
 */
export default function DiseaseLinkedText({
  text,
  currentSlug,
  style,
}: {
  text: string;
  currentSlug?: string; // Don't link the disease we're already on
  style?: React.CSSProperties;
}) {
  // Find all disease mentions with their positions
  type Match = { start: number; end: number; slug: string; label: string };
  const matches: Match[] = [];
  const usedRanges: [number, number][] = [];

  for (const term of ALL_TERMS) {
    const regex = new RegExp(`\\b${escapeRegex(term.label)}\\b`, "gi");
    let match;
    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      // Skip if this range overlaps with an existing match
      if (usedRanges.some(([s, e]) => start < e && end > s)) continue;
      // Skip if it's the current disease page
      if (term.slug === currentSlug) continue;

      matches.push({ start, end, slug: term.slug, label: match[0] });
      usedRanges.push([start, end]);
    }
  }

  if (matches.length === 0) {
    return <span style={style}>{text}</span>;
  }

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);

  // Build fragments
  const fragments: React.ReactNode[] = [];
  let lastEnd = 0;

  matches.forEach((m, i) => {
    // Text before this match
    if (m.start > lastEnd) {
      fragments.push(text.slice(lastEnd, m.start));
    }
    // The linked disease name
    fragments.push(
      <Link
        key={i}
        href={`/diseases/${m.slug}`}
        style={{
          color: "#7dd3fc",
          textDecoration: "underline",
          textUnderlineOffset: "2px",
          textDecorationColor: "rgba(125,211,252,0.3)",
          transition: "text-decoration-color 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecorationColor = "rgba(125,211,252,0.7)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecorationColor = "rgba(125,211,252,0.3)";
        }}
      >
        {m.label}
      </Link>
    );
    lastEnd = m.end;
  });

  // Remaining text after last match
  if (lastEnd < text.length) {
    fragments.push(text.slice(lastEnd));
  }

  return <span style={style}>{fragments}</span>;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
