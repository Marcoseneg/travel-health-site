// app/components/illustrations/index.ts
//
// Single source of truth for cover illustrations. Re-exports each
// illustration component AND exports the COVER_ILLUSTRATIONS map used
// by the article renderer pages (app/guides/page.tsx and
// app/guides/[slug]/page.tsx).
//
// To add a new cover illustration:
//   1. Create the component file in this folder, e.g.
//      `./NewIllustration.tsx`
//   2. Add an import line below.
//   3. Add an entry to the COVER_ILLUSTRATIONS map.
//   4. Add the matching string to the `coverIllustration` union in
//      `app/lib/guides/types.ts`.
//
// That's it — the renderer pages don't need to be touched again.

import type { ReactElement } from "react";

import MalariaPillsIllustration from "./MalariaPillsIllustration";
import CruiseShipIllustration from "./CruiseShipIllustration";
import RepellentSpraysIllustration from "./RepellentSpraysIllustration";
import ChildTravelKitIllustration from "./ChildTravelKitIllustration";

// Re-export so existing direct imports of individual illustrations
// continue to work without changes.
export {
  MalariaPillsIllustration,
  CruiseShipIllustration,
  RepellentSpraysIllustration,
  ChildTravelKitIllustration,
};

// Map from article.coverIllustration string to the component.
// Renderer pages render `COVER_ILLUSTRATIONS[article.coverIllustration]`
// when the field is present.
export const COVER_ILLUSTRATIONS: Record<string, () => ReactElement> = {
  "malaria-pills": MalariaPillsIllustration,
  "cruise-ship": CruiseShipIllustration,
  "repellent-sprays": RepellentSpraysIllustration,
  "child-travel-kit": ChildTravelKitIllustration,
};
