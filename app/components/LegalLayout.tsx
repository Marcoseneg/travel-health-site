import { SiteFooter } from "./TrustFooter";

// Shared chrome for policy / informational pages (disclaimer, privacy, terms,
// contact). Keeps a single readable column with the standard site header
// (from the root layout) and footer.

export default function LegalLayout({
  kicker,
  title,
  lastUpdated,
  children,
}: {
  kicker: string;
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--c-bg)",
        color: "var(--c-text)",
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 24px 72px" }}>
        <div
          className="t-label"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "6px 16px",
            borderRadius: "999px",
            background: "var(--c-accent-soft)",
            border: "1px solid var(--c-accent-border)",
            marginBottom: "20px",
            fontWeight: 600,
            color: "var(--c-accent)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {kicker}
        </div>

        <h1 className="t-display" style={{ margin: "0 0 14px", color: "var(--c-text)" }}>
          {title}
        </h1>

        {lastUpdated && (
          <p style={{ margin: "0 0 40px", color: "var(--c-text-3)", fontSize: "13px" }}>
            Last updated: {lastUpdated}
          </p>
        )}

        <div className="legal-prose">{children}</div>
      </section>

      <SiteFooter />
    </main>
  );
}
