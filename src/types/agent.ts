import type { BookingPackage } from "./booking";

export type AgentAvailabilityStatus = "available" | "busy" | "offline";

export type AgentJobStatus =
  | "scheduled"
  | "in-progress"
  | "evidence-pending"
  | "submitted"
  | "completed"
  | "visit-failed";

export type VisitResult = "verified" | "partially-verified" | "not-verified" | "visit-failed";

export type AgentEvidenceCategory =
  | "locationPhotos"
  | "productPhotos"
  | "packingPhotos"
  | "dispatchPhotos"
  | "videoEvidence";

export type AgentEvidenceFiles = Record<AgentEvidenceCategory, readonly string[]>;

export type AgentJobExporter = Readonly<{
  businessName: string;
  contactPerson: string;
  phone: string;
  fullAddress: string;
  city: string;
  state: string;
  googleMapsLink: string;
}>;

export type AgentJobInstructions = Readonly<{
  productCategory: string;
  productDescription: string;
  quantity: string;
  specialInstructions: string;
  checklistItems: readonly string[];
  videoEvidenceRequested: boolean;
}>;

export type AgentJob = Readonly<{
  id: string;
  bookingReference: string;
  assignedAgentName: string;
  scheduledVisitDateTime: string;
  status: AgentJobStatus;
  package: BookingPackage;
  exporter: AgentJobExporter;
  instructions: AgentJobInstructions;
}>;
