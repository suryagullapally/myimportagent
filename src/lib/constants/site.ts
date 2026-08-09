import type { Benefit, PackageCard, WorkflowStep } from "@/types";

export const SITE_CONFIG = {
  name: "MyImportAgent",
  description:
    "UK-facing verification agency platform for overseas importers buying from India.",
};

export const HOME_PAGE_COPY = {
  eyebrow: "UK-facing verification for Indian sourcing",
  headline: "Buying from India? Let our agent check it first.",
  supportingLine:
    "Book a local verification agent in India to verify sellers, products, packing, or dispatch before you pay or ship.",
  trustLine: "Verification-only service. No logistics. No false guarantees.",
  primaryCta: "Check Availability",
  secondaryCta: "Book Verification",
};

export const NAV_ITEMS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Packages", href: "/packages" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const HERO_TRUST_POINTS = [
  "Seller presence checks",
  "Product and packing evidence",
  "Dispatch handover confirmation",
];

export const SECTION_COPY = {
  howItWorks: {
    eyebrow: "How it works",
    title: "A clear verification flow before money or goods move.",
    description:
      "The customer stays responsible for the import decision while MyImportAgent collects local evidence in India.",
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

export const HOW_IT_WORKS_PAGE = {
  eyebrow: "How it works",
  title: "A careful verification journey before you pay or ship.",
  description:
    "myimportagent helps overseas importers request local evidence from India before making important import decisions.",
  steps: [
    {
      title: "Check availability",
      description:
        "Confirm whether the exporter state and city are currently covered for verification visits.",
    },
    {
      title: "Choose verification package",
      description:
        "Select seller, product, or packing and dispatch verification based on your buying risk.",
    },
    {
      title: "Submit importer, exporter, and product details",
      description:
        "Provide the business address, product context, order value, and checks you want the agent to perform.",
    },
    {
      title: "Verify email",
      description:
        "Confirm your email so booking updates can later be connected securely through the backend.",
    },
    {
      title: "Get estimated price",
      description:
        "Review the frontend estimate based on exporter state, import value, and selected add-ons.",
    },
    {
      title: "myimportagent reviews the request",
      description:
        "The request can later be checked before final payment and agent assignment.",
    },
    {
      title: "Agent visits exporter location",
      description:
        "A local verification agent in India checks the seller, goods, packing, or dispatch against your instructions.",
    },
    {
      title: "Customer receives evidence/report",
      description:
        "You review photos, videos, notes, and findings before deciding what to do next.",
    },
  ],
  trustPoints: [
    "We verify based on customer instructions.",
    "We do not transport goods.",
    "We do not clear customs.",
    "We do not guarantee supplier honesty or product quality.",
  ],
};

export const PRICING_PAGE = {
  eyebrow: "Pricing",
  title: "Simple estimated pricing for verification visits.",
  description:
    "Pricing is based on exporter location and import value, with optional add-ons where needed.",
  formula:
    "Final price = higher of state minimum fee or 1% of import value, plus selected add-ons.",
  notes: [
    "Import value means goods value only.",
    "It excludes logistics, customs duty, taxes, insurance, and shipping.",
    "Final price may be reviewed before payment.",
  ],
  examples: [
    {
      title: "Example 1",
      state: "Telangana",
      importValue: 2000,
      onePercent: 20,
      minimumFee: 50,
      estimatedPrice: 50,
    },
    {
      title: "Example 2",
      state: "Maharashtra",
      importValue: 20000,
      onePercent: 200,
      minimumFee: 100,
      estimatedPrice: 200,
    },
  ],
};

export const PACKAGES_PAGE = {
  eyebrow: "Packages",
  title: "Choose the verification package that fits the risk.",
  description:
    "Each package focuses on a different stage of buying from India. Packages can be selected separately or combined later depending on the customer's needs.",
  packageDetails: [
    {
      title: "Seller Verification",
      description:
        "Check whether the seller exists at the provided address and whether basic seller details match.",
      bestFor: "Before paying an unknown supplier.",
      checks: [
        "Exporter address presence",
        "Basic business detail match",
        "Visible signage or location evidence",
        "Photo/video evidence where allowed",
      ],
    },
    {
      title: "Product Verification",
      description:
        "Check product availability, visible condition, quantity, and key product details before order finalisation.",
      bestFor: "Before balance payment or confirming production.",
      checks: [
        "Product availability",
        "Visible product condition",
        "Quantity or sample count checks",
        "Labels, branding, and key identifiers",
      ],
    },
    {
      title: "Packing & Dispatch Verification",
      description:
        "Check packing, box count, labels, and dispatch handover before goods move.",
      bestFor: "Before goods are handed to logistics.",
      checks: [
        "Packing condition",
        "Box or carton count",
        "Labels and visible markings",
        "Dispatch handover evidence",
      ],
    },
  ],
  separationNote:
    "Packing & Dispatch Verification is separate because packing and dispatch often happen after seller or product verification.",
};

export const FAQ_ITEMS = [
  {
    question: "What does myimportagent do?",
    answer:
      "myimportagent helps overseas importers arrange local verification in India before payment or shipment. The service focuses on seller, product, packing, and dispatch checks.",
  },
  {
    question: "Are you a logistics company?",
    answer:
      "No. myimportagent is a verification-only service. We collect evidence based on your instructions; we do not move goods.",
  },
  {
    question: "Do you ship goods?",
    answer:
      "No. We do not ship goods, arrange freight, or manage delivery. You remain responsible for your logistics arrangements.",
  },
  {
    question: "Do you provide customs clearance?",
    answer:
      "No. We do not provide customs clearance, freight forwarding, insurance, or tax advice.",
  },
  {
    question: "What can your agents verify?",
    answer:
      "Agents can check visible seller presence, address details, product availability, visible product condition, quantity, packing, labels, dispatch handover, and documents shown by the exporter.",
  },
  {
    id: "available-states",
    question: "Which Indian states are available?",
    answer:
      "The availability checker currently uses the top covered states and regions. Select the exporter state and city on the booking flow before preparing a request.",
  },
  {
    question: "Can I request a live video call?",
    answer:
      "Yes. A live video call is planned as an optional add-on during verification, subject to agent availability and exporter cooperation.",
  },
  {
    question: "Do you guarantee the supplier is genuine?",
    answer:
      "No. Verification reduces uncertainty but cannot guarantee supplier honesty, future behaviour, product quality, or legal compliance. You stay in control of the import decision.",
  },
  {
    question: "What happens if the exporter refuses entry?",
    answer:
      "The agent can report the refusal and collect any permitted external evidence. A refusal itself may be useful information for your decision.",
  },
  {
    question: "Can I verify packing before dispatch?",
    answer:
      "Yes. Packing & Dispatch Verification is designed for checks before goods are handed to logistics.",
  },
  {
    question: "What documents should I upload?",
    answer:
      "Useful documents include invoice or proforma invoice, quotation, product catalogue, packing list, product reference images, and any supplier documents that explain what should be checked.",
  },
  {
    question: "How is the price calculated?",
    answer:
      "The current estimate uses the higher of the state minimum fee or 1% of goods value, plus selected add-ons. Final price may be reviewed before payment.",
  },
];

export const CONTACT_PAGE = {
  eyebrow: "Contact",
  title: "Talk to myimportagent about verification before you pay.",
  description:
    "Use this frontend-only contact form for general questions. Booking requests should start from the booking flow when you are ready.",
  email: "hello@myimportagent.com",
  responseTime: "We aim to respond within 1 business day.",
  urgentNote: "For urgent verification requests, please use the booking form.",
  formBackendMessage: "Contact form backend will be connected later.",
};
