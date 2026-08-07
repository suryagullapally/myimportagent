import { Button } from "@/components/ui";
import { HERO_TRUST_POINTS, HOME_PAGE_COPY } from "@/lib/constants";
import { Hero3DVisual } from "./Hero3DVisual";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-navy text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.24),transparent_30%),radial-gradient(circle_at_72%_28%,rgba(52,211,153,0.2),transparent_34%),linear-gradient(135deg,#061829_0%,#0b2542_48%,#082f2b_100%)]" />
      <div className="absolute inset-0 bg-grid opacity-25" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:py-20">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100 backdrop-blur">
            {HOME_PAGE_COPY.eyebrow}
          </p>
          <h1
            className="mt-7 text-4xl font-bold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl"
            id="hero-title"
          >
            {HOME_PAGE_COPY.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            {HOME_PAGE_COPY.supportingLine}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button>{HOME_PAGE_COPY.primaryCta}</Button>
            <Button variant="outline">{HOME_PAGE_COPY.secondaryCta}</Button>
          </div>

          <p className="mt-6 text-sm font-medium text-emerald-100">
            {HOME_PAGE_COPY.trustLine}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {HERO_TRUST_POINTS.map((point) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-slate-100 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
                key={point}
              >
                <span className="mr-2 text-emerald-300">✓</span>
                {point}
              </div>
            ))}
          </div>
        </div>

        <Hero3DVisual />
      </div>
    </section>
  );
}
