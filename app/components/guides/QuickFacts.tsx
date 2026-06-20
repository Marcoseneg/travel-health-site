// app/components/guides/QuickFacts.tsx
//
// "Quick facts" reference box rendered at the top of an article body.
// Used for at-a-glance structured data the reader might want to find
// quickly without scrolling — risk areas, dosing schedule, cost range,
// key contraindications.
//
// Visual treatment uses the same amber accent as the "Featured guide"
// badge on the listing carousel, signalling "this is reference data,
// not narrative". Renders as a 1-3 column responsive grid depending on
// available width.
//
// Suppressed entirely when the article has no `quickFacts` data.

import type { QuickFact } from "../../lib/guides/types";

type Props = {
  facts: QuickFact[];
};

export default function QuickFacts({ facts }: Props) {
  if (!facts || facts.length === 0) return null;

  return (
    <div
      style={{
        padding: "24px 28px",
        borderRadius: "var(--c-radius-md)",
        background: "var(--c-warning-soft)",
        border: "1px solid var(--c-warning-border)",
        marginBottom: "32px",
      }}
    >
      <div
        className="t-micro"
        style={{
          color: "var(--c-warning)",
          marginBottom: "18px",
        }}
      >
        Quick facts
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px 28px",
        }}
      >
        {facts.map((fact, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                flexShrink: 0,
                marginTop: "1px",
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              {fact.icon}
            </span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--c-text-2)",
                  marginBottom: "2px",
                  fontWeight: 500,
                  letterSpacing: "-0.005em",
                }}
              >
                {fact.label}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "var(--c-text)",
                  fontWeight: 600,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                }}
              >
                {fact.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
