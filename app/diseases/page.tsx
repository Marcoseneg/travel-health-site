"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { diseases, DISEASE_LIST } from "../lib/diseaseData";

type TransmissionCategory =
  | "mosquito"
  | "tick"
  | "food-water"
  | "animal"
  | "person-to-person"
  | "all";

const DISEASE_TRANSMISSION: Record<string, TransmissionCategory> = {};
DISEASE_LIST.forEach((slug) => {
  if (["yellow-fever", "japanese-encephalitis", "dengue", "chikungunya", "malaria", "zika"].includes(slug)) {
    DISEASE_TRANSMISSION[slug] = "mosquito";
  } else if (["typhoid", "cholera", "hepatitis-a"].includes(slug)) {
    DISEASE_TRANSMISSION[slug] = "food-water";
  } else if (slug === "rabies") {
    DISEASE_TRANSMISSION[slug] = "animal";
  } else if (slug === "tbe") {
    DISEASE_TRANSMISSION[slug] = "tick";
  } else if (slug === "mpox") {
    DISEASE_TRANSMISSION[slug] = "person-to-person";
  } else {
    const c = diseases[slug].category.toLowerCase();
    DISEASE_TRANSMISSION[slug] =
      c.includes("mosquito") ? "mosquito" :
      c.includes("tick") ? "tick" :
      c.includes("food") || c.includes("water") ? "food-water" :
      c.includes("animal") ? "animal" :
      c.includes("contact") ? "person-to-person" :
      "mosquito";
  }
});

const TRANSMISSION_FILTERS: { value: TransmissionCategory; label: string; icon: string }[] = [
  { value: "all", label: "All diseases", icon: "" },
  { value: "mosquito", label: "Mosquito-borne", icon: "🦟" },
  { value: "tick", label: "Tick-borne", icon: "🪲" },
  { value: "food-water", label: "Food & water", icon: "🚰" },
  { value: "animal", label: "Animal exposure", icon: "🐕" },
  { value: "person-to-person", label: "Close contact", icon: "🤝" },
];

const SHORT_DESCRIPTIONS: Record<string, string> = {
  malaria:
    "Year-round risk in much of the tropics. Prevention combines mosquito avoidance with chemoprophylaxis.",
  dengue:
    "Spread by daytime-biting Aedes mosquitoes. Severe dengue is rare but the risk rises with a second infection.",
  chikungunya:
    "Sudden fever with joint pain that can last months. Same Aedes mosquitoes as dengue.",
  "yellow-fever":
    "Single dose protects for life. Required for entry into many African and South American countries.",
  typhoid:
    "Persistent fever from contaminated food and water. Two vaccines available — useful for longer or rougher trips.",
  "hepatitis-a":
    "Common worldwide, easy to catch, easy to prevent. Two-dose vaccine gives long-term protection.",
  rabies:
    "Nearly always fatal once symptoms start. Pre-exposure vaccine simplifies what to do after a bite.",
  cholera:
    "Severe diarrhea that can dehydrate within hours. Vaccine for outbreak areas and humanitarian work.",
  "japanese-encephalitis":
    "Rural Asia, especially during monsoon. Vaccine for stays of a month or more in farming areas.",
  tbe:
    "Tick-borne encephalitis, endemic across most of Switzerland. BAG-recommended vaccine for residents and visitors.",
  zika:
    "Usually mild — but congenital Zika syndrome makes pregnancy planning the central concern.",
  mpox:
    "Mostly spread by close skin-to-skin and sexual contact. Vaccine available for high-risk groups.",
};

function getPreventionTags(slug: string, d: typeof diseases[string]): string[] {
  const tags: string[] = [];
  if (d.vaccineAvailable) tags.push("💉 Vaccine");
  if (slug === "malaria") tags.push("💊 Prophylaxis");
  if (DISEASE_TRANSMISSION[slug] === "mosquito") tags.push("🦟 Mosquito avoidance");
  if (DISEASE_TRANSMISSION[slug] === "tick") tags.push("🪲 Tick avoidance");
  if (DISEASE_TRANSMISSION[slug] === "food-water") tags.push("🍽️ Food & water hygiene");
  if (slug === "rabies") tags.push("🐾 Animal avoidance");
  if (DISEASE_TRANSMISSION[slug] === "person-to-person") tags.push("🤝 Contact precautions");
  return tags;
}

