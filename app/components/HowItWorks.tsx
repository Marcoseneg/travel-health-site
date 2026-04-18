"use client";

const STEPS = [
  {
    step: "01",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Pick destinations",
    desc: "Search or click the interactive globe to build your multi-country itinerary.",
  },
  {
    step: "02",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 2 4 4" />
        <path d="m17 7 3-3" />
        <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
        <path d="m9 11 4 4" />
        <path d="m5 19-3 3" />
        <path d="m14 4 6 6" />
      </svg>
    ),
    title: "Get your health brief",
    desc: "Receive tailored vaccine schedules, malaria prophylaxis, and prevention checklists.",
  },
  {
    step: "03",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="8" height="5" x="2" y="2" rx="1" />
        <path d="M6 12h12M6 16h12M6 20h12M2 12h.01M2 16h.01M2 20h.01" />
      </svg>
    ),
    title: "Prepare & go",
    desc: "Download a printable brief to bring to your travel clinic appointment.",
  },
];

export default function HowItWorks() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "#0a101f",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              marginBottom: "16px",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-dim)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            How it works
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Your health brief in 3 steps
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-dim)",
              marginTop: "12px",
              maxWidth: "560px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
            }}
          >
            Get physician-level travel health advice in under a minute — no
            appointment needed.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="card-hover"
              style={{
                padding: "32px",
                borderRadius: "20px",
                background: "#030712",
                border: "1px solid var(--border)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "20px",
                  fontSize: "64px",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.025)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {item.step}
              </div>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--accent-glow)",
                  color: "var(--accent)",
                  marginBottom: "20px",
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                  margin: "0 0 8px",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-dim)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
