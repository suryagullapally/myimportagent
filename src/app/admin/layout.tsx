import type { Metadata } from "next";
import { AdminLayout } from "@/components/admin";

export const metadata: Metadata = {
  title: "Admin dashboard | myimportagent",
  description:
    "Frontend-only myimportagent admin dashboard demo for booking operations.",
};

export default function AdminRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Future integration point: protect /admin routes with Spring Security/JWT
  // once the Java Spring Boot backend and admin authentication are added.
  return <AdminLayout>{children}</AdminLayout>;
}
