export type HealthResponse = {
  status: string;
  service: string;
  message: string;
};

export async function getBackendHealth(): Promise<HealthResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${apiBaseUrl}/api/health`);

  if (!response.ok) {
    throw new Error("Failed to connect to backend health API");
  }

  return response.json();
}