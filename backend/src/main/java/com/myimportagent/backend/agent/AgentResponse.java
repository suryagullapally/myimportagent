package com.myimportagent.backend.agent;

import java.time.LocalDateTime;

public record AgentResponse(
        Long id,
        String agentId,
        String name,
        String state,
        String city,
        String phone,
        String email,
        boolean active,
        LocalDateTime createdAt
) {
}