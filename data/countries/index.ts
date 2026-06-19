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
import { bangladesh } from "./bangladesh";
import { belize } from "./belize";
import { benin } from "./benin";
import { bhutan } from "./bhutan";
import { bolivia } from "./bolivia";
import { botswana } from "./botswana";
import { brazil } from "./brazil";
import { burkinaFaso } from "./burkina-faso";
import { burundi } from "./burundi";
import { cambodia } from "./cambodia";
import { cameroon } from "./cameroon";
import { capeVerde } from "./cape-verde";
import { centralAfricanRepublic } from "./central-african-republic";
import { chad } from "./chad";
import { china } from "./china";
import { colombia } from "./colombia";
import { comoros } from "./comoros";
import { congo } from "./congo";
import { costaRica } from "./costa-rica";
import { coteDivoire } from "./cote-divoire";
import { djibouti } from "./djibouti";
import { dominicanRepublic } from "./dominican-republic";
import { drCongo } from "./dr-congo";
import { ecuador } from "./ecuador";
import { egypt } from "./egypt";
import { equatorialGuinea } from "./equatorial-guinea";
import { eritrea } from "./eritrea";
import { eswatini } from "./eswatini";
import { ethiopia } from "./ethiopia";
import { gabon } from "./gabon";
import { gambia } from "./gambia";
import { ghana } from "./ghana";
import { guatemala } from "./guatemala";
import { guinea } from "./guinea";
import { guineaBissau } from "./guinea-bissau";
import { guyana } from "./guyana";
import { haiti } from "./haiti";
import { honduras } from "./honduras";
import { india } from "./india";
import { indonesia } from "./indonesia";
import { iran } from "./iran";
import { iraq } from "./iraq";
import { kenya } from "./kenya";
import { laos } from "./laos";
import { lesotho } from "./lesotho";
import { liberia } from "./liberia";
import { libya } from "./libya";
import { madagascar } from "./madagascar";
import { malawi } from "./malawi";
import { malaysia } from "./malaysia";
import { mali } from "./mali";
import { mauritania } from "./mauritania";
import { mauritius } from "./mauritius";
import { mexico } from "./mexico";
import { morocco } from "./morocco";
import { mozambique } from "./mozambique";
import { myanmar } from "./myanmar";
import { namibia } from "./namibia";
import { nepal } from "./nepal";
import { nicaragua } from "./nicaragua";
import { niger } from "./niger";
import { nigeria } from "./nigeria";
import { northKorea } from "./north-korea";
import { pakistan } from "./pakistan";
import { panama } from "./panama";
import { papuaNewGuinea } from "./papua-new-guinea";
import { paraguay } from "./paraguay";
import { peru } from "./peru";
import { philippines } from "./philippines";
import { reunion } from "./reunion";
import { rwanda } from "./rwanda";
import { saoTomeAndPrincipe } from "./sao-tome-and-principe";
import { saudiArabia } from "./saudi-arabia";
import { senegal } from "./senegal";
import { seychelles } from "./seychelles";
import { sierraLeone } from "./sierra-leone";
import { solomonIslands } from "./solomon-islands";
import { somalia } from "./somalia";
import { southAfrica } from "./south-africa";
import { southKorea } from "./south-korea";
import { southSudan } from "./south-sudan";
import { sudan } from "./sudan";
import { suriname } from "./suriname";
import { tajikistan } from "./tajikistan";
import { tanzania } from "./tanzania";
import { thailand } from "./thailand";
import { timorLeste } from "./timor-leste";
import { togo } from "./togo";
import { tunisia } from "./tunisia";
import { uganda } from "./uganda";
import { vanuatu } from "./vanuatu";
import { venezuela } from "./venezuela";
import { vietnam } from "./vietnam";
import { yemen } from "./yemen";
import { zambia } from "./zambia";
import { zimbabwe } from "./zimbabwe";

export const countries: Record<string, CountryInfo> = {
  afghanistan: afghanistan,
  albania: albania,
  algeria: algeria,
  angola: angola,
  bangladesh: bangladesh,
  belize: belize,
  benin: benin,
  bhutan: bhutan,
  bolivia: bolivia,
  botswana: botswana,
  brazil: brazil,
  "burkina-faso": burkinaFaso,
  burundi: burundi,
  cambodia: cambodia,
  cameroon: cameroon,
  "cape-verde": capeVerde,
  "central-african-republic": centralAfricanRepublic,
  chad: chad,
  china: china,
  colombia: colombia,
  comoros: comoros,
  congo: congo,
  "costa-rica": costaRica,
  "cote-divoire": coteDivoire,
  djibouti: djibouti,
  "dominican-republic": dominicanRepublic,
  "dr-congo": drCongo,
  ecuador: ecuador,
  egypt: egypt,
  "equatorial-guinea": equatorialGuinea,
  eritrea: eritrea,
  eswatini: eswatini,
  ethiopia: ethiopia,
  gabon: gabon,
  gambia: gambia,
  ghana: ghana,
  guatemala: guatemala,
  guinea: guinea,
  "guinea-bissau": guineaBissau,
  guyana: guyana,
  haiti: haiti,
  honduras: honduras,
  india: india,
  indonesia: indonesia,
  iran: iran,
  iraq: iraq,
  kenya: kenya,
  laos: laos,
  lesotho: lesotho,
  liberia: liberia,
  libya: libya,
  madagascar: madagascar,
  malawi: malawi,
  malaysia: malaysia,
  mali: mali,
  mauritania: mauritania,
  mauritius: mauritius,
  mexico: mexico,
  morocco: morocco,
  mozambique: mozambique,
  myanmar: myanmar,
  namibia: namibia,
  nepal: nepal,
  nicaragua: nicaragua,
  niger: niger,
  nigeria: nigeria,
  "north-korea": northKorea,
  pakistan: pakistan,
  panama: panama,
  "papua-new-guinea": papuaNewGuinea,
  paraguay: paraguay,
  peru: peru,
  philippines: philippines,
  reunion: reunion,
  rwanda: rwanda,
  "sao-tome-and-principe": saoTomeAndPrincipe,
  "saudi-arabia": saudiArabia,
  senegal: senegal,
  seychelles: seychelles,
  "sierra-leone": sierraLeone,
  "solomon-islands": solomonIslands,
  somalia: somalia,
  "south-africa": southAfrica,
  "south-korea": southKorea,
  "south-sudan": southSudan,
  sudan: sudan,
  suriname: suriname,
  tajikistan: tajikistan,
  tanzania: tanzania,
  thailand: thailand,
  "timor-leste": timorLeste,
  togo: togo,
  tunisia: tunisia,
  uganda: uganda,
  vanuatu: vanuatu,
  venezuela: venezuela,
  vietnam: vietnam,
  yemen: yemen,
  zambia: zambia,
  zimbabwe: zimbabwe,
};

export * from "./types";
