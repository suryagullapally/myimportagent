import { FINAL_CTA_COPY } from "@/lib/constants";
import { HomeCtaButtons } from "./HomeCtaButtons";

export function CTASection() {
  return (
    <section className="bg-slate-50 px-6 pb-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-lg bg-[linear-gradient(135deg,#0b2542_0%,#0f766e_100%)] px-6 py-12 text-white shadow-2xl shadow-slate-950/15 sm:px-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">
            {FINAL_CTA_COPY.headline}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-200">
            {FINAL_CTA_COPY.supportingLine}
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <HomeCtaButtons
            primaryLabel={FINAL_CTA_COPY.primaryCta}
            secondaryLabel={FINAL_CTA_COPY.secondaryCta}
          />
        </div>
      </div>
    </section>
  );
}
