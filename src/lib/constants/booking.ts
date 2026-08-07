import type { BookingPackage, BookingStep } from "@/types";

export const BOOKING_HERO_COPY = {
  eyebrow: "Verification request",
  headline: "Start your verification request",
  supportingText:
    "Choose what you want myimportagent to verify, then we’ll guide you through exporter details, product information, pricing, and payment.",
  trustLine: "Verification-only service. No logistics or customs clearance.",
};

export const BOOKING_PACKAGE_SECTION_COPY = {
  eyebrow: "Choose package",
  title: "Start with the verification that matches your buying risk.",
  description:
    "This first step only helps you choose a package. Exporter details, product information, pricing, and payment will come later.",
  continueButton: "Continue to Booking Details",
  choosePackageMessage: "Choose a verification package to continue.",
  nextStepMessage:
    "Package selected. The booking details step will be built next.",
};

export const BOOKING_PACKAGES: readonly BookingPackage[] = [
  {
    id: "seller-verification",
    title: "Seller Verification",
    description:
      "Check whether the seller exists at the provided address and whether basic seller details match.",
    bestFor: "Before paying an unknown supplier.",
  },
  {
    id: "product-verification",
    title: "Product Verification",
    description:
      "Check product availability, visible condition, quantity, and key product details before order finalisation.",
    bestFor: "Before balance payment or confirming production.",
  },
  {
    id: "packing-dispatch-verification",
    title: "Packing & Dispatch Verification",
    description:
      "Check packing, box count, labels, and dispatch handover before goods move.",
    bestFor: "Before goods are handed to logistics.",
  },
];

export const BOOKING_STEPS_COPY = {
  eyebrow: "Planned journey",
  title: "What the full booking flow will guide customers through.",
  description:
    "This preview shows the intended journey before the full form, pricing, and payment steps are added.",
};

export const BOOKING_STEPS: readonly BookingStep[] = [
  { number: 1, title: "Check availability" },
  { number: 2, title: "Choose package" },
  { number: 3, title: "Enter importer details" },
  { number: 4, title: "Verify email" },
  { number: 5, title: "Enter exporter and product details" },
  { number: 6, title: "Get price" },
  { number: 7, title: "Pay and confirm booking" },
];
