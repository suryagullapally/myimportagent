import type { Metadata } from "next";
import { AvailabilityManagement } from "@/components/admin";

export const metadata: Metadata = {
  title: "Availability | myimportagent admin",
};

export default function AdminAvailabilityPage() {
  return <AvailabilityManagement />;
}
