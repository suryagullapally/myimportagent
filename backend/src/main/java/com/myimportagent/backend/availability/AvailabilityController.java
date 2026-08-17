package com.myimportagent.backend.availability;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    public AvailabilityController(AvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    @GetMapping("/api/availability")
    public List<AvailabilityRegionResponse> getAvailableRegions() {
        return availabilityService.getAvailableRegions();
    }

    @GetMapping("/api/availability/check")
    public AvailabilityCheckResponse checkAvailability(
            @RequestParam String state,
            @RequestParam(required = false) String city
    ) {
        return availabilityService.checkAvailability(state, city);
    }
}
