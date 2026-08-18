package com.myimportagent.backend.agent;

public record AgentCreateRequest(
        String name,
        String state,
        String city,
        String phone,
        String email
) {
}