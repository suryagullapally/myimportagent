export type AgentResponse = {
  id: number;
  agentId: string;
  name: string;
  state: string;
  city: string;
  phone: string;
  email: string;
  active: boolean;
  createdAt: string;
};

export type AgentCreateRequest = {
  name: string;
  state: string;
  city: string;
  phone: string;
  email: string;
};

export type AgentErrorResponse = {
  message: string;
};

function getApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return apiBaseUrl;
}

export async function getAgents(): Promise<AgentResponse[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/agents`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load agents");
  }

  return response.json();
}

export async function getAgentByAgentId(
  agentId: string,
): Promise<AgentResponse> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/agents/${encodeURIComponent(agentId)}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorData = (await response.json()) as AgentErrorResponse;
    throw new Error(errorData.message || "Failed to load agent");
  }

  return response.json();
}

export async function createAgent(
  request: AgentCreateRequest,
): Promise<AgentResponse> {
  const response = await fetch(`${getApiBaseUrl()}/api/agents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as AgentErrorResponse;
    throw new Error(errorData.message || "Failed to create agent");
  }

  return response.json();
}