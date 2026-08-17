package com.myimportagent.backend.availability;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AvailabilityService {

    private final Map<String, List<String>> availableRegions = Map.ofEntries(
            Map.entry("Telangana", List.of("Hyderabad", "Secunderabad", "Warangal")),
            Map.entry("Delhi NCR", List.of("Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad")),
            Map.entry("Maharashtra", List.of("Mumbai", "Pune", "Nagpur", "Nashik", "Thane")),
            Map.entry("Gujarat", List.of("Ahmedabad", "Surat", "Vadodara", "Rajkot")),
            Map.entry("Tamil Nadu", List.of("Chennai", "Coimbatore", "Tiruppur", "Madurai")),
            Map.entry("Karnataka", List.of("Bengaluru", "Mysuru", "Mangaluru", "Hubballi")),
            Map.entry("Andhra Pradesh", List.of("Vijayawada", "Visakhapatnam", "Guntur", "Tirupati")),
            Map.entry("Kerala", List.of("Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur")),
            Map.entry("Rajasthan", List.of("Jaipur", "Jodhpur", "Udaipur", "Kota")),
            Map.entry("Uttar Pradesh", List.of("Lucknow", "Kanpur", "Noida", "Agra", "Varanasi")),
            Map.entry("Haryana", List.of("Gurugram", "Faridabad", "Panipat", "Sonipat")),
            Map.entry("Punjab", List.of("Ludhiana", "Amritsar", "Jalandhar", "Chandigarh")),
            Map.entry("West Bengal", List.of("Kolkata", "Howrah", "Durgapur", "Siliguri")),
            Map.entry("Madhya Pradesh", List.of("Indore", "Bhopal", "Gwalior", "Jabalpur")),
            Map.entry("Odisha", List.of("Bhubaneswar", "Cuttack", "Rourkela"))
    );

    public List<AvailabilityRegionResponse> getAvailableRegions() {
        return availableRegions.entrySet()
                .stream()
                .map(entry -> new AvailabilityRegionResponse(
                        entry.getKey(),
                        entry.getValue(),
                        true
                ))
                .toList();
    }

    public AvailabilityCheckResponse checkAvailability(String state, String city) {
        if (state == null || state.isBlank()) {
            return new AvailabilityCheckResponse(
                    "",
                    "",
                    false,
                    "Please select an exporter state."
            );
        }

        if (!availableRegions.containsKey(state)) {
            return new AvailabilityCheckResponse(
                    state,
                    city == null ? "" : city,
                    false,
                    "Sorry, we are expanding and will be available soon in this state."
            );
        }

        if (city == null || city.isBlank()) {
            return new AvailabilityCheckResponse(
                    state,
                    "",
                    false,
                    "Please select an exporter city."
            );
        }

        boolean cityAvailable = availableRegions.get(state).contains(city);

        if (!cityAvailable) {
            return new AvailabilityCheckResponse(
                    state,
                    city,
                    false,
                    "Sorry, myimportagent is not available in this city yet."
            );
        }

        return new AvailabilityCheckResponse(
                state,
                city,
                true,
                "Good news — myimportagent verification is available in " + city + ", " + state + "."
        );
    }
}