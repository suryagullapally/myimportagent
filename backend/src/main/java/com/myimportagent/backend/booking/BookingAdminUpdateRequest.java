package com.myimportagent.backend.booking;

public record BookingAdminUpdateRequest(
        String status,
        String assignedAgentId,
        String internalNotes
) {
}