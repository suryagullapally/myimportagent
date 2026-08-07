import { TRUST_COPY } from "@/lib/constants";

export function TrustSection() {
  return (
    <section
      aria-labelledby="trust-title"
      className="bg-surface px-6 py-20 sm:px-8 lg:px-10"
      id="trust"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-stretch">
          <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl shadow-slate-950/5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Trust position
            </p>
            <h2
              className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
              id="trust-title"
            >
              {TRUST_COPY.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              {TRUST_COPY.statement}
            </p>
          </div>

          <aside className="rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">
              Scope clarity
            </p>
            <p className="mt-4 text-lg font-bold leading-7 text-slate-950">
              {TRUST_COPY.exclusion}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
