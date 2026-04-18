"use client";

import { useState, useMemo } from "react";
import { outbreakAlerts, type AlertSeverity } from "../lib/outbreakData";

// ── Severity config ─────────────────────────────────────────────────────────
const SEVERITY_CONFIG: Record<AlertSeverity, { label: string; color: string; bg: string; border: string; dot: string }> = {
  warning: {
    label: "Warning",
    color: "#fca5a5",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.2)",
    dot: "#ef4444",
  },
  advisory: {
    label: "Advisory",
    color: "#fcd34d",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    dot: "#f59e0b",
  },
  watch: {
    label: "Watch",
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.08)",
    border: "rgba(148,163,184,0.15)",
    dot: "#64748b",
  },
};

// ── Date formatting ─────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function daysAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 30) return `${diff}d ago`;
  if (diff < 365) return `${Math.floor(diff / 30)}mo ago`;
  return `${Math.floor(diff / 365)}y ago`;
}

type FilterMode = "all" | "active" | "warning" | "advisory" | "watch";

export default function OutbreaksPage() {
  const [filter, setFilter] = useState<FilterMode>("all");

  const filtered = useMemo(() => {
    let alerts = [...outbreakAlerts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    if (filter === "active") alerts = alerts.filter((a) => a.active);
    else if (filter === "warning") alerts = alerts.filter((a) => a.severity === "warning");
    else if (filter === "advisory") alerts = alerts.filter((a) => a.severity === "advisory");
    else if (filter === "watch") alerts = alerts.filter((a) => a.severity === "watch");
    return alerts;
  }, [filter]);

  const activeCount = outbreakAlerts.filter((a) => a.active).length;

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
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 24px 0" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "999px",
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.15)",
            marginBottom: "16px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#fca5a5",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", animation: "pulse-dot 2s ease-in-out infinite" }} />
          {activeCount} active alerts
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
          Outbreak alerts
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#64748b",
            maxWidth: "600px",
            lineHeight: 1.6,
            margin: "0 0 32px",
          }}
        >
          Active disease outbreaks and health advisories relevant to travelers.
          Updated as situations develop.
        </p>

        {/* ── Filters ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "40px" }}>
          {([
            { value: "all" as FilterMode, label: "All alerts" },
            { value: "active" as FilterMode, label: `Active (${activeCount})` },
            { value: "warning" as FilterMode, label: "⚠ Warning" },
            { value: "advisory" as FilterMode, label: "Advisory" },
            { value: "watch" as FilterMode, label: "Watch" },
          ]).map((f) => {
            const isActive = filter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
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
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Alert timeline ───────────────────────────────────────────── */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#475569" }}>
            No alerts match this filter.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered.map((alert) => {
              const sev = SEVERITY_CONFIG[alert.severity];
              return (
                <article
                  key={alert.id}
                  style={{
                    padding: "24px 28px",
                    borderRadius: "16px",
                    background: "#0a101f",
                    border: `1px solid rgba(255,255,255,0.06)`,
                    borderLeft: `3px solid ${sev.dot}`,
                    opacity: alert.active ? 1 : 0.55,
                    transition: "all 0.2s",
                  }}
                >
                  {/* Top row: date + severity + status */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#475569" }}>
                      {formatDate(alert.date)}
                    </span>
                    <span style={{ fontSize: "12px", color: "#334155" }}>·</span>
                    <span style={{ fontSize: "12px", color: "#475569" }}>
                      {daysAgo(alert.date)}
                    </span>

                    <div style={{ flex: 1 }} />

                    {/* Severity badge */}
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        padding: "3px 10px",
                        borderRadius: "6px",
                        background: sev.bg,
                        color: sev.color,
                        border: `1px solid ${sev.border}`,
                      }}
                    >
                      {sev.label}
                    </span>

                    {/* Active/resolved */}
                    {!alert.active && (
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#475569",
                          background: "rgba(255,255,255,0.04)",
                          padding: "3px 10px",
                          borderRadius: "6px",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        Resolved
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      margin: "0 0 6px",
                    }}
                  >
                    {alert.title}
                  </h3>

                  {/* Disease + countries */}
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "14px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#64748b",
                        background: "rgba(255,255,255,0.04)",
                        padding: "3px 10px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {alert.disease}
                    </span>
                    {alert.countries.map((country) => (
                      <span
                        key={country}
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#7dd3fc",
                          background: "rgba(56,189,248,0.08)",
                          padding: "3px 10px",
                          borderRadius: "6px",
                          border: "1px solid rgba(56,189,248,0.12)",
                        }}
                      >
                        {country}
                      </span>
                    ))}
                  </div>

                  {/* Summary */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#94a3b8",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {alert.summary}
                  </p>

                  {/* Source */}
                  {alert.source && (
                    <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ fontSize: "12px", color: "#475569" }}>
                        Source:{" "}
                        {alert.sourceUrl ? (
                          <a
                            href={alert.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#64748b", textDecoration: "underline", textUnderlineOffset: "2px" }}
                          >
                            {alert.source}
                          </a>
                        ) : (
                          alert.source
                        )}
                      </span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
