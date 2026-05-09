// app/components/QuickRecommendations.tsx
//
// Renders a row of "scenario → recommendation" cards at the top of a guide
// article. Designed for high-information-density without overwhelming the
// reader: each card is one icon, one scenario tag, one recommendation, and
// (optionally) one fine-print clarification.
//
// Layout: responsive grid that fits 6 cards across on desktop, collapses
// to 3 on tablet and 2 on mobile via auto-fit / minmax.
//
// Usage:
//   <QuickRecommendations cards={[
//     { icon: "⏱️", scenario: "Short trips", recommendation: "Malarone",
//       detail: "atovaquone/proguanil" },
//     ...
//   ]} />

"use client";

import type { QuickRecCard } from "../lib/guidesData";

type Props = {
  cards: QuickRecCard[];
  /** Optional override for the eyebrow label. Default: "Quick recommendation" */
  label?: string;
};

export default function QuickRecommendations({
  cards,
  label = "Quick recommendation",
}: Props) {
  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "16px",
        background: "rgba(56,189,248,0.04)",
        border: "1px solid rgba(56,189,248,0.12)",
        marginBottom: "40px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#7dd3fc",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "20px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "10px",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              padding: "16px 14px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
              }}
            >
              {card.icon}
            </div>

            <div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "4px",
                }}
              >
                {card.scenario}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#f1f5f9",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {card.recommendation}
              </div>
              {card.detail && (
                <div
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginTop: "3px",
                    lineHeight: 1.4,
                  }}
                >
                  {card.detail}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
