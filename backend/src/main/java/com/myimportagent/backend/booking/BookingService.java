package com.myimportagent.backend.booking;

import tools.jackson.databind.ObjectMapper;
import com.myimportagent.backend.pricing.PricingQuoteRequest;
import com.myimportagent.backend.pricing.PricingQuoteResponse;
import com.myimportagent.backend.pricing.PricingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

@Service
public class BookingService {

    private final PricingService pricingService;
    private final BookingRepository bookingRepository;
    private final ObjectMapper objectMapper;
    private final Random random = new Random();

    public BookingService(
            PricingService pricingService,
            BookingRepository bookingRepository,
            ObjectMapper objectMapper
    ) {
        this.pricingService = pricingService;
        this.bookingRepository = bookingRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public BookingCreateResponse createBooking(BookingCreateRequest request) {
        validateBookingRequest(request);

        PricingQuoteResponse trustedQuote = pricingService.calculateQuote(
                new PricingQuoteRequest(
                        request.exporterDetails().state(),
                        request.productOrderDetails().importValueGbp(),
                        request.selectedAddOnIds() == null
                                ? List.of()
                                : request.selectedAddOnIds()
                )
        );

        String bookingReference = generateBookingReference();

        BookingEntity bookingEntity = new BookingEntity(
                bookingReference,
                request.packageId(),
                "prepared",
                request.importerDetails().email(),
                request.exporterDetails().state(),
                request.exporterDetails().city(),
                request.productOrderDetails().importValueGbp(),
                trustedQuote.finalEstimatedPriceGbp(),
                trustedQuote.currency(),
                toJson(request),
                toJson(trustedQuote),
                LocalDateTime.now()
        );

        bookingRepository.save(bookingEntity);

        return new BookingCreateResponse(
                bookingReference,
                "prepared",
                "Booking request saved successfully.",
                true,
                trustedQuote
        );
    }
    public List<BookingListItemResponse> getBookings() {
    return bookingRepository.findAllByOrderByCreatedAtDesc()
            .stream()
            .map(this::toListItemResponse)
            .toList();
}

public BookingDetailResponse getBookingByReference(String bookingReference) {
    BookingEntity booking = bookingRepository.findByBookingReference(bookingReference)
            .orElseThrow(() -> new IllegalArgumentException("Booking was not found."));

    return toDetailResponse(booking);
}

private BookingListItemResponse toListItemResponse(BookingEntity booking) {
    return new BookingListItemResponse(
            booking.getId(),
            booking.getBookingReference(),
            booking.getPackageId(),
            booking.getStatus(),
            booking.getAssignedAgentId(),
            booking.getImporterEmail(),
            booking.getExporterState(),
            booking.getExporterCity(),
            booking.getImportValueGbp(),
            booking.getFinalEstimatedPriceGbp(),
            booking.getCurrency(),
            booking.getCreatedAt()
    );
}

private BookingDetailResponse toDetailResponse(BookingEntity booking) {
    return new BookingDetailResponse(
            booking.getId(),
            booking.getBookingReference(),
            booking.getPackageId(),
            booking.getStatus(),
            booking.getAssignedAgentId(),
            booking.getInternalNotes(),
            booking.getVisitResultStatus(),
            booking.getVisitSummary(),
            booking.getIssuesFound(),
            booking.getAgentNextAction(),
            booking.getVisitCompletedAt(),
            booking.getCustomerReportStatus(),
            booking.getCustomerReportSummary(),
            booking.getCustomerReportRecommendation(),
            booking.getCustomerReportAdminNotes(),
            booking.getCustomerReportCompletedAt(),
            booking.getImporterEmail(),
            booking.getExporterState(),
            booking.getExporterCity(),
            booking.getImportValueGbp(),
            booking.getFinalEstimatedPriceGbp(),
            booking.getCurrency(),
            booking.getBookingRequestJson(),
            booking.getTrustedQuoteJson(),
            booking.getCreatedAt()
    );
}
@Transactional
public BookingDetailResponse updateBookingAdminFields(
        String bookingReference,
        BookingAdminUpdateRequest request
) {
    if (request == null) {
        throw new IllegalArgumentException("Admin update request is required.");
    }

    if (isBlank(request.status())) {
        throw new IllegalArgumentException("Booking status is required.");
    }

    BookingEntity booking = bookingRepository.findByBookingReference(bookingReference)
            .orElseThrow(() -> new IllegalArgumentException("Booking was not found."));

    booking.updateAdminFields(
            request.status(),
            request.assignedAgentId() == null ? "" : request.assignedAgentId(),
            request.internalNotes() == null ? "" : request.internalNotes()
    );

    BookingEntity savedBooking = bookingRepository.save(booking);

    return toDetailResponse(savedBooking);
}
    public List<BookingListItemResponse> getBookingsAssignedToAgent(String agentId) {
    if (isBlank(agentId)) {
        throw new IllegalArgumentException("Agent ID is required.");
    }

    return bookingRepository.findAllByAssignedAgentIdOrderByCreatedAtDesc(agentId)
            .stream()
            .map(this::toListItemResponse)
            .toList();
}

public BookingDetailResponse getAssignedBookingForAgent(
        String agentId,
        String bookingReference
) {
    if (isBlank(agentId)) {
        throw new IllegalArgumentException("Agent ID is required.");
    }

    if (isBlank(bookingReference)) {
        throw new IllegalArgumentException("Booking reference is required.");
    }

    BookingEntity booking = bookingRepository.findByBookingReference(bookingReference)
            .orElseThrow(() -> new IllegalArgumentException("Booking was not found."));

    if (!agentId.equals(booking.getAssignedAgentId())) {
        throw new IllegalArgumentException("This booking is not assigned to this agent.");
    }

    return toDetailResponse(booking);
}
    @Transactional
public BookingDetailResponse submitAgentVisitResult(
        String agentId,
        String bookingReference,
        AgentVisitResultRequest request
) {
    if (isBlank(agentId)) {
        throw new IllegalArgumentException("Agent ID is required.");
    }

    if (isBlank(bookingReference)) {
        throw new IllegalArgumentException("Booking reference is required.");
    }

    if (request == null) {
        throw new IllegalArgumentException("Visit result request is required.");
    }

    if (isBlank(request.visitResultStatus())) {
        throw new IllegalArgumentException("Visit result status is required.");
    }

    if (isBlank(request.visitSummary())) {
        throw new IllegalArgumentException("Visit summary is required.");
    }

    BookingEntity booking = bookingRepository.findByBookingReference(bookingReference)
            .orElseThrow(() -> new IllegalArgumentException("Booking was not found."));

    if (!agentId.equals(booking.getAssignedAgentId())) {
        throw new IllegalArgumentException("This booking is not assigned to this agent.");
    }

    booking.submitVisitResult(
            request.visitResultStatus().trim(),
            request.visitSummary().trim(),
            request.issuesFound() == null ? "" : request.issuesFound().trim(),
            request.agentNextAction() == null ? "" : request.agentNextAction().trim(),
            LocalDateTime.now()
    );

    BookingEntity savedBooking = bookingRepository.save(booking);

    return toDetailResponse(savedBooking);
}

@Transactional
public BookingDetailResponse submitAdminCustomerReport(
        String bookingReference,
        AdminCustomerReportRequest request
) {
    if (isBlank(bookingReference)) {
        throw new IllegalArgumentException("Booking reference is required.");
    }

    if (request == null) {
        throw new IllegalArgumentException("Customer report request is required.");
    }

    if (isBlank(request.customerReportStatus())) {
        throw new IllegalArgumentException("Customer report status is required.");
    }

    if (isBlank(request.customerReportSummary())) {
        throw new IllegalArgumentException("Customer report summary is required.");
    }

    if (isBlank(request.customerReportRecommendation())) {
        throw new IllegalArgumentException("Customer report recommendation is required.");
    }

    BookingEntity booking = bookingRepository.findByBookingReference(bookingReference)
            .orElseThrow(() -> new IllegalArgumentException("Booking was not found."));

    if (isBlank(booking.getVisitResultStatus())) {
        throw new IllegalArgumentException("Agent visit result must be submitted before preparing the customer report.");
    }

    booking.submitCustomerReport(
            request.customerReportStatus().trim(),
            request.customerReportSummary().trim(),
            request.customerReportRecommendation().trim(),
            request.customerReportAdminNotes() == null
                    ? ""
                    : request.customerReportAdminNotes().trim(),
            LocalDateTime.now()
    );

    BookingEntity savedBooking = bookingRepository.save(booking);

    return toDetailResponse(savedBooking);
}
    private void validateBookingRequest(BookingCreateRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Booking request is required.");
        }

        if (isBlank(request.packageId())) {
            throw new IllegalArgumentException("Verification package is required.");
        }

        validateImporterDetails(request.importerDetails());
        validateExporterDetails(request.exporterDetails());
        validateProductOrderDetails(request.productOrderDetails());
    }

