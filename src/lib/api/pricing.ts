export type PricingQuoteRequest = {
  state: string;
  importValueGbp: number;
  addOnIds: string[];
};

export type SelectedAddOnResponse = {
  id: string;
  name: string;
  priceGbp: number;
};

export type PricingQuoteResponse = {
  state: string;
  stateMinimumFeeGbp: number;
  onePercentValueGbp: number;
  selectedBasePriceGbp: number;
  basePriceReason: string;
  selectedAddOns: SelectedAddOnResponse[];
  addOnsTotalGbp: number;
  finalEstimatedPriceGbp: number;
  currency: string;
  note: string;
};

export type PricingErrorResponse = {
  message: string;
};

function getApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return apiBaseUrl;
}

export async function getPricingQuote(
  request: PricingQuoteRequest,
): Promise<PricingQuoteResponse> {
  const response = await fetch(`${getApiBaseUrl()}/api/pricing/quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as PricingErrorResponse;
    throw new Error(errorData.message || "Failed to calculate pricing quote");
  }

  return response.json();
}