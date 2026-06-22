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
    <section style={{ padding: "44px 24px", position: "relative" }}>
      {/* Soft radial accent behind the pillar row */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, var(--c-accent-soft) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <div
            className="t-micro"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "var(--c-trust-soft)",
              border: "1px solid var(--c-trust-border)",
              marginBottom: "16px",
              fontWeight: 600,
              color: "var(--c-trust)",
            }}
          >
            Why trust us
          </div>
          <h2
            className="t-h1"
            style={{
              color: "var(--c-text)",
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
                borderRadius: "var(--c-radius-lg)",
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--c-border-strong)";
                e.currentTarget.style.background = "var(--c-surface-2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--c-border)";
                e.currentTarget.style.background = "var(--c-surface)";
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "var(--c-radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--c-trust-soft)",
                  border: "1px solid var(--c-trust-border)",
                  color: "var(--c-trust)",
                  marginBottom: "16px",
                }}
              >
                {pillar.icon}
              </div>
              <h3
                className="t-h3"
                style={{
                  margin: "0 0 6px",
                  color: "var(--c-text)",
                }}
              >
                {pillar.title}
              </h3>
              <p
                className="t-body"
                style={{
                  color: "var(--c-text-2)",
                  margin: 0,
                }}
              >
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        <p
          className="t-micro"
          style={{
            color: "var(--c-text-3)",
            textAlign: "center",
            lineHeight: 1.7,
            letterSpacing: "normal",
            textTransform: "none",
            fontWeight: 400,
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

// ── Social icon — small circular link with hover lift ───────────────────────
function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "var(--c-radius-sm)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        color: "var(--c-text-2)",
        textDecoration: "none",
        transition: "color 160ms ease, background 160ms ease, transform 160ms ease, border-color 160ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--c-accent)";
        e.currentTarget.style.background = "var(--c-accent-soft)";
        e.currentTarget.style.borderColor = "var(--c-accent-border)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--c-text-2)";
        e.currentTarget.style.background = "var(--c-surface)";
        e.currentTarget.style.borderColor = "var(--c-border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--c-border)",
        background: "var(--c-surface)",
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
                  borderRadius: "9px",
                  background:
                    "linear-gradient(135deg, var(--c-accent-soft), var(--c-surface-2))",
                  border: "1px solid var(--c-accent-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="9"
                    stroke="var(--c-accent)"
                    strokeWidth="1.4"
                    fill="none"
                  />
                  <ellipse
                    cx="16"
                    cy="16"
                    rx="9"
                    ry="3.5"
                    stroke="var(--c-accent)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <line
                    x1="7"
                    y1="16"
                    x2="25"
                    y2="16"
                    stroke="var(--c-accent)"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "17px",
                  letterSpacing: "-0.025em",
                  color: "var(--c-text)",
                }}
              >
                Travel
                <span style={{ color: "var(--c-accent)", fontWeight: 400 }}>Med</span>
              </span>
            </Link>
            <p
              className="t-body"
              style={{
                color: "var(--c-text-2)",
                lineHeight: 1.65,
                margin: "0 0 18px",
                maxWidth: "280px",
              }}
            >
              Physician-built travel medicine — evidence-based vaccine,
              malaria, and prevention guidance for international travelers.
            </p>
            <div
              className="t-micro"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 11px",
                borderRadius: "999px",
                background: "var(--c-accent-soft)",
                border: "1px solid var(--c-accent-border)",
                fontWeight: 700,
                color: "var(--c-accent-strong)",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "var(--c-accent)",
                }}
              />
              CDC &amp; WHO aligned
            </div>

            {/* Social links — small icon row beneath the brand block */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px",
              }}
            >
              <SocialIcon href="#" label="TravelMed on X">
                {/* X (formerly Twitter) — clean filled logo */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="TravelMed on LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="TravelMed on Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p
                className="t-micro"
                style={{
                  fontWeight: 700,
                  color: "var(--c-text-3)",
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
                      className="t-label"
                      style={{
                        color: "var(--c-text-2)",
                        textDecoration: "none",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--c-text)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--c-text-2)";
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
              className="t-micro"
              style={{
                fontWeight: 700,
                color: "var(--c-text-3)",
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
                    className="t-label"
                    style={{
                      color: "var(--c-text-2)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--c-text)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--c-text-2)";
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
          className="t-micro"
          style={{
            padding: "16px 20px",
            borderRadius: "var(--c-radius-md)",
            background: "var(--c-surface-2)",
            border: "1px solid var(--c-border)",
            color: "var(--c-text-3)",
            lineHeight: 1.6,
            letterSpacing: "normal",
            textTransform: "none",
            fontWeight: 400,
            marginBottom: "24px",
          }}
        >
          <strong style={{ color: "var(--c-text-2)", fontWeight: 700 }}>
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
            borderTop: "1px solid var(--c-border)",
          }}
        >
          <p className="t-micro" style={{ color: "var(--c-text-3)", margin: 0, letterSpacing: "normal", textTransform: "none", fontWeight: 400 }}>
            © {new Date().getFullYear()} TravelMed. All rights reserved.
          </p>
          <p className="t-micro" style={{ color: "var(--c-text-3)", margin: 0, letterSpacing: "normal", textTransform: "none", fontWeight: 400 }}>
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
