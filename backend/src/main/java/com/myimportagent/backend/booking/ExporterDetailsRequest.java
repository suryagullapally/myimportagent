package com.myimportagent.backend.booking;

public record ExporterDetailsRequest(
        String businessName,
        String contactPerson,
        String phone,
        String email,
        String fullAddress,
        String state,
        String city,
        String googleMapsLink,
        String gstNumber,
        String profileLink
) {
}