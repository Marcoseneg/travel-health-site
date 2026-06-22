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

// Generic alert-triangle glyph — one icon serves all severities; the chip
// colour (driven by the severity tone) carries the meaning.
function AlertIcon({ color }: { color: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        flexShrink: 0,
        borderRadius: "var(--c-radius-sm)",
        background: "var(--c-surface)",
        border: `1px solid ${color}`,
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </span>
  );
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
        gap: "10px",
        borderRadius: "var(--c-radius-md)",
        border: `1px solid ${tone.border}`,
        background: tone.soft,
        padding: "16px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <AlertIcon color={tone.color} />

      <div style={{ minWidth: 0 }}>
        <p
          className="t-h3"
          style={{ margin: "0 0 2px", color: "var(--c-text)", fontWeight: 700 }}
        >
          {alert.disease}
        </p>
        {location && (
          <p
            className="t-label"
            style={{ margin: 0, color: "var(--c-text-2)", fontSize: "12px" }}
          >
            {location}
          </p>
        )}
      </div>

      <p
        style={{
          margin: 0,
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
