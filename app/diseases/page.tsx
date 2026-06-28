// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/diseases/page.tsx   (the main "Diseases" landing page)
//
//   Server wrapper: supplies SEO metadata + CollectionPage/ItemList structured
//   data for the disease library, then renders the interactive <DiseaseExplorer>
//   (persistent category sidebar + discovery panels). Per-disease detail lives
//   at /diseases/[slug].
// ═══════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next";
import { diseases, DISEASE_LIST } from "../lib/diseaseData";
import { SITE_URL, publisherRef } from "../lib/seo";
import JsonLd from "../components/JsonLd";
import DiseaseExplorer from "../components/DiseaseExplorer";

export const metadata: Metadata = {
  title: "Disease library — travel health reference",
  description:
    "Browse physician-reviewed profiles of travel-relevant infectious diseases — transmission, risk maps, prevention, and vaccines, grouped by category.",
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TravelMed disease library",
  url: `${SITE_URL}/diseases`,
  publisher: publisherRef,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: DISEASE_LIST.map((slug, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: diseases[slug].label,
      url: `${SITE_URL}/diseases/${slug}`,
    })),
  },
};

export default function DiseasesPage() {
  return (
    <>
      <JsonLd data={collectionSchema} />
      <DiseaseExplorer />
    </>
  );
}
