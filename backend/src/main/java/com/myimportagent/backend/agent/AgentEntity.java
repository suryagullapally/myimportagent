package com.myimportagent.backend.agent;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "agents")
public class AgentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "agent_id", nullable = false, unique = true)
    private String agentId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private boolean active;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    protected AgentEntity() {
    }

    public AgentEntity(
            String agentId,
            String name,
            String state,
            String city,
            String phone,
            String email,
            boolean active,
            LocalDateTime createdAt
    ) {
        this.agentId = agentId;
        this.name = name;
        this.state = state;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.active = active;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getAgentId() {
        return agentId;
    }

    public String getName() {
        return name;
    }

    public String getState() {
        return state;
    }

    public String getCity() {
        return city;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public boolean isActive() {
        return active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}