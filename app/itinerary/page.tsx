import { countries, CountryInfo } from "../../data/countries";

type Props = {
  searchParams: Promise<{
    countries?: string;
  }>;
};

function uniqueValues(values: string[]) {
  return [...new Set(values)];
}

export default async function ItineraryPage({ searchParams }: Props) {
  const { countries: countriesParam } = await searchParams;
  const selected = countriesParam ? countriesParam.split(",") : [];

  const selectedData: { slug: string; data: CountryInfo }[] = selected
    .map((country) => ({ slug: country, data: countries[country] }))
    .filter((item) => item.data);

  const allRecommended = uniqueValues(selectedData.flatMap((item) => item.data.vaccinesRecommended));
  const allConsider = uniqueValues(selectedData.flatMap((item) => item.data.vaccinesConsider)).filter((v) => !allRecommended.includes(v));
  const malariaLevels = selectedData.map((item) => item.data.malariaRisk);

  let malariaSummary = "No relevant malaria risk identified in this itinerary.";
  if (malariaLevels.includes("high")) malariaSummary = "At least one destination in this itinerary has high malaria risk. Prophylaxis should be assessed carefully based on exact route and travel style.";
  else if (malariaLevels.includes("present")) malariaSummary = "Malaria risk is present in at least one destination in this itinerary. The need for prophylaxis depends on the exact route and travel conditions.";
  else if (malariaLevels.includes("limited")) malariaSummary = "Malaria risk is limited to certain areas within this itinerary. Region-specific assessment is important.";

  const yellowFeverLevels = selectedData.map((item) => item.data.yellowFever);
  let yellowFeverSummary = "No yellow fever vaccination requirement is apparent from the selected itinerary alone.";
  if (yellowFeverLevels.includes("required-or-recommended")) yellowFeverSummary = "Yellow fever vaccination may be required or recommended for at least one destination in this itinerary, depending on the route and entry requirements.";
  else if (yellowFeverLevels.includes("possible")) yellowFeverSummary = "Yellow fever vaccination may be relevant for part of this itinerary depending on region and travel route.";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sky-700">Itinerary</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Your travel recommendations</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          {selected.map((country) => (
            <span key={country} className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
              {country.charAt(0).toUpperCase() + country.slice(1)}
            </span>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-sky-700">Combined summary</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Itinerary-based travel health assessment</h2>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              {selectedData.length} destination{selectedData.length !== 1 ? "s" : ""} selected
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Vaccination strategy</h3>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
                <div><p className="font-medium text-slate-900">Recommended across this itinerary</p><p>{allRecommended.length > 0 ? allRecommended.join(", ") : "No shared vaccine recommendation identified."}</p></div>
                <div><p className="font-medium text-slate-900">Additional vaccines to consider</p><p>{allConsider.length > 0 ? allConsider.join(", ") : "No additional conditional vaccines identified."}</p></div>
                <p className="text-slate-600">Ensure routine immunizations are reviewed and updated before departure.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Malaria assessment</h3>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
                <p>{malariaSummary}</p>
                <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200">
                  <p className="font-medium text-slate-900">Clinical interpretation</p>
                  <p className="mt-1 text-slate-600">The need for chemoprophylaxis should be based on the highest-risk segment of the itinerary, including exact region, duration, season, and travel style.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Yellow fever / entry considerations</h3>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
                <p>{yellowFeverSummary}</p>
                <p className="text-slate-600">Requirements may depend not only on destination, but also on transit and prior stay in endemic areas.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">General preventive measures</h3>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
                <div><p className="font-medium text-slate-900">Food & water hygiene</p><p>Food and water precautions are relevant across this itinerary, especially to reduce the risk of traveler's diarrhea.</p></div>
                <div><p className="font-medium text-slate-900">Mosquito protection</p><p>Mosquito protection should be emphasized across this itinerary, particularly because mosquito-borne infections may be relevant in one or more destinations.</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-10">
          {selectedData.map(({ slug, data }) => (
            <div key={slug} className="space-y-6">
              <h2 className="text-3xl font-bold">{slug.charAt(0).toUpperCase() + slug.slice(1)}</h2>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-xl font-semibold">Vaccines</h3><p className="mt-3 text-slate-600"><strong>Recommended:</strong> {data.vaccinesRecommended.join(", ")}</p><p className="mt-3 text-slate-600"><strong>Consider:</strong> {data.vaccinesConsider.join(", ")}</p></div>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-xl font-semibold">Malaria</h3><p className="mt-3 text-slate-600">{data.malariaRisk}</p></div>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-xl font-semibold">Yellow Fever</h3><p className="mt-3 text-slate-600">{data.yellowFever}</p></div>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-xl font-semibold">Food & Water</h3><p className="mt-3 text-slate-600">{data.foodWater}</p></div>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-xl font-semibold">Mosquito Protection</h3><p className="mt-3 text-slate-600">{data.mosquito}</p></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
