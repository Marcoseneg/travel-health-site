"use client";

import { useState, useMemo } from "react";
import { articles, CATEGORY_LABELS, type ArticleCategory } from "../lib/guidesData";
import { COVER_ILLUSTRATIONS } from "../components/illustrations";
import { formatDate } from "../lib/utils/formatDate";
import FeaturedHero from "../components/guides/FeaturedHero";
import { countries } from "../../data/countries";
import { diseases } from "../lib/diseaseData";

// ─────────────────────────────────────────────────────────────────────────────
// Guides listing page
//
// Layout (top to bottom):
//   1. Header — large title + single subtitle (matches site style).
//   2. Featured carousel — wide hero rotating through up to 3 articles
//      (only shown when no category filter is active).
//   3. Category filter pills.
//   4. Unified article grid — every article rendered as a big illustration
//      card. Responsive 1/2/3 columns. Placeholders dimmed with a
//      "Coming soon" badge.
//   5. Trust signals — bordered editorial block with stats + 4 icon cards.
// ─────────────────────────────────────────────────────────────────────────────

type FilterMode = "all" | ArticleCategory;

// ── Outline SVG icons used in the trust signals block ─────────────────────

function IconCheck() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5 11 15.5 16 9" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5H6.5A2.5 2.5 0 0 0 4 19.5z" />
    </svg>
  );
}

function IconBalance() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v17" />
      <path d="M5 21h14" />
      <path d="M6 4l-3 7h6z" />
      <path d="M18 4l-3 7h6z" />
      <path d="M3 11a3 3 0 0 0 6 0" />
      <path d="M15 11a3 3 0 0 0 6 0" />
      <path d="M6 4l12 0" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const TRUST_SIGNALS: {
  Icon: React.ComponentType;
  title: string;
  description: string;
}[] = [
  {
    Icon: IconCheck,
    title: "Physician written",
    description:
      "Every guide is written and reviewed by a practising travel medicine physician.",
  },
  {
    Icon: IconBook,
    title: "Primary sources",
    description:
      "Built on WHO, CDC, and PAHO guidelines — never secondary rewrites.",
  },
  {
    Icon: IconBalance,
    title: "Independent",
    description:
      "No affiliate links. No paid placements. No commercial bias.",
  },
  {
    Icon: IconClock,
    title: "Kept current",
    description:
      "Outbreak alerts update daily; country and disease pages reviewed regularly.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function GuidesPage() {
  const [filter, setFilter] = useState<FilterMode>("all");

  const filtered = useMemo(() => {
    let list = [...articles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (filter !== "all") list = list.filter((a) => a.category === filter);
    return list;
  }, [filter]);

  const featured = useMemo(
    () =>
      articles
        .filter((a) => a.featured && a.content)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3),
    []
  );

  const countryCount = Object.keys(countries).length;
  const diseaseCount = Object.keys(diseases).length;
  const publishedCount = articles.filter((a) => a.content).length;

  const categories: { value: FilterMode; label: string }[] = [
    { value: "all", label: "All" },
    ...Object.entries(CATEGORY_LABELS).map(([key, val]) => ({
      value: key as FilterMode,
      label: val.label,
    })),
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#030712",
        color: "#f1f5f9",
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Page header ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "56px 24px 0" }}>
        <h1
          style={{
            fontSize: "clamp(36px, 4.5vw, 56px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            margin: "0 0 18px",
          }}
        >
          Guides & articles
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#64748b",
            maxWidth: "600px",
            lineHeight: 1.6,
            margin: "0 0 44px",
          }}
        >
          Physician-written. Field-tested. Straight answers for real travel.
        </p>
      </section>

      {/* ── Featured carousel (only on "all" filter) ────────────────── */}
      {filter === "all" && featured.length > 0 && (
        <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px" }}>
          <FeaturedHero articles={featured} />
        </section>
      )}

      {/* ── Category filters ────────────────────────────────────────── */}
      <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "32px",
            paddingBottom: "24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
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
                    isActive ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.07)"
                  }`,
                  background: isActive ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.03)",
                  color: isActive ? "#7dd3fc" : "#94a3b8",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </button>
            );
          })}

          <span style={{ fontSize: "13px", color: "#475569", marginLeft: "auto" }}>
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ── Unified article grid ────────────────────────────────────── */}
      <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#475569" }}>
            No articles in this category yet.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
              gap: "16px",
            }}
          >
            {filtered.map((article) => {
              const cat = CATEGORY_LABELS[article.category];
              const isPlaceholder = !article.content;
              const Illustration =
                article.coverIllustration && COVER_ILLUSTRATIONS[article.coverIllustration]
                  ? COVER_ILLUSTRATIONS[article.coverIllustration]
                  : null;

              return (
                <a
                  key={article.id}
                  href={`/guides/${article.id}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "#f1f5f9",
                    background: "#0a101f",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "all 0.2s",
                    opacity: isPlaceholder ? 0.62 : 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.35)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <div
                    style={{
                      height: "160px",
                      background: article.coverGradient,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {Illustration && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pointerEvents: "none",
                        }}
                      >
                        <Illustration />
                      </div>
                    )}

                    <span
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "16px",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: "rgba(0,0,0,0.4)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        color: cat.color,
                      }}
                    >
                      {cat.label}
                    </span>

                    {isPlaceholder && (
                      <span
                        style={{
                          position: "absolute",
                          top: "14px",
                          right: "16px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.7)",
                          background: "rgba(0,0,0,0.4)",
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                          padding: "4px 10px",
                          borderRadius: "6px",
                        }}
                      >
                        Coming soon
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      padding: "20px 24px 22px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.32,
                        margin: "0 0 10px",
                      }}
                    >
                      {article.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#94a3b8",
                        lineHeight: 1.55,
                        margin: "0 0 18px",
                        flex: 1,
                      }}
                    >
                      {article.subtitle}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "12px",
                        color: "#475569",
                      }}
                    >
                      <span>{formatDate(article.date)}</span>
                      <span>·</span>
                      <span>{article.readingTime} min read</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Trust signals (bordered container) ────────────────────────── */}
      <section style={{ padding: "16px 24px 96px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "48px clamp(20px, 4vw, 48px)",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <h2
              style={{
                fontSize: "clamp(22px, 2.6vw, 30px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                margin: "0 0 14px",
                lineHeight: 1.2,
                color: "#f1f5f9",
              }}
            >
              Independent. Physician-written. Kept current.
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "#94a3b8",
                margin: 0,
                lineHeight: 1.55,
                maxWidth: "640px",
                marginInline: "auto",
              }}
            >
              {countryCount} countries · {diseaseCount} diseases ·{" "}
              {publishedCount} published guides — all reviewed by a practising
              travel medicine physician.
            </p>
          </div>

          {/* Trust signals — borderless centered cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "24px",
            }}
          >
            {TRUST_SIGNALS.map((s) => {
              const Icon = s.Icon;
              return (
                <div
                  key={s.title}
                  style={{
                    textAlign: "center",
                    padding: "12px 8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "14px",
                      color: "#7dd3fc",
                    }}
                  >
                    <Icon />
                  </div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      margin: "0 0 8px",
                      color: "#f1f5f9",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "#94a3b8",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
