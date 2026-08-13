import type { Metadata } from "next";
import { AgentsManagement } from "@/components/admin";

export const metadata: Metadata = {
  title: "Agents | myimportagent admin",
};

export default function AdminAgentsPage() {
  return <AgentsManagement />;
}
