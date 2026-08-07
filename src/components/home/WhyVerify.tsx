import { SECTION_COPY, WHY_VERIFY_BENEFITS } from "@/lib/constants";

export function WhyVerify() {
  return (
    <section className="bg-navy px-6 py-20 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">
            {SECTION_COPY.whyVerify.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-normal sm:text-4xl">
            {SECTION_COPY.whyVerify.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            {SECTION_COPY.whyVerify.description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {WHY_VERIFY_BENEFITS.map((benefit) => (
            <article
              className="rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.11]"
              key={benefit.title}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-400 text-sm font-bold text-slate-950">
                ✓
              </div>
              <h3 className="mt-4 text-lg font-bold">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
