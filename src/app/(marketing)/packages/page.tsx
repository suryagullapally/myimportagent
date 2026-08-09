import type { Metadata } from "next";
import { InfoCard, MarketingPageHero, MarketingSection } from "@/components/marketing";
import { PACKAGES_PAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Packages | ${SITE_CONFIG.name}`,
  description:
    "Compare myimportagent seller, product, and packing dispatch verification packages.",
};

export default function PackagesPage() {
  return (
    <>
      <MarketingPageHero
        actions={[
          { href: "/book", label: "Choose Package" },
          { href: "/how-it-works", label: "How It Works", variant: "secondary" },
        ]}
        description={PACKAGES_PAGE.description}
        eyebrow={PACKAGES_PAGE.eyebrow}
        title={PACKAGES_PAGE.title}
      />

      <MarketingSection
        description="Use one package for a focused check, or combine checks later when a customer needs stronger evidence."
        eyebrow="Verification packages"
        title="Three focused ways to check before committing."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {PACKAGES_PAGE.packageDetails.map((item) => (
            <InfoCard
              description={item.description}
              eyebrow={item.bestFor}
              key={item.title}
              title={item.title}
            >
              <ul className="grid gap-2">
                {item.checks.map((check) => (
                  <li
                    className="flex items-start gap-2 text-sm font-semibold leading-6 text-slate-700"
                    key={check}
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                      ✓
                    </span>
                    {check}
                  </li>
                ))}
              </ul>
            </InfoCard>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection tone="muted">
        <div className="rounded-lg border border-sky-200 bg-sky-50 p-6">
          <p className="text-sm font-semibold leading-7 text-sky-950">
            {PACKAGES_PAGE.separationNote}
          </p>
        </div>
      </MarketingSection>
    </>
  );
}
