export type AgentJobListItem = {
  id: number;
  bookingReference: string;
  packageId: string;
  status: string;
  assignedAgentId: string;
  importerEmail: string;
  exporterState: string;
  exporterCity: string;
  importValueGbp: number;
  finalEstimatedPriceGbp: number;
  currency: string;
  createdAt: string;
};

export type AgentJobDetail = {
  id: number;
  bookingReference: string;
  packageId: string;
  status: string;
  assignedAgentId: string;
  internalNotes: string;
  importerEmail: string;
  exporterState: string;
  exporterCity: string;
  importValueGbp: number;
  finalEstimatedPriceGbp: number;
  currency: string;
  bookingRequestJson: string;
  trustedQuoteJson: string;
  createdAt: string;
};

export type AgentJobErrorResponse = {
  message: string;
};

function getApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return apiBaseUrl;
}

export async function getAgentJobs(
  agentId: string,
): Promise<AgentJobListItem[]> {
  const params = new URLSearchParams({ agentId });

  const response = await fetch(
    `${getApiBaseUrl()}/api/agent/jobs?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorData = (await response.json()) as AgentJobErrorResponse;
    throw new Error(errorData.message || "Failed to load agent jobs");
  }

  return response.json();
}

export async function getAgentJobByReference(
  bookingReference: string,
  agentId: string,
): Promise<AgentJobDetail> {
  const params = new URLSearchParams({ agentId });

  const response = await fetch(
    `${getApiBaseUrl()}/api/agent/jobs/${encodeURIComponent(
      bookingReference,
    )}?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorData = (await response.json()) as AgentJobErrorResponse;
    throw new Error(errorData.message || "Failed to load agent job details");
  }

  return response.json();
}