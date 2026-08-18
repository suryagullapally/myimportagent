import type { Metadata } from "next";
import { AgentJobDetail } from "@/components/agent";

type AgentJobDetailPageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export async function generateMetadata({
  params,
}: AgentJobDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const bookingReference = decodeURIComponent(id);

  return {
    title: `${bookingReference} | myimportagent agent portal`,
  };
}

export default async function AgentJobDetailPage({
  params,
}: AgentJobDetailPageProps) {
  const { id } = await params;
  const bookingReference = decodeURIComponent(id);

  return <AgentJobDetail bookingReference={bookingReference} />;
}