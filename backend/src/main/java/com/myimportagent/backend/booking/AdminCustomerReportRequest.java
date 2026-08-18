package com.myimportagent.backend.booking;

public record AdminCustomerReportRequest(
        String customerReportStatus,
        String customerReportSummary,
        String customerReportRecommendation,
        String customerReportAdminNotes
) {
}