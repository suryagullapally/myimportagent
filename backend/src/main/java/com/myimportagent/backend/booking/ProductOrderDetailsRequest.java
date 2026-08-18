package com.myimportagent.backend.booking;

import java.math.BigDecimal;
import java.util.List;

public record ProductOrderDetailsRequest(
        String productCategory,
        String productDescription,
        String quantity,
        BigDecimal importValueGbp,
        String paymentStatus,
        String expectedVerificationDate,
        String specialInstructions,
        List<String> checklistItems
) {
}