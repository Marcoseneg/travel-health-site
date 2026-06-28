// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/resources/layout.tsx
//
//   The /resources section is now a full-width, consumer-facing layout (no
//   persistent sidebar) — the landing leads with goal cards. Individual
//   resources carry their own "← All resources" breadcrumb, so navigation
//   survives without a left rail.
// ═══════════════════════════════════════════════════════════════════════════

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: "100vh", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1480px", margin: "0 auto", padding: "28px 32px 64px" }}>{children}</div>
    </main>
  );
}
