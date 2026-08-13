import { BOOKING_PACKAGES } from "@/lib/constants";
import type {
  AgentAvailabilityStatus,
  AgentJob,
  AgentJobStatus,
  VisitResult,
} from "@/types";

export const AGENT_PORTAL_PROFILE = {
  id: "agent-demo-001",
  name: "Aarav Reddy",
  city: "Hyderabad",
  state: "Telangana",
  phone: "+91 90000 12001",
};

export const AGENT_AVAILABILITY_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
  { value: "offline", label: "Offline" },
] as const satisfies readonly {
  value: AgentAvailabilityStatus;
  label: string;
}[];

export const AGENT_JOB_STATUS_OPTIONS = [
  { value: "scheduled", label: "Scheduled" },
  { value: "in-progress", label: "In progress" },
  { value: "evidence-pending", label: "Evidence pending" },
  { value: "submitted", label: "Submitted" },
  { value: "completed", label: "Completed" },
  { value: "visit-failed", label: "Visit failed" },
] as const satisfies readonly {
  value: AgentJobStatus;
  label: string;
}[];

export const VISIT_RESULT_OPTIONS = [
  { value: "verified", label: "Verified" },
  { value: "partially-verified", label: "Partially verified" },
  { value: "not-verified", label: "Not verified" },
  { value: "visit-failed", label: "Visit failed" },
] as const satisfies readonly {
  value: VisitResult;
  label: string;
}[];

export const AGENT_JOBS: readonly AgentJob[] = [
  {
    id: "agent-job-hyd-48291",
    bookingReference: "MIA-DEMO-48291",
    assignedAgentName: AGENT_PORTAL_PROFILE.name,
    scheduledVisitDateTime: "13 Aug 2026, 10:30 IST",
    status: "scheduled",
    package: getPackage("seller-verification"),
    exporter: {
      businessName: "Sri Sai Textiles",
      contactPerson: "Mr Rao",
      phone: "+91 98765 43001",
      fullAddress: "Industrial Area, Balanagar, Hyderabad, Telangana",
      city: "Hyderabad",
      state: "Telangana",
      googleMapsLink: "https://maps.google.com/?q=Hyderabad",
    },
    instructions: {
      productCategory: "Cotton textiles",
      productDescription:
        "Confirm exporter presence and compare business details against the customer request.",
      quantity: "N/A for seller visit",
      specialInstructions:
        "Take clear exterior photos, business signage if visible, and any documents shown by the exporter.",
      checklistItems: [
        "Seller address",
        "Seller business details",
        "Documents shown by exporter",
      ],
      videoEvidenceRequested: false,
    },
  },
  {
    id: "agent-job-mum-73918",
    bookingReference: "MIA-DEMO-73918",
    assignedAgentName: "Meera Shah",
    scheduledVisitDateTime: "14 Aug 2026, 15:00 IST",
    status: "evidence-pending",
    package: getPackage("product-verification"),
    exporter: {
      businessName: "Western Components Pvt Ltd",
      contactPerson: "Ms Desai",
      phone: "+91 98765 43002",
      fullAddress: "MIDC, Andheri East, Mumbai, Maharashtra",
      city: "Mumbai",
      state: "Maharashtra",
      googleMapsLink: "https://maps.google.com/?q=Mumbai",
    },
    instructions: {
      productCategory: "Machine spare parts",
      productDescription:
        "Cast metal replacement parts with model codes listed on the invoice.",
      quantity: "120 pieces",
      specialInstructions:
        "Photograph model labels, visible casting defects, and available quantity before customer balance payment.",
      checklistItems: [
        "Product availability",
        "Product quantity",
        "Product visible condition",
        "Product labels / branding",
      ],
      videoEvidenceRequested: true,
    },
  },
  {
    id: "agent-job-che-28106",
    bookingReference: "MIA-DEMO-28106",
    assignedAgentName: "Priya Raman",
    scheduledVisitDateTime: "10 Aug 2026, 11:00 IST",
    status: "completed",
    package: getPackage("packing-dispatch-verification"),
    exporter: {
      businessName: "Chennai Homeware Studio",
      contactPerson: "Mr Kumar",
      phone: "+91 98765 43005",
      fullAddress: "Ambattur Industrial Estate, Chennai, Tamil Nadu",
      city: "Chennai",
      state: "Tamil Nadu",
      googleMapsLink: "",
    },
    instructions: {
      productCategory: "Homeware",
      productDescription:
        "Wooden kitchen storage items packed in master cartons.",
      quantity: "300 sets",
      specialInstructions:
        "Confirm carton count, packing condition, and dispatch handover evidence.",
      checklistItems: [
        "Packing condition",
        "Box / carton count",
        "Dispatch handover",
        "Product visible condition",
      ],
      videoEvidenceRequested: false,
    },
  },
];

export function getAgentJobById(id: string) {
  return AGENT_JOBS.find((job) => job.id === id);
}

export function getAgentJobStatusLabel(status: AgentJobStatus) {
  return (
    AGENT_JOB_STATUS_OPTIONS.find((option) => option.value === status)?.label ??
    status
  );
}

export function getAgentAvailabilityStatusLabel(
  status: AgentAvailabilityStatus,
) {
  return (
    AGENT_AVAILABILITY_OPTIONS.find((option) => option.value === status)
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
