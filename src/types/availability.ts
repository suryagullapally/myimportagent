export type AvailabilityRegion = Readonly<{
  state: string;
  cities: readonly string[];
}>;

export type AvailabilityResult =
  | Readonly<{
      type: "available";
      city: string;
      state: string;
    }>
  | Readonly<{
      type: "unavailable" | "validation";
      message: string;
    }>
  | null;
