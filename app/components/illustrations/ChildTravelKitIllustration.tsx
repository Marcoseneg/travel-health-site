// app/components/illustrations/ChildTravelKitIllustration.tsx
//
// Stylized SVG flat-lay of a child's travel kit, used as the cover for the
// "Travelling internationally with children" guide. Four objects arranged
// across the canvas, each tilted slightly for a casual lay-flat feel:
//
//   1. Swiss passport (left)        — travel context, with subtle Swiss-flag nod
//   2. Stuffed bear (center)        — the child
//   3. Sun hat (upper right)        — sun protection theme
//   4. Pediatric medicine bottle    — the medical lens of the article
//
// Designed to read as editorial illustration, not stock photo. Sits on the
// burgundy gradient cover; near-transparent backdrop lets the gradient
// show through behind the objects.

export default function ChildTravelKitIllustration() {
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
        <linearGradient id="bearGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="passportGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
        <linearGradient id="hatBrimGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hatCrownGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>

      {/* Subtle backdrop — lets the article gradient show through */}
      <rect x="0" y="0" width="600" height="240" fill="rgba(255,255,255,0.015)" rx="12" />

      {/* ── Soft shadows under each item ─────────────────────────────────── */}
      <ellipse cx="115" cy="205" rx="58" ry="5" fill="#000" opacity="0.35" />
      <ellipse cx="280" cy="208" rx="55" ry="5" fill="#000" opacity="0.4" />
      <ellipse cx="430" cy="135" rx="48" ry="4" fill="#000" opacity="0.3" />
      <ellipse cx="500" cy="207" rx="32" ry="4" fill="#000" opacity="0.35" />

      {/* ── 1. Passport (left, tilted slightly anti-clockwise) ──────────── */}
      <g transform="translate(70, 95) rotate(-8 45 55)">
        <rect x="0" y="0" width="90" height="110" rx="4" fill="url(#passportGrad)" />
        {/* Swiss cross emblem */}
        <g transform="translate(45, 38)">
          <rect x="-3.5" y="-13" width="7" height="26" fill="#ffffff" />
          <rect x="-13" y="-3.5" width="26" height="7" fill="#ffffff" />
        </g>
        {/* "PASSPORT" wordmark */}
        <text
          x="45"
          y="86"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="8"
          fontWeight="700"
          fill="#fde68a"
          letterSpacing="0.12em"
        >
          PASSPORT
        </text>
        {/* Tiny embossed line under wordmark */}
        <line x1="20" y1="93" x2="70" y2="93" stroke="#fde68a" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* ── 2. Stuffed bear (center, tilted slightly clockwise) ─────────── */}
      <g transform="translate(225, 75) rotate(6 55 65)">
        {/* Ears (drawn before head so they sit behind) */}
        <circle cx="22" cy="22" r="13" fill="url(#bearGrad)" />
        <circle cx="88" cy="22" r="13" fill="url(#bearGrad)" />
        {/* Inner ears */}
        <circle cx="22" cy="24" r="6" fill="#d97706" opacity="0.7" />
        <circle cx="88" cy="24" r="6" fill="#d97706" opacity="0.7" />
        {/* Body — slightly larger oval */}
        <ellipse cx="55" cy="105" rx="42" ry="42" fill="url(#bearGrad)" />
        {/* Head */}
        <circle cx="55" cy="50" r="32" fill="url(#bearGrad)" />
        {/* Snout */}
        <ellipse cx="55" cy="58" rx="13" ry="9" fill="#fef3c7" />
        {/* Eyes */}
        <circle cx="45" cy="45" r="2.5" fill="#1f2937" />
        <circle cx="65" cy="45" r="2.5" fill="#1f2937" />
        {/* Eye highlights */}
        <circle cx="45.7" cy="44.3" r="0.8" fill="#ffffff" />
        <circle cx="65.7" cy="44.3" r="0.8" fill="#ffffff" />
        {/* Nose */}
        <ellipse cx="55" cy="55" rx="3" ry="2" fill="#1f2937" />
        {/* Mouth — small smile */}
        <path d="M 50 61 Q 55 64, 60 61" stroke="#1f2937" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        {/* Bow tie at neck */}
        <path d="M 42 82 L 68 82 L 62 88 L 68 94 L 42 94 L 48 88 Z" fill="#dc2626" />
        <circle cx="55" cy="88" r="2.5" fill="#7f1d1d" />
        {/* Arms */}
        <ellipse cx="15" cy="100" rx="11" ry="20" fill="url(#bearGrad)" />
        <ellipse cx="95" cy="100" rx="11" ry="20" fill="url(#bearGrad)" />
        {/* Legs */}
        <ellipse cx="38" cy="142" rx="12" ry="14" fill="url(#bearGrad)" />
        <ellipse cx="72" cy="142" rx="12" ry="14" fill="url(#bearGrad)" />
        {/* Paw pads */}
        <ellipse cx="38" cy="150" rx="6" ry="4" fill="#fef3c7" />
        <ellipse cx="72" cy="150" rx="6" ry="4" fill="#fef3c7" />
      </g>

      {/* ── 3. Sun hat (upper right, slight tilt) ───────────────────────── */}
      <g transform="translate(382, 90) rotate(-4 50 45)">
        {/* Brim — wide oval seen from slight angle */}
        <ellipse cx="48" cy="48" rx="50" ry="12" fill="url(#hatBrimGrad)" />
        {/* Brim inner shadow */}
        <ellipse cx="48" cy="48" rx="40" ry="8" fill="#d97706" opacity="0.4" />
        {/* Crown — dome on top */}
        <ellipse cx="48" cy="34" rx="22" ry="18" fill="url(#hatCrownGrad)" />
        {/* Crown top highlight */}
        <ellipse cx="48" cy="26" rx="14" ry="5" fill="#fef9c3" opacity="0.7" />
        {/* Band around base of crown */}
        <ellipse cx="48" cy="48" rx="22" ry="3.5" fill="#dc2626" opacity="0.9" />
      </g>

      {/* ── 4. Pediatric medicine bottle (lower right, slight tilt) ─────── */}
      <g transform="translate(465, 145) rotate(10 35 35)">
        {/* Cap */}
        <rect x="10" y="0" width="50" height="13" rx="2" fill="#1e293b" />
        <line x1="14" y1="6.5" x2="56" y2="6.5" stroke="#475569" strokeWidth="0.5" />
        {/* Bottle body */}
        <rect x="6" y="13" width="58" height="62" rx="5" fill="#f8fafc" />
        {/* Bottle highlight strip */}
        <rect x="9" y="15" width="4" height="56" rx="2" fill="#ffffff" opacity="0.6" />
        {/* Label */}
        <rect x="10" y="23" width="50" height="42" fill="#3b82f6" rx="1" />
        {/* Label text */}
        <text
          x="35"
          y="36"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="6.5"
          fontWeight="700"
          fill="#ffffff"
          letterSpacing="0.04em"
        >
          CHILDREN&apos;S
        </text>
        <text
          x="35"
          y="46"
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="7.5"
          fontWeight="800"
          fill="#ffffff"
        >
          PARACETAMOL
        </text>
        <text
          x="35"
          y="60"
          textAnchor="middle"
          fontSize="11"
          fill="#ef4444"
        >
          ♥
        </text>
      </g>

      {/* Scattered accent dots for atmosphere */}
      <circle cx="190" cy="48" r="1.4" fill="#fbbf24" opacity="0.45" />
      <circle cx="355" cy="170" r="1.6" fill="#fbbf24" opacity="0.5" />
      <circle cx="555" cy="75" r="1.2" fill="#fbbf24" opacity="0.5" />
      <circle cx="525" cy="120" r="1" fill="#fbbf24" opacity="0.4" />
    </svg>
  );
}
