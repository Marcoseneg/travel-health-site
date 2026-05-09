// app/components/illustrations/RepellentSpraysIllustration.tsx
//
// Stylized SVG illustration of three insect-repellent spray bottles —
// the main products discussed in the Swiss repellent guide:
//   1. Anti-Brumm Forte (DEET)         — green label
//   2. NoBite Skin (picaridin/icaridin) — blue label
//   3. NoBite Clothes (permethrin)      — amber label
//
// Each bottle is a simple side-view: trigger sprayer + neck + body, with
// a colored label band and a small "spray" puff above the nozzle for the
// first bottle (suggests "in use").
//
// Designed to feel illustrative and editorial, not stock-photo-realistic.

export default function RepellentSpraysIllustration() {
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
      <defs>
        {/* Body gradient — soft cylindrical highlight */}
        <linearGradient id="bottleBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        {/* Label gradients — three colors */}
        <linearGradient id="labelGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="labelBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="labelAmber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Subtle backdrop */}
      <rect x="0" y="0" width="600" height="240" fill="rgba(255,255,255,0.012)" rx="12" />

      {/* ── Bottle 1: Anti-Brumm Forte (DEET) — leftmost, slight tilt left ── */}
      <g transform="translate(120, 50) rotate(-5 50 90)">
        {/* Spray puff (in use) */}
        <g opacity="0.55">
          <circle cx="20" cy="-2" r="3" fill="#7dd3fc" />
          <circle cx="10" cy="6" r="2.2" fill="#7dd3fc" />
          <circle cx="28" cy="10" r="1.8" fill="#7dd3fc" />
          <circle cx="4" cy="14" r="1.4" fill="#7dd3fc" />
          <circle cx="22" cy="20" r="1" fill="#7dd3fc" />
        </g>
        {/* Trigger / sprayer head */}
        <path
          d="M 35 0 L 70 0 L 75 10 L 70 18 L 60 18 L 60 25 L 38 25 L 38 18 L 35 18 Z"
          fill="#475569"
        />
        {/* Neck */}
        <rect x="42" y="25" width="22" height="12" fill="#334155" />
        {/* Body */}
        <rect x="22" y="37" width="62" height="120" rx="6" fill="url(#bottleBody)" />
        {/* Label */}
        <rect x="22" y="62" width="62" height="60" fill="url(#labelGreen)" />
        {/* Label brand text */}
        <text
          x="53"
          y="84"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="9"
          fontWeight="800"
          fill="#022c22"
          letterSpacing="0.04em"
        >
          ANTI-BRUMM
        </text>
        <text
          x="53"
          y="98"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="11"
          fontWeight="700"
          fill="#022c22"
        >
          FORTE
        </text>
        <text
          x="53"
          y="114"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="7"
          fontWeight="600"
          fill="#064e3b"
        >
          30% DEET
        </text>
      </g>

      {/* ── Bottle 2: NoBite Skin (picaridin) — middle, upright ─────────── */}
      <g transform="translate(265, 60)">
        {/* Trigger / sprayer head */}
        <path
          d="M 35 0 L 70 0 L 75 10 L 70 18 L 60 18 L 60 25 L 38 25 L 38 18 L 35 18 Z"
          fill="#475569"
        />
        <rect x="42" y="25" width="22" height="12" fill="#334155" />
        <rect x="22" y="37" width="62" height="120" rx="6" fill="url(#bottleBody)" />
        <rect x="22" y="62" width="62" height="60" fill="url(#labelBlue)" />
        <text
          x="53"
          y="86"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#0c4a6e"
          letterSpacing="0.02em"
        >
          NoBite
        </text>
        <text
          x="53"
          y="100"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="9"
          fontWeight="700"
          fill="#0c4a6e"
        >
          SKIN
        </text>
        <text
          x="53"
          y="114"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="7"
          fontWeight="600"
          fill="#075985"
        >
          20% icaridin
        </text>
      </g>

      {/* ── Bottle 3: NoBite Clothes (permethrin) — rightmost, slight tilt right ── */}
      <g transform="translate(410, 50) rotate(5 50 90)">
        <path
          d="M 35 0 L 70 0 L 75 10 L 70 18 L 60 18 L 60 25 L 38 25 L 38 18 L 35 18 Z"
          fill="#475569"
        />
        <rect x="42" y="25" width="22" height="12" fill="#334155" />
        <rect x="22" y="37" width="62" height="120" rx="6" fill="url(#bottleBody)" />
        <rect x="22" y="62" width="62" height="60" fill="url(#labelAmber)" />
        <text
          x="53"
          y="86"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#451a03"
          letterSpacing="0.02em"
        >
          NoBite
        </text>
        <text
          x="53"
          y="100"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="8"
          fontWeight="700"
          fill="#451a03"
        >
          CLOTHES
        </text>
        <text
          x="53"
          y="114"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="7"
          fontWeight="600"
          fill="#78350f"
        >
          permethrin
        </text>
      </g>

      {/* Subtle shelf line / shadow */}
      <ellipse cx="170" cy="208" rx="55" ry="3" fill="#000" opacity="0.35" />
      <ellipse cx="318" cy="220" rx="55" ry="3" fill="#000" opacity="0.4" />
      <ellipse cx="465" cy="208" rx="55" ry="3" fill="#000" opacity="0.35" />
    </svg>
  );
}
