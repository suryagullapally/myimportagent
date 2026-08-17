package com.myimportagent.backend.pricing;

import java.math.BigDecimal;
import java.util.List;

public record PricingQuoteRequest(
        String state,
        BigDecimal importValueGbp,
        List<String> addOnIds
) {
}