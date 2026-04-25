"use client";

import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   TRUST BANNER
   Three credibility pillars + a concise disclaimer.
   ═══════════════════════════════════════════════════════════ */

const PILLARS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "CDC & WHO aligned",
    body: "Guidance mirrors CDC Yellow Book, WHO International Travel and Health, and ISTM standards. Updated as source recommendations change.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 2v2M15 2v2M5 4h14M6 4v4a6 6 0 0 0 12 0V4" />
        <circle cx="20" cy="14" r="2" />
        <path d="M12 10v5a5 5 0 0 1-5 5H6a3 3 0 0 1-3-3v-2" />
      </svg>
    ),
    title: "Physician-reviewed",
    body: "Briefs authored and clinically reviewed by board-certified travel medicine physicians, not AI summaries.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    ),
    title: "Continuously updated",
    body: "Outbreak alerts refreshed daily. Vaccine and prophylaxis guidance reviewed monthly against source guidelines.",
  },
];

export function TrustBanner() {
  return (
    <section style={{ padding: "80px 24px", position: "relative" }}>
      {/* Soft radial accent behind the pillar row */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(56,189,248,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              marginBottom: "16px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#64748b",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Why trust us
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Built on evidence,
            <br />
            reviewed by clinicians
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
            marginBottom: "28px",
          }}
        >
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              style={{
                padding: "24px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.035)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(56,189,248,0.08)",
                  color: "#38bdf8",
                  marginBottom: "16px",
                }}
              >
                {pillar.icon}
              </div>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  margin: "0 0 6px",
                  color: "#f1f5f9",
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#64748b",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: "12px",
            color: "#475569",
            textAlign: "center",
            lineHeight: 1.7,
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
          TravelMed provides educational information and does not replace
          consultation with a travel medicine specialist. Always visit a travel
          clinic 4–6 weeks before departure.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SITE FOOTER
   Proper multi-column footer with product/company/legal links,
   brand block, medical disclaimer, and bottom copyright row.
   ═══════════════════════════════════════════════════════════ */

const FOOTER_LINKS = {
  Product: [
    { label: "Countries", href: "/countries" },
    { label: "Diseases", href: "/diseases" },
    { label: "Guides", href: "/guides" },
    { label: "Outbreaks", href: "/outbreaks" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Our physicians", href: "/about#team" },
    { label: "Methodology", href: "/about#methodology" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Medical disclaimer", href: "/disclaimer" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const SOURCE_LINKS = [
  { label: "CDC Yellow Book", href: "https://wwwnc.cdc.gov/travel/yellowbook" },
  { label: "WHO ITH", href: "https://www.who.int/travel-advice" },
  { label: "ISTM", href: "https://www.istm.org/" },
];

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(3, 7, 18, 0.5)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "56px 24px 24px",
        }}
      >
        {/* ── Top grid: brand + link columns ──────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(220px, 1.4fr) repeat(4, 1fr)",
            gap: "40px",
            marginBottom: "40px",
          }}
          className="footer-grid"
        >
          {/* Brand block */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  boxShadow: "0 4px 16px rgba(56,189,248,0.3)",
                }}
              >
                ✈
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "17px",
                  letterSpacing: "-0.03em",
                  color: "#f1f5f9",
                }}
              >
                Travel<span style={{ color: "#38bdf8" }}>Med</span>
              </span>
            </Link>
            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                lineHeight: 1.65,
                margin: "0 0 18px",
                maxWidth: "280px",
              }}
            >
              Physician-built travel medicine — evidence-based vaccine,
              malaria, and prevention guidance for international travelers.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 11px",
                borderRadius: "999px",
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.18)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#9edcff",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#38bdf8",
                  boxShadow: "0 0 8px #38bdf8",
                }}
              />
              CDC &amp; WHO aligned
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#64748b",
                  margin: "0 0 14px",
                }}
              >
                {heading}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "13.5px",
                        color: "#94a3b8",
                        textDecoration: "none",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#e2e8f0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#94a3b8";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Sources column */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#64748b",
                margin: "0 0 14px",
              }}
            >
              Sources
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {SOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "13.5px",
                      color: "#94a3b8",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#e2e8f0";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                    }}
                  >
                    {link.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ opacity: 0.6 }}
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Medical disclaimer strip ─────────────────────────── */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            fontSize: "12px",
            color: "#64748b",
            lineHeight: 1.6,
            marginBottom: "24px",
          }}
        >
          <strong style={{ color: "#94a3b8", fontWeight: 700 }}>
            Medical disclaimer.
          </strong>{" "}
          Information on TravelMed is for educational purposes only and does
          not constitute medical advice. Always consult a qualified travel
          medicine specialist before making health decisions for your trip.
        </div>

        {/* ── Bottom row: copyright + meta ────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p style={{ fontSize: "12px", color: "#475569", margin: 0 }}>
            © {new Date().getFullYear()} TravelMed. All rights reserved.
          </p>
          <p style={{ fontSize: "12px", color: "#475569", margin: 0 }}>
            Made for travelers, by physicians.
          </p>
        </div>
      </div>

      {/* Responsive: collapse link columns to 2-col / 1-col on small screens */}
      <style jsx>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
