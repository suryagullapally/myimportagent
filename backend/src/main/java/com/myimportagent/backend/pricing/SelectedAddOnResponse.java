package com.myimportagent.backend.pricing;

import java.math.BigDecimal;

public record SelectedAddOnResponse(
        String id,
        String name,
        BigDecimal priceGbp
) {
}