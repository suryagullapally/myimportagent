import type { PricingAddOn } from "@/types";

export const PRICING_CURRENCY = "GBP";

export const STATE_MINIMUM_FEES_GBP: Readonly<Record<string, number>> = {
  Telangana: 50,
  "Delhi NCR": 150,
  Maharashtra: 100,
  Gujarat: 130,
  "Tamil Nadu": 80,
  Karnataka: 80,
  "Andhra Pradesh": 80,
  Kerala: 90,
  Rajasthan: 140,
  "Uttar Pradesh": 150,
  Haryana: 150,
  Punjab: 160,
  "West Bengal": 160,
  "Madhya Pradesh": 120,
  Odisha: 110,
};

export const IMPORT_VALUE_PERCENTAGE_RATE = 0.01;

export const PRICING_ADD_ONS: readonly PricingAddOn[] = [
  {
    id: "video-recording",
    title: "Video recording of verification",
    description: "Receive a saved video clip from the verification visit.",
    priceGbp: 25,
  },
  {
    id: "live-video-call",
    title: "Live video call during verification",
    description: "Join a scheduled live call while the agent is at the location.",
    priceGbp: 40,
  },
  {
    id: "urgent-verification",
    title: "Urgent verification",
    description: "Request priority scheduling when agent capacity is available.",
    priceGbp: 50,
  },
];

export const PACKAGE_PRICE_ADJUSTMENTS_GBP: Readonly<Record<string, number>> = {
  "seller-verification": 0,
  "product-verification": 0,
  "packing-dispatch-verification": 0,
};

export const QUOTE_SUMMARY_COPY = {
  eyebrow: "Quote summary",
  title: "Review your estimated verification price.",
  description:
    "This estimate uses the exporter state, import value, and selected add-ons. Package fees are configurable but set to £0 for now.",
  selectedPackageLabel: "Selected package",
  exporterLocationLabel: "Exporter location",
  importValueLabel: "Total import value",
  stateMinimumLabel: "State minimum fee",
  onePercentLabel: "1% of import value",
  basePriceLabel: "Base price used",
  addOnsLabel: "Selected add-ons",
  noAddOnsLabel: "No add-ons selected",
  addOnsTotalLabel: "Add-ons total",
  finalPriceLabel: "Final estimated price",
  stateMinimumReason:
    "State minimum fee is higher than 1% of the import value.",
  onePercentReason:
    "1% of the import value is higher than the state minimum fee.",
  unavailablePricingMessage:
    "Pricing is not available yet because service is not available in this state.",
  note:
    "This quote is based on the details you entered. Final booking confirmation happens after payment in the next step.",
};
