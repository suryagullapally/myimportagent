import type { Metadata } from "next";
import { AgentOverview } from "@/components/agent";

export const metadata: Metadata = {
  title: "Overview | myimportagent agent portal",
};

export default function AgentOverviewPage() {
  return <AgentOverview />;
}
