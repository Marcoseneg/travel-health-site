// app/components/illustrations/MalariaPillsIllustration.tsx
//
// Stylized SVG illustration of the three malaria prophylaxis options
// (Malarone, Doxycycline, Mefloquine), each rendered as a colored
// capsule with the brand name beneath.
//
// Colors are chosen for the article's design language, not pharmacological
// accuracy:
//   Malarone     — cyan #38bdf8  (primary accent — "the default")
//   Doxycycline  — amber #f59e0b
//   Mefloquine   — violet #a78bfa
//
// Each capsule has a soft inner highlight for depth without looking
// glossy/stocky. Uses currentColor where reasonable so the wordmarks
// can be re-tinted via CSS if needed.

export default function MalariaPillsIllustration() {
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
        {/* Capsule body gradients (top→bottom for soft 3D feel) */}
        <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="violetGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      {/* Subtle backdrop */}
      <rect x="0" y="0" width="600" height="240" fill="rgba(255,255,255,0.015)" rx="12" />

      {/* ── Capsule 1: Malarone (cyan) ──────────────────────────────────── */}
      <g transform="translate(80, 80) rotate(-12 70 30)">
        {/* shadow */}
        <ellipse cx="70" cy="62" rx="60" ry="6" fill="#000" opacity="0.4" />
        {/* body */}
        <rect x="10" y="10" width="120" height="44" rx="22" fill="url(#cyanGrad)" />
        {/* split line */}
        <line x1="70" y1="10" x2="70" y2="54" stroke="#0c4a6e" strokeWidth="0.8" opacity="0.7" />
        {/* highlight */}
        <ellipse cx="70" cy="20" rx="50" ry="5" fill="#ffffff" opacity="0.35" />
      </g>

      {/* ── Capsule 2: Doxycycline (amber) ──────────────────────────────── */}
      <g transform="translate(240, 80) rotate(8 70 30)">
        <ellipse cx="70" cy="62" rx="60" ry="6" fill="#000" opacity="0.4" />
        <rect x="10" y="10" width="120" height="44" rx="22" fill="url(#amberGrad)" />
        <line x1="70" y1="10" x2="70" y2="54" stroke="#78350f" strokeWidth="0.8" opacity="0.7" />
        <ellipse cx="70" cy="20" rx="50" ry="5" fill="#ffffff" opacity="0.35" />
      </g>

      {/* ── Capsule 3: Mefloquine (violet) ──────────────────────────────── */}
      <g transform="translate(400, 80) rotate(-6 70 30)">
        <ellipse cx="70" cy="62" rx="60" ry="6" fill="#000" opacity="0.4" />
        <rect x="10" y="10" width="120" height="44" rx="22" fill="url(#violetGrad)" />
        <line x1="70" y1="10" x2="70" y2="54" stroke="#3b0764" strokeWidth="0.8" opacity="0.7" />
        <ellipse cx="70" cy="20" rx="50" ry="5" fill="#ffffff" opacity="0.35" />
      </g>

      {/* ── Wordmarks ──────────────────────────────────────────────────── */}
      <text
        x="150"
        y="195"
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="#7dd3fc"
        letterSpacing="-0.01em"
      >
        Malarone
      </text>
      <text
        x="150"
        y="213"
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="11"
        fill="#64748b"
      >
        atovaquone-proguanil
      </text>

      <text
        x="310"
        y="195"
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="#fbbf24"
        letterSpacing="-0.01em"
      >
        Doxycycline
      </text>
      <text
        x="310"
        y="213"
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="11"
        fill="#64748b"
      >
        broad-spectrum tetracycline
      </text>

      <text
        x="470"
        y="195"
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="#c4b5fd"
        letterSpacing="-0.01em"
      >
        Mefloquine
      </text>
      <text
        x="470"
        y="213"
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="11"
        fill="#64748b"
      >
        Lariam
      </text>
    </svg>
  );
}
