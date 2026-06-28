// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/diseases/[slug]/page.tsx   (the [slug] folder, with brackets)
//
//   Deep-link route for a single disease. A thin server wrapper that supplies
//   per-disease SEO metadata + MedicalWebPage structured data, then renders the
//   shared Disease Radar dashboard (client) focused on the URL's slug. The
//   dashboard UI lives in app/components/DiseaseRadar.tsx (also used by the
//   main app/diseases/page.tsx).
// ═══════════════════════════════════════════════════════════════════════════

import type { Metadata } from "next";
import { diseases } from "../../lib/diseaseData";
import DiseaseRadar from "../../components/DiseaseRadar";
import JsonLd from "../../components/JsonLd";
import { SITE_URL, authorRef, publisherRef, CONTENT_REVIEWED_ISO } from "../../lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = diseases[slug];
  if (!d) return { title: "Disease reference" };
  return {
    title: `${d.label} — travel health`,
    description:
      `${d.label} for travelers: transmission, prevention, symptoms, and treatment. ${d.transmission}`.slice(
        0,
        155
      ),
  };
}

export default async function DiseasePage({ params }: Props) {
  const { slug } = await params;
  const d = diseases[slug];

  const schema = d
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: `${d.label} — travel health`,
        description: d.transmission,
        url: `${SITE_URL}/diseases/${slug}`,
        author: authorRef,
        publisher: publisherRef,
        about: { "@type": "MedicalCondition", name: d.label },
        audience: { "@type": "MedicalAudience", audienceType: "Travelers" },
        lastReviewed: CONTENT_REVIEWED_ISO,
        dateModified: CONTENT_REVIEWED_ISO,
      }
    : null;

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <DiseaseRadar slug={slug} />
    </>
  );
}
