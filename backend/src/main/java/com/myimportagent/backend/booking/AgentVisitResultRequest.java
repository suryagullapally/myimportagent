package com.myimportagent.backend.booking;

public record AgentVisitResultRequest(
        String visitResultStatus,
        String visitSummary,
        String issuesFound,
        String agentNextAction
) {
}