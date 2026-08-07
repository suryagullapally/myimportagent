import { BOOKING_HERO_COPY } from "@/lib/constants";

export function BookingHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy px-6 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(56,189,248,0.24),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(52,211,153,0.22),transparent_32%),linear-gradient(135deg,#061829_0%,#0b2542_54%,#082f2b_100%)]" />
      <div className="absolute inset-0 bg-grid opacity-25" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100 backdrop-blur">
            {BOOKING_HERO_COPY.eyebrow}
          </p>
          <h1 className="mt-7 text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
            {BOOKING_HERO_COPY.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            {BOOKING_HERO_COPY.supportingText}
          </p>
          <p className="mt-6 text-sm font-semibold text-emerald-100">
            {BOOKING_HERO_COPY.trustLine}
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-slate-950/20 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">
            Booking status
          </p>
          <p className="mt-4 text-2xl font-bold">Package selection only</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            The full form, email verification, pricing, payment, and booking
            confirmation will be added in later frontend and backend phases.
          </p>
        </div>
      </div>
    </section>
  );
}
