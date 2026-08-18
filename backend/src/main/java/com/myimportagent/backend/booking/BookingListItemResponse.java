package com.myimportagent.backend.booking;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BookingListItemResponse(
        Long id,
        String bookingReference,
        String packageId,
        String status,
        String importerEmail,
        String exporterState,
        String exporterCity,
        BigDecimal importValueGbp,
        BigDecimal finalEstimatedPriceGbp,
        String currency,
        LocalDateTime createdAt
) {
}