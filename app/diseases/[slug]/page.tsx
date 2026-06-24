// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/diseases/[slug]/page.tsx   (the [slug] folder, with brackets)
//
//   Deep-link route for a single disease. Renders the shared Disease Radar
//   dashboard focused on the URL's slug. The dashboard UI lives in
//   app/components/DiseaseRadar.tsx (also used by the main app/diseases/page.tsx).
// ═══════════════════════════════════════════════════════════════════════════

"use client";

import { useParams } from "next/navigation";
import DiseaseRadar from "../../components/DiseaseRadar";

export default function DiseasePage() {
  const params = useParams();
  return <DiseaseRadar slug={params.slug as string} />;
}
