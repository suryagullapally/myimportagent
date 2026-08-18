package com.myimportagent.backend.booking;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {

    List<BookingEntity> findAllByOrderByCreatedAtDesc();

    Optional<BookingEntity> findByBookingReference(String bookingReference);
}