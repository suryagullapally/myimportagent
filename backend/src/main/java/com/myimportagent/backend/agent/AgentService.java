package com.myimportagent.backend.agent;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class AgentService {

    private final AgentRepository agentRepository;
    private final Random random = new Random();

    public AgentService(AgentRepository agentRepository) {
        this.agentRepository = agentRepository;
    }

    public List<AgentResponse> getAgents() {
        return agentRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public AgentResponse getAgentByAgentId(String agentId) {
        AgentEntity agent = agentRepository.findByAgentId(agentId)
                .orElseThrow(() -> new IllegalArgumentException("Agent was not found."));

        return toResponse(agent);
    }

    @Transactional
    public AgentResponse createAgent(AgentCreateRequest request) {
        validateCreateRequest(request);

        String agentId = generateAgentId(request.city());

        AgentEntity agent = new AgentEntity(
                agentId,
                request.name().trim(),
                request.state().trim(),
                request.city().trim(),
                request.phone().trim(),
                request.email().trim(),
                true,
                LocalDateTime.now()
        );

        AgentEntity savedAgent = agentRepository.save(agent);

        return toResponse(savedAgent);
    }

    private void validateCreateRequest(AgentCreateRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Agent request is required.");
        }

        if (isBlank(request.name())) {
            throw new IllegalArgumentException("Agent name is required.");
        }

        if (isBlank(request.state())) {
            throw new IllegalArgumentException("Agent state is required.");
        }

        if (isBlank(request.city())) {
            throw new IllegalArgumentException("Agent city is required.");
        }

        if (isBlank(request.phone())) {
            throw new IllegalArgumentException("Agent phone is required.");
        }

        if (isBlank(request.email())) {
            throw new IllegalArgumentException("Agent email is required.");
        }
    }

    private String generateAgentId(String city) {
        String cityPart = city == null
                ? "agent"
                : city.trim().toLowerCase().replaceAll("[^a-z0-9]+", "-");

        if (cityPart.isBlank()) {
            cityPart = "agent";
        }

        String agentId;

        do {
            int randomNumber = 1000 + random.nextInt(9000);
            agentId = "agent-" + cityPart + "-" + randomNumber;
        } while (agentRepository.existsByAgentId(agentId));

        return agentId;
    }

    private AgentResponse toResponse(AgentEntity agent) {
        return new AgentResponse(
                agent.getId(),
                agent.getAgentId(),
                agent.getName(),
                agent.getState(),
                agent.getCity(),
                agent.getPhone(),
                agent.getEmail(),
                agent.isActive(),
                agent.getCreatedAt()
        );
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}