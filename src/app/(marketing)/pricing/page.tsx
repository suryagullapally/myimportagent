import type { Metadata } from "next";
import { InfoCard, MarketingPageHero, MarketingSection } from "@/components/marketing";
import {
  PRICING_ADD_ONS,
  PRICING_PAGE,
  SITE_CONFIG,
} from "@/lib/constants";
import { formatGbp } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Pricing | ${SITE_CONFIG.name}`,
  description:
    "Simple estimated pricing for myimportagent seller, product, packing, and dispatch verification.",
};

export default function PricingPage() {
  return (
    <>
      <MarketingPageHero
        actions={[
          { href: "/book", label: "Start Booking" },
          { href: "/packages", label: "Compare Packages", variant: "secondary" },
        ]}
        description={PRICING_PAGE.description}
        eyebrow={PRICING_PAGE.eyebrow}
        title={PRICING_PAGE.title}
      />

      <MarketingSection
        description="The estimate is intentionally simple so importers can understand the cost before payment is added later."
        eyebrow="Pricing formula"
        title="How the estimated price is calculated."
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-xl shadow-emerald-950/5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Formula
            </p>
            <p className="mt-4 text-2xl font-bold leading-9 text-slate-950">
              {PRICING_PAGE.formula}
            </p>
          </div>
          <div className="grid gap-3">
            {PRICING_PAGE.notes.map((note) => (
              <div
                className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700 shadow-sm"
                key={note}
              >
                {note}
              </div>
            ))}
          </div>
        </div>
      </MarketingSection>

      <MarketingSection
        description="These examples show why the higher value is used as the base estimate."
        eyebrow="Examples"
        title="Two simple pricing scenarios."
        tone="muted"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {PRICING_PAGE.examples.map((example) => (
            <InfoCard
              description={`${example.state}, import value ${formatGbp(
                example.importValue,
              )}`}
              eyebrow={example.title}
              key={example.title}
              title={`Estimated price ${formatGbp(example.estimatedPrice)}`}
            >
              <dl className="grid gap-3 text-sm">
                <PriceRow label="1%" value={formatGbp(example.onePercent)} />
                <PriceRow
                  label="Minimum"
                  value={formatGbp(example.minimumFee)}
                />
                <PriceRow
                  label="Estimated price"
                  strong
                  value={formatGbp(example.estimatedPrice)}
                />
              </dl>
            </InfoCard>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection
        description="Add-ons are optional and can be selected during the booking flow."
        eyebrow="Add-ons"
        title="Optional support for higher-risk orders."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {PRICING_ADD_ONS.map((addOn) => (
            <InfoCard
              description={addOn.description}
              eyebrow={`+${formatGbp(addOn.priceGbp)}`}
              key={addOn.id}
              title={addOn.title}
            />
          ))}
        </div>
      </MarketingSection>
    </>
  );
}

type PriceRowProps = Readonly<{
  label: string;
  strong?: boolean;
  value: string;
}>;

function PriceRow({ label, strong = false, value }: PriceRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
      <dt className="text-slate-600">{label}</dt>
      <dd className={strong ? "font-bold text-primary" : "font-bold text-slate-950"}>
        {value}
      </dd>
    </div>
  );
}
