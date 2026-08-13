import type { Metadata } from "next";
import { BookingsManagement } from "@/components/admin";

export const metadata: Metadata = {
  title: "Bookings | myimportagent admin",
};

export default function AdminBookingsPage() {
  // Future integration point: GET /api/admin/bookings will load bookings from
  // the Java Spring Boot backend. Filtering is local mock state for now.
  return <BookingsManagement />;
}
