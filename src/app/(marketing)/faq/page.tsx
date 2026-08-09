import type { Metadata } from "next";
import { MarketingPageHero, MarketingSection } from "@/components/marketing";
import { AVAILABLE_REGIONS, FAQ_ITEMS, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `FAQ | ${SITE_CONFIG.name}`,
  description:
    "Frequently asked questions about myimportagent verification-only services.",
};

export default function FAQPage() {
  return (
    <>
      <MarketingPageHero
        actions={[
          { href: "/book", label: "Start Booking" },
          { href: "/contact", label: "Contact Us", variant: "secondary" },
        ]}
        description="Honest answers about what myimportagent can verify, what it cannot do, and how customers should use the evidence."
        eyebrow="FAQ"
        title="Clear answers before you request verification."
      />

      <MarketingSection>
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4">
            {FAQ_ITEMS.map((item) => (
              <details
                className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm open:border-emerald-200 open:shadow-xl open:shadow-slate-950/5"
                key={item.question}
              >
                <summary className="cursor-pointer list-none text-lg font-bold text-foreground">
                  <span className="flex items-start justify-between gap-4">
                    {item.question}
                    <span className="text-primary transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {getFaqAnswer(item)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </MarketingSection>
    </>
  );
}

type FaqItem = (typeof FAQ_ITEMS)[number];

function getFaqAnswer(item: FaqItem) {
  if ("id" in item && item.id === "available-states") {
    const states = AVAILABLE_REGIONS.map((region) => region.state).join(", ");

    return `${item.answer} Current listed states and regions are: ${states}.`;
  }

  return item.answer;
}
