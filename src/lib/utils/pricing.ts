import {
  IMPORT_VALUE_PERCENTAGE_RATE,
  PRICING_ADD_ONS,
  PRICING_CURRENCY,
  STATE_MINIMUM_FEES_GBP,
} from "@/lib/constants";
import type { PricingInput, PricingResult } from "@/types";

export function calculateVerificationPrice(
  input: PricingInput,
): PricingResult {
  const stateMinimumFee =
    STATE_MINIMUM_FEES_GBP[input.exporterState] ?? null;
  const onePercentValue = roundToMoney(
    input.importValueGbp * IMPORT_VALUE_PERCENTAGE_RATE,
  );
  const addOnsTotal = roundToMoney(
    PRICING_ADD_ONS.filter((addOn) =>
      input.selectedAddOnIds.includes(addOn.id),
    ).reduce((total, addOn) => total + addOn.priceGbp, 0),
  );

  if (stateMinimumFee === null) {
    return {
      stateMinimumFee,
      onePercentValue,
      basePrice: null,
      selectedBaseReason: null,
      addOnsTotal,
      finalPrice: null,
      currency: PRICING_CURRENCY,
    };
  }

  const selectedBaseReason =
    stateMinimumFee >= onePercentValue ? "state-minimum" : "one-percent";
  const basePrice =
    selectedBaseReason === "state-minimum"
      ? stateMinimumFee
      : onePercentValue;

  return {
    stateMinimumFee,
    onePercentValue,
    basePrice,
    selectedBaseReason,
    addOnsTotal,
    finalPrice: roundToMoney(basePrice + addOnsTotal),
    currency: PRICING_CURRENCY,
  };
}

export function formatGbp(value: number) {
  return new Intl.NumberFormat("en-GB", {
    currency: "GBP",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function roundToMoney(value: number) {
  return Math.round(value * 100) / 100;
}
