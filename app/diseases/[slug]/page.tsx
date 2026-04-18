import { diseases } from "../../lib/diseaseData";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DiseasePage({ params }: Props) {
  const { slug } = await params;
  const disease = diseases[slug];

  if (!disease) {
    notFound();
  }

  const riskColors = {
    low: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "Low Risk" },
    moderate: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Moderate Risk" },
    high: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "High Risk" },
  };
  const risk = riskColors[disease.riskLevel];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-start justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sky-700">Disease Profile</p>
            <h1 className="flex items-center gap-4 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="text-4xl">{disease.icon}</span>
              {disease.label}
            </h1>
            <p className="mt-3 text-lg text-slate-500">{disease.category}</p>
          </div>
          <div className={`rounded-full ${risk.bg} ${risk.border} border px-4 py-2 text-sm font-semibold ${risk.text}`}>{risk.label}</div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-lg font-semibold text-slate-900">Transmission</h3><p className="mt-3 text-sm leading-7 text-slate-600">{disease.transmission}</p></div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-lg font-semibold text-slate-900">Symptoms</h3><p className="mt-3 text-sm leading-7 text-slate-600">{disease.symptoms}</p></div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Prevention</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{disease.prevention}</p>
            {disease.vaccineAvailable && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">💉 Vaccine available</div>
            )}
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-lg font-semibold text-slate-900">Treatment</h3><p className="mt-3 text-sm leading-7 text-slate-600">{disease.treatment}</p></div>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-lg font-semibold text-slate-900">Geographic Distribution</h3><p className="mt-3 text-sm leading-7 text-slate-600">{disease.regions}</p></div>

        <div className="mt-10 rounded-2xl bg-slate-100 p-5 text-xs leading-6 text-slate-500">
          <strong className="text-slate-600">Disclaimer:</strong> This information is for educational purposes only and does not replace professional medical advice.
        </div>
      </section>
    </main>
  );
}
