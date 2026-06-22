import Link from "next/link";
import Image from "next/image";
import { SUPPORTED_COUNTRIES, type CountrySlug } from "../lib/travelData";

// ── Featured destinations ──────────────────────────────────────────────────
// Three large "Netflix-style" cards backed by royalty-free photos (Unsplash
// License). `tint`/`tintDark` provide a gradient fallback that shows while the
// image loads; `risk` is a short human-readable risk tagline.
type Featured = {
  slug: CountrySlug;
  img: string;
  tint: string;
  tintDark: string;
  risk: string;
};

const FEATURED: Featured[] = [
  { slug: "thailand", img: "/images/destinations/thailand.jpg", tint: "#4f93a2", tintDark: "#356773", risk: "Dengue, limited malaria" },
  { slug: "tanzania", img: "/images/destinations/tanzania.jpg", tint: "#a3865a", tintDark: "#725d3d", risk: "Yellow fever, malaria" },
  { slug: "peru", img: "/images/destinations/peru.jpg", tint: "#5a7f93", tintDark: "#3d5867", risk: "Altitude, Amazon yellow fever" },
  { slug: "brazil", img: "/images/destinations/brazil.jpg", tint: "#3f6f86", tintDark: "#2a4a5a", risk: "Dengue, yellow fever (Amazon)" },
];

export default function PopularDestinations({ embedded = false }: { embedded?: boolean }) {
  const Wrapper = embedded ? "div" : "section";
  return (
    <Wrapper style={embedded ? undefined : { background: "var(--c-bg)", padding: "56px 24px" }}>
      <div style={embedded ? undefined : { maxWidth: "1320px", margin: "0 auto" }}>
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
                {/* Destination photo (cover) */}
                <Image
                  src={dest.img}
                  alt={`${c.label} — travel destination`}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                  style={{ objectFit: "cover", zIndex: 0 }}
                />
                {/* Bottom veil — keeps the label legible over the photo */}
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
      </div>
    </Wrapper>
  );
}
