package com.myimportagent.backend.health;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HealthController {

    @GetMapping("/api/health")
    public HealthResponse getHealth() {
        return new HealthResponse(
                "ok",
                "myimportagent-backend",
                "Spring Boot backend is running"
        );
    }
}