// ─────────────────────────────────────────────────────────────────────────────
// Country health data — index
// ─────────────────────────────────────────────────────────────────────────────
//
// This file assembles the per-country entries (one file per country) into the
// single `countries` object that the rest of the app imports.
//
// To EDIT a country's data: open `data/countries/<slug>.ts`.
// To ADD a new country:
//   1. Create `data/countries/<slug>.ts` exporting a typed const
//      (e.g. `export const myCountry: CountryInfo = { ... }`).
//   2. Add an `import` line and a map entry below — both lists are
//      kept alphabetical by slug.
//
// All types are re-exported from `./types`, so existing imports like
//   import { countries, CountryInfo } from "@/data/countries"
// keep working unchanged.
// ─────────────────────────────────────────────────────────────────────────────

import type { CountryInfo } from "./types";

import { afghanistan } from "./afghanistan";
import { albania } from "./albania";
import { algeria } from "./algeria";
import { angola } from "./angola";
import { benin } from "./benin";
import { botswana } from "./botswana";
import { brazil } from "./brazil";
import { burkinaFaso } from "./burkina-faso";
import { burundi } from "./burundi";
import { cameroon } from "./cameroon";
import { capeVerde } from "./cape-verde";
import { centralAfricanRepublic } from "./central-african-republic";
import { chad } from "./chad";
import { colombia } from "./colombia";
import { comoros } from "./comoros";
import { congo } from "./congo";
import { coteDivoire } from "./cote-divoire";
import { djibouti } from "./djibouti";
import { drCongo } from "./dr-congo";
import { egypt } from "./egypt";
import { equatorialGuinea } from "./equatorial-guinea";
import { eritrea } from "./eritrea";
import { eswatini } from "./eswatini";
import { ethiopia } from "./ethiopia";
import { gabon } from "./gabon";
import { gambia } from "./gambia";
import { ghana } from "./ghana";
import { guinea } from "./guinea";
import { guineaBissau } from "./guinea-bissau";
import { india } from "./india";
import { kenya } from "./kenya";
import { lesotho } from "./lesotho";
import { liberia } from "./liberia";
import { libya } from "./libya";
import { madagascar } from "./madagascar";
import { malawi } from "./malawi";
import { mali } from "./mali";
import { mauritania } from "./mauritania";
import { mauritius } from "./mauritius";
import { morocco } from "./morocco";
import { mozambique } from "./mozambique";
import { namibia } from "./namibia";
import { niger } from "./niger";
import { nigeria } from "./nigeria";
import { peru } from "./peru";
import { reunion } from "./reunion";
import { rwanda } from "./rwanda";
import { saoTomeAndPrincipe } from "./sao-tome-and-principe";
import { senegal } from "./senegal";
import { seychelles } from "./seychelles";
import { sierraLeone } from "./sierra-leone";
import { somalia } from "./somalia";
import { southAfrica } from "./south-africa";
import { southSudan } from "./south-sudan";
import { sudan } from "./sudan";
import { tanzania } from "./tanzania";
import { thailand } from "./thailand";
import { togo } from "./togo";
import { tunisia } from "./tunisia";
import { uganda } from "./uganda";
import { zambia } from "./zambia";
import { zimbabwe } from "./zimbabwe";

export const countries: Record<string, CountryInfo> = {
  afghanistan: afghanistan,
  albania: albania,
  algeria: algeria,
  angola: angola,
  benin: benin,
  botswana: botswana,
  brazil: brazil,
  "burkina-faso": burkinaFaso,
  burundi: burundi,
  cameroon: cameroon,
  "cape-verde": capeVerde,
  "central-african-republic": centralAfricanRepublic,
  chad: chad,
  colombia: colombia,
  comoros: comoros,
  congo: congo,
  "cote-divoire": coteDivoire,
  djibouti: djibouti,
  "dr-congo": drCongo,
  egypt: egypt,
  "equatorial-guinea": equatorialGuinea,
  eritrea: eritrea,
  eswatini: eswatini,
  ethiopia: ethiopia,
  gabon: gabon,
  gambia: gambia,
  ghana: ghana,
  guinea: guinea,
  "guinea-bissau": guineaBissau,
  india: india,
  kenya: kenya,
  lesotho: lesotho,
  liberia: liberia,
  libya: libya,
  madagascar: madagascar,
  malawi: malawi,
  mali: mali,
  mauritania: mauritania,
  mauritius: mauritius,
  morocco: morocco,
  mozambique: mozambique,
  namibia: namibia,
  niger: niger,
  nigeria: nigeria,
  peru: peru,
  reunion: reunion,
  rwanda: rwanda,
  "sao-tome-and-principe": saoTomeAndPrincipe,
  senegal: senegal,
  seychelles: seychelles,
  "sierra-leone": sierraLeone,
  somalia: somalia,
  "south-africa": southAfrica,
  "south-sudan": southSudan,
  sudan: sudan,
  tanzania: tanzania,
  thailand: thailand,
  togo: togo,
  tunisia: tunisia,
  uganda: uganda,
  zambia: zambia,
  zimbabwe: zimbabwe,
};

export * from "./types";
