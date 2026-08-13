import type { Metadata } from "next";
import { PricingManagement } from "@/components/admin";

export const metadata: Metadata = {
  title: "Pricing | myimportagent admin",
};

export default function AdminPricingPage() {
  return <PricingManagement />;
}
