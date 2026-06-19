"use client";

// app/components/CountUp.tsx
//
// Renders a number that animates from 0 → `end` once the element scrolls
// into view. Uses IntersectionObserver to trigger only on first visibility
// (one-shot), so the animation doesn't replay on every scroll.
//
// Designed for the home-page stats strip. Plays nicely with prefers-reduced-
// motion: if the user prefers reduced motion, we render the final value
// immediately with no animation.

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  duration?: number; // ms
  suffix?: string;   // e.g. "+", "%"
  prefix?: string;   // e.g. ">"
  className?: string;
};

export default function CountUp({
  end,
  duration = 1200,
  suffix = "",
  prefix = "",
  className,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference: jump straight to final value
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // One-time sync to the final value; intentional, no cascading animation.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(end);
      startedRef.current = true;
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            // ease-out-quad for a natural feel
            const startTs = performance.now();
            const tick = (now: number) => {
              const elapsed = now - startTs;
              const t = Math.min(1, elapsed / duration);
              const eased = 1 - (1 - t) * (1 - t);
              setValue(Math.round(end * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
