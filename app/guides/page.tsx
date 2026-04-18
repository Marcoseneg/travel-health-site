"use client";

import { useState, useMemo } from "react";
import { articles, CATEGORY_LABELS, type ArticleCategory } from "../lib/guidesData";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type FilterMode = "all" | ArticleCategory;

export default function GuidesPage() {
  const [filter, setFilter] = useState<FilterMode>("all");

  const filtered = useMemo(() => {
    let list = [...articles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (filter !== "all") list = list.filter((a) => a.category === filter);
    return list;
  }, [filter]);

  const featured = articles.filter((a) => a.featured).slice(0, 3);

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
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "48px 24px 0" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: "16px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#64748b",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Journal
        </div>
        <h1
          style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            margin: "0 0 12px",
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
            margin: "0 0 40px",
          }}
        >
          Physician-written deep dives on travel health — gear reviews,
          destination guides, prevention strategies, and field-tested advice.
        </p>
      </section>

      {/* ── Featured articles ────────────────────────────────────────── */}
      {filter === "all" && featured.length > 0 && (
        <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px 48px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "16px",
            }}
          >
            {featured.map((article) => {
              const cat = CATEGORY_LABELS[article.category];
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
                  {/* Gradient header */}
                  <div
                    style={{
                      height: "140px",
                      background: article.coverGradient,
                      position: "relative",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "16px 20px",
                    }}
                  >
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
                        background: "rgba(0,0,0,0.35)",
                        backdropFilter: "blur(8px)",
                        color: cat.color,
                      }}
                    >
                      {cat.label}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        top: "14px",
                        right: "16px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.5)",
                        background: "rgba(0,0,0,0.25)",
                        backdropFilter: "blur(8px)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                      }}
                    >
                      Featured
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3
                      style={{
                        fontSize: "17px",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.35,
                        margin: "0 0 8px",
                      }}
                    >
                      {article.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "#94a3b8",
                        lineHeight: 1.55,
                        margin: "0 0 16px",
                        flex: 1,
                      }}
                    >
                      {article.subtitle}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
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
        </section>
      )}

      {/* ── Category filters ─────────────────────────────────────────── */}
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
                  border: `1px solid ${isActive ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.07)"}`,
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

      {/* ── Article list ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#475569" }}>
            No articles in this category yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filtered.map((article) => {
              const cat = CATEGORY_LABELS[article.category];
              return (
                <a
                  key={article.id}
                  href={`/guides/${article.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "20px 24px",
                    borderRadius: "14px",
                    textDecoration: "none",
                    color: "#f1f5f9",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  }}
                >
                  {/* Color accent bar */}
                  <div
                    style={{
                      width: "4px",
                      height: "48px",
                      borderRadius: "2px",
                      background: cat.color,
                      opacity: 0.6,
                      flexShrink: 0,
                    }}
                  />

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.35,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {article.title}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#64748b",
                        marginTop: "4px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {article.subtitle}
                    </div>
                  </div>

                  {/* Meta */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: cat.color,
                        background: `${cat.color}15`,
                        padding: "4px 10px",
                        borderRadius: "6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cat.label}
                    </span>
                    <span style={{ fontSize: "12px", color: "#475569", whiteSpace: "nowrap" }}>
                      {article.readingTime} min
                    </span>
                    <span style={{ fontSize: "12px", color: "#334155", whiteSpace: "nowrap" }}>
                      {formatDate(article.date)}
                    </span>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
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
