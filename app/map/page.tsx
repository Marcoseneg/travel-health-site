"use client";

import GlobeMap from "../components/GlobeMap";

export default function MapPage() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 64px)",
        background: "var(--c-bg)",
        color: "var(--c-text)",
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
          <h1 className="t-display" style={{ margin: "0 0 8px", color: "var(--c-text)" }}>
            Health Risk Map
          </h1>
          <p
            className="t-body"
            style={{
              color: "var(--c-text-2)",
              maxWidth: "500px",
              margin: "0 auto",
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
