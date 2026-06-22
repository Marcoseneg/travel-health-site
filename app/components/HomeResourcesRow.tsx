import Link from "next/link";
import Image from "next/image";
import { diseases, DISEASE_LIST } from "../lib/diseaseData";

// ── Three-column resources row: Practical guides · Video briefs · Disease library
// A dense "explore more" block near the bottom of the homepage. Video briefs are
// placeholders that link to the related insight article until real videos exist.

type GuideRow = { title: string; desc: string; id: string; icon: React.ReactNode };
type Video = { title: string; duration: string; img: string; href: string };

const GUIDES: GuideRow[] = [
  { title: "Mosquito bite prevention", desc: "Practical ways to avoid bites and reduce your risk.", id: "best-deet-sprays-2026", icon: <BugIcon /> },
  { title: "Food & water safety", desc: "How to avoid traveler's diarrhea and stay healthy.", id: "travelers-diarrhea-survival", icon: <DropletIcon /> },
  { title: "Malaria prophylaxis", desc: "Which tablets, when to start, and how they compare.", id: "malaria-prophylaxis-compared", icon: <PillIcon /> },
  { title: "Travel health kit essentials", desc: "Medications and supplies you shouldn't travel without.", id: "safari-health-kit", icon: <KitIcon /> },
];

const VIDEOS: Video[] = [
  { title: "Wolbachia mosquitoes explained", duration: "3:24", img: "/images/insights/wolbachia-dengue-2026.jpg", href: "/insights/wolbachia-dengue-2026" },
  { title: "New malaria vaccines: where we are", duration: "4:15", img: "/images/insights/next-gen-malaria-vaccines.jpg", href: "/insights/next-gen-malaria-vaccines" },
  { title: "Qdenga: should travelers get it?", duration: "3:02", img: "/images/insights/qdenga-real-world-data.jpg", href: "/insights/qdenga-real-world-data" },
  { title: "Dengue beyond the tropics", duration: "2:59", img: "/images/insights/dengue-expanding-beyond-tropics.jpg", href: "/insights/dengue-expanding-beyond-tropics" },
];

const DISEASES = DISEASE_LIST.slice(0, 5);

function ColHeader({ title, linkLabel, href }: { title: string; linkLabel: string; href: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
      <h3 className="t-h3" style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--c-text)" }}>{title}</h3>
      <Link href={href} style={{ color: "var(--c-accent-strong)", fontWeight: 600, fontSize: 12.5, textDecoration: "none", whiteSpace: "nowrap" }}>
        {linkLabel} &rarr;
      </Link>
    </div>
  );
}

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

function listRowStyle(): React.CSSProperties {
  return { display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", borderRadius: "var(--c-radius-sm)", textDecoration: "none", color: "inherit" };
}

export default function HomeResourcesRow() {
  return (
    <section style={{ padding: "12px 24px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div
          style={{
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            borderRadius: "var(--c-radius-lg)",
            padding: "28px",
            boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "36px",
          }}
        >
          {/* ── Practical travel guides ──────────────────────────── */}
          <div>
            <ColHeader title="Practical travel guides" linkLabel="Explore all guides" href="/guides" />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {GUIDES.map((g) => (
                <Link key={g.id} href={`/guides/${g.id}`} className="resource-row" style={listRowStyle()}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, flexShrink: 0, borderRadius: 9, background: "var(--c-accent-soft)", color: "var(--c-accent)" }}>{g.icon}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--c-text)" }}>{g.title}</span>
                    <span style={{ display: "block", fontSize: 12, color: "var(--c-text-2)", lineHeight: 1.4, marginTop: 1 }}>{g.desc}</span>
                  </span>
                  {ARROW}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Expert video briefs ──────────────────────────────── */}
          <div>
            <ColHeader title="Expert video briefs" linkLabel="View all videos" href="/insights" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {VIDEOS.map((v) => (
                <Link key={v.title} href={v.href} className="resource-row" style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ position: "relative", height: 74, borderRadius: "var(--c-radius-sm)", overflow: "hidden", background: "var(--c-surface-2)" }}>
                    <Image src={v.img} alt={v.title} fill sizes="160px" style={{ objectFit: "cover" }} />
                    <span style={{ position: "absolute", inset: 0, background: "rgba(2,12,24,0.28)" }} />
                    <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--c-accent-strong)" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                    <span style={{ position: "absolute", right: 5, bottom: 5, fontSize: 10, fontWeight: 600, color: "#fff", background: "rgba(2,12,24,0.7)", borderRadius: 4, padding: "1px 5px" }}>{v.duration}</span>
                  </div>
                  <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--c-text)", lineHeight: 1.3, marginTop: 6 }}>{v.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Disease library ──────────────────────────────────── */}
          <div>
            <ColHeader title="Disease library" linkLabel="Browse all diseases" href="/diseases" />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {DISEASES.map((slug) => {
                const d = diseases[slug];
                if (!d) return null;
                return (
                  <Link key={slug} href={`/diseases/${slug}`} className="resource-row" style={listRowStyle()}>
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, flexShrink: 0, borderRadius: 9, background: "var(--c-surface-2)", fontSize: 16 }}>{d.icon}</span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--c-text)" }}>{d.label}</span>
                      <span style={{ display: "block", fontSize: 12, color: "var(--c-text-2)", lineHeight: 1.4, marginTop: 1 }}>{d.category}</span>
                    </span>
                    {ARROW}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Inline guide icons (inherit currentColor) ───────────────────────────────
function BugIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 9V8a3 3 0 0 1 6 0v1" /><path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1-10 0v-3a6 6 0 0 1 1-3" /><path d="M3 13h4M17 13h4M12 20v-7M4.5 18.5 8 16.5M19.5 18.5 16 16.5M4.5 8.5 8 10.5M19.5 8.5 16 10.5" />
    </svg>
  );
}
function DropletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5s6 6.6 6 10.5a6 6 0 0 1-12 0c0-3.9 6-10.5 6-10.5z" />
    </svg>
  );
}
function PillIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="8" width="18" height="8" rx="4" /><path d="M12 8v8" />
    </svg>
  );
}
function KitIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M12 11v5M9.5 13.5h5" />
    </svg>
  );
}
