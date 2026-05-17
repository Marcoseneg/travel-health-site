// app/components/guides/RelatedGuides.tsx
//
// "Related guides" block rendered at the bottom of each article.
// Picks 3 other published articles, preferring same category and
// sorted by date (newest first). Excludes placeholders (articles
// with no `content`) and the current article itself.

"use client";

import Link from "next/link";
import { articles, CATEGORY_LABELS } from "../../lib/guidesData";

type Props = {
  /** Current article's slug (id), used to exclude it from candidates */
  currentSlug: string;
};

export default function RelatedGuides({ currentSlug }: Props) {
  const current = articles.find((a) => a.id === currentSlug);
  if (!current) return null;

  const candidates = articles
    .filter((a) => a.id !== currentSlug && a.content)
    .sort((a, b) => {
      const sameA = a.category === current.category ? 0 : 1;
      const sameB = b.category === current.category ? 0 : 1;
      if (sameA !== sameB) return sameA - sameB;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  if (candidates.length === 0) return null;

  return (
    <div
      style={{
        marginTop: "56px",
        paddingTop: "32px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#7dd3fc",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "20px",
        }}
      >
        Related guides
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {candidates.map((a) => {
          const cat = CATEGORY_LABELS[a.category];
          return (
            <Link
              key={a.id}
              href={`/guides/${a.id}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "18px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                textDecoration: "none",
                transition: "background 0.15s ease, border-color 0.15s ease",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: cat?.color ?? "#7dd3fc",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {cat?.label ?? a.category}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#f1f5f9",
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                }}
              >
                {a.title}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  marginTop: "auto",
                }}
              >
                {a.readingTime} min read
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
