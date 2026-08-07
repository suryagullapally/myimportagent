export type VerificationService = Readonly<{
  title: string;
  description: string;
}>;

export type WorkflowStep = Readonly<{
  label: string;
  title: string;
  description: string;
}>;

export type PackageCard = Readonly<{
  title: string;
  description: string;
  highlight: string;
}>;

export type Benefit = Readonly<{
  title: string;
  description: string;
}>;

export type { AvailabilityRegion, AvailabilityResult } from "./availability";
export type {
  ActiveBookingStep,
  BookingPackage,
  BookingStep,
  ExporterDetails,
  ExporterDetailsErrors,
  ExporterDetailsField,
  ImporterDetails,
  ImporterDetailsErrors,
  ImporterDetailsField,
  PaymentStatus,
  ProductOrderDetails,
  ProductOrderDetailsErrors,
  ProductOrderDetailsField,
} from "./booking";
export type {
  CurrencyCode,
  PricingAddOn,
  PricingInput,
  PricingResult,
  SelectedBaseReason,
} from "./pricing";
