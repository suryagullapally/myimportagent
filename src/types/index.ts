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
  ExporterDetailsTouchedFields,
  ImporterDetails,
  ImporterDetailsErrors,
  ImporterDetailsField,
  ImporterDetailsTouchedFields,
  PaymentStatus,
  ProductOrderDetails,
  ProductOrderDetailsErrors,
  ProductOrderDetailsField,
  ProductOrderDetailsTouchedFields,
  ReviewConfirmationKey,
  ReviewConfirmations,
  SupportingFileCategory,
  SupportingFiles,
} from "./booking";
export type {
  CurrencyCode,
  PricingAddOn,
  PricingInput,
  PricingResult,
  SelectedBaseReason,
} from "./pricing";
