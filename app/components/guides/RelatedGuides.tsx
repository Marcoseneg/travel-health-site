// app/components/guides/RelatedGuides.tsx
//
// "Related guides" block. Picks 3 other published articles, preferring
// same category and sorted by date (newest first). Excludes placeholders
// (articles with no `content`) and the current article itself.
//
// Two visual variants:
//   • "row" (default) — 3 cards in a horizontal grid. Used at the
//     bottom of the article body on mobile.
//   • "sidebar"       — compact vertical list. Used in the right
//     sidebar on desktop.

"use client";

import Link from "next/link";
import { articles, CATEGORY_LABELS } from "../../lib/guidesData";
import type { Article } from "../../lib/guides/types";

type Variant = "row" | "sidebar";

type Props = {
  /** Current article's slug (id), used to exclude it from candidates */
  currentSlug: string;
  /** Visual variant — defaults to "row" for backwards compatibility */
  variant?: Variant;
};

export default function RelatedGuides({ currentSlug, variant = "row" }: Props) {
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
    .slice(0, variant === "sidebar" ? 4 : 3);

  if (candidates.length === 0) return null;

  return variant === "sidebar" ? (
    <SidebarVariant candidates={candidates} />
  ) : (
    <RowVariant candidates={candidates} />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Row variant — 3 cards horizontally, full-width. Used on mobile and as a
// fallback for any caller that doesn't pass a variant.
// ─────────────────────────────────────────────────────────────────────────────

function RowVariant({ candidates }: { candidates: Article[] }) {
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

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar variant — compact vertical list with up to 4 entries. Sits
// alongside the article in the right sidebar on desktop.
// ─────────────────────────────────────────────────────────────────────────────

function SidebarVariant({ candidates }: { candidates: Article[] }) {
  return (
    <nav
      aria-label="Related guides"
      style={{
        padding: "20px 22px",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#7dd3fc",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "14px",
        }}
      >
        Related guides
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {candidates.map((a, i) => {
          const cat = CATEGORY_LABELS[a.category];
          const isLast = i === candidates.length - 1;
          return (
            <li key={a.id} style={{ margin: 0 }}>
              <Link
                href={`/guides/${a.id}`}
                style={{
                  display: "block",
                  padding: "12px 0",
                  borderBottom: isLast
                    ? "none"
                    : "1px solid rgba(255,255,255,0.04)",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: cat?.color ?? "#7dd3fc",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "4px",
                  }}
                >
                  {cat?.label ?? a.category}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#f1f5f9",
                    lineHeight: 1.35,
                    letterSpacing: "-0.005em",
                    marginBottom: "4px",
                  }}
                >
                  {a.title}
                </div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                  {a.readingTime} min read
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