    private void validateImporterDetails(ImporterDetailsRequest importerDetails) {
        if (importerDetails == null) {
            throw new IllegalArgumentException("Importer details are required.");
        }

        if (isBlank(importerDetails.fullName())) {
            throw new IllegalArgumentException("Importer full name is required.");
        }

        if (isBlank(importerDetails.country())) {
            throw new IllegalArgumentException("Importer country is required.");
        }

        if (isBlank(importerDetails.phone())) {
            throw new IllegalArgumentException("Importer phone number is required.");
        }

        if (isBlank(importerDetails.email())) {
            throw new IllegalArgumentException("Importer email is required.");
        }

        if (!importerDetails.emailVerified()) {
            throw new IllegalArgumentException("Importer email must be verified before booking submission.");
        }
    }

    private void validateExporterDetails(ExporterDetailsRequest exporterDetails) {
        if (exporterDetails == null) {
            throw new IllegalArgumentException("Exporter details are required.");
        }

        if (isBlank(exporterDetails.businessName())) {
            throw new IllegalArgumentException("Exporter business name is required.");
        }

        if (isBlank(exporterDetails.phone())) {
            throw new IllegalArgumentException("Exporter phone number is required.");
        }

        if (isBlank(exporterDetails.fullAddress())) {
            throw new IllegalArgumentException("Exporter full address is required.");
        }

        if (isBlank(exporterDetails.state())) {
            throw new IllegalArgumentException("Exporter state is required.");
        }

        if (isBlank(exporterDetails.city())) {
            throw new IllegalArgumentException("Exporter city is required.");
        }
    }

