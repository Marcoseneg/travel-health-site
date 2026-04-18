export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#030712",
        color: "#f1f5f9",
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "64px 24px 0",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: "24px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#64748b",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          About
        </div>
        <h1
          style={{
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            margin: "0 0 24px",
          }}
        >
          Physician, traveler, and
          <br />
          <span style={{ color: "#38bdf8" }}>prevention enthusiast.</span>
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#94a3b8",
            lineHeight: 1.7,
            maxWidth: "640px",
            margin: "0 0 48px",
          }}
        >
          I'm an infectious diseases physician with a passion for travel,
          prevention, and global health. I built TravelMed to make
          evidence-based travel health advice easier to understand, more
          practical, and accessible to everyone — without paywalls or
          gatekeeping.
        </p>
      </section>

      {/* ── Why this exists ──────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 24px 64px",
        }}
      >
        <div
          style={{
            padding: "36px 40px",
            borderRadius: "20px",
            background: "#0a101f",
            border: "1px solid rgba(255,255,255,0.06)",
            borderLeft: "3px solid #38bdf8",
          }}
        >
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#38bdf8",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: "0 0 16px",
            }}
          >
            Why TravelMed
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#94a3b8",
              lineHeight: 1.75,
              margin: "0 0 16px",
            }}
          >
            Too often, travelers either get no pre-trip health advice at all, or
            they get a generic printout from a clinic that doesn't account for
            their specific itinerary. Meanwhile, the best information is
            scattered across CDC pages, WHO advisories, and medical journals that
            most people will never read.
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "#94a3b8",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            TravelMed brings that information together — synthesized,
            destination-specific, and written for real travelers, not medical
            professionals. The goal is simple: help people travel with more
            confidence, better preparation, and a clear sense of what actually
            matters before a trip.
          </p>
        </div>
      </section>

      {/* ── What the site covers ─────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 24px 64px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: "0 0 28px",
          }}
        >
          What you'll find here
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "12px",
          }}
        >
          {[
            {
              icon: "🌍",
              title: "Destination health briefs",
              desc: "Country-specific vaccine recommendations, malaria prophylaxis, and prevention checklists tailored to your itinerary.",
            },
            {
              icon: "🦠",
              title: "Disease reference",
              desc: "Physician-reviewed profiles on travel-relevant diseases — transmission, prevention, symptoms, and treatment.",
            },
            {
              icon: "⚠️",
              title: "Outbreak alerts",
              desc: "Active disease outbreaks and health advisories that affect travelers, updated as situations develop.",
            },
            {
              icon: "📋",
              title: "Guides & reviews",
              desc: "Deep dives on gear, destinations, and prevention strategies — tested and written from a physician's perspective.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "24px",
                borderRadius: "16px",
                background: "#0a101f",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "14px" }}>
                {item.icon}
              </div>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  margin: "0 0 8px",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#64748b",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sources & methodology ────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 24px 64px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: "0 0 20px",
          }}
        >
          Sources & methodology
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#94a3b8",
            lineHeight: 1.75,
            margin: "0 0 24px",
          }}
        >
          All recommendations on TravelMed are aligned with current guidelines
          from the following organizations. Content is reviewed regularly and
          updated when guidelines change or new outbreaks emerge.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {[
            { name: "CDC — Centers for Disease Control and Prevention", url: "https://www.cdc.gov" },
            { name: "WHO — World Health Organization", url: "https://www.who.int" },
            { name: "ISTM — International Society of Travel Medicine", url: "https://www.istm.org" },
            { name: "PAHO — Pan American Health Organization", url: "https://www.paho.org" },
            { name: "ECDC — European Centre for Disease Prevention and Control", url: "https://www.ecdc.europa.eu" },
          ].map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#94a3b8",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              {source.name}
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ))}
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <div
          style={{
            padding: "28px 32px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#64748b",
              margin: "0 0 10px",
              letterSpacing: "-0.01em",
            }}
          >
            Medical disclaimer
          </h3>
          <p
            style={{
              fontSize: "13.5px",
              color: "#475569",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            TravelMed provides general educational information about travel
            health. It is not a substitute for professional medical advice,
            diagnosis, or treatment. Always consult a qualified travel medicine
            specialist or your healthcare provider before traveling. Individual
            health recommendations depend on your medical history, medications,
            allergies, and specific itinerary. Visit a travel clinic 4–6 weeks
            before departure whenever possible.
          </p>
        </div>
      </section>
    </main>
  );
}
