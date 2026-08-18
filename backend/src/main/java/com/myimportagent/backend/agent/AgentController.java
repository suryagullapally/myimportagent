package com.myimportagent.backend.agent;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AgentController {

    private final AgentService agentService;

    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    @GetMapping("/api/agents")
    public List<AgentResponse> getAgents() {
        return agentService.getAgents();
    }

    @GetMapping("/api/agents/{agentId}")
    public ResponseEntity<?> getAgentByAgentId(@PathVariable String agentId) {
        try {
            AgentResponse response = agentService.getAgentByAgentId(agentId);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest()
                    .body(new AgentErrorResponse(exception.getMessage()));
        }
    }

    @PostMapping("/api/agents")
    public ResponseEntity<?> createAgent(@RequestBody AgentCreateRequest request) {
        try {
            AgentResponse response = agentService.createAgent(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest()
                    .body(new AgentErrorResponse(exception.getMessage()));
        }
    }
}