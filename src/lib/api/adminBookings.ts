export type AdminBookingListItem = {
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

export type AdminBookingDetail = {
  id: number;
  bookingReference: string;
  packageId: string;
  status: string;
  assignedAgentId: string;
  internalNotes: string;
  visitResultStatus: string;
visitSummary: string;
issuesFound: string;
agentNextAction: string;
visitCompletedAt: string | null;
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

export type AdminBookingUpdateRequest = {
  status: string;
  assignedAgentId: string;
  internalNotes: string;
};

export type AdminBookingErrorResponse = {
  message: string;
};

function getApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return apiBaseUrl;
}

export async function getAdminBookings(): Promise<AdminBookingListItem[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/bookings`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load bookings");
  }

  return response.json();
}

export async function getAdminBookingByReference(
  bookingReference: string,
): Promise<AdminBookingDetail> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/bookings/${encodeURIComponent(bookingReference)}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorData = (await response.json()) as AdminBookingErrorResponse;
    throw new Error(errorData.message || "Failed to load booking details");
  }

  return response.json();
}

export async function updateAdminBookingFields(
  bookingReference: string,
  request: AdminBookingUpdateRequest,
): Promise<AdminBookingDetail> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/bookings/${encodeURIComponent(
      bookingReference,
    )}/admin`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    const errorData = (await response.json()) as AdminBookingErrorResponse;
    throw new Error(errorData.message || "Failed to update booking");
  }

  return response.json();
}