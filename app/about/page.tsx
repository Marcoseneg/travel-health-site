export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--c-bg)",
        color: "var(--c-text)",
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
          className="t-label"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "999px",
            background: "var(--c-accent-soft)",
            border: "1px solid var(--c-accent-border)",
            marginBottom: "24px",
            fontWeight: 600,
            color: "var(--c-accent)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          About
        </div>
        <h1
          className="t-display"
          style={{
            margin: "0 0 24px",
            color: "var(--c-text)",
          }}
        >
          Physician, traveler, and
          <br />
          <span style={{ color: "var(--c-accent)" }}>prevention enthusiast.</span>
        </h1>
        <p
          className="t-body"
          style={{
            fontSize: "18px",
            color: "var(--c-text-2)",
            lineHeight: 1.7,
            maxWidth: "640px",
            margin: "0 0 48px",
          }}
        >
          I&apos;m an infectious diseases physician with a passion for travel,
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
            borderRadius: "var(--c-radius-lg)",
            background: "var(--c-accent-soft)",
            border: "1px solid var(--c-accent-border)",
            borderLeft: "3px solid var(--c-accent)",
          }}
        >
          <h2
            className="t-label"
            style={{
              fontWeight: 700,
              color: "var(--c-accent)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: "0 0 16px",
            }}
          >
            Why TravelMed
          </h2>
          <p
            className="t-body"
            style={{
              fontSize: "16px",
              color: "var(--c-text-2)",
              lineHeight: 1.75,
              margin: "0 0 16px",
            }}
          >
            Too often, travelers either get no pre-trip health advice at all, or
            they get a generic printout from a clinic that doesn&apos;t account for
            their specific itinerary. Meanwhile, the best information is
            scattered across CDC pages, WHO advisories, and medical journals that
            most people will never read.
          </p>
          <p
            className="t-body"
            style={{
              fontSize: "16px",
              color: "var(--c-text-2)",
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
          className="t-h2"
          style={{
            margin: "0 0 28px",
            color: "var(--c-text)",
          }}
        >
          What you&apos;ll find here
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
              className="card-hover"
              style={{
                padding: "24px",
                borderRadius: "var(--c-radius-md)",
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "14px" }}>
                {item.icon}
              </div>
              <h3
                className="t-h3"
                style={{
                  fontWeight: 700,
                  margin: "0 0 8px",
                  color: "var(--c-text)",
                }}
              >
                {item.title}
              </h3>
              <p
                className="t-label"
                style={{
                  color: "var(--c-text-2)",
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
          className="t-h2"
          style={{
            margin: "0 0 20px",
            color: "var(--c-text)",
          }}
        >
          Sources & methodology
        </h2>
        <p
          className="t-body"
          style={{
            color: "var(--c-text-2)",
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
              className="t-label"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "var(--c-radius-sm)",
                background: "var(--c-surface-2)",
                border: "1px solid var(--c-border)",
                color: "var(--c-text-2)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {source.name}
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="var(--c-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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
            borderRadius: "var(--c-radius-md)",
            background: "var(--c-surface-2)",
            border: "1px solid var(--c-border)",
          }}
        >
          <h3
            className="t-label"
            style={{
              fontWeight: 700,
              color: "var(--c-text-2)",
              margin: "0 0 10px",
            }}
          >
            Medical disclaimer
          </h3>
          <p
            className="t-label"
            style={{
              color: "var(--c-text-3)",
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
