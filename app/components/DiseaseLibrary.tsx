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
    <section style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px",
            borderRadius: "999px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "16px", fontSize: "12px", fontWeight: 600, color: "#64748b",
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>Disease library</div>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>
            Know before you go
          </h2>
          <p style={{ fontSize: "16px", color: "#64748b", marginTop: "12px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            Physician-reviewed profiles on the diseases that matter most for travelers.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
          {DISEASE_LIST.map((slug) => {
            const d = diseases[slug];
            if (!d) return null;
            const desc = SHORT_DESCRIPTIONS[slug] || d.category;
            return (
              <Link
                key={slug}
                href={`/diseases/${slug}`}
                style={{
                  display: "block", padding: "22px 24px", borderRadius: "14px", textDecoration: "none",
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                  color: "#f1f5f9", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "-0.01em" }}>{d.label}</span>
                  {d.vaccineAvailable && (
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#34d399", background: "rgba(52,211,153,0.08)", padding: "2px 8px", borderRadius: "5px" }}>💉 Vaccine</span>
                  )}
                </div>
                <div style={{ fontSize: "12px", color: "#475569", marginBottom: "4px" }}>{d.category}</div>
                <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>{desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
