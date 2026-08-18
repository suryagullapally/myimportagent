package com.myimportagent.backend.booking;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/api/bookings")
    public ResponseEntity<?> createBooking(@RequestBody BookingCreateRequest request) {
        try {
            BookingCreateResponse response = bookingService.createBooking(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest()
                    .body(new BookingErrorResponse(exception.getMessage()));
        }
    }

    @GetMapping("/api/bookings")
    public List<BookingListItemResponse> getBookings() {
        return bookingService.getBookings();
    }

    @GetMapping("/api/bookings/{bookingReference}")
    public ResponseEntity<?> getBookingByReference(
            @PathVariable String bookingReference
    ) {
        try {
            BookingDetailResponse response =
                    bookingService.getBookingByReference(bookingReference);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest()
                    .body(new BookingErrorResponse(exception.getMessage()));
        }
    }
    @PatchMapping("/api/bookings/{bookingReference}/admin")
public ResponseEntity<?> updateBookingAdminFields(
        @PathVariable String bookingReference,
        @RequestBody BookingAdminUpdateRequest request
) {
    try {
        BookingDetailResponse response =
                bookingService.updateBookingAdminFields(bookingReference, request);

        return ResponseEntity.ok(response);
    } catch (IllegalArgumentException exception) {
        return ResponseEntity.badRequest()
                .body(new BookingErrorResponse(exception.getMessage()));
    }
}
@GetMapping("/api/agent/jobs")
public ResponseEntity<?> getAgentJobs(@RequestParam String agentId) {
    try {
        List<BookingListItemResponse> response =
                bookingService.getBookingsAssignedToAgent(agentId);

        return ResponseEntity.ok(response);
    } catch (IllegalArgumentException exception) {
        return ResponseEntity.badRequest()
                .body(new BookingErrorResponse(exception.getMessage()));
    }
}

@GetMapping("/api/agent/jobs/{bookingReference}")
public ResponseEntity<?> getAgentJobByReference(
        @PathVariable String bookingReference,
        @RequestParam String agentId
) {
    try {
        BookingDetailResponse response =
                bookingService.getAssignedBookingForAgent(agentId, bookingReference);

        return ResponseEntity.ok(response);
    } catch (IllegalArgumentException exception) {
        return ResponseEntity.badRequest()
                .body(new BookingErrorResponse(exception.getMessage()));
    }
}
@PostMapping("/api/agent/jobs/{bookingReference}/submit-result")
public ResponseEntity<?> submitAgentVisitResult(
        @PathVariable String bookingReference,
        @RequestParam String agentId,
        @RequestBody AgentVisitResultRequest request
) {
    try {
        BookingDetailResponse response =
                bookingService.submitAgentVisitResult(agentId, bookingReference, request);

        return ResponseEntity.ok(response);
    } catch (IllegalArgumentException exception) {
        return ResponseEntity.badRequest()
                .body(new BookingErrorResponse(exception.getMessage()));
    }
}
@PostMapping("/api/bookings/{bookingReference}/admin/customer-report")
public ResponseEntity<?> submitAdminCustomerReport(
        @PathVariable String bookingReference,
        @RequestBody AdminCustomerReportRequest request
) {
    try {
        BookingDetailResponse response =
                bookingService.submitAdminCustomerReport(bookingReference, request);

        return ResponseEntity.ok(response);
    } catch (IllegalArgumentException exception) {
        return ResponseEntity.badRequest()
                .body(new BookingErrorResponse(exception.getMessage()));
    }
}
}