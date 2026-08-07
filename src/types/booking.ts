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

export type ActiveBookingStep = 1 | 2 | 3;

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
