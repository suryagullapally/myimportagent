package com.myimportagent.backend.booking;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BookingDetailResponse(
        Long id,
        String bookingReference,
        String packageId,
        String status,
        String assignedAgentId,
        String internalNotes,
        String visitResultStatus,
        String visitSummary,
        String issuesFound,
        String agentNextAction,
        LocalDateTime visitCompletedAt,
        String importerEmail,
        String exporterState,
        String exporterCity,
        BigDecimal importValueGbp,
        BigDecimal finalEstimatedPriceGbp,
        String currency,
        String bookingRequestJson,
        String trustedQuoteJson,
        LocalDateTime createdAt
) {
}