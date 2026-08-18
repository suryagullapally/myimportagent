package com.myimportagent.backend.booking;

import java.util.List;
import java.util.Map;

public record BookingCreateRequest(
        String packageId,
        ImporterDetailsRequest importerDetails,
        ExporterDetailsRequest exporterDetails,
        ProductOrderDetailsRequest productOrderDetails,
        List<String> selectedAddOnIds,
        Map<String, List<String>> supportingFiles
) {
}