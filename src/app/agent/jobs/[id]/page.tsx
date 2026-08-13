import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgentJobDetail } from "@/components/agent";
import { AGENT_JOBS, getAgentJobById } from "@/lib/mock";

type AgentJobDetailPageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export function generateStaticParams() {
  return AGENT_JOBS.map((job) => ({
    id: job.id,
  }));
}

export async function generateMetadata({
  params,
}: AgentJobDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = getAgentJobById(id);

  return {
    title: job
      ? `${job.bookingReference} | myimportagent agent portal`
      : "Job not found | myimportagent agent portal",
  };
}

export default async function AgentJobDetailPage({
  params,
}: AgentJobDetailPageProps) {
  const { id } = await params;
  const job = getAgentJobById(id);

  if (!job) {
    notFound();
  }

  // Future integration point: GET /api/agent/jobs/{id} will fetch this job
  // from the Java Spring Boot backend for the authenticated agent only.
  return <AgentJobDetail job={job} />;
}
