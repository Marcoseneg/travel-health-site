// app/outbreaks/page.tsx
//
// Public outbreak feed aggregating authoritative health surveillance sources
// (ECDC, WHO, CDC). Renders chronologically with source badges.
//
// Architecture: Server Component with ISR (Incremental Static Regeneration).
// On each request that hits a stale cache, Next.js triggers a server-side
// re-fetch of all source feeds in parallel. The result is cached for 6 hours.
//
// No cron job, no database. Vercel's edge cache + Next.js ISR does the work.
// If a source feed is down, that source's alerts are skipped — others render.
//
// The seed file at /data/outbreaks.json is used as a fallback when ALL feeds
// fail (e.g. first-load on a fresh deploy before any cache is warm).

import Link from "next/link";
import seedData from "@/data/outbreaks.json";
import { OUTBREAK_SOURCES, type OutbreakAlert, type OutbreakSource } from "@/app/lib/outbreakSources";
import { fetchAllOutbreaks } from "@/app/lib/outbreakFetcher";
import { SUPPORTED_COUNTRIES } from "@/app/lib/travelData";

export const revalidate = 21600; // 6 hours

export const metadata = {
  title: "Outbreak monitor — TravelMed",
  description:
    "Real-time aggregated outbreak alerts from ECDC, WHO, and CDC. Updated every 6 hours.",
};

const sourceMap: Record<string, OutbreakSource> = Object.fromEntries(
  OUTBREAK_SOURCES.map((s) => [s.id, s])
);

export default async function OutbreaksPage() {
  // Try to fetch live alerts; fall back to seed data if fetching fails.
  let alerts: OutbreakAlert[] = [];
  let usingFallback = false;
  try {
    alerts = await fetchAllOutbreaks();
    if (alerts.length === 0) {
      alerts = seedData as OutbreakAlert[];
      usingFallback = true;
    }
  } catch {
    alerts = seedData as OutbreakAlert[];
    usingFallback = true;
  }

  const sorted = [...alerts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <header style={{ marginBottom: "48px" }}>
          <p style={kickerStyle}>Live alerts</p>
          <h1 style={titleStyle}>Outbreak monitor</h1>
          <p style={subtitleStyle}>
            Aggregated from ECDC, WHO, and CDC. Refreshed every 6 hours.
          </p>
        </header>

        <div style={legendStyle}>
          {OUTBREAK_SOURCES.map((s) => (
            <span key={s.id} style={legendItemStyle}>
              <SourceDot sourceId={s.id} />
              {s.shortName}
            </span>
          ))}
        </div>

        {sorted.length === 0 ? (
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            No alerts available. Check back soon.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {sorted.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        )}

        <footer style={footerStyle}>
          <p style={{ margin: "0 0 8px" }}>
            {usingFallback
              ? "Showing cached fallback data. Live feeds will resume on next refresh."
              : `Last refreshed: ${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}.`}
          </p>
          <p style={{ margin: 0 }}>
            Sources:{" "}
            {OUTBREAK_SOURCES.map((s, i) => (
              <span key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>
                  {s.name}
                </a>
                {i < OUTBREAK_SOURCES.length - 1 ? " · " : ""}
              </span>
            ))}
            . This feed is for general information only and does not replace
            destination-specific medical advice.
          </p>
        </footer>
      </div>
    </main>
  );
}

function AlertCard({ alert }: { alert: OutbreakAlert }) {
  const source = sourceMap[alert.sourceId];
  const date = new Date(alert.publishedAt);
  const dateLabel = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article style={cardStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "8px" }}>
        {source && (
          <span style={sourceBadgeStyle}>
            <SourceDot sourceId={source.id} />
            {source.shortName}
          </span>
        )}
        <span style={dateStyle}>{dateLabel}</span>
      </div>

      <a href={alert.url} target="_blank" rel="noopener noreferrer" style={titleLinkStyle}>
        {alert.title}
        <ExternalArrow />
      </a>

      {alert.summary && <p style={summaryStyle}>{alert.summary}</p>}

      {alert.countries && alert.countries.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "10px" }}>
          {alert.countries.map((slug) => (
            <Link
              key={slug}
              href={`/country/${slug}`}
              style={{
                fontSize: "11.5px",
                color: "#94a3b8",
                textDecoration: "none",
                padding: "2px 9px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {countryLabel(slug)}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

function countryLabel(slug: string): string {
  // Convert slug to label using the SUPPORTED_COUNTRIES registry; fallback
  // to a humanized version of the slug if not found.
  const meta = SUPPORTED_COUNTRIES[slug as keyof typeof SUPPORTED_COUNTRIES];
  if (meta) return (meta as { label: string }).label;
  return slug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
}

function SourceDot({ sourceId }: { sourceId: string }) {
  const color =
    sourceId.startsWith("ecdc")
      ? "#38bdf8"
      : sourceId === "who-don"
        ? "#a78bfa"
        : sourceId === "cdc-travel"
          ? "#fbbf24"
          : "#64748b";
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
      }}
    />
  );
}

function ExternalArrow() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0, marginLeft: "4px" }}
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: "60px 24px 80px",
  color: "#e2e8f0",
};
const containerStyle: React.CSSProperties = { maxWidth: "880px", margin: "0 auto" };
const kickerStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#94a3b8",
  margin: "0 0 12px",
};
const titleStyle: React.CSSProperties = {
  fontSize: "44px",
  fontWeight: 700,
  letterSpacing: "-0.025em",
  color: "#f8fafc",
  margin: "0 0 14px",
  lineHeight: 1.05,
};
const subtitleStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#94a3b8",
  margin: 0,
  lineHeight: 1.55,
};
const legendStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px 16px",
  marginBottom: "32px",
  paddingBottom: "20px",
  borderBottom: "1px solid rgba(255,255,255,0.04)",
};
const legendItemStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
};
const cardStyle: React.CSSProperties = {
  padding: "18px 22px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.02)",
};
const sourceBadgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "10.5px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#cbd5e1",
  padding: "3px 10px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
};
const dateStyle: React.CSSProperties = { fontSize: "12.5px", color: "#64748b" };
const titleLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "baseline",
  gap: "4px",
  fontSize: "16px",
  fontWeight: 600,
  color: "#7dd3fc",
  textDecoration: "none",
  letterSpacing: "-0.01em",
  lineHeight: 1.4,
};
const summaryStyle: React.CSSProperties = {
  marginTop: "8px",
  marginBottom: 0,
  fontSize: "13.5px",
  color: "#cbd5e1",
  lineHeight: 1.6,
};
const footerStyle: React.CSSProperties = {
  marginTop: "60px",
  paddingTop: "24px",
  borderTop: "1px solid rgba(255,255,255,0.04)",
  fontSize: "12px",
  color: "#64748b",
  lineHeight: 1.6,
};
const footerLinkStyle: React.CSSProperties = {
  color: "#94a3b8",
  textDecoration: "underline",
  textDecorationColor: "rgba(148, 163, 184, 0.25)",
  textUnderlineOffset: "2px",
};
