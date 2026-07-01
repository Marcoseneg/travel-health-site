"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type CountryOpt = { slug: string; label: string };
type SourceOpt = { id: string; label: string };

export default function OutbreakFilters({
  diseases,
  countries,
  sources,
}: {
  diseases: string[];
  countries: CountryOpt[];
  sources: SourceOpt[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const disease = params.get("disease") ?? "";
  const country = params.get("country") ?? "";
  const source = params.get("source") ?? "";
  const hasFilter = !!(disease || country || source);

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const selectStyle: React.CSSProperties = {
    appearance: "none",
    padding: "8px 30px 8px 13px",
    borderRadius: "999px",
    border: "1px solid var(--c-border)",
    background:
      "var(--c-surface) url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='M6 9l6 6 6-6'/></svg>\") no-repeat right 11px center",
    color: "var(--c-text)",
    fontFamily: "inherit",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  };
  const activeStyle: React.CSSProperties = { borderColor: "var(--c-accent-border)", background: "var(--c-accent-soft)", color: "var(--c-accent-strong)" };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
      <select aria-label="Filter by disease" value={disease} onChange={(e) => setParam("disease", e.target.value)} style={{ ...selectStyle, ...(disease ? activeStyle : {}) }}>
        <option value="">All diseases</option>
        {diseases.map((d) => <option key={d} value={d}>{d}</option>)}
      </select>

      <select aria-label="Filter by country" value={country} onChange={(e) => setParam("country", e.target.value)} style={{ ...selectStyle, ...(country ? activeStyle : {}) }}>
        <option value="">All countries</option>
        {countries.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
      </select>

      <select aria-label="Filter by source" value={source} onChange={(e) => setParam("source", e.target.value)} style={{ ...selectStyle, ...(source ? activeStyle : {}) }}>
        <option value="">All sources</option>
        {sources.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
      </select>

      {hasFilter && (
        <button
          type="button"
          onClick={() => router.replace(pathname, { scroll: false })}
          className="t-label"
          style={{ padding: "8px 12px", borderRadius: "999px", border: "1px solid transparent", background: "transparent", color: "var(--c-text-3)", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
