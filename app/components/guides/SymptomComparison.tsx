// app/components/guides/SymptomComparison.tsx
//
// Side-by-side comparison cards used for medical articles where the
// mild-vs-severe distinction is editorially central (altitude sickness,
// dengue, traveler's diarrhea, etc).
//
// Rendered inside an article body when the article specifies a
// `symptomComparison` field. The position within the section is
// controlled by an <!-- SYMPTOM_COMPARISON --> marker in the article's
// markdown content.
//
// The component renders ONLY the two cards — not the section heading.
// The heading comes from the H2 line in markdown that precedes the
// marker, so auto-numbering, GuideTOC, and OnThisPageNav all stay
// consistent without special handling.

export type SymptomCard = {
  /** Main label, e.g., "Mild (acute mountain sickness)" */
  title: string;
  /** Short directive under the title, e.g., "Stay at current altitude" */
  action: string;
  /** Symptoms displayed as bullets */
  bullets: string[];
  /** Optional small footer note shown at the bottom in muted style */
  footer?: string;
};

export type SymptomComparisonData = {
  /** Green-tinted card content — for mild / common / self-limiting */
  mild: SymptomCard;
  /** Red-tinted card content — for severe / dangerous / requires action */
  severe: SymptomCard;
};

type Props = SymptomComparisonData;

// Tokens
const TEXT_BODY = "#cbd5e1";
const TEXT_MUTED = "#94a3b8";

// Mild (green)
const MILD_ACCENT = "#4ade80";
const MILD_TINT = "rgba(74, 222, 128, 0.05)";
const MILD_BORDER = "rgba(74, 222, 128, 0.22)";
const MILD_DOT = "#22c55e";

// Severe (red)
const SEVERE_ACCENT = "#f87171";
const SEVERE_TINT = "rgba(248, 113, 113, 0.05)";
const SEVERE_BORDER = "rgba(248, 113, 113, 0.22)";
const SEVERE_DOT = "#ef4444";

type CardProps = {
  data: SymptomCard;
  accent: string;
  tint: string;
  border: string;
  dot: string;
};

function Card({ data, accent, tint, border, dot }: CardProps) {
  return (
    <div
      style={{
        padding: "22px 22px 18px",
        borderRadius: "14px",
        background: tint,
        border: `1px solid ${border}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header: colored dot + title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "6px",
        }}
      >
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: dot,
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
        <h3
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: 700,
            color: accent,
            letterSpacing: "-0.005em",
          }}
        >
          {data.title}
        </h3>
      </div>

      <p
        style={{
          margin: "0 0 14px",
          fontSize: "13px",
          color: TEXT_MUTED,
          fontStyle: "italic",
          lineHeight: 1.45,
        }}
      >
        {data.action}
      </p>

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flexGrow: 1,
        }}
      >
        {data.bullets.map((bullet, i) => (
          <li
            key={i}
            style={{
              fontSize: "14px",
              color: TEXT_BODY,
              lineHeight: 1.5,
              paddingLeft: "16px",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                color: accent,
                fontWeight: 700,
              }}
              aria-hidden="true"
            >
              •
            </span>
            {bullet}
          </li>
        ))}
      </ul>

      {data.footer && (
        <div
          style={{
            marginTop: "16px",
            paddingTop: "12px",
            borderTop: `1px solid ${border}`,
            fontSize: "12px",
            color: TEXT_MUTED,
            fontStyle: "italic",
            lineHeight: 1.5,
          }}
        >
          {data.footer}
        </div>
      )}
    </div>
  );
}

export default function SymptomComparison({ mild, severe }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "16px",
        margin: "20px 0 24px",
      }}
    >
      <Card
        data={mild}
        accent={MILD_ACCENT}
        tint={MILD_TINT}
        border={MILD_BORDER}
        dot={MILD_DOT}
      />
      <Card
        data={severe}
        accent={SEVERE_ACCENT}
        tint={SEVERE_TINT}
        border={SEVERE_BORDER}
        dot={SEVERE_DOT}
      />
    </div>
  );
}
