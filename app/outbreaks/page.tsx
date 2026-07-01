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
import { isHidden } from "@/app/lib/outbreakCuration";
import CopyId from "@/app/components/CopyId";

export const revalidate = 21600; // 6 hours

export const metadata = {
  title: "Outbreak monitor — TravelMed",
  description:
    "Real-time aggregated outbreak alerts from ECDC, WHO, and CDC. Updated every 6 hours.",
};

const sourceMap: Record<string, OutbreakSource> = Object.fromEntries(
  OUTBREAK_SOURCES.map((s) => [s.id, s])
);

type Props = { searchParams: Promise<{ curate?: string }> };

export default async function OutbreaksPage({ searchParams }: Props) {
  const { curate } = await searchParams;
  const curator = curate === "1"; // ?curate=1 → show ids + hidden alerts

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
  // Normal view drops curated-hidden alerts; curator view keeps them (dimmed).
  const visible = curator ? sorted : sorted.filter((a) => !isHidden(a.id));
  const hiddenCount = sorted.filter((a) => isHidden(a.id)).length;

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <header style={{ marginBottom: "48px" }}>
          <p className="t-label" style={kickerStyle}>Live alerts</p>
          <h1 className="t-display" style={titleStyle}>Outbreak monitor</h1>
          <p className="t-body" style={subtitleStyle}>
            Aggregated from ECDC, WHO, and CDC. Refreshed every 6 hours.
          </p>
        </header>

        {curator && (
          <div style={curatorBannerStyle}>
            <strong style={{ color: "var(--c-text)" }}>Curator view.</strong>{" "}
            Each alert shows its <code>id</code> — copy it and add{" "}
            <code>{'{ "<id>": { "hidden": true } }'}</code> to{" "}
            <code>data/outbreak-overrides.json</code> to hide it (e.g. a duplicate).
            {hiddenCount > 0 && ` ${hiddenCount} alert${hiddenCount === 1 ? "" : "s"} currently hidden (shown dimmed below).`}
          </div>
        )}

        <div style={legendStyle}>
          {OUTBREAK_SOURCES.map((s) => (
            <span key={s.id} className="t-micro" style={{ ...legendItemStyle, letterSpacing: "normal", textTransform: "none", fontWeight: 500 }}>
              <SourceDot sourceId={s.id} />
              {s.shortName}
            </span>
          ))}
        </div>

        {sorted.length === 0 ? (
          <p className="t-body" style={{ color: "var(--c-text-3)" }}>
            No alerts available. Check back soon.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {visible.map((alert) => (
              <AlertCard key={alert.id} alert={alert} curator={curator} hidden={isHidden(alert.id)} />
            ))}
          </div>
        )}

        <footer className="t-label" style={{ ...footerStyle, fontWeight: 400, letterSpacing: "normal" }}>
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

function AlertCard({ alert, curator = false, hidden = false }: { alert: OutbreakAlert; curator?: boolean; hidden?: boolean }) {
  const source = sourceMap[alert.sourceId];
  const date = new Date(alert.publishedAt);
  const dateLabel = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article style={{ ...cardStyle, ...(hidden ? { opacity: 0.5, borderStyle: "dashed" } : {}) }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "8px" }}>
        {source && (
          <span className="t-micro" style={sourceBadgeStyle}>
            <SourceDot sourceId={source.id} />
            {source.shortName}
          </span>
        )}
        <span className="t-micro" style={{ ...dateStyle, letterSpacing: "normal", textTransform: "none", fontWeight: 400 }}>{dateLabel}</span>
        {hidden && (
          <span className="t-micro" style={{ padding: "2px 8px", borderRadius: "999px", background: "var(--c-danger-soft)", color: "var(--c-danger)", border: "1px solid var(--c-danger-border)", letterSpacing: "normal" }}>Hidden</span>
        )}
        {curator && <span style={{ marginLeft: "auto" }}><CopyId id={alert.id} /></span>}
      </div>

      <a href={alert.url} target="_blank" rel="noopener noreferrer" className="t-h3" style={titleLinkStyle}>
        {alert.title}
        <ExternalArrow />
      </a>

      {alert.summary && <p className="t-body" style={summaryStyle}>{alert.summary}</p>}

      {alert.countries && alert.countries.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "10px" }}>
          {alert.countries.map((slug) => (
            <Link
              key={slug}
              href={`/country/${slug}`}
              className="t-micro"
              style={{
                color: "var(--c-text-2)",
                textDecoration: "none",
                padding: "3px 10px",
                borderRadius: "999px",
                background: "var(--c-surface-2)",
                border: "1px solid var(--c-border)",
                letterSpacing: "normal",
                textTransform: "none",
                fontWeight: 500,
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

const curatorBannerStyle: React.CSSProperties = {
  padding: "14px 18px",
  marginBottom: "24px",
  borderRadius: "var(--c-radius-md)",
  background: "var(--c-accent-soft)",
  border: "1px solid var(--c-accent-border)",
  color: "var(--c-text-2)",
  fontSize: "13px",
  lineHeight: 1.6,
};

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  padding: "60px 24px 80px",
  background: "var(--c-bg)",
  color: "var(--c-text)",
  fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
};
const containerStyle: React.CSSProperties = { maxWidth: "880px", margin: "0 auto" };
const kickerStyle: React.CSSProperties = {
  color: "var(--c-accent)",
  margin: "0 0 12px",
};
const titleStyle: React.CSSProperties = {
  color: "var(--c-text)",
  margin: "0 0 14px",
};
const subtitleStyle: React.CSSProperties = {
  color: "var(--c-text-2)",
  margin: 0,
};
const legendStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px 16px",
  marginBottom: "32px",
  paddingBottom: "20px",
  borderBottom: "1px solid var(--c-border)",
};
const legendItemStyle: React.CSSProperties = {
  color: "var(--c-text-2)",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
};
const cardStyle: React.CSSProperties = {
  padding: "18px 22px",
  borderRadius: "var(--c-radius-md)",
  border: "1px solid var(--c-border)",
  background: "var(--c-surface)",
};
const sourceBadgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  color: "var(--c-text-2)",
  padding: "3px 10px",
  borderRadius: "999px",
  background: "var(--c-surface-2)",
  border: "1px solid var(--c-border)",
};
const dateStyle: React.CSSProperties = { color: "var(--c-text-3)" };
const titleLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "baseline",
  gap: "4px",
  color: "var(--c-accent)",
  textDecoration: "none",
};
const summaryStyle: React.CSSProperties = {
  marginTop: "8px",
  marginBottom: 0,
  color: "var(--c-text-2)",
};
const footerStyle: React.CSSProperties = {
  marginTop: "60px",
  paddingTop: "24px",
  borderTop: "1px solid var(--c-border)",
  color: "var(--c-text-3)",
  lineHeight: 1.6,
};
const footerLinkStyle: React.CSSProperties = {
  color: "var(--c-accent)",
  textDecoration: "underline",
  textDecorationColor: "var(--c-accent-border)",
  textUnderlineOffset: "2px",
};
