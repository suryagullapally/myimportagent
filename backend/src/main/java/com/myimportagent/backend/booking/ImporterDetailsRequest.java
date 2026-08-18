package com.myimportagent.backend.booking;

public record ImporterDetailsRequest(
        String fullName,
        String companyName,
        String country,
        String phone,
        String email,
        boolean emailVerified
) {
}