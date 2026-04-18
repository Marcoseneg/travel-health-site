import { countries } from "../../../data/countries";

type Props = {
  params: Promise<{
    country: string;
  }>;
};

export default async function CountryPage({ params }: Props) {
  const { country } = await params;

  const countryData = countries[country as keyof typeof countries];

  if (!countryData) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sky-700">
            Destination
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Country not found
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            This destination is not yet available in the database.
          </p>
        </section>
      </main>
    );
  }

  const countryName = country.charAt(0).toUpperCase() + country.slice(1);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sky-700">
          Destination
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {countryName}
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Travel health recommendations for {countryName}. Risk depends on
          itinerary, duration, and travel style.
        </p>

        <div className="mt-10 space-y-8">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold">Vaccines</h2>
            <p className="mt-3 text-slate-600">{countryData.vaccines}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold">Malaria</h2>
            <p className="mt-3 text-slate-600">{countryData.malaria}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold">Yellow Fever</h2>
            <p className="mt-3 text-slate-600">{countryData.yellowFever}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold">Food & Water</h2>
            <p className="mt-3 text-slate-600">{countryData.foodWater}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold">Mosquito Protection</h2>
            <p className="mt-3 text-slate-600">{countryData.mosquito}</p>
          </div>
        </div>
      </section>
    </main>
  );
}