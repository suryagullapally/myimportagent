package com.myimportagent.backend.pricing;

import java.math.BigDecimal;
import java.util.List;

public record PricingQuoteResponse(
        String state,
        BigDecimal stateMinimumFeeGbp,
        BigDecimal onePercentValueGbp,
        BigDecimal selectedBasePriceGbp,
        String basePriceReason,
        List<SelectedAddOnResponse> selectedAddOns,
        BigDecimal addOnsTotalGbp,
        BigDecimal finalEstimatedPriceGbp,
        String currency,
        String note
) {
}