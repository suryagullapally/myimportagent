package com.myimportagent.backend.booking;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}