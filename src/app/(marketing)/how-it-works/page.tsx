import type { Metadata } from "next";
import { InfoCard, MarketingPageHero, MarketingSection } from "@/components/marketing";
import { HOW_IT_WORKS_PAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `How It Works | ${SITE_CONFIG.name}`,
  description:
    "Understand the myimportagent verification journey for overseas importers buying from India.",
};

export default function HowItWorksPage() {
  return (
    <>
      <MarketingPageHero
        actions={[
          { href: "/book", label: "Start Booking" },
          { href: "/pricing", label: "View Pricing", variant: "secondary" },
        ]}
        description={HOW_IT_WORKS_PAGE.description}
        eyebrow={HOW_IT_WORKS_PAGE.eyebrow}
        title={HOW_IT_WORKS_PAGE.title}
      />

      <MarketingSection
        description="A step-by-step path keeps the request clear for the customer and the local verification agent."
        eyebrow="Customer journey"
        title="From availability check to evidence review."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS_PAGE.steps.map((step, index) => (
            <InfoCard
              description={step.description}
              eyebrow={`Step ${index + 1}`}
              key={step.title}
              title={step.title}
            />
          ))}
        </div>
      </MarketingSection>

      <MarketingSection
        description="Clear limits protect customer trust and keep the service focused."
        eyebrow="Verification scope"
        title="What myimportagent does and does not do."
        tone="muted"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {HOW_IT_WORKS_PAGE.trustPoints.map((point) => (
            <div
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={point}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-sm font-bold text-emerald-700">
                  ✓
                </span>
                <p className="text-sm font-semibold leading-6 text-slate-800">
                  {point}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MarketingSection>
    </>
  );
}
