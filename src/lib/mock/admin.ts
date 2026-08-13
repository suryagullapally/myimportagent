import { BOOKING_PACKAGES, PRICING_ADD_ONS } from "@/lib/constants";
import { calculateVerificationPrice } from "@/lib/utils/pricing";
import type {
  AdminAgent,
  AdminAgentStatus,
  AdminBooking,
  AdminBookingStatus,
  AdminPaymentStatus,
  AdminQuoteSummary,
} from "@/types";

export const ADMIN_BOOKING_STATUS_OPTIONS = [
  { value: "pending-review", label: "Pending review" },
  { value: "agent-assigned", label: "Agent assigned" },
  { value: "in-progress", label: "In progress" },
  { value: "report-pending", label: "Report pending" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const satisfies readonly {
  value: AdminBookingStatus;
  label: string;
}[];

export const ADMIN_PAYMENT_STATUS_OPTIONS = [
  { value: "not-started", label: "Not started" },
  { value: "payment-link-pending", label: "Payment link pending" },
  { value: "paid-placeholder", label: "Paid placeholder" },
  { value: "refunded-placeholder", label: "Refunded placeholder" },
] as const satisfies readonly {
  value: AdminPaymentStatus;
  label: string;
}[];

export const ADMIN_AGENT_STATUS_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
  { value: "offline", label: "Offline" },
] as const satisfies readonly {
  value: AdminAgentStatus;
  label: string;
}[];

export const ADMIN_AGENTS: readonly AdminAgent[] = [
  {
    id: "agent-hyd-001",
    name: "Aarav Reddy",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91 90000 12001",
    status: "available",
    completedJobs: 32,
    assignedJobs: 2,
    rating: "4.8/5",
  },
  {
    id: "agent-mum-002",
    name: "Meera Shah",
    city: "Mumbai",
    state: "Maharashtra",
    phone: "+91 90000 12002",
    status: "busy",
    completedJobs: 47,
    assignedJobs: 4,
    rating: "4.9/5",
  },
  {
    id: "agent-del-003",
    name: "Kabir Malhotra",
    city: "Delhi",
    state: "Delhi NCR",
    phone: "+91 90000 12003",
    status: "available",
    completedJobs: 28,
    assignedJobs: 1,
    rating: "4.7/5",
  },
  {
    id: "agent-che-004",
    name: "Priya Raman",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "+91 90000 12004",
    status: "offline",
    completedJobs: 19,
    assignedJobs: 0,
    rating: "4.6/5",
  },
  {
    id: "agent-ahm-005",
    name: "Nikhil Patel",
    city: "Ahmedabad",
    state: "Gujarat",
    phone: "+91 90000 12005",
    status: "available",
    completedJobs: 35,
    assignedJobs: 2,
    rating: "4.8/5",
  },
];

export const ADMIN_BOOKINGS: readonly AdminBooking[] = [
  {
    id: "mia-demo-48291",
    reference: "MIA-DEMO-48291",
    createdDate: "2026-08-09",
    status: "pending-review",
    paymentStatus: "payment-link-pending",
    assignedAgentId: "agent-hyd-001",
    importer: {
      fullName: "Amelia Carter",
      companyName: "Carter Home Imports Ltd",
      country: "United Kingdom",
      phone: "+44 7700 900123",
      email: "amelia.carter@example.com",
      isEmailVerified: true,
    },
    exporter: {
      businessName: "Sri Sai Textiles",
      contactPerson: "Mr Rao",
      phone: "+91 98765 43001",
      email: "sales@srisaitextiles.example",
      fullAddress: "Industrial Area, Balanagar, Hyderabad, Telangana",
      state: "Telangana",
      city: "Hyderabad",
      googleMapsLink: "https://maps.google.com/?q=Hyderabad",
      gstNumber: "36ABCDE1234F1Z5",
      profileLink: "https://example.com/sri-sai-textiles",
    },
    productOrder: {
      productCategory: "Cotton textiles",
      productDescription:
        "Dyed cotton fabric rolls matching customer reference photos.",
      quantity: "500 rolls",
      importValueGbp: 8000,
      paymentStatus: "advance-paid",
      expectedVerificationDate: "2026-08-18 morning",
      specialInstructions:
        "Confirm visible fabric colour, roll labels, and quantity before balance payment.",
      checklistItems: [
        "Seller address",
        "Product availability",
        "Product quantity",
        "Product labels / branding",
      ],
    },
    package: getPackage("product-verification"),
    quote: createQuote("Telangana", 8000, ["video-recording"]),
    supportingFiles: [
      "proforma-invoice-demo.pdf",
      "fabric-reference-demo.jpg",
    ],
    internalNotes: "Check if agent can visit before 12:00 local time.",
  },
  {
    id: "mia-demo-73918",
    reference: "MIA-DEMO-73918",
    createdDate: "2026-08-08",
    status: "agent-assigned",
    paymentStatus: "paid-placeholder",
    assignedAgentId: "agent-mum-002",
    importer: {
      fullName: "Daniel Hughes",
      companyName: "Hughes Trade Group",
      country: "United Kingdom",
      phone: "+44 7700 900456",
      email: "daniel.hughes@example.com",
      isEmailVerified: true,
    },
    exporter: {
      businessName: "Western Components Pvt Ltd",
      contactPerson: "Ms Desai",
      phone: "+91 98765 43002",
      email: "exports@westerncomponents.example",
      fullAddress: "MIDC, Andheri East, Mumbai, Maharashtra",
      state: "Maharashtra",
      city: "Mumbai",
      googleMapsLink: "https://maps.google.com/?q=Mumbai",
      gstNumber: "27ABCDE5678K1Z2",
      profileLink: "https://example.com/western-components",
    },
    productOrder: {
      productCategory: "Machine spare parts",
      productDescription:
        "Cast metal replacement parts with model codes listed on the invoice.",
      quantity: "120 pieces",
      importValueGbp: 20000,
      paymentStatus: "not-paid",
      expectedVerificationDate: "2026-08-16 afternoon",
      specialInstructions:
        "Photograph labels and visible casting defects if found.",
      checklistItems: [
        "Seller business details",
        "Product visible condition",
        "Documents shown by exporter",
      ],
    },
    package: getPackage("seller-verification"),
    quote: createQuote("Maharashtra", 20000, ["live-video-call"]),
    supportingFiles: ["quotation-demo.pdf", "part-reference-demo.png"],
    internalNotes: "Payment placeholder set for admin demo only.",
  },
  {
    id: "mia-demo-61524",
    reference: "MIA-DEMO-61524",
    createdDate: "2026-08-07",
    status: "report-pending",
    paymentStatus: "paid-placeholder",
    assignedAgentId: "agent-del-003",
    importer: {
      fullName: "Sophie Williams",
      companyName: "",
      country: "United Arab Emirates",
      phone: "+971 50 123 4567",
      email: "sophie.williams@example.com",
      isEmailVerified: false,
    },
    exporter: {
      businessName: "NCR Packaging Works",
      contactPerson: "Mr Singh",
      phone: "+91 98765 43003",
      email: "",
      fullAddress: "Sector 63, Noida, Delhi NCR",
      state: "Delhi NCR",
      city: "Noida",
      googleMapsLink: "https://maps.google.com/?q=Noida",
      gstNumber: "",
      profileLink: "https://example.com/ncr-packaging",
    },
    productOrder: {
      productCategory: "Retail packaging",
      productDescription:
        "Printed cartons for cosmetics with branded labels and dispatch cartons.",
      quantity: "4,000 cartons",
      importValueGbp: 6500,
      paymentStatus: "fully-paid",
      expectedVerificationDate: "",
      specialInstructions:
        "Confirm final box count before goods are handed to the transport provider.",
      checklistItems: [
        "Packing condition",
        "Box / carton count",
        "Dispatch handover",
        "Product labels / branding",
      ],
    },
    package: getPackage("packing-dispatch-verification"),
    quote: createQuote("Delhi NCR", 6500, ["video-recording", "urgent-verification"]),
    supportingFiles: ["packing-list-demo.pdf"],
    internalNotes: "Email verification warning should be visible in review screens.",
  },
  {
    id: "mia-demo-90437",
    reference: "MIA-DEMO-90437",
    createdDate: "2026-08-06",
    status: "in-progress",
    paymentStatus: "paid-placeholder",
    assignedAgentId: "agent-ahm-005",
    importer: {
      fullName: "Omar Al-Fayed",
      companyName: "Gulf Retail Sourcing",
      country: "Qatar",
      phone: "+974 3300 1122",
      email: "omar.alfayed@example.com",
      isEmailVerified: true,
    },
    exporter: {
      businessName: "Surat Apparel Exporters",
      contactPerson: "Ms Patel",
      phone: "+91 98765 43004",
      email: "orders@suratapparel.example",
      fullAddress: "Textile Market, Ring Road, Surat, Gujarat",
      state: "Gujarat",
      city: "Surat",
      googleMapsLink: "https://maps.google.com/?q=Surat",
      gstNumber: "24ABCDE9012L1Z8",
      profileLink: "",
    },
    productOrder: {
      productCategory: "Apparel",
      productDescription:
        "Finished cotton shirts packed by size and colour lot.",
      quantity: "2,200 pieces",
      importValueGbp: 12000,
      paymentStatus: "advance-paid",
      expectedVerificationDate: "2026-08-15",
      specialInstructions:
        "Check carton labels, visible stitching quality, and size breakdown.",
      checklistItems: [
        "Product quantity",
        "Product visible condition",
        "Packing condition",
        "Box / carton count",
      ],
    },
    package: getPackage("product-verification"),
    quote: createQuote("Gujarat", 12000, ["urgent-verification"]),
    supportingFiles: ["shirt-size-chart-demo.pdf", "sample-image-demo.jpg"],
    internalNotes: "Urgent request; confirm agent travel window.",
  },
  {
    id: "mia-demo-28106",
    reference: "MIA-DEMO-28106",
    createdDate: "2026-08-05",
    status: "completed",
    paymentStatus: "paid-placeholder",
    assignedAgentId: "agent-che-004",
    importer: {
      fullName: "Grace Miller",
      companyName: "Nordic Homeware AB",
      country: "Sweden",
      phone: "+46 70 123 45 67",
      email: "grace.miller@example.com",
      isEmailVerified: true,
    },
    exporter: {
      businessName: "Chennai Homeware Studio",
      contactPerson: "Mr Kumar",
      phone: "+91 98765 43005",
      email: "hello@chennaihomeware.example",
      fullAddress: "Ambattur Industrial Estate, Chennai, Tamil Nadu",
      state: "Tamil Nadu",
      city: "Chennai",
      googleMapsLink: "",
      gstNumber: "33ABCDE3456M1Z1",
      profileLink: "https://example.com/chennai-homeware",
    },
    productOrder: {
      productCategory: "Homeware",
      productDescription:
        "Wooden kitchen storage items packed in master cartons.",
      quantity: "300 sets",
      importValueGbp: 4200,
      paymentStatus: "advance-paid",
      expectedVerificationDate: "2026-08-10",
      specialInstructions: "",
      checklistItems: [
        "Seller address",
        "Product availability",
        "Packing condition",
      ],
    },
    package: getPackage("packing-dispatch-verification"),
    quote: createQuote("Tamil Nadu", 4200, []),
    supportingFiles: [],
    internalNotes: "Completed booking retained as mock history.",
  },
];

export function getAdminBookingById(id: string) {
  return ADMIN_BOOKINGS.find((booking) => booking.id === id);
}

export function getAdminAgentById(id: string | null) {
  if (!id) {
    return null;
  }

  return ADMIN_AGENTS.find((agent) => agent.id === id) ?? null;
}

export function getAdminBookingStatusLabel(status: AdminBookingStatus) {
  return (
    ADMIN_BOOKING_STATUS_OPTIONS.find((option) => option.value === status)
      ?.label ?? status
  );
}

export function getAdminPaymentStatusLabel(status: AdminPaymentStatus) {
  return (
    ADMIN_PAYMENT_STATUS_OPTIONS.find((option) => option.value === status)
      ?.label ?? status
  );
}

export function getAdminAgentStatusLabel(status: AdminAgentStatus) {
  return (
    ADMIN_AGENT_STATUS_OPTIONS.find((option) => option.value === status)
      ?.label ?? status
  );
}

function getPackage(packageId: string) {
  const bookingPackage = BOOKING_PACKAGES.find(
    (packageOption) => packageOption.id === packageId,
  );

  if (!bookingPackage) {
    throw new Error(`Missing booking package mock data for ${packageId}`);
  }

  return bookingPackage;
}

function getAddOns(addOnIds: readonly string[]) {
  return PRICING_ADD_ONS.filter((addOn) => addOnIds.includes(addOn.id));
}

function createQuote(
  exporterState: string,
  importValueGbp: number,
  selectedAddOnIds: readonly string[],
): AdminQuoteSummary {
  const result = calculateVerificationPrice({
    exporterState,
    importValueGbp,
    selectedAddOnIds,
  });

  if (
    result.stateMinimumFee === null ||
    result.basePrice === null ||
    result.finalPrice === null ||
    result.selectedBaseReason === null
  ) {
    throw new Error(`Pricing mock data is unavailable for ${exporterState}`);
  }

  return {
    stateMinimumFee: result.stateMinimumFee,
    onePercentValue: result.onePercentValue,
    selectedBasePrice: result.basePrice,
    selectedBaseReason:
      result.selectedBaseReason === "state-minimum"
        ? "State minimum fee"
        : "1% of import value",
    addOns: getAddOns(selectedAddOnIds),
    addOnsTotal: result.addOnsTotal,
    finalEstimatedPrice: result.finalPrice,
  };
}
