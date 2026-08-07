export type CurrencyCode = "GBP";

export type PricingAddOn = Readonly<{
  id: string;
  title: string;
  description: string;
  priceGbp: number;
}>;

export type PricingInput = Readonly<{
  exporterState: string;
  importValueGbp: number;
  selectedAddOnIds: readonly string[];
}>;

export type SelectedBaseReason = "state-minimum" | "one-percent";

export type PricingResult = Readonly<{
  stateMinimumFee: number | null;
  onePercentValue: number;
  basePrice: number | null;
  selectedBaseReason: SelectedBaseReason | null;
  addOnsTotal: number;
  finalPrice: number | null;
  currency: CurrencyCode;
}>;
