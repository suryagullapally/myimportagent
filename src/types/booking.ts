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
