"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PACKAGE_PRICE_ADJUSTMENTS_GBP,
  PRICING_ADD_ONS,
  QUOTE_SUMMARY_COPY,
} from "@/lib/constants";
import {
  getPricingQuote,
  type PricingQuoteResponse,
} from "@/lib/api/pricing";
import { formatGbp } from "@/lib/utils";
import type {
  BookingPackage,
  ExporterDetails,
  ProductOrderDetails,
} from "@/types";

type QuoteSummaryProps = Readonly<{
  exporterDetails: ExporterDetails;
  productOrderDetails: ProductOrderDetails;
  selectedAddOnIds: readonly string[];
  selectedPackage: BookingPackage | undefined;
  onToggleAddOn: (addOnId: string) => void;
  onQuoteChange: (quote: PricingQuoteResponse | null) => void;
}>;

export function QuoteSummary({
  exporterDetails,
  productOrderDetails,
  selectedAddOnIds,
  selectedPackage,
  onToggleAddOn,
  onQuoteChange,
}: QuoteSummaryProps) {
  const [backendQuote, setBackendQuote] = useState<PricingQuoteResponse | null>(
    null,
  );
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState("");

  const importValue = Number(productOrderDetails.importValueGbp);

  const selectedPackageAdjustment =
    selectedPackage && PACKAGE_PRICE_ADJUSTMENTS_GBP[selectedPackage.id];

  const pricingRequest = useMemo(() => {
    if (
      !exporterDetails.state ||
      !Number.isFinite(importValue) ||
      importValue <= 0
    ) {
      return null;
    }

    return {
      state: exporterDetails.state,
      importValueGbp: importValue,
      addOnIds: [...selectedAddOnIds],
    };
  }, [exporterDetails.state, importValue, selectedAddOnIds]);

  useEffect(() => {
    let shouldIgnoreResponse = false;

    async function loadBackendQuote() {
      if (!pricingRequest) {
        setBackendQuote(null);
        onQuoteChange(null);
        setQuoteError("Exporter state and valid import value are required.");
        return;
      }

      try {
        setIsQuoteLoading(true);
        setQuoteError("");
        onQuoteChange(null);

        const quote = await getPricingQuote(pricingRequest);

        if (!shouldIgnoreResponse) {
          setBackendQuote(quote);
          onQuoteChange(quote);
        }
      } catch (error) {
        if (!shouldIgnoreResponse) {
          setBackendQuote(null);
          onQuoteChange(null);
          setQuoteError(
            error instanceof Error
              ? error.message
              : QUOTE_SUMMARY_COPY.backendErrorMessage,
          );
        }
      } finally {
        if (!shouldIgnoreResponse) {
          setIsQuoteLoading(false);
        }
      }
    }

    loadBackendQuote();

    return () => {
      shouldIgnoreResponse = true;
    };
  }, [pricingRequest, onQuoteChange]);

  return (
    <section aria-labelledby="quote-summary-title">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {QUOTE_SUMMARY_COPY.eyebrow}
        </p>
        <h2
          className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
          id="quote-summary-title"
        >
          {QUOTE_SUMMARY_COPY.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {QUOTE_SUMMARY_COPY.description}
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-foreground">
            Verification details
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <SummaryItem
              label={QUOTE_SUMMARY_COPY.selectedPackageLabel}
              value={selectedPackage?.title ?? "No package selected"}
            />
            <SummaryItem
              label={QUOTE_SUMMARY_COPY.exporterLocationLabel}
              value={`${exporterDetails.city}, ${exporterDetails.state}`}
            />
            <SummaryItem
              label={QUOTE_SUMMARY_COPY.importValueLabel}
              value={formatGbp(Number(productOrderDetails.importValueGbp))}
            />
            <SummaryItem
              label="Package adjustment"
              value={formatGbp(selectedPackageAdjustment ?? 0)}
            />
          </div>

          <fieldset className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <legend className="text-sm font-bold text-foreground">
              Optional add-ons
            </legend>
            <div className="mt-4 grid gap-3">
              {PRICING_ADD_ONS.map((addOn) => {
                const isChecked = selectedAddOnIds.includes(addOn.id);

                return (
                  <label
                    className={`flex cursor-pointer items-start justify-between gap-4 rounded-md border p-4 transition ${
                      isChecked
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-emerald-200"
                    }`}
                    key={addOn.id}
                  >
                    <span className="flex items-start gap-3">
                      <input
                        checked={isChecked}
                        className="mt-1 h-4 w-4 accent-emerald-600"
                        onChange={() => onToggleAddOn(addOn.id)}
                        type="checkbox"
                      />
                      <span>
                        <span className="block text-sm font-bold text-slate-900">
                          {addOn.title}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-slate-600">
                          {addOn.description}
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-bold text-slate-900">
                      +{formatGbp(addOn.priceGbp)}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        <QuoteBreakdown
          backendQuote={backendQuote}
          isQuoteLoading={isQuoteLoading}
          quoteError={quoteError}
        />
      </div>

      <div className="mt-6 rounded-lg border border-sky-200 bg-sky-50 p-4">
        <p className="text-sm font-semibold leading-6 text-sky-900">
          {backendQuote?.note ?? QUOTE_SUMMARY_COPY.note}
        </p>
      </div>
    </section>
  );
}

type SummaryItemProps = Readonly<{
  label: string;
  value: string;
}>;

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}

type QuoteBreakdownProps = Readonly<{
  backendQuote: PricingQuoteResponse | null;
  isQuoteLoading: boolean;
  quoteError: string;
}>;

function QuoteBreakdown({
  backendQuote,
  isQuoteLoading,
  quoteError,
}: QuoteBreakdownProps) {
  if (isQuoteLoading) {
    return (
      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 shadow-sm">
        <p className="text-sm font-bold text-sky-900">
          {QUOTE_SUMMARY_COPY.backendLoadingMessage}
        </p>
        <p className="mt-2 text-sm leading-6 text-sky-700">
          The frontend is asking the Java Spring Boot API to calculate the
          trusted quote.
        </p>
      </aside>
    );
  }

  if (quoteError || !backendQuote) {
    return (
      <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm">
        <p className="text-sm font-bold text-amber-900">
          {quoteError || QUOTE_SUMMARY_COPY.unavailablePricingMessage}
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-xl shadow-emerald-950/5">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
        Backend verified estimate
      </p>
      <p className="mt-4 text-4xl font-bold text-slate-950">
        {formatGbp(backendQuote.finalEstimatedPriceGbp)}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Calculated by the Spring Boot pricing API.
      </p>

      <div className="mt-6 space-y-3 text-sm">
        <BreakdownRow
          label={QUOTE_SUMMARY_COPY.stateMinimumLabel}
          value={formatGbp(backendQuote.stateMinimumFeeGbp)}
        />
        <BreakdownRow
          label={QUOTE_SUMMARY_COPY.onePercentLabel}
          value={formatGbp(backendQuote.onePercentValueGbp)}
        />
        <BreakdownRow
          label={QUOTE_SUMMARY_COPY.basePriceLabel}
          value={formatGbp(backendQuote.selectedBasePriceGbp)}
        />
        <p className="rounded-md bg-white p-3 text-xs font-semibold leading-5 text-slate-600">
          {backendQuote.basePriceReason}
        </p>
      </div>

      <div className="mt-6 border-t border-emerald-100 pt-5">
        <p className="text-sm font-bold text-slate-950">
          {QUOTE_SUMMARY_COPY.addOnsLabel}
        </p>
        {backendQuote.selectedAddOns.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">
            {QUOTE_SUMMARY_COPY.noAddOnsLabel}
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {backendQuote.selectedAddOns.map((addOn) => (
              <li
                className="flex items-center justify-between gap-3 text-sm text-slate-700"
                key={addOn.id}
              >
                <span>{addOn.name}</span>
                <span className="font-bold">{formatGbp(addOn.priceGbp)}</span>
              </li>
            ))}
          </ul>
        )}
        <BreakdownRow
          className="mt-4"
          label={QUOTE_SUMMARY_COPY.addOnsTotalLabel}
          value={formatGbp(backendQuote.addOnsTotalGbp)}
        />
      </div>

      <div className="mt-5 rounded-lg bg-navy p-4 text-white">
        <p className="text-sm text-slate-300">
          {QUOTE_SUMMARY_COPY.finalPriceLabel}
        </p>
        <p className="mt-1 text-2xl font-bold">
          {formatGbp(backendQuote.finalEstimatedPriceGbp)}
        </p>
      </div>
    </aside>
  );
}

type BreakdownRowProps = Readonly<{
  className?: string;
  label: string;
  value: string;
}>;

function BreakdownRow({ className = "", label, value }: BreakdownRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-md bg-white p-3 ${className}`}
    >
      <span className="font-medium text-slate-600">{label}</span>
      <span className="font-bold text-slate-950">{value}</span>
    </div>
  );
}