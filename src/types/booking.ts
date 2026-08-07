export type BookingPackage = Readonly<{
  id: string;
  title: string;
  description: string;
  bestFor: string;
}>;

export type BookingStep = Readonly<{
  number: number;
  title: string;
}>;

export type ActiveBookingStep = 1 | 2 | 3 | 4 | 5 | 6;

export type ImporterDetails = Readonly<{
  fullName: string;
  companyName: string;
  country: string;
  phone: string;
  email: string;
}>;

export type ImporterDetailsField = keyof ImporterDetails;

export type ImporterDetailsErrors = Partial<
  Record<ImporterDetailsField, string>
>;

export type ExporterDetails = Readonly<{
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

export type ExporterDetailsField = keyof ExporterDetails;

export type ExporterDetailsErrors = Partial<
  Record<ExporterDetailsField | "stateAvailability", string>
>;

export type PaymentStatus = "not-paid" | "advance-paid" | "fully-paid";

export type ProductOrderDetails = Readonly<{
  productCategory: string;
  productDescription: string;
  quantity: string;
  importValueGbp: string;
  paymentStatus: PaymentStatus;
  expectedVerificationDate: string;
  specialInstructions: string;
  checklistItems: readonly string[];
}>;

export type ProductOrderDetailsField = keyof Omit<
  ProductOrderDetails,
  "checklistItems"
>;

export type ProductOrderDetailsErrors = Partial<
  Record<ProductOrderDetailsField | "checklistItems", string>
>;
