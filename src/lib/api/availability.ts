export type AvailabilityRegion = {
  state: string;
  cities: string[];
  available: boolean;
};

export type AvailabilityCheckResponse = {
  state: string;
  city: string;
  available: boolean;
  message: string;
};

function getApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return apiBaseUrl;
}

export async function getAvailabilityRegions(): Promise<AvailabilityRegion[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/availability`);

  if (!response.ok) {
    throw new Error("Failed to fetch availability regions");
  }

  return response.json();
}

export async function checkAvailability(
  state: string,
  city: string
): Promise<AvailabilityCheckResponse> {
  const params = new URLSearchParams({
    state,
    city,
  });

  const response = await fetch(
    `${getApiBaseUrl()}/api/availability/check?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to check availability");
  }

  return response.json();
}