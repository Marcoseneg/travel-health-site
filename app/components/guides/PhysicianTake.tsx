// app/components/guides/PhysicianTake.tsx
//
// Prominent pull-quote box rendered near the top of an article body
// when the article specifies a `physicianTake` field. Used for the
// editor's own opinion or high-level summary of the article — the
// "here's how I'd put it to a colleague" line.
//
// Visual treatment uses the site's cyan accent. A large decorative
// quote mark in the corner signals "this is editorial commentary,
// not reference data" (which is the role of the amber-accented Quick
// Facts box).

type Props = {
  quote: string;
  /** Defaults to "Dr. Marco Seneghini" — override only for guest writers. */
  author?: string;
};

export default function PhysicianTake({
  quote,
  author = "Dr. Marco Seneghini",
}: Props) {
  return (
    <div
      style={{
        padding: "28px 32px 26px",
        borderRadius: "16px",
        background: "rgba(125,211,252,0.04)",
        border: "1px solid rgba(125,211,252,0.18)",
        marginBottom: "40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative oversized quote glyph in top-left corner */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "20px",
          fontSize: "72px",
          color: "rgba(125,211,252,0.16)",
          fontFamily: "Georgia, 'Times New Roman', serif",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        “
      </div>

      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#7dd3fc",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: "14px",
          marginLeft: "44px",
        }}
      >
        Quick take
      </div>

      <p
        style={{
          fontSize: "16px",
          color: "#f1f5f9",
          lineHeight: 1.65,
          margin: "0 0 16px",
          marginLeft: "44px",
          letterSpacing: "-0.005em",
        }}
      >
        {quote}
      </p>

      <p
        style={{
          fontSize: "13px",
          color: "#94a3b8",
          margin: 0,
          marginLeft: "44px",
          fontStyle: "italic",
        }}
      >
        — {author}
      </p>
    </div>
  );
}