export default function DiseasesPage() {
  const [transmissionFilter, setTransmissionFilter] = useState<TransmissionCategory>("all");
  const [vaccineOnly, setVaccineOnly] = useState(false);

  const filtered = useMemo(() => {
    return DISEASE_LIST.filter((slug) => {
      const d = diseases[slug];
      if (transmissionFilter !== "all" && DISEASE_TRANSMISSION[slug] !== transmissionFilter) return false;
      if (vaccineOnly && !d.vaccineAvailable) return false;
      return true;
    });
  }, [transmissionFilter, vaccineOnly]);

  const activeFilterCount = (transmissionFilter !== "all" ? 1 : 0) + (vaccineOnly ? 1 : 0);

  return (
    <main style={{ minHeight: "100vh", background: "#030712", color: "#f1f5f9", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px",
          borderRadius: "999px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
          marginBottom: "16px", fontSize: "12px", fontWeight: 600, color: "#64748b",
          letterSpacing: "0.04em", textTransform: "uppercase",
        }}>Reference</div>
        <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 12px" }}>
          Diseases & risks
        </h1>
        <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "600px", lineHeight: 1.6, margin: "0 0 32px" }}>
          Travel-relevant infectious diseases with physician-reviewed prevention guidance.
        </p>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
          {TRANSMISSION_FILTERS.map((f) => {
            const isActive = transmissionFilter === f.value;
            return (
              <button key={f.value} onClick={() => setTransmissionFilter(f.value)} style={{
                padding: "7px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                border: `1px solid ${isActive ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.07)"}`,
                background: isActive ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.03)",
                color: isActive ? "#7dd3fc" : "#94a3b8", fontFamily: "inherit", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                {f.icon && <span style={{ fontSize: "14px" }}>{f.icon}</span>}{f.label}
              </button>
            );
          })}

          {/* Right side: vaccine toggle + count */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
            <button onClick={() => setVaccineOnly(!vaccineOnly)} style={{
              padding: "7px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
              border: `1px solid ${vaccineOnly ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.07)"}`,
              background: vaccineOnly ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.03)",
              color: vaccineOnly ? "#34d399" : "#94a3b8", fontFamily: "inherit", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "6px",
            }}>💉 Vaccine available</button>
            {activeFilterCount > 0 && (
              <button onClick={() => { setTransmissionFilter("all"); setVaccineOnly(false); }} style={{
                padding: "7px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
                border: "none", background: "transparent", color: "#64748b", fontFamily: "inherit",
                textDecoration: "underline", textUnderlineOffset: "2px",
              }}>Clear ({activeFilterCount})</button>
            )}
            <span style={{ fontSize: "13px", color: "#475569" }}>{filtered.length} of {DISEASE_LIST.length}</span>
          </div>
        </div>
      </section>

      {/* Cards grid */}
      <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "14px" }}>
          {filtered.map((slug) => {
            const d = diseases[slug];
            const desc = SHORT_DESCRIPTIONS[slug] || d.transmission;
            const tags = getPreventionTags(slug, d);
            const accentColor =
              DISEASE_TRANSMISSION[slug] === "mosquito" ? "rgba(251,146,60,0.5)" :
              DISEASE_TRANSMISSION[slug] === "tick" ? "rgba(132,204,22,0.5)" :
              DISEASE_TRANSMISSION[slug] === "food-water" ? "rgba(56,189,248,0.5)" :
              DISEASE_TRANSMISSION[slug] === "animal" ? "rgba(168,85,247,0.5)" :
              DISEASE_TRANSMISSION[slug] === "person-to-person" ? "rgba(244,114,182,0.5)" :
              "rgba(100,116,139,0.3)";

            return (
              <Link
                key={slug}
                href={`/diseases/${slug}`}
                style={{
                  display: "flex", flexDirection: "column", padding: "24px 24px 20px 26px",
                  borderRadius: "16px", textDecoration: "none",
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: `3px solid ${accentColor}`, color: "#f1f5f9", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderLeftColor = accentColor; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderLeftColor = accentColor; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.02em" }}>{d.label}</div>
                  <span style={{ fontSize: "12px", color: "#475569" }}>{d.category}</span>
                </div>
                <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.55, margin: "0 0 14px", flex: 1 }}>{desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: "11px", fontWeight: 600, color: "#64748b",
                      background: "rgba(255,255,255,0.03)", padding: "3px 9px", borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}>{tag}</span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
