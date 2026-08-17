package com.myimportagent.backend.pricing;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

@Service
public class PricingService {

    private static final String CURRENCY = "GBP";

    private static final Map<String, BigDecimal> STATE_MINIMUM_FEES_GBP = Map.ofEntries(
            Map.entry("Telangana", money("50")),
            Map.entry("Andhra Pradesh", money("80")),
            Map.entry("Karnataka", money("80")),
            Map.entry("Tamil Nadu", money("80")),
            Map.entry("Kerala", money("90")),
            Map.entry("Maharashtra", money("100")),
            Map.entry("Odisha", money("110")),
            Map.entry("Madhya Pradesh", money("120")),
            Map.entry("Gujarat", money("130")),
            Map.entry("Rajasthan", money("140")),
            Map.entry("Delhi NCR", money("150")),
            Map.entry("Uttar Pradesh", money("150")),
            Map.entry("Haryana", money("150")),
            Map.entry("Punjab", money("160")),
            Map.entry("West Bengal", money("160"))
    );

    private static final Map<String, PricingAddOnDefinition> ADD_ON_PRICES_GBP = Map.of(
            "video_recording",
            new PricingAddOnDefinition("video_recording", "Video recording", money("25")),

            "live_video_call",
            new PricingAddOnDefinition("live_video_call", "Live video call", money("40")),

            "urgent_verification",
            new PricingAddOnDefinition("urgent_verification", "Urgent verification", money("50"))
    );

    public PricingQuoteResponse calculateQuote(PricingQuoteRequest request) {
        validateRequest(request);

        String state = request.state();
        BigDecimal importValueGbp = toMoney(request.importValueGbp());

        BigDecimal stateMinimumFeeGbp = STATE_MINIMUM_FEES_GBP.get(state);
        BigDecimal onePercentValueGbp = toMoney(importValueGbp.multiply(new BigDecimal("0.01")));

        BigDecimal selectedBasePriceGbp;
        String basePriceReason;

        if (stateMinimumFeeGbp.compareTo(onePercentValueGbp) >= 0) {
            selectedBasePriceGbp = stateMinimumFeeGbp;
            basePriceReason = "State minimum fee is higher than or equal to 1% of import value.";
        } else {
            selectedBasePriceGbp = onePercentValueGbp;
            basePriceReason = "1% of import value is higher than the state minimum fee.";
        }

        List<String> selectedAddOnIds = request.addOnIds() == null
                ? List.of()
                : request.addOnIds();

        List<SelectedAddOnResponse> selectedAddOns = selectedAddOnIds
                .stream()
                .map(this::getSelectedAddOn)
                .toList();

        BigDecimal addOnsTotalGbp = selectedAddOns
                .stream()
                .map(SelectedAddOnResponse::priceGbp)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        addOnsTotalGbp = toMoney(addOnsTotalGbp);

        BigDecimal finalEstimatedPriceGbp = toMoney(selectedBasePriceGbp.add(addOnsTotalGbp));

        return new PricingQuoteResponse(
                state,
                stateMinimumFeeGbp,
                onePercentValueGbp,
                selectedBasePriceGbp,
                basePriceReason,
                selectedAddOns,
                addOnsTotalGbp,
                finalEstimatedPriceGbp,
                CURRENCY,
                "Final price will be verified by myimportagent before payment."
        );
    }

    private void validateRequest(PricingQuoteRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Pricing request is required.");
        }

        if (request.state() == null || request.state().isBlank()) {
            throw new IllegalArgumentException("Exporter state is required.");
        }

        if (!STATE_MINIMUM_FEES_GBP.containsKey(request.state())) {
            throw new IllegalArgumentException("Pricing is not available for this state yet.");
        }

        if (request.importValueGbp() == null) {
            throw new IllegalArgumentException("Import value is required.");
        }

        if (request.importValueGbp().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Import value must be greater than 0.");
        }

        if (request.addOnIds() != null) {
            for (String addOnId : request.addOnIds()) {
                if (!ADD_ON_PRICES_GBP.containsKey(addOnId)) {
                    throw new IllegalArgumentException("Unknown add-on selected: " + addOnId);
                }
            }
        }
    }

    private SelectedAddOnResponse getSelectedAddOn(String addOnId) {
        PricingAddOnDefinition addOn = ADD_ON_PRICES_GBP.get(addOnId);

        return new SelectedAddOnResponse(
                addOn.id(),
                addOn.name(),
                addOn.priceGbp()
        );
    }

    private static BigDecimal money(String value) {
        return new BigDecimal(value).setScale(2, RoundingMode.HALF_UP);
    }

    private static BigDecimal toMoney(BigDecimal value) {
        return value.setScale(2, RoundingMode.HALF_UP);
    }
}