    private void validateProductOrderDetails(ProductOrderDetailsRequest productOrderDetails) {
        if (productOrderDetails == null) {
            throw new IllegalArgumentException("Product/order details are required.");
        }

        if (isBlank(productOrderDetails.productCategory())) {
            throw new IllegalArgumentException("Product category is required.");
        }

        if (isBlank(productOrderDetails.productDescription())) {
            throw new IllegalArgumentException("Product description is required.");
        }

        if (isBlank(productOrderDetails.quantity())) {
            throw new IllegalArgumentException("Product quantity is required.");
        }

        if (productOrderDetails.importValueGbp() == null) {
            throw new IllegalArgumentException("Import value is required.");
        }

        if (productOrderDetails.importValueGbp().signum() <= 0) {
            throw new IllegalArgumentException("Import value must be greater than 0.");
        }

        if (productOrderDetails.checklistItems() == null ||
                productOrderDetails.checklistItems().isEmpty()) {
            throw new IllegalArgumentException("At least one verification checklist item is required.");
        }
    }

    private String generateBookingReference() {
        String datePart = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int randomNumber = 10000 + random.nextInt(90000);

        return "MIA-" + datePart + "-" + randomNumber;
    }

    private String toJson(Object value) {
    try {
        return objectMapper.writeValueAsString(value);
    } catch (Exception exception) {
        throw new IllegalStateException("Could not convert booking data to JSON.");
    }
}

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}