import { Button } from "@/components/ui";
import { AVAILABILITY_PREVIEW, HOME_PAGE_COPY } from "@/lib/constants";

export function AvailabilityPreview() {
  return (
    <section
      aria-labelledby="availability-title"
      className="bg-surface px-6 py-20 sm:px-8 lg:px-10"
      id="availability"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {AVAILABILITY_PREVIEW.eyebrow}
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
            id="availability-title"
          >
            {AVAILABILITY_PREVIEW.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {AVAILABILITY_PREVIEW.description}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white/85 p-5 shadow-2xl shadow-slate-950/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-emerald-950/15 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                {AVAILABILITY_PREVIEW.stateLabel}
              </span>
              <input
                className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none"
                readOnly
                value={AVAILABILITY_PREVIEW.exampleState}
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                {AVAILABILITY_PREVIEW.cityLabel}
              </span>
              <input
                className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none"
                readOnly
                value={AVAILABILITY_PREVIEW.exampleCity}
              />
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-lg border border-emerald-100 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-emerald-800">
                {AVAILABILITY_PREVIEW.status}
              </p>
              <p className="mt-1 text-sm text-emerald-700">
                Local verification coverage can be checked before booking.
              </p>
            </div>
            <Button className="sm:min-w-44">
              {HOME_PAGE_COPY.primaryCta}
            </Button>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Example available states
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {AVAILABILITY_PREVIEW.availableStates.map((state) => (
                <span
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
                  key={state}
                >
                  {state}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
