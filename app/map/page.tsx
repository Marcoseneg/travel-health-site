"use client";

import GlobeMap from "../components/GlobeMap";

export default function MapPage() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 64px)",
        background: "#030712",
        color: "#f1f5f9",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Starfield */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 40%, rgba(255,255,255,0.2) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 25% 35%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 75% 45%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(0.5px 0.5px at 85% 25%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(0.5px 0.5px at 45% 55%, rgba(255,255,255,0.2) 0%, transparent 100%)
          `,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              marginBottom: "8px",
            }}
          >
            Health Risk Map
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "#64748b",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Explore global disease distribution. Toggle filters to visualize
            risk zones. Rotate and zoom the globe to explore.
          </p>
        </div>

        {/* Globe */}
        <GlobeMap />
      </div>
    </main>
  );
}
