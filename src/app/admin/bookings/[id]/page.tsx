import type { Metadata } from "next";
import { BookingDetailPanel } from "@/components/admin";

type AdminBookingDetailPageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export async function generateMetadata({
  params,
}: AdminBookingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const bookingReference = decodeURIComponent(id);

  return {
    title: `${bookingReference} | myimportagent admin`,
  };
}

export default async function AdminBookingDetailPage({
  params,
}: AdminBookingDetailPageProps) {
  const { id } = await params;
  const bookingReference = decodeURIComponent(id);

  return <BookingDetailPanel bookingReference={bookingReference} />;
}