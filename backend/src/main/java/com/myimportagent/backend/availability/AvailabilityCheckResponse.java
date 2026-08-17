package com.myimportagent.backend.availability;

public record AvailabilityCheckResponse(
        String state,
        String city,
        boolean available,
        String message
) {
}