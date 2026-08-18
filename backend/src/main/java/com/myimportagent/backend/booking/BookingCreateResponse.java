package com.myimportagent.backend.booking;

import com.myimportagent.backend.pricing.PricingQuoteResponse;

public record BookingCreateResponse(
        String bookingReference,
        String status,
        String message,
        boolean persisted,
        PricingQuoteResponse trustedQuote
) {
}