package com.myimportagent.backend.agent;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AgentRepository extends JpaRepository<AgentEntity, Long> {

    List<AgentEntity> findAllByOrderByCreatedAtDesc();

    Optional<AgentEntity> findByAgentId(String agentId);

    boolean existsByAgentId(String agentId);
}