import seedData from "@/data/outbreaks.json";
import { OUTBREAK_SOURCES, type OutbreakAlert } from "../lib/outbreakSources";

// ── Homepage "current travel alerts" teaser ────────────────────────────────
// Shows the 4 most recent real outbreak notices from the same authoritative
// feeds that power /outbreaks (ECDC, WHO, CDC). Data comes from the committed
// seed at /data/outbreaks.json so every card links to a real source notice
// with a real publication date — no invented statistics. The live /outbreaks
// page refreshes these from source every 6 hours; this teaser mirrors the
// seed snapshot and always deep-links to the original notice.

const SOURCE_BY_ID = Object.fromEntries(
  OUTBREAK_SOURCES.map((s) => [s.id, s])
);

// Source → accent colour, matching the dot legend on /outbreaks.
function sourceColor(sourceId: string): string {
  if (sourceId.startsWith("ecdc")) return "#38bdf8";
  if (sourceId === "who-don") return "#a78bfa";
  if (sourceId === "cdc-travel") return "#fbbf24";
  return "var(--c-accent)";
}

// Disease-specific glyph derived from the notice title so each alert reads at
// a glance (mosquito-borne → bug, water-borne → droplet, vaccine/entry →
// shield, viral/respiratory → virus, else alert triangle).
function DiseaseGlyph({ title, color }: { title: string; color: string }) {
  const d = title.toLowerCase();
  const svg = (children: React.ReactNode) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
  if (/dengue|malaria|chikungunya|zika|west nile|oropouche/.test(d))
    return svg(<>
      <path d="M9 9V8a3 3 0 0 1 6 0v1" />
      <path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1-10 0v-3a6 6 0 0 1 1-3" />
      <path d="M3 13h4M17 13h4M12 20v-7M4.5 18.5 8 16.5M19.5 18.5 16 16.5M4.5 8.5 8 10.5M19.5 8.5 16 10.5" />
    </>);
  if (/cholera|typhoid|hepatitis|diarrh|giardia|leptospi|schisto/.test(d))
    return svg(<path d="M12 3.5s6 6.6 6 10.5a6 6 0 0 1-12 0c0-3.9 6-10.5 6-10.5z" />);
  if (/yellow fever|vaccine|meningo|polio|rabies|entry|certificate/.test(d))
    return svg(<>
      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 8.6-4-1-7-4.1-7-8.6V6z" />
      <path d="M12 9.2v5M9.5 11.7h5" />
    </>);
  if (/measles|flu|influenza|covid|mpox|ebola|marburg|respirat|mers|coronavirus/.test(d))
    return svg(<>
      <circle cx="12" cy="12" r="4.3" />
      <path d="M12 3v2.6M12 18.4V21M3 12h2.6M18.4 12H21M5.6 5.6l1.9 1.9M16.5 16.5l1.9 1.9M18.4 5.6l-1.9 1.9M7.5 16.5l-1.9 1.9" />
    </>);
  return svg(<>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </>);
}

function formatDate(iso: string): string {
  // UTC-pinned so the server render and client hydration agree.
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function AlertCard({ alert }: { alert: OutbreakAlert }) {
  const source = SOURCE_BY_ID[alert.sourceId];
  const accent = sourceColor(alert.sourceId);

  return (
    <a
      href={alert.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "9px",
        minHeight: "210px",
        height: "100%",
        borderRadius: "var(--c-radius-md)",
        border: "1px solid var(--c-border)",
        background: "var(--c-surface)",
        padding: "16px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {/* Icon chip + source badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            flexShrink: 0,
            borderRadius: "50%",
            background: "var(--c-surface-2)",
            border: "1px solid var(--c-border)",
          }}
        >
          <DiseaseGlyph title={alert.title} color={accent} />
        </span>
        {source && (
          <span
            className="t-micro"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              color: "var(--c-text-2)",
              letterSpacing: "normal",
              textTransform: "none",
              fontWeight: 600,
              padding: "3px 9px",
              borderRadius: "999px",
              background: "var(--c-surface-2)",
              border: "1px solid var(--c-border)",
            }}
          >
            <span aria-hidden style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, flexShrink: 0 }} />
            {source.shortName}
          </span>
        )}
      </div>

      <p
        className="t-h3"
        style={{
          margin: 0,
          color: "var(--c-text)",
          fontWeight: 700,
          fontSize: "15px",
          lineHeight: 1.3,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {alert.title}
      </p>

      {alert.summary && (
        <p
          style={{
            margin: 0,
            flex: 1,
            color: "var(--c-text-2)",
            fontSize: "12px",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {alert.summary}
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginTop: "auto" }}>
        <span className="t-micro" style={{ color: "var(--c-text-3)", letterSpacing: "normal", textTransform: "none", fontWeight: 400 }}>
          {formatDate(alert.publishedAt)}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 600, color: "var(--c-accent-strong)" }}>
          Read notice
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </span>
      </div>
    </a>
  );
}

export default function CurrentAlerts({ embedded = false }: { embedded?: boolean }) {
  const alerts = [...(seedData as OutbreakAlert[])]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);
  const Wrapper = embedded ? "div" : "section";

  return (
    <Wrapper
      style={
        embedded
          ? undefined
          : {
              maxWidth: "1320px",
              margin: "0 auto",
              padding: "56px 24px",
              background: "var(--c-bg)",
            }
      }
    >
      {/* Header row: title + view-all link */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <h2 className="t-h2" style={{ margin: 0, color: "var(--c-text)" }}>
          Current travel alerts
        </h2>
        <a
          href="/outbreaks"
          className="t-label"
          style={{
            color: "var(--c-accent-strong)",
            textDecoration: "none",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          View all outbreaks →
        </a>
      </div>

      {/* Responsive grid of the 4 most recent alerts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "10px",
        }}
      >
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </Wrapper>
  );
}
