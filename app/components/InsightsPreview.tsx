import Link from "next/link";
import { insights, INSIGHT_CATEGORY_LABELS } from "../lib/insights";

// ── "Research & public-health insights" homepage preview ───────────────────
// Surfaces the four newest in-depth analysis pieces. `insights` is maintained
// newest-first in app/lib/insights/index.ts, so a plain slice(0, 4) is the top
// four. Each card links to /insights/<id> and reuses the global `.step-card`
// hover-lift defined in app/page.tsx.

const FEATURED = insights.slice(0, 4);

// Format an ISO date (YYYY-MM-DD) as e.g. "May 6, 2026". Parsed in UTC so the
// day doesn't drift across timezones.
function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function InsightsPreview() {
  if (FEATURED.length === 0) return null;

  return (
    <section style={{ maxWidth: 1320, margin: "0 auto", padding: "40px 24px" }}>
      <div
        style={{
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          borderRadius: "var(--c-radius-lg)",
          padding: "28px",
          boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
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
        <h2 className="t-h2">Research &amp; public-health insights</h2>
        <Link
          href="/insights"
          style={{
            color: "var(--c-accent-strong)",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          View all insights &rarr;
        </Link>
      </div>

      {/* Card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        {FEATURED.map((insight) => {
          const cat = INSIGHT_CATEGORY_LABELS[insight.category];
          return (
            <Link
              key={insight.id}
              href={`/insights/${insight.id}`}
              className="step-card"
              style={{
                display: "block",
                background: "var(--c-surface-2)",
                border: "1px solid var(--c-border)",
                borderRadius: "var(--c-radius-md)",
                overflow: "hidden",
                textDecoration: "none",
              }}
            >
              {/* Top band — cover image if present, else gradient fallback */}
              {insight.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={insight.coverImage.src}
                  alt={insight.coverImage.alt}
                  width={400}
                  height={80}
                  style={{
                    display: "block",
                    width: "100%",
                    height: 80,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 80,
                    background:
                      insight.coverGradient ?? "var(--c-surface-2)",
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Body */}
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {/* Category chip */}
                <span
                  className="t-micro"
                  style={{
                    alignSelf: "flex-start",
                    color: cat.color,
                    background: `${cat.color}1a`,
                    padding: "2px 8px",
                    borderRadius: 999,
                    fontWeight: 600,
                  }}
                >
                  {cat.label}
                </span>

                {/* Title */}
                <span
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    color: "var(--c-text)",
                  }}
                >
                  {insight.title}
                </span>

                {/* Subtitle */}
                <span
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    fontSize: 12,
                    lineHeight: 1.4,
                    color: "var(--c-text-2)",
                  }}
                >
                  {insight.subtitle}
                </span>

                {/* Footer — author · date */}
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--c-text-3)",
                    marginTop: 2,
                  }}
                >
                  {insight.author} &middot; {formatDate(insight.date)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      </div>
    </section>
  );
}
