package com.myimportagent.backend.pricing;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PricingController {

    private final PricingService pricingService;

    public PricingController(PricingService pricingService) {
        this.pricingService = pricingService;
    }

    @PostMapping("/api/pricing/quote")
    public ResponseEntity<?> calculateQuote(@RequestBody PricingQuoteRequest request) {
        try {
            PricingQuoteResponse quote = pricingService.calculateQuote(request);
            return ResponseEntity.ok(quote);
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest()
                    .body(new PricingErrorResponse(exception.getMessage()));
        }
    }
}