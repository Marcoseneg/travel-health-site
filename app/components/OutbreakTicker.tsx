// app/components/OutbreakTicker.tsx
//
// Slim horizontal ticker that scrolls recent outbreak alerts below the nav.
// Server Component — fetches via the same pipeline as /outbreaks (live RSS
// with seed-data fallback), reuses the page-level ISR cache (6 hours).
//
// Design choices:
//
//   1. Restraint over flash. No flashing colors, no urgency styling. The
//      ticker is a calm continuous strip — informational, not alarmist.
//      A small cyan dot precedes each item; copy is muted slate.
//
//   2. Marquee via CSS transform animation. We duplicate the items inline
//      so the loop feels seamless. Animation is paused on hover so users
//      can read individual items.
//
//   3. Renders nothing if there are no alerts at all. Don't show empty UI.
//
//   4. All items link to /outbreaks (one click to read more), not to the
//      external source URL — keeps users on-site.

import Link from "next/link";
import seedData from "@/data/outbreaks.json";
import { fetchAllOutbreaks } from "@/app/lib/outbreakFetcher";
import type { OutbreakAlert } from "@/app/lib/outbreakSources";

export const revalidate = 21600; // 6 hours, matches /outbreaks

const TICKER_LIMIT = 8;

export default async function OutbreakTicker() {
  let alerts: OutbreakAlert[] = [];
  try {
    alerts = await fetchAllOutbreaks();
    if (alerts.length === 0) alerts = seedData as OutbreakAlert[];
  } catch {
    alerts = seedData as OutbreakAlert[];
  }

  const sorted = [...alerts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, TICKER_LIMIT);

  if (sorted.length === 0) return null;

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(255,255,255,0.015)",
        overflow: "hidden",
        position: "relative",
      }}
      aria-label="Recent outbreak alerts"
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          height: "36px",
        }}
      >
        {/* Lead label */}
        <Link
          href="/outbreaks"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "10.5px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#7dd3fc",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <span
            aria-hidden
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#7dd3fc",
              boxShadow: "0 0 8px rgba(125,211,252,0.6)",
            }}
          />
          Live
        </Link>

        {/* Ticker viewport */}
        <div
          className="outbreak-ticker-viewport"
          style={{
            flex: 1,
            overflow: "hidden",
            position: "relative",
            maskImage:
              "linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 60px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 60px), transparent 100%)",
          }}
        >
          <div className="outbreak-ticker-track">
            {/* Render twice for seamless loop */}
            {[...sorted, ...sorted].map((alert, i) => (
              <Link
                key={`${alert.id}-${i}`}
                href="/outbreaks"
                className="outbreak-ticker-item"
              >
                <span
                  aria-hidden
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#7dd3fc",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "#cbd5e1" }}>{alert.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right CTA */}
        <Link
          href="/outbreaks"
          style={{
            fontSize: "11px",
            color: "#94a3b8",
            textDecoration: "none",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          All alerts →
        </Link>
      </div>

      <style>{`
        .outbreak-ticker-track {
          display: inline-flex;
          align-items: center;
          gap: 32px;
          white-space: nowrap;
          animation: outbreak-ticker-scroll 80s linear infinite;
          will-change: transform;
        }
        .outbreak-ticker-viewport:hover .outbreak-ticker-track {
          animation-play-state: paused;
        }
        .outbreak-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: inherit;
          text-decoration: none;
          transition: color 160ms ease;
        }
        .outbreak-ticker-item:hover {
          color: #7dd3fc;
        }
        @keyframes outbreak-ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .outbreak-ticker-track {
            animation: none;
          }
        }
        @media (max-width: 720px) {
          .outbreak-ticker-track {
            animation-duration: 50s;
          }
        }
      `}</style>
    </div>
  );
}
