package com.myimportagent.backend.availability;

import java.util.List;

public record AvailabilityRegionResponse(
        String state,
        List<String> cities,
        boolean available
) {
}