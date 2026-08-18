import type { PricingQuoteResponse } from "@/lib/api/pricing";
import type {
  ExporterDetails,
  ImporterDetails,
  ProductOrderDetails,
  SupportingFiles,
} from "@/types";

export type BookingCreateRequest = {
  packageId: string;
  importerDetails: ImporterDetails & {
    emailVerified: boolean;
  };
  exporterDetails: ExporterDetails;
  productOrderDetails: Omit<ProductOrderDetails, "importValueGbp"> & {
    importValueGbp: number;
  };
  selectedAddOnIds: string[];
  supportingFiles: SupportingFiles;
};

export type BookingCreateResponse = {
  bookingReference: string;
  status: string;
  message: string;
  persisted: boolean;
  trustedQuote: PricingQuoteResponse;
};

export type BookingErrorResponse = {
  message: string;
};

function getApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return apiBaseUrl;
}

export async function createBooking(
  request: BookingCreateRequest,
): Promise<BookingCreateResponse> {
  const response = await fetch(`${getApiBaseUrl()}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as BookingErrorResponse;
    throw new Error(errorData.message || "Failed to submit booking request");
  }

  return response.json();
}