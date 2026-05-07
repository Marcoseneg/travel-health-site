// app/components/TravelMedLogo.tsx
//
// The TravelMed mark: a stylized tilted globe (circle + ellipse + horizontal
// equator). Same glyph as the browser-tab favicon — using it in the header
// makes the site feel cohesive across the tab, header, and any other
// branded surface.
//
// Usage:
//   <TravelMedLogo />                              // default 20px, cyan
//   <TravelMedLogo size={28} />                    // bigger
//   <TravelMedLogo size={20} className="text-..."/>  // override color via class
//
// The stroke uses `currentColor` so you can recolor it with any text-color
// utility (e.g. text-cyan-300, text-white). Default is the cyan-300 hex
// that already matches your existing accent color.

type Props = {
  size?: number;
  className?: string;
  /** Optional override; defaults to currentColor (inherits text color) */
  strokeColor?: string;
};

export default function TravelMedLogo({
  size = 20,
  className,
  strokeColor = "currentColor",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      // The glyph is purely decorative when used next to the "TravelMed"
      // wordmark, so it's hidden from screen readers.
    >
      {/* outer globe circle */}
      <circle
        cx="16"
        cy="16"
        r="9"
        stroke={strokeColor}
        strokeWidth="1.6"
        fill="none"
      />
      {/* tilted equator (ellipse) */}
      <ellipse
        cx="16"
        cy="16"
        rx="9"
        ry="3.5"
        stroke={strokeColor}
        strokeWidth="1.2"
        fill="none"
      />
      {/* horizontal equator */}
      <line
        x1="7"
        y1="16"
        x2="25"
        y2="16"
        stroke={strokeColor}
        strokeWidth="1.2"
      />
    </svg>
  );
}
