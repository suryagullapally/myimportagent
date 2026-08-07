import { SECTION_COPY, WORKFLOW_STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="border-y border-slate-200 bg-slate-50 px-6 py-20 sm:px-8 lg:px-10"
      id="how-it-works"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {SECTION_COPY.howItWorks.eyebrow}
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
            id="how-it-works-title"
          >
            {SECTION_COPY.howItWorks.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {SECTION_COPY.howItWorks.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((step) => (
            <article
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-950/10"
              key={step.title}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-navy text-sm font-bold text-white transition group-hover:bg-primary">
                {step.label.replace("Step ", "")}
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
