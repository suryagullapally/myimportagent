import type { Metadata } from "next";
import { AgentJobsList } from "@/components/agent";

export const metadata: Metadata = {
  title: "My jobs | myimportagent agent portal",
};

export default function AgentJobsPage() {
  return <AgentJobsList />;
}