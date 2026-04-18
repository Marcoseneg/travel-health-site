"use client";

import Link from "next/link";
import { diseases, DISEASE_LIST } from "../lib/diseaseData";

const SHORT_DESCRIPTIONS: Record<string, string> = {
  malaria: "Prophylaxis guidance for every risk zone",
  dengue: "Prevention and recognition of severe dengue",
  "yellow-fever": "Entry requirements and vaccination proof",
  typhoid: "Safe eating practices and vaccine options",
  rabies: "Pre-exposure vaccination and PEP protocols",
  cholera: "Oral rehydration and outbreak awareness",
  "hepatitis-a": "Two-dose protection for long-term immunity",
  "japanese-encephalitis": "Risk in rural agricultural areas of Asia",
  chikungunya: "Joint pain prevention and Ixchiq vaccine",
};

export default function DiseaseLibrary() {
  return (
    <section style={{ padding: "80px 24px", background: "#0a101f" }}>
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
            Disease library
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
            Know before you go
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
            Physician-reviewed profiles on the diseases that matter most for
            travelers.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {DISEASE_LIST.map((slug) => {
            const d = diseases[slug];
            if (!d) return null;
            const desc = SHORT_DESCRIPTIONS[slug] || d.category;

            return (
              <Link
                key={slug}
                href={`/diseases/${slug}`}
                className="card-hover"
                style={{
                  display: "block",
                  padding: "24px 28px",
                  borderRadius: "16px",
                  textDecoration: "none",
                  background: "#030712",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "22px" }}>{d.icon}</span>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "15px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {d.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background:
                        d.riskLevel === "high"
                          ? "rgba(248,113,113,0.12)"
                          : "rgba(251,191,36,0.12)",
                      color:
                        d.riskLevel === "high"
                          ? "var(--danger)"
                          : "var(--warning)",
                    }}
                  >
                    {d.riskLevel}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text-dim)",
                    marginBottom: "6px",
                    fontWeight: 600,
                  }}
                >
                  {d.category}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
