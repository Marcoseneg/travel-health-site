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
    <main style={{ minHeight: "100vh", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "48px 24px 0" }}>
        <div className="t-micro" style={{
          display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px",
          borderRadius: "999px", background: "var(--c-surface)", border: "1px solid var(--c-border)",
          marginBottom: "16px", color: "var(--c-text-3)",
        }}>Reference</div>
        <h1 className="t-display" style={{ margin: "0 0 12px", color: "var(--c-text)" }}>
          Diseases & risks
        </h1>
        <p className="t-body" style={{ color: "var(--c-text-2)", maxWidth: "600px", margin: "0 0 32px" }}>
          Travel-relevant infectious diseases with physician-reviewed prevention guidance.
        </p>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
          {TRANSMISSION_FILTERS.map((f) => {
            const isActive = transmissionFilter === f.value;
            return (
              <button key={f.value} onClick={() => setTransmissionFilter(f.value)} className="t-label" style={{
                padding: "7px 16px", borderRadius: "999px", cursor: "pointer",
                border: `1px solid ${isActive ? "var(--c-accent-border)" : "var(--c-border)"}`,
                background: isActive ? "var(--c-accent-soft)" : "var(--c-surface)",
                color: isActive ? "var(--c-accent-strong)" : "var(--c-text-2)", fontFamily: "inherit", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                {f.icon && <span style={{ fontSize: "14px" }}>{f.icon}</span>}{f.label}
              </button>
            );
          })}

          {/* Right side: vaccine toggle + count */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
            <button onClick={() => setVaccineOnly(!vaccineOnly)} className="t-label" style={{
              padding: "7px 16px", borderRadius: "999px", cursor: "pointer",
              border: `1px solid ${vaccineOnly ? "var(--c-trust-border)" : "var(--c-border)"}`,
              background: vaccineOnly ? "var(--c-trust-soft)" : "var(--c-surface)",
              color: vaccineOnly ? "var(--c-trust)" : "var(--c-text-2)", fontFamily: "inherit", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "6px",
            }}>💉 Vaccine available</button>
            {activeFilterCount > 0 && (
              <button onClick={() => { setTransmissionFilter("all"); setVaccineOnly(false); }} className="t-micro" style={{
                padding: "7px 14px", borderRadius: "999px", cursor: "pointer",
                border: "none", background: "transparent", color: "var(--c-text-3)", fontFamily: "inherit",
                textTransform: "none", letterSpacing: "normal", fontWeight: 600,
                textDecoration: "underline", textUnderlineOffset: "2px",
              }}>Clear ({activeFilterCount})</button>
            )}
            <span className="t-label" style={{ color: "var(--c-text-3)" }}>{filtered.length} of {DISEASE_LIST.length}</span>
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
                  background: "var(--c-surface)", border: "1px solid var(--c-border)",
                  borderLeft: `3px solid ${accentColor}`, color: "var(--c-text)", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--c-surface-2)"; e.currentTarget.style.borderColor = "var(--c-border-strong)"; e.currentTarget.style.borderLeftColor = accentColor; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--c-surface)"; e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.borderLeftColor = accentColor; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div className="t-h3" style={{ fontWeight: 700, color: "var(--c-text)" }}>{d.label}</div>
                  <span className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal" }}>{d.category}</span>
                </div>
                <p className="t-body" style={{ color: "var(--c-text-2)", margin: "0 0 14px", flex: 1 }}>{desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {tags.map((tag) => (
                    <span key={tag} className="t-micro" style={{
                      color: "var(--c-text-2)", textTransform: "none", letterSpacing: "normal",
                      background: "var(--c-surface-2)", padding: "3px 9px", borderRadius: "6px",
                      border: "1px solid var(--c-border)",
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
