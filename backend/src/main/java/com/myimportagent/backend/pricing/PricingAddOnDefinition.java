package com.myimportagent.backend.pricing;

import java.math.BigDecimal;

public record PricingAddOnDefinition(
        String id,
        String name,
        BigDecimal priceGbp
) {
}