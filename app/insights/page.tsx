"use client";

import { useState, useMemo } from "react";
import {
  insights,
  INSIGHT_CATEGORY_LABELS,
  type InsightCategory,
} from "../lib/insights";
import { formatDate } from "../lib/utils/formatDate";

// ─────────────────────────────────────────────────────────────────────────────
// Insights listing page
//
// "Insights" are in-depth, physician-authored analysis pieces — study/paper
// reviews, vaccine deep-dives, and public-health commentary. This page mirrors
// the Guides listing (light theme, design tokens) but for editorial analysis.
//
// Layout (top to bottom):
//   1. Header — large title + subtitle + "Physician-reviewed" pill.
//   2. Category filter pills (All + each INSIGHT_CATEGORY_LABELS entry).
//   3. Responsive card grid (newest first; `insights` is already ordered).
//      Each card → /insights/[id]; shows category chip, title, 2-line
//      subtitle, and an "author · date · N min read" footer. Cards show a
//      cover image if present, else a slim gradient band.
// ─────────────────────────────────────────────────────────────────────────────

type FilterMode = "all" | InsightCategory;

// Page metadata (title "Insights — TravelMed") lives in ./layout.tsx, since
// this is a client component and cannot export `metadata` directly.

export default function InsightsPage() {
  const [filter, setFilter] = useState<FilterMode>("all");

  // `insights` is already ordered newest-first; preserve that order.
  const filtered = useMemo(() => {
    if (filter === "all") return insights;
    return insights.filter((i) => i.category === filter);
  }, [filter]);

  const categories: { value: FilterMode; label: string }[] = [
    { value: "all", label: "All" },
    ...Object.entries(INSIGHT_CATEGORY_LABELS).map(([key, val]) => ({
      value: key as FilterMode,
      label: val.label,
    })),
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--c-bg)",
        color: "var(--c-text)",
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Page header ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1480px", margin: "0 auto", padding: "56px 24px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
            margin: "0 0 18px",
          }}
        >
          <h1 className="t-display" style={{ margin: 0, color: "var(--c-text)" }}>
            Insights
          </h1>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 600,
              padding: "5px 12px",
              borderRadius: "999px",
              border: "1px solid var(--c-accent-border)",
              background: "var(--c-accent-soft)",
              color: "var(--c-accent-strong)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "999px",
                background: "var(--c-accent)",
              }}
            />
            Physician-reviewed
          </span>
        </div>
        <p
          className="t-body"
          style={{
            fontSize: "16px",
            color: "var(--c-text-2)",
            maxWidth: "640px",
            margin: "0 0 44px",
          }}
        >
          In-depth analysis, study reviews, and public-health commentary —
          physician-authored.
        </p>
      </section>

      {/* ── Category filters ────────────────────────────────────────── */}
      <section style={{ maxWidth: "1480px", margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "32px",
            paddingBottom: "24px",
            borderBottom: "1px solid var(--c-border)",
          }}
        >
          {categories.map((c) => {
            const isActive = filter === c.value;
            return (
              <button
                key={c.value}
                onClick={() => setFilter(c.value)}
                style={{
                  padding: "7px 16px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: `1px solid ${
                    isActive ? "var(--c-accent-border)" : "var(--c-border)"
                  }`,
                  background: isActive ? "var(--c-accent-soft)" : "var(--c-surface)",
                  color: isActive ? "var(--c-accent)" : "var(--c-text-2)",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </button>
            );
          })}

          <span style={{ fontSize: "13px", color: "var(--c-text-3)", marginLeft: "auto" }}>
            {filtered.length} insight{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ── Insights grid ───────────────────────────────────────────── */}
      <section style={{ maxWidth: "1480px", margin: "0 auto", padding: "0 24px 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "var(--c-text-3)" }}>
            No insights in this category yet.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
              gap: "16px",
            }}
          >
            {filtered.map((insight) => {
              const cat = INSIGHT_CATEGORY_LABELS[insight.category];
              const hasPhoto = !!insight.coverImage;

              return (
                <a
                  key={insight.id}
                  href={`/insights/${insight.id}`}
                  className="step-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "var(--c-radius-lg)",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "var(--c-text)",
                    background: "var(--c-surface)",
                    border: "1px solid var(--c-border)",
                  }}
                >
                  {/* ── Cover: photo if present, else a slim gradient band ── */}
                  {hasPhoto && insight.coverImage ? (
                    <div
                      style={{
                        height: "160px",
                        background: "#000",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={insight.coverImage.src}
                        alt={insight.coverImage.alt}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 100%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        height: "8px",
                        background:
                          insight.coverGradient ??
                          `linear-gradient(90deg, ${cat.color}, var(--c-accent))`,
                      }}
                    />
                  )}

                  <div
                    style={{
                      padding: "20px 24px 22px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Category chip — category color on a soft tint */}
                    <span
                      style={{
                        alignSelf: "flex-start",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        marginBottom: "14px",
                        color: cat.color,
                        background: `color-mix(in srgb, ${cat.color} 12%, transparent)`,
                      }}
                    >
                      {cat.label}
                    </span>

                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.32,
                        margin: "0 0 10px",
                        color: "var(--c-text)",
                      }}
                    >
                      {insight.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--c-text-2)",
                        lineHeight: 1.55,
                        margin: "0 0 18px",
                        flex: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {insight.subtitle}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                        fontSize: "12px",
                        color: "var(--c-text-3)",
                      }}
                    >
                      <span>{insight.author}</span>
                      <span>·</span>
                      <span>{formatDate(insight.date)}</span>
                      <span>·</span>
                      <span>{insight.readingTime} min read</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
