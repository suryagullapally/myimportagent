package com.myimportagent.backend.booking;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class BookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_reference", nullable = false, unique = true)
    private String bookingReference;

    @Column(name = "package_id", nullable = false)
    private String packageId;

    @Column(nullable = false)
    private String status;

    @Column(name = "assigned_agent_id")
    private String assignedAgentId;

    @Column(name = "internal_notes", columnDefinition = "TEXT")
    private String internalNotes;
    
    @Column(name = "visit_result_status")
private String visitResultStatus;

@Column(name = "visit_summary", columnDefinition = "TEXT")
private String visitSummary;

@Column(name = "issues_found", columnDefinition = "TEXT")
private String issuesFound;

@Column(name = "agent_next_action", columnDefinition = "TEXT")
private String agentNextAction;

@Column(name = "visit_completed_at")
private LocalDateTime visitCompletedAt;
    @Column(name = "importer_email", nullable = false)
    private String importerEmail;

    @Column(name = "exporter_state", nullable = false)
    private String exporterState;

    @Column(name = "exporter_city", nullable = false)
    private String exporterCity;

    @Column(name = "import_value_gbp", nullable = false, precision = 12, scale = 2)
    private BigDecimal importValueGbp;

    @Column(name = "final_estimated_price_gbp", nullable = false, precision = 12, scale = 2)
    private BigDecimal finalEstimatedPriceGbp;

    @Column(nullable = false)
    private String currency;

    @Column(name = "booking_request_json", nullable = false, columnDefinition = "TEXT")
    private String bookingRequestJson;

    @Column(name = "trusted_quote_json", nullable = false, columnDefinition = "TEXT")
    private String trustedQuoteJson;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    protected BookingEntity() {
    }

    public BookingEntity(
            String bookingReference,
            String packageId,
            String status,
            String importerEmail,
            String exporterState,
            String exporterCity,
            BigDecimal importValueGbp,
            BigDecimal finalEstimatedPriceGbp,
            String currency,
            String bookingRequestJson,
            String trustedQuoteJson,
            LocalDateTime createdAt
    ) {
        this.bookingReference = bookingReference;
        this.packageId = packageId;
        this.status = status;
        this.assignedAgentId = "";
        this.internalNotes = "";
        this.visitResultStatus = "";
this.visitSummary = "";
this.issuesFound = "";
this.agentNextAction = "";
this.visitCompletedAt = null;
        this.importerEmail = importerEmail;
        this.exporterState = exporterState;
        this.exporterCity = exporterCity;
        this.importValueGbp = importValueGbp;
        this.finalEstimatedPriceGbp = finalEstimatedPriceGbp;
        this.currency = currency;
        this.bookingRequestJson = bookingRequestJson;
        this.trustedQuoteJson = trustedQuoteJson;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getBookingReference() {
        return bookingReference;
    }

    public String getPackageId() {
        return packageId;
    }

    public String getStatus() {
        return status;
    }
    
    public String getAssignedAgentId() {
        return assignedAgentId;
    }

    public String getInternalNotes() {
        return internalNotes;
    }
    
    public String getVisitResultStatus() {
    return visitResultStatus;
}

public String getVisitSummary() {
    return visitSummary;
}

public String getIssuesFound() {
    return issuesFound;
}

public String getAgentNextAction() {
    return agentNextAction;
}

public LocalDateTime getVisitCompletedAt() {
    return visitCompletedAt;
}
    public String getImporterEmail() {
        return importerEmail;
    }

    public String getExporterState() {
        return exporterState;
    }

    public String getExporterCity() {
        return exporterCity;
    }

    public BigDecimal getImportValueGbp() {
        return importValueGbp;
    }

    public BigDecimal getFinalEstimatedPriceGbp() {
        return finalEstimatedPriceGbp;
    }

    public String getCurrency() {
        return currency;
    }

    public String getBookingRequestJson() {
        return bookingRequestJson;
    }

    public String getTrustedQuoteJson() {
        return trustedQuoteJson;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void updateAdminFields(
        String status,
        String assignedAgentId,
        String internalNotes
) {
    this.status = status;
    this.assignedAgentId = assignedAgentId;
    this.internalNotes = internalNotes;
}
public void submitVisitResult(
        String visitResultStatus,
        String visitSummary,
        String issuesFound,
        String agentNextAction,
        LocalDateTime visitCompletedAt
) {
    this.visitResultStatus = visitResultStatus;
    this.visitSummary = visitSummary;
    this.issuesFound = issuesFound;
    this.agentNextAction = agentNextAction;
    this.visitCompletedAt = visitCompletedAt;
    this.status = "completed";
}
}