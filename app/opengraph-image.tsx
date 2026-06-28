import { ImageResponse } from "next/og";

// Default social share image for the whole site (inherited by all routes that
// don't define their own). 1200×630 is the standard OG/Twitter card size.

export const alt = "TravelMed — physician-built travel health for any destination";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The "Living Globe" brand mark (globe + pulse line), same as the favicon.
const MARK =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">` +
  `<defs><linearGradient id="g" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">` +
  `<stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#14b8a6"/></linearGradient></defs>` +
  `<circle cx="20" cy="20" r="16" fill="url(#g)"/>` +
  `<ellipse cx="20" cy="20" rx="16" ry="6.5" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.5"/>` +
  `<path d="M5 20.5H15L17.5 14L21 27L23.5 20.5H35" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const markDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(MARK)}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0b1220 0%, #08191e 60%, #0a2a30 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img src={markDataUri} width={64} height={64} alt="" />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#ffffff" }}>Travel</span>
            <span style={{ color: "#38bdf8" }}>Med</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              color: "#f1f5f9",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Travel health advice for any destination.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#94a3b8", lineHeight: 1.4 }}>
            Physician-built vaccine, malaria, and outbreak guidance for international travelers.
          </div>
        </div>

        {/* Footer / trust row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 24, color: "#7dd3fc", fontWeight: 600 }}>
          <span>CDC &amp; WHO aligned</span>
          <span style={{ color: "#334155" }}>•</span>
          <span>Physician-reviewed</span>
          <span style={{ color: "#334155" }}>•</span>
          <span>travelmed.ch</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
