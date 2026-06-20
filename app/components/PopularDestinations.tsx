import Link from "next/link";
import { SUPPORTED_COUNTRIES, type CountrySlug } from "../lib/travelData";

// ── Featured destinations ──────────────────────────────────────────────────
// Three large "Netflix-style" cards. Background tints are photo-ready
// placeholders — these will be swapped for real destination imagery later.
// `tint`/`tintDark` drive a subtle 160° gradient; `risk` is a short
// human-readable risk tagline shown under the country name.
type Featured = {
  slug: CountrySlug;
  tint: string;
  tintDark: string;
  risk: string;
};

const FEATURED: Featured[] = [
  { slug: "thailand", tint: "#4f93a2", tintDark: "#356773", risk: "Dengue, limited malaria" },
  { slug: "tanzania", tint: "#a3865a", tintDark: "#725d3d", risk: "Yellow fever, malaria" },
  { slug: "peru", tint: "#5a7f93", tintDark: "#3d5867", risk: "Altitude, Amazon yellow fever" },
];

export default function PopularDestinations() {
  return (
    <section style={{ background: "var(--c-bg)", padding: "64px 24px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* ── Header row ──────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <h2 className="t-h2" style={{ margin: 0, color: "var(--c-text)" }}>
            Popular destinations
          </h2>
          <Link
            href="/countries"
            className="t-label"
            style={{
              color: "var(--c-accent-strong)",
              textDecoration: "none",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Browse all countries →
          </Link>
        </div>

        {/* ── Card grid ───────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
          }}
        >
          {FEATURED.map((dest) => {
            const c = SUPPORTED_COUNTRIES[dest.slug];
            if (!c) return null;
            return (
              <Link
                key={dest.slug}
                href={`/country/${dest.slug}`}
                className="destination-card"
                style={{
                  position: "relative",
                  display: "block",
                  height: "180px",
                  borderRadius: "var(--c-radius-lg)",
                  overflow: "hidden",
                  textDecoration: "none",
                  background: `linear-gradient(160deg, ${dest.tint}, ${dest.tintDark})`,
                }}
              >
                {/* Bottom veil — keeps the label legible over any future photo */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(2,12,24,0.66))",
                  }}
                />
                {/* Foreground caption */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2,
                    padding: "18px 18px 16px",
                    color: "#fff",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: "17px", letterSpacing: "-0.01em" }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.9, marginTop: "2px" }}>
                    {c.region} · {dest.risk}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Placeholder note ────────────────────────────────────── */}
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            margin: "12px 0 0",
            fontSize: "11px",
            color: "var(--c-text-3)",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          Photo placeholders — real destination images added soon.
        </p>
      </div>
    </section>
  );
}
