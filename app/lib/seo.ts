// Shared SEO / structured-data constants. Single source of truth for the
// author, organization, and publisher used across JSON-LD blocks so the
// E-E-A-T signals (author identity, publisher) stay consistent site-wide.

export const SITE_URL = "https://travelmed.ch";
export const SITE_NAME = "TravelMed";

// Site-wide content review stamp for reference pages that don't carry their own
// per-item review date (e.g. disease profiles). Keep in sync when guidance is
// re-checked against source. ISO form is used for structured data; the human
// form for any visible "reviewed" label.
export const CONTENT_REVIEWED_ISO = "2026-06";
export const CONTENT_REVIEWED = "June 2026";

// "June 2026" → "2026-06" (schema.org Date accepts YYYY-MM). Returns undefined
// for anything it can't confidently parse, so we never emit a malformed date.
const MONTHS: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
  july: "07", august: "08", september: "09", october: "10", november: "11", december: "12",
};
export function humanDateToIsoMonth(human?: string): string | undefined {
  if (!human) return undefined;
  const m = human.trim().toLowerCase().match(/^([a-z]+)\s+(\d{4})$/);
  if (!m) return undefined;
  const mm = MONTHS[m[1]];
  return mm ? `${m[2]}-${mm}` : undefined;
}

// The physician behind the content. Used as the stable @id that author refs
// across articles and pages point back to.
export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/about#person`,
  name: "Marco Seneghini, MD",
  jobTitle: "Infectious diseases physician",
  url: `${SITE_URL}/about`,
  knowsAbout: [
    "Travel medicine",
    "Infectious diseases",
    "Vaccination",
    "Malaria prevention",
    "Tropical medicine",
  ],
};

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Evidence-based, physician-built travel health guidance for international travelers.",
  founder: { "@id": `${SITE_URL}/about#person` },
};

// Lightweight refs for embedding inside Article / MedicalWebPage blocks.
export const authorRef = {
  "@type": "Person",
  name: "Marco Seneghini, MD",
  url: `${SITE_URL}/about`,
};

export const publisherRef = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
};
