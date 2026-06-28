// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/lib/toolsData.ts
//
//   Data for the /tools section — INTERACTIVE utilities (input → output), as
//   opposed to /resources (read/download documents). First tool: a finder for
//   Swiss travel-medicine & yellow-fever vaccination centres.
// ═══════════════════════════════════════════════════════════════════════════

export type ToolStatus = "live" | "soon";

export type Tool = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  color: string;
  soft: string;
  href: string;
  status: ToolStatus;
  tag?: string;
};

export const TOOLS: Tool[] = [
  {
    id: "yellow-fever-centres",
    title: "Yellow-fever vaccination centres",
    blurb: "Find an approved travel-medicine & yellow-fever vaccination centre in Switzerland, by canton.",
    icon: "💉",
    color: "#ca8a04",
    soft: "#fef9c3",
    href: "/tools/yellow-fever-centres",
    status: "live",
    tag: "Switzerland",
  },
  {
    id: "vaccine-finder",
    title: "Vaccine & malaria finder",
    blurb: "Tell us your destination and get the vaccines and malaria advice that apply to your trip.",
    icon: "🧭",
    color: "#0891b2",
    soft: "var(--c-accent-soft)",
    href: "/",
    status: "soon",
  },
  {
    id: "risk-checker",
    title: "Trip risk checker",
    blurb: "Answer a few questions about your itinerary and traveller profile for a tailored risk summary.",
    icon: "🛡️",
    color: "#7c3aed",
    soft: "#ede9fe",
    href: "/tools",
    status: "soon",
  },
];

// ── Swiss yellow-fever / travel-medicine vaccination centres ───────────────
// Yellow-fever vaccine may only be given at officially approved centres. This
// is a CURATED list of major institutional travel-medicine centres (one per
// region/canton); the official Swiss reference is healthytravel.ch. Always
// phone ahead — opening hours for travel consultations are limited.

export type Region = "de" | "fr" | "it";

export type YfCentre = {
  name: string;
  institution?: string;
  city: string;
  canton: string; // canton code
  region: Region;
  website?: string;
  phone?: string; // only where verified
};

export const CANTONS: { code: string; name: string }[] = [
  { code: "ZH", name: "Zürich" },
  { code: "BE", name: "Bern" },
  { code: "BS", name: "Basel-Stadt" },
  { code: "BL", name: "Basel-Landschaft" },
  { code: "GE", name: "Genève" },
  { code: "VD", name: "Vaud" },
  { code: "VS", name: "Valais" },
  { code: "SG", name: "St. Gallen" },
  { code: "LU", name: "Luzern" },
  { code: "AG", name: "Aargau" },
  { code: "FR", name: "Fribourg" },
  { code: "GR", name: "Graubünden" },
  { code: "ZG", name: "Zug" },
  { code: "TG", name: "Thurgau" },
  { code: "TI", name: "Ticino" },
];

export const REGION_LABEL: Record<Region, string> = {
  de: "German-speaking",
  fr: "French-speaking",
  it: "Italian-speaking",
};

export const YF_CENTRES: YfCentre[] = [
  { name: "Travel Clinic / EBPI", institution: "Universitätsspital Zürich", city: "Zürich", canton: "ZH", region: "de", website: "https://www.usz.ch" },
  { name: "Reisemedizin", institution: "Kantonsspital Winterthur", city: "Winterthur", canton: "ZH", region: "de", website: "https://www.ksw.ch" },
  { name: "Travel Clinic, Universitätsklinik für Infektiologie", institution: "Inselspital", city: "Bern", canton: "BE", region: "de", website: "https://www.insel.ch" },
  { name: "Swiss Tropical and Public Health Institute (Swiss TPH)", city: "Allschwil", canton: "BL", region: "de", website: "https://www.swisstph.ch", phone: "+41 61 284 82 55" },
  { name: "Reisemedizin", institution: "Universitätsspital Basel", city: "Basel", canton: "BS", region: "de", website: "https://www.unispital-basel.ch" },
  { name: "Service de médecine tropicale et humanitaire", institution: "Hôpitaux Universitaires de Genève (HUG)", city: "Genève", canton: "GE", region: "fr", website: "https://www.hug.ch", phone: "+41 22 372 96 15" },
  { name: "Centre de médecine des voyages", institution: "Unisanté", city: "Lausanne", canton: "VD", region: "fr", website: "https://www.unisante.ch", phone: "+41 21 314 60 60" },
  { name: "Médecine tropicale et des voyages", institution: "Hôpital du Valais (Institut Central)", city: "Sion", canton: "VS", region: "fr", website: "https://www.hopitalduvalais.ch" },
  { name: "Médecine des voyages", institution: "Hôpital fribourgeois (HFR)", city: "Fribourg", canton: "FR", region: "fr", website: "https://www.h-fr.ch" },
  { name: "Travel Clinic", institution: "Kantonsspital St. Gallen", city: "St. Gallen", canton: "SG", region: "de", website: "https://www.kssg.ch" },
  { name: "Reisemedizin", institution: "Luzerner Kantonsspital", city: "Luzern", canton: "LU", region: "de", website: "https://www.luks.ch" },
  { name: "Reisemedizin", institution: "Kantonsspital Aarau", city: "Aarau", canton: "AG", region: "de", website: "https://www.ksa.ch" },
  { name: "Reisemedizin", institution: "Kantonsspital Graubünden", city: "Chur", canton: "GR", region: "de", website: "https://www.ksgr.ch/reisemedizin" },
  { name: "Reisemedizin & Impfsprechstunde", institution: "Zuger Kantonsspital", city: "Baar", canton: "ZG", region: "de", website: "https://www.zgks.ch" },
  { name: "Reisemedizin", institution: "Spital Thurgau", city: "Münsterlingen", canton: "TG", region: "de", website: "https://www.stgag.ch" },
  { name: "Medicina dei viaggi", institution: "Ente Ospedaliero Cantonale (EOC)", city: "Bellinzona", canton: "TI", region: "it", website: "https://www.eoc.ch" },
];
