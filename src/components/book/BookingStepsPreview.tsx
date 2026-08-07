import { BOOKING_STEPS, BOOKING_STEPS_COPY } from "@/lib/constants";

export function BookingStepsPreview() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 px-6 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {BOOKING_STEPS_COPY.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
            {BOOKING_STEPS_COPY.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {BOOKING_STEPS_COPY.description}
          </p>
        </div>

        <ol className="grid gap-3">
          {BOOKING_STEPS.map((step) => (
            <li
              className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-slate-950/5"
              key={step.number}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy text-sm font-bold text-white">
                {step.number}
              </span>
              <div>
                <p className="font-bold text-foreground">{step.title}</p>
                <p className="mt-1 text-sm text-slate-600">
                  Planned booking journey step
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
