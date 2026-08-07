import type { Benefit, PackageCard, WorkflowStep } from "@/types";

export const SITE_CONFIG = {
  name: "myimportagent",
  description:
    "UK-facing verification agency platform for overseas importers buying from India.",
};

export const HOME_PAGE_COPY = {
  eyebrow: "UK-facing verification for Indian sourcing",
  headline: "Buying from India? Let myimportagent check it first.",
  supportingLine:
    "Book a local verification agent in India to verify sellers, products, packing, or dispatch before you pay or ship.",
  trustLine: "Verification-only service. No logistics. No false guarantees.",
  primaryCta: "Check Availability",
  secondaryCta: "Book Verification",
};

export const NAV_ITEMS = [
  { label: "Availability", href: "#availability" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Packages", href: "#packages" },
  { label: "Trust", href: "#trust" },
];

export const HERO_TRUST_POINTS = [
  "Seller presence checks",
  "Product and packing evidence",
  "Dispatch handover confirmation",
];

export const AVAILABILITY_PREVIEW = {
  eyebrow: "Coverage preview",
  title: "Check whether an agent can visit the exporter location.",
  description:
    "Start with the exporter state and city to understand where local checks are planned before you request a visit.",
  stateLabel: "Exporter State",
  cityLabel: "Exporter City",
  exampleState: "Telangana",
  exampleCity: "Hyderabad",
  availableStates: [
    "Telangana",
    "Delhi NCR",
    "Maharashtra",
    "Gujarat",
    "Tamil Nadu",
    "Karnataka",
  ],
  status: "Example coverage available",
};

export const SECTION_COPY = {
  howItWorks: {
    eyebrow: "How it works",
    title: "A clear verification flow before money or goods move.",
    description:
      "The customer stays responsible for the import decision while myimportagent collects local evidence in India.",
  },
  packages: {
    eyebrow: "Verification packages",
    title: "Choose the check that matches your buying risk.",
    description:
      "Focused packages keep the service easy to understand now and easy to connect to a backend later.",
  },
  whyVerify: {
    eyebrow: "Why verify",
    title: "Make import decisions with better evidence.",
    description:
      "Use local checks to reduce uncertainty before balance payment, shipment handover, or order finalisation.",
  },
};

export const PACKAGE_CARDS: PackageCard[] = [
  {
    title: "Seller Verification",
    description:
      "Confirm the exporter exists at the given address and basic seller details match.",
    highlight: "Exporter identity and location",
  },
  {
    title: "Product Verification",
    description:
      "Check product availability, visible condition, quantity, and key details before order finalisation.",
    highlight: "Goods before final decision",
  },
  {
    title: "Packing & Dispatch Verification",
    description:
      "Verify packing, box count, labels, and dispatch handover before goods move.",
    highlight: "Evidence before shipment",
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    label: "Step 1",
    title: "Check availability",
    description:
      "Enter the exporter state and city to see whether local verification coverage is planned.",
  },
  {
    label: "Step 2",
    title: "Submit verification request",
    description:
      "Share the seller location, order context, and the checks you want performed.",
  },
  {
    label: "Step 3",
    title: "Agent visits exporter location",
    description:
      "An India-based verification agent collects evidence against your instructions.",
  },
  {
    label: "Step 4",
    title: "Receive evidence and report",
    description:
      "Review photos, videos, notes, and findings before deciding whether to pay or ship.",
  },
];

export const WHY_VERIFY_BENEFITS: Benefit[] = [
  {
    title: "Reduce supplier risk",
    description: "Use local evidence before relying only on remote promises.",
  },
  {
    title: "Check before balance payment",
    description: "Add a verification step before releasing important funds.",
  },
  {
    title: "Confirm goods before dispatch",
    description: "Review product, packing, and handover signals before movement.",
  },
  {
    title: "Get photo/video evidence",
    description: "Receive practical evidence that supports your import decision.",
  },
  {
    title: "Make better import decisions",
    description: "Stay in control with clearer information from the ground.",
  },
];

export const TRUST_COPY = {
  title: "Verification support without logistics confusion.",
  statement:
    "myimportagent provides physical verification and evidence collection based on your instructions. You stay in control of your import decision.",
  exclusion:
    "We do not provide freight forwarding, customs clearance, insurance, or logistics services.",
};

export const FINAL_CTA_COPY = {
  headline: "Ready to verify before you pay?",
  supportingLine:
    "Check coverage for the exporter location and prepare a verification request when you are ready.",
  primaryCta: "Check Availability",
  secondaryCta: "Start Booking",
};
