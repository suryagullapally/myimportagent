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
  { number: 4, title: "Exporter details" },
  { number: 5, title: "Product/order details" },
  { number: 6, title: "Quote summary" },
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
  { number: 5, title: "Enter exporter details" },
  { number: 6, title: "Enter product and order details" },
  { number: 7, title: "Review quote summary" },
  { number: 8, title: "Review booking details" },
  { number: 9, title: "Pay and confirm booking" },
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

export const EXPORTER_DETAILS_COPY = {
  eyebrow: "Exporter details",
  title: "Tell us where the verification agent may need to visit.",
  description:
    "These details help a future local agent understand the seller location. For now, this is frontend-only demo data.",
  businessNameLabel: "Exporter / seller business name",
  contactPersonLabel: "Exporter contact person",
  contactPersonHint: "Optional",
  phoneLabel: "Exporter phone number",
  emailLabel: "Exporter email",
  emailHint: "Optional",
  fullAddressLabel: "Exporter full address",
  stateLabel: "Exporter state",
  cityLabel: "Exporter city",
  googleMapsLabel: "Google Maps link",
  googleMapsHint: "Optional",
  gstNumberLabel: "GST number",
  gstNumberHint: "Optional",
  profileLinkLabel: "Website / IndiaMART / Alibaba / social profile link",
  profileLinkHint: "Optional",
  businessNamePlaceholder: "ABC Exports Pvt Ltd",
  contactPersonPlaceholder: "Mr Sharma",
  phonePlaceholder: "+91 98765 43210",
  emailPlaceholder: "sales@example.in",
  fullAddressPlaceholder: "Unit number, street, area, city, postcode",
  statePlaceholder: "Select exporter state",
  cityPlaceholder: "Select exporter city",
  unavailableCityPlaceholder: "City selection not available",
  googleMapsPlaceholder: "https://maps.google.com/...",
  gstNumberPlaceholder: "GSTIN if known",
  profileLinkPlaceholder: "https://...",
  unavailableStateMessage:
    "Sorry, we are expanding and will be available soon in this state.",
  unavailableStateNote:
    "Booking cannot continue for unavailable states yet, but the details can stay on screen while you review them.",
};

export const EXPORTER_DETAILS_VALIDATION = {
  businessNameRequired: "Exporter business name is required.",
  phoneRequired: "Exporter phone number is required.",
  fullAddressRequired: "Exporter full address is required.",
  stateRequired: "Exporter state is required.",
  cityRequired: "Exporter city is required.",
  stateUnavailable:
    "This exporter state is not available for booking yet.",
};

export const PRODUCT_ORDER_DETAILS_COPY = {
  eyebrow: "Product and order details",
  title: "Explain what the verification agent should check.",
  description:
    "Add the product, quantity, value, payment status, and the evidence you want collected. This still stays in frontend state only.",
  productCategoryLabel: "Product category",
  productDescriptionLabel: "Product description",
  quantityLabel: "Quantity",
  importValueLabel: "Total import value in GBP",
  paymentStatusLabel: "Has payment already been made?",
  expectedDateLabel: "Expected verification time/date",
  expectedDateHint: "Optional",
  specialInstructionsLabel: "Special instructions for the verification agent",
  productCategoryPlaceholder: "Textiles, electronics, machinery...",
  productDescriptionPlaceholder:
    "Describe the product, model, specifications, colour, size, or key identifiers.",
  quantityPlaceholder: "500 units",
  importValuePlaceholder: "2500",
  expectedDatePlaceholder: "Preferred date or time window",
  specialInstructionsPlaceholder:
    "Add anything the agent should pay close attention to.",
  checklistTitle: "What should be checked?",
};

export const PAYMENT_STATUS_OPTIONS = [
  { value: "not-paid", label: "Not paid" },
  { value: "advance-paid", label: "Advance paid" },
  { value: "fully-paid", label: "Fully paid" },
] as const;

export const VERIFICATION_CHECKLIST_ITEMS = [
  "Seller address",
  "Seller business details",
  "Product availability",
  "Product quantity",
  "Product visible condition",
  "Product labels / branding",
  "Packing condition",
  "Box / carton count",
  "Dispatch handover",
  "Documents shown by exporter",
  "Other custom instructions",
] as const;

export const PRODUCT_ORDER_DETAILS_VALIDATION = {
  productCategoryRequired: "Product category is required.",
  productDescriptionRequired: "Product description is required.",
  quantityRequired: "Quantity is required.",
  importValueRequired: "Total import value is required.",
  importValueInvalid: "Total import value must be greater than 0.",
  checklistRequired: "Select at least one verification checklist item.",
};

export const BOOKING_FLOW_COPY = {
  selectedPackageLabel: "Selected package",
  noPackageSelected: "No package selected yet",
  backButton: "Back",
  continueButton: "Continue",
  continueToReviewButton: "Continue to Review",
  completeRequiredMessage: "Complete the required fields to continue.",
  packageRequiredMessage: "Choose a verification package to continue.",
  emailRequiredMessage: "Verify your email with the demo code to continue.",
  exporterRequiredMessage:
    "Complete the exporter details and choose an available state/city to continue.",
  productRequiredMessage:
    "Complete the product/order details and select at least one checklist item.",
  quoteRequiredMessage:
    "A quote cannot be calculated until the exporter state and import value are available.",
  finalPlaceholderMessage:
    "Quote captured in frontend state. Review, payment, and final confirmation will be added in the next build stages.",
};
