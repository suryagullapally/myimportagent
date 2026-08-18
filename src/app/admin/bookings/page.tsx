import type { Metadata } from "next";
import { BookingsManagement } from "@/components/admin";

export const metadata: Metadata = {
  title: "Bookings | myimportagent admin",
};

export default function AdminBookingsPage() {
  return <BookingsManagement />;
}