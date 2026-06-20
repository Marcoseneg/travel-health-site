// app/components/guides/PhysicianTake.tsx
//
// Prominent pull-quote box rendered near the top of an article body
// when the article specifies a `physicianTake` field. Used for the
// editor's own opinion or high-level summary of the article — the
// "here's how I'd put it to a colleague" line.
//
// The visible label reads "Quick take" rather than "Physician take" to
// avoid the self-authoritative tone of quoting oneself by name. No
// attribution line — the article byline already credits the author.
// The data field on Article stays named `physicianTake` for code
// continuity; only the user-facing label changed.

type Props = {
  quote: string;
};

export default function PhysicianTake({ quote }: Props) {
  return (
    <div
      style={{
        padding: "28px 32px 26px",
        borderRadius: "var(--c-radius-md)",
        background: "var(--c-accent-soft)",
        border: "1px solid var(--c-accent-border)",
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
          color: "var(--c-accent-border)",
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
        className="t-micro"
        style={{
          color: "var(--c-accent)",
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
          color: "var(--c-text)",
          lineHeight: 1.65,
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0,
          marginLeft: "44px",
          letterSpacing: "-0.005em",
        }}
      >
        {quote}
      </p>
    </div>
  );
}
