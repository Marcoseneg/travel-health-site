import Link from "next/link";
import { outbreakAlerts, type OutbreakAlert, type AlertSeverity } from "../lib/outbreakData";

// ── Severity → semantic token mapping ──────────────────────────────────────
// warning  → danger lane (red)
// advisory → warning lane (amber)
// watch    → info lane (cyan)
type SeverityTone = { color: string; soft: string; border: string };

const SEVERITY_TONES: Record<AlertSeverity, SeverityTone> = {
  warning: {
    color: "var(--c-danger)",
    soft: "var(--c-danger-soft)",
    border: "var(--c-danger-border)",
  },
  advisory: {
    color: "var(--c-warning)",
    soft: "var(--c-warning-soft)",
    border: "var(--c-warning-border)",
  },
  watch: {
    color: "var(--c-info)",
    soft: "var(--c-info-soft)",
    border: "var(--c-info-border)",
  },
};

// Disease-specific glyph so each alert reads at a glance (mosquito-borne →
// bug, water-borne → droplet, vaccine/entry → shield, viral/respiratory →
// virus, else alert triangle). Stroke colour carries the severity.
function DiseaseGlyph({ disease, color }: { disease: string; color: string }) {
  const d = disease.toLowerCase();
  const svg = (children: React.ReactNode) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
  if (/dengue|malaria|chikungunya|zika|west nile/.test(d))
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
  if (/measles|flu|influenza|covid|mpox|ebola|marburg|respirat|polio/.test(d))
    return svg(<>
      <circle cx="12" cy="12" r="4.3" />
      <path d="M12 3v2.6M12 18.4V21M3 12h2.6M18.4 12H21M5.6 5.6l1.9 1.9M16.5 16.5l1.9 1.9M18.4 5.6l-1.9 1.9M7.5 16.5l-1.9 1.9" />
    </>);
  return svg(<>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </>);
}

function AlertCard({ alert }: { alert: OutbreakAlert }) {
  const tone = SEVERITY_TONES[alert.severity];
  const location = alert.countries.join(", ");

  return (
    <Link
      href="/outbreaks"
      className="card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        minHeight: "196px",
        borderRadius: "var(--c-radius-md)",
        border: `1px solid ${tone.border}`,
        background: tone.soft,
        padding: "18px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {/* Bigger circular icon chip */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          flexShrink: 0,
          borderRadius: "50%",
          background: "var(--c-surface)",
          border: `1px solid ${tone.border}`,
        }}
      >
        <DiseaseGlyph disease={alert.disease} color={tone.color} />
      </span>

      <div style={{ minWidth: 0 }}>
        <p className="t-h3" style={{ margin: "0 0 2px", color: "var(--c-text)", fontWeight: 700 }}>
          {alert.disease}
        </p>
        {location && (
          <p className="t-label" style={{ margin: 0, color: "var(--c-text-2)", fontSize: "12px" }}>
            {location}
          </p>
        )}
      </div>

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

      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 600, color: tone.color }}>
        View details
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export default function CurrentAlerts({ embedded = false }: { embedded?: boolean }) {
  const alerts = outbreakAlerts.slice(0, 4);
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
        <Link
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
        </Link>
      </div>

      {/* Responsive grid of the first 4 alerts */}
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
