"use client";

import { useEffect, useState } from "react";

// Dark-mode toggle. Light is the default; choosing dark sets data-theme="dark"
// on <html> (which flips the --c-* tokens in globals.css) and persists to
// localStorage. The pre-paint init script in layout.tsx applies the stored
// choice before first render to avoid a flash.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored =
      (typeof document !== "undefined" &&
        (document.documentElement.getAttribute("data-theme") as
          | "light"
          | "dark"
          | null)) ||
      "light";
    // One-time sync of the toggle's UI to the theme the pre-paint script
    // already applied to <html>; this read is only available on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(stored === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        background: "var(--c-surface-2)",
        border: "1px solid var(--c-border)",
        color: "var(--c-text-2)",
        cursor: "pointer",
        flexShrink: 0,
        transition: "all 0.15s ease",
      }}
    >
      {theme === "dark" ? (
        // sun
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // moon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
        </svg>
      )}
    </button>
  );
}
