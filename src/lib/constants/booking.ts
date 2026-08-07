import type { BookingPackage, BookingStep } from "@/types";

export const BOOKING_HERO_COPY = {
  eyebrow: "Verification request",
  headline: "Start your verification request",
  supportingText:
    "Choose what you want myimportagent to verify, then we’ll guide you through exporter details, product information, pricing, and payment.",
  trustLine: "Verification-only service. No logistics or customs clearance.",
};

export const ACTIVE_BOOKING_STEPS: readonly BookingStep[] = [
  { number: 1, title: "Choose package" },
  { number: 2, title: "Importer details" },
  { number: 3, title: "Verify email" },
];

export const BOOKING_PACKAGE_SECTION_COPY = {
  eyebrow: "Choose package",
  title: "Start with the verification that matches your buying risk.",
  description:
    "Choose the verification package you want to start with. You can review this before the final booking is confirmed.",
  continueButton: "Continue",
  choosePackageMessage: "Choose a verification package to continue.",
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

export const IMPORTER_DETAILS_COPY = {
  eyebrow: "Importer details",
  title: "Tell us who is requesting the verification.",
  description:
    "These details are only held in this frontend demo for now. Later, they will be sent securely to the Java Spring Boot booking API.",
  fullNameLabel: "Full name",
  companyNameLabel: "Company name",
  companyNameHint: "Optional",
  countryLabel: "Country",
  phoneLabel: "WhatsApp / phone number",
  emailLabel: "Email address",
  fullNamePlaceholder: "Jane Smith",
  companyNamePlaceholder: "Smith Imports Ltd",
  countryPlaceholder: "United Kingdom",
  phonePlaceholder: "+44 7700 900123",
  emailPlaceholder: "jane@example.com",
};

export const IMPORTER_DETAILS_VALIDATION = {
  fullNameRequired: "Full name is required.",
  countryRequired: "Country is required.",
  phoneRequired: "WhatsApp or phone number is required.",
  emailRequired: "Email address is required.",
  emailInvalid: "Email address must look valid.",
};

export const EMAIL_VERIFICATION_COPY = {
  eyebrow: "Email verification",
  title: "Verify your email before the next booking stage.",
  description:
    "This temporary demo checks a fake code only. Real email OTP sending and verification will be handled by the Java Spring Boot backend later.",
  emailLabel: "Email address",
  codeLabel: "Verification code",
  codePlaceholder: "Enter 123456",
  sendButton: "Send verification code",
  verifyButton: "Verify Email",
  sentMessage: "Demo code ready. Use 123456 for now.",
  successMessage: "Email verified successfully.",
  invalidMessage: "Invalid demo code. Use 123456 for now.",
};

export const BOOKING_FLOW_COPY = {
  selectedPackageLabel: "Selected package",
  noPackageSelected: "No package selected yet",
  backButton: "Back",
  continueButton: "Continue",
  completeRequiredMessage: "Complete the required fields to continue.",
  packageRequiredMessage: "Choose a verification package to continue.",
  emailRequiredMessage: "Verify your email with the demo code to continue.",
  finalPlaceholderMessage:
    "Email verified. Exporter details, pricing, payment, and confirmation will be added in the next build stages.",
};
