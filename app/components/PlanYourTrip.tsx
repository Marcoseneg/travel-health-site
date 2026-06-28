import Link from "next/link";
import type { ReactNode } from "react";

// ── "Plan your trip with confidence" homepage section ──────────────────────
// Four entry-point tool cards. The Itinerary Builder card is emphasized as
// the hero action (accent border + filled accent icon chip); the other three
// use the soft accent chip treatment. Each card opts into the global
// `.step-card` hover-lift defined in app/page.tsx.

type ToolCard = {
  title: string;
  href: string;
  desc: string;
  icon: ReactNode;
  /** Emphasized hero card — accent border + filled accent icon chip. */
  emphasized?: boolean;
};

const CARDS: ToolCard[] = [
  {
    title: "Vaccines",
    href: "/diseases",
    desc: "What's recommended or required for your destination.",
    icon: <ShieldPlusIcon />,
  },
  {
    title: "Malaria",
    href: "/diseases/malaria",
    desc: "Risk maps and prevention options.",
    icon: <MosquitoIcon />,
  },
  {
    title: "Itinerary Builder",
    href: "/itinerary",
    desc: "Health risk across a whole multi-stop trip.",
    icon: <RouteIcon />,
    emphasized: true,
  },
  {
    title: "Disease Library",
    href: "/diseases",
    desc: "Transmission, symptoms, and prevention for every disease.",
    icon: <LibraryIcon />,
  },
];

export default function PlanYourTrip() {
  return (
    <section
      style={{
        maxWidth: "1480px",
        margin: "0 auto",
        padding: "18px 24px",
        background: "var(--c-bg)",
      }}
    >
      <h2 className="t-h2" style={{ color: "var(--c-text)", margin: "0 0 24px" }}>
        Plan your trip with confidence
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
        }}
      >
        {CARDS.map((card) => (
          <Card key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}

function Card({ card }: { card: ToolCard }) {
  const { title, href, desc, icon, emphasized } = card;
  return (
    <Link
      href={href}
      className="step-card"
      style={{
        display: "block",
        background: "var(--c-surface)",
        border: `1px solid ${emphasized ? "var(--c-accent-border)" : "var(--c-border)"}`,
        borderRadius: "var(--c-radius-md)",
        padding: "18px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: emphasized ? "var(--c-accent)" : "var(--c-accent-soft)",
          color: emphasized ? "#ffffff" : "var(--c-accent)",
          marginBottom: "12px",
        }}
      >
        {icon}
      </div>
      <p
        style={{
          margin: "0 0 4px",
          fontSize: "14px",
          fontWeight: 700,
          color: "var(--c-text)",
        }}
      >
        {title}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "12px",
          lineHeight: 1.5,
          color: "var(--c-text-2)",
        }}
      >
        {desc}
      </p>
    </Link>
  );
}

// ── Inline icons (stroke = currentColor so the chip color drives them) ──────

function ShieldPlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
    </svg>
  );
}

function MosquitoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 8 0v3c0 3.3-2.7 6-6 6z" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function LibraryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </svg>
  );
}
