import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingDetailPanel } from "@/components/admin";
import { ADMIN_BOOKINGS, getAdminBookingById } from "@/lib/mock";

type AdminBookingDetailPageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export function generateStaticParams() {
  return ADMIN_BOOKINGS.map((booking) => ({
    id: booking.id,
  }));
}

export async function generateMetadata({
  params,
}: AdminBookingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const booking = getAdminBookingById(id);

  return {
    title: booking
      ? `${booking.reference} | myimportagent admin`
      : "Booking not found | myimportagent admin",
  };
}

export default async function AdminBookingDetailPage({
  params,
}: AdminBookingDetailPageProps) {
  const { id } = await params;
  const booking = getAdminBookingById(id);

  if (!booking) {
    notFound();
  }

  // Future integration point: GET /api/admin/bookings/{id} will fetch the
  // booking detail from the Java Spring Boot backend.
  return <BookingDetailPanel booking={booking} />;
}
