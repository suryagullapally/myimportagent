import type { BookingPackage, PaymentStatus } from "./booking";
import type { PricingAddOn } from "./pricing";

export type AdminBookingStatus =
  | "pending-review"
  | "agent-assigned"
  | "in-progress"
  | "report-pending"
  | "completed"
  | "cancelled";

export type AdminPaymentStatus =
  | "not-started"
  | "payment-link-pending"
  | "paid-placeholder"
  | "refunded-placeholder";

export type AdminAgentStatus = "available" | "busy" | "offline";

export type AdminAgent = Readonly<{
  id: string;
  name: string;
  city: string;
  state: string;
  phone: string;
  status: AdminAgentStatus;
  completedJobs: number;
  assignedJobs: number;
  rating: string;
}>;

export type AdminImporterDetails = Readonly<{
  fullName: string;
  companyName: string;
  country: string;
  phone: string;
  email: string;
  isEmailVerified: boolean;
}>;

export type AdminExporterDetails = Readonly<{
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  fullAddress: string;
  state: string;
  city: string;
  googleMapsLink: string;
  gstNumber: string;
  profileLink: string;
}>;

export type AdminProductOrderDetails = Readonly<{
  productCategory: string;
  productDescription: string;
  quantity: string;
  importValueGbp: number;
  paymentStatus: PaymentStatus;
  expectedVerificationDate: string;
  specialInstructions: string;
  checklistItems: readonly string[];
}>;

export type AdminQuoteSummary = Readonly<{
  stateMinimumFee: number;
  onePercentValue: number;
  selectedBasePrice: number;
  selectedBaseReason: string;
  addOns: readonly PricingAddOn[];
  addOnsTotal: number;
  finalEstimatedPrice: number;
}>;

export type AdminBooking = Readonly<{
  id: string;
  reference: string;
  createdDate: string;
  status: AdminBookingStatus;
  paymentStatus: AdminPaymentStatus;
  assignedAgentId: string | null;
  importer: AdminImporterDetails;
  exporter: AdminExporterDetails;
  productOrder: AdminProductOrderDetails;
  package: BookingPackage;
  quote: AdminQuoteSummary;
  supportingFiles: readonly string[];
  internalNotes: string;
}>;
