import { PACKAGE_CARDS, SECTION_COPY } from "@/lib/constants";

export function PackageCards() {
  return (
    <section
      aria-labelledby="packages-title"
      className="bg-surface px-6 py-20 sm:px-8 lg:px-10"
      id="packages"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {SECTION_COPY.packages.eyebrow}
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
            id="packages-title"
          >
            {SECTION_COPY.packages.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {SECTION_COPY.packages.description}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {PACKAGE_CARDS.map((item) => (
            <article
              className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-2xl hover:shadow-slate-950/10"
              key={item.title}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-300" />
              <p className="text-sm font-semibold text-primary">
                {item.highlight}
              </p>
              <h3 className="mt-4 text-xl font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  ✓
                </span>
                Evidence-led verification
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
