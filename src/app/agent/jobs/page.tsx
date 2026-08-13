import type { Metadata } from "next";
import { AgentJobsList } from "@/components/agent";

export const metadata: Metadata = {
  title: "My jobs | myimportagent agent portal",
};

export default function AgentJobsPage() {
  // Future integration point: GET /api/agent/jobs will load assigned jobs for
  // the authenticated agent. Filtering is local mock state for now.
  return <AgentJobsList />;
}
