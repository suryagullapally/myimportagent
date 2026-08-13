import type { Metadata } from "next";
import { AgentLayout } from "@/components/agent";

export const metadata: Metadata = {
  title: "Agent portal | myimportagent",
  description:
    "Frontend-only myimportagent agent portal demo for assigned verification jobs.",
};

export default function AgentRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Future integration point: protect /agent routes with Spring Security/JWT
  // once the Java Spring Boot backend and agent authentication are added.
  return <AgentLayout>{children}</AgentLayout>;
}
