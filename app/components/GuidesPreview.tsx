import Link from "next/link";
import type { ReactNode } from "react";
import { articles, type Article } from "../lib/guidesData";

// ── "Expert travel health guides" homepage preview ─────────────────────────
// Shows four cornerstone guides: malaria, rabies, dengue, and traveler's
// diarrhea. The site's guide library currently has no dedicated rabies or
// dengue article, so the two closest existing guides stand in for them:
//   • rabies  → "japanese-encephalitis-who-needs-it" (a vaccine-vs-no-vaccine
//               explainer for a bite/vector-borne disease — the nearest analog)
//   • dengue  → "best-deet-sprays-2026" (mosquito-bite repellent guide; bite
//               avoidance is the primary dengue prevention)
// Each card links to /guides/<id>; article.id is the slug used by the
// /guides/[slug] route. Cards reuse the global `.step-card` hover-lift
// defined in app/page.tsx.

// Cornerstone topics, in display order, paired with the guide id that fills
// that slot. `topic` selects the placeholder icon when an article has no
// cover image of its own.
type Cornerstone = {
  topic: "malaria" | "rabies" | "dengue" | "diarrhea";
  id: string;
};

const CORNERSTONES: Cornerstone[] = [
  { topic: "malaria", id: "malaria-prophylaxis-compared" },
  { topic: "rabies", id: "japanese-encephalitis-who-needs-it" },
  { topic: "dengue", id: "best-deet-sprays-2026" },
  { topic: "diarrhea", id: "travelers-diarrhea-survival" },
];

function byId(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

// Resolve cornerstones to real articles, dropping any that no longer exist.
const GUIDES = CORNERSTONES.map((c) => ({ ...c, article: byId(c.id) })).filter(
  (c): c is Cornerstone & { article: Article } => Boolean(c.article)
);

export default function GuidesPreview() {
  if (GUIDES.length === 0) return null;

  return (
    <section
      style={{
        maxWidth: 1320,
        margin: "0 auto",
        padding: "28px 24px",
        background: "var(--c-bg)",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <h2 className="t-h2">Expert travel health guides</h2>
        <Link
          href="/guides"
          style={{
            color: "var(--c-accent-strong)",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Explore all guides &rarr;
        </Link>
      </div>

      {/* Card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {GUIDES.map(({ topic, article }) => (
          <Link
            key={article.id}
            href={`/guides/${article.id}`}
            className="step-card"
            style={{
              display: "block",
              background: "var(--c-surface)",
              border: "1px solid var(--c-border)",
              borderRadius: "var(--c-radius-md)",
              overflow: "hidden",
              textDecoration: "none",
            }}
          >
            {/* Thumbnail band */}
            {article.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.coverImage.src}
                alt={article.coverImage.alt}
                width={400}
                height={80}
                style={{
                  display: "block",
                  width: "100%",
                  height: 80,
                  objectFit: "cover",
                  objectPosition: article.coverImage.focusPoint ?? "center",
                }}
              />
            ) : (
              <div
                style={{
                  height: 80,
                  background: "var(--c-surface-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--c-accent-strong)",
                }}
                aria-hidden="true"
              >
                {TOPIC_ICONS[topic]}
              </div>
            )}

            {/* Title */}
            <div style={{ padding: "12px 14px" }}>
              <span
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  fontSize: 13,
                  fontWeight: 700,
                  lineHeight: 1.35,
                  color: "var(--c-text)",
                }}
              >
                {article.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ── Topic placeholder icons ────────────────────────────────────────────────
// Simple 28px stroke icons, inheriting currentColor (set to the accent on the
// tinted placeholder band). One per cornerstone topic.
const TOPIC_ICONS: Record<Cornerstone["topic"], ReactNode> = {
  malaria: <MosquitoIcon />,
  rabies: <PawShieldIcon />,
  dengue: <MosquitoIcon />,
  diarrhea: <StomachIcon />,
};

function MosquitoIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 13c1.7 0 3-1.6 3-3.6S13.7 5 12 5 9 6.8 9 9.4 10.3 13 12 13Z" />
      <path d="M12 13v7" />
      <path d="M12 9.5 4 5M12 9.5 20 5" />
      <path d="M12 12 5 16M12 12l7 4" />
      <path d="M10.5 20h3" />
    </svg>
  );
}

function PawShieldIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 5 5.5v5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5v-5L12 3Z" />
      <circle cx="9.5" cy="10" r="1" />
      <circle cx="14.5" cy="10" r="1" />
      <circle cx="8.5" cy="12.5" r="1" />
      <circle cx="15.5" cy="12.5" r="1" />
      <path d="M12 12.5c-1.6 0-2.8 1-2.8 2.3 0 1 .9 1.7 2.8 1.7s2.8-.7 2.8-1.7c0-1.3-1.2-2.3-2.8-2.3Z" />
    </svg>
  );
}

function StomachIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3v4c0 1.5.8 2.4 2.2 3 2.4 1 4.3 2.4 4.3 5.2 0 3-2.4 5.3-5.4 5.3-2.8 0-5-2-5-4.6 0-1.4.7-2.4 1.8-2.9" />
      <path d="M9 3h3" />
      <path d="M15.5 15.4c.7-.2 1.4-.8 1.8-1.6" />
    </svg>
  );
}
