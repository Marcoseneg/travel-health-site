// app/components/illustrations/CruiseShipIllustration.tsx
//
// Stylized SVG cruise ship illustration for the cruise health guide.
// Side-profile of a multi-deck cruise ship at sea, with a subtle wake
// and horizon line. Monochromatic with the site's cyan accent — designed
// to feel editorial rather than stock-photo.
//
// Renders inside an article cover-illustration block (transparent
// background, full container width). Aspect ratio ~ 5:2.

export default function CruiseShipIllustration() {
  return (
    <svg
      viewBox="0 0 600 240"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
      aria-hidden="true"
    >
      {/* Ambient deep-sea gradient backdrop */}
      <defs>
        <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="hullGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="superGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>

      {/* Sky / sea backdrop */}
      <rect x="0" y="0" width="600" height="240" fill="url(#seaGrad)" rx="12" />

      {/* Distant horizon stars (a few subtle dots for atmosphere) */}
      <circle cx="60" cy="40" r="0.8" fill="#7dd3fc" opacity="0.6" />
      <circle cx="120" cy="25" r="0.6" fill="#7dd3fc" opacity="0.4" />
      <circle cx="540" cy="35" r="0.7" fill="#7dd3fc" opacity="0.5" />
      <circle cx="490" cy="55" r="0.5" fill="#7dd3fc" opacity="0.3" />
      <circle cx="450" cy="20" r="0.6" fill="#7dd3fc" opacity="0.4" />

      {/* Horizon line — subtle */}
      <line
        x1="0"
        y1="155"
        x2="600"
        y2="155"
        stroke="#1e293b"
        strokeWidth="0.5"
        opacity="0.5"
      />

      {/* Distant ship faint silhouette (sense of scale) */}
      <g opacity="0.25">
        <rect x="510" y="148" width="35" height="6" fill="#475569" />
        <rect x="515" y="142" width="20" height="6" fill="#475569" />
      </g>

      {/* ── Main cruise ship ────────────────────────────────────────────── */}
      {/* Hull (lower) — shaped with a slight bow forward */}
      <path
        d="M 110 165
           L 480 165
           L 470 185
           Q 460 192, 440 192
           L 145 192
           Q 125 192, 118 185
           Z"
        fill="url(#hullGrad)"
        stroke="#334155"
        strokeWidth="0.8"
      />

      {/* Hull stripe (subtle accent) */}
      <line x1="120" y1="172" x2="475" y2="172" stroke="#38bdf8" strokeWidth="0.6" opacity="0.6" />

      {/* Superstructure (white decks) */}
      <rect x="135" y="135" width="335" height="30" fill="url(#superGrad)" rx="2" />
      <rect x="160" y="120" width="280" height="15" fill="#e2e8f0" rx="1" />
      <rect x="190" y="108" width="220" height="12" fill="#e2e8f0" rx="1" />
      <rect x="220" y="98" width="160" height="10" fill="#e2e8f0" rx="1" />

      {/* Funnels */}
      <rect x="265" y="78" width="22" height="22" fill="#1e293b" stroke="#334155" strokeWidth="0.6" rx="2" />
      <rect x="313" y="82" width="18" height="18" fill="#1e293b" stroke="#334155" strokeWidth="0.6" rx="2" />

      {/* Funnel accent stripe */}
      <rect x="265" y="80" width="22" height="3" fill="#38bdf8" opacity="0.8" />
      <rect x="313" y="83" width="18" height="2.5" fill="#38bdf8" opacity="0.8" />

      {/* Bridge windows row (top deck) */}
      {Array.from({ length: 16 }).map((_, i) => (
        <rect
          key={`bridge-${i}`}
          x={224 + i * 9.6}
          y="101"
          width="6"
          height="3"
          fill="#0c4a6e"
          opacity="0.9"
        />
      ))}

      {/* Mid-deck windows */}
      {Array.from({ length: 22 }).map((_, i) => (
        <rect
          key={`mid-${i}`}
          x={195 + i * 9.6}
          y="124"
          width="6"
          height="4"
          fill="#0c4a6e"
          opacity="0.85"
        />
      ))}

      {/* Cabin portholes — long row, dotted */}
      {Array.from({ length: 36 }).map((_, i) => (
        <circle
          key={`port-${i}`}
          cx={150 + i * 8.7}
          cy="148"
          r="1.4"
          fill="#fbbf24"
          opacity="0.75"
        />
      ))}

      {/* Lower-deck cabin lights row */}
      {Array.from({ length: 32 }).map((_, i) => (
        <rect
          key={`lower-${i}`}
          x={155 + i * 9.6}
          y="155"
          width="3"
          height="2"
          fill="#fbbf24"
          opacity="0.4"
        />
      ))}

      {/* ── Wake / water ────────────────────────────────────────────────── */}
      {/* Subtle wake lines fanning back */}
      <path
        d="M 470 188 Q 510 195, 555 200"
        stroke="#7dd3fc"
        strokeWidth="0.6"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M 475 192 Q 520 200, 575 207"
        stroke="#7dd3fc"
        strokeWidth="0.5"
        fill="none"
        opacity="0.25"
      />
      <path
        d="M 478 196 Q 530 206, 590 215"
        stroke="#7dd3fc"
        strokeWidth="0.4"
        fill="none"
        opacity="0.18"
      />

      {/* Foreground sea ripples */}
      <line x1="0" y1="200" x2="105" y2="200" stroke="#1e293b" strokeWidth="0.6" opacity="0.6" />
      <line x1="0" y1="208" x2="60" y2="208" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" />
      <line x1="80" y1="215" x2="180" y2="215" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" />
      <line x1="220" y1="222" x2="350" y2="222" stroke="#1e293b" strokeWidth="0.5" opacity="0.35" />
      <line x1="380" y1="216" x2="500" y2="216" stroke="#1e293b" strokeWidth="0.5" opacity="0.35" />
      <line x1="510" y1="226" x2="600" y2="226" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}
