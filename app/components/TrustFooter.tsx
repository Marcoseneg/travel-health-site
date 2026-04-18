"use client";

export function TrustBanner() {
  return (
    <section style={{ padding: "64px 24px" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          padding: "40px 48px",
          borderRadius: "20px",
          background: "#0a101f",
          border: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--accent-glow)",
            color: "var(--accent)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "12px",
            margin: "0 0 12px",
          }}
        >
          Evidence-based, physician-reviewed
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-dim)",
            lineHeight: 1.7,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          All recommendations are aligned with CDC, WHO, and ISTM guidelines.
          This site provides educational information — it does not replace a
          consultation with a travel medicine specialist. Always visit a travel
          clinic 4–6 weeks before departure.
        </p>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer
      style={{
        padding: "40px 24px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: "15px",
              letterSpacing: "-0.03em",
            }}
          >
            Travel<span style={{ color: "var(--accent)" }}>Med</span>
          </span>
          <span style={{ fontSize: "13px", color: "var(--text-dim)" }}>
            · Physician-built travel medicine
          </span>
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-dim)" }}>
          Not medical advice · Always consult a travel clinic
        </div>
      </div>
    </footer>
  );
}
