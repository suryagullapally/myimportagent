import Link from "next/link";
import { BOOKING_PACKAGES } from "@/lib/constants";
import { formatGbp } from "@/lib/utils/pricing";
import type { AdminBookingListItem } from "@/lib/api/adminBookings";

type BookingsTableProps = Readonly<{
  bookings: readonly AdminBookingListItem[];
  emptyMessage?: string;
}>;

export function BookingsTable({
  bookings,
  emptyMessage = "No booking requests match this view.",
}: BookingsTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-4 py-4">Reference</th>
              <th className="px-4 py-4">Importer</th>
              <th className="px-4 py-4">Exporter</th>
              <th className="px-4 py-4">Package</th>
              <th className="px-4 py-4">Import value</th>
              <th className="px-4 py-4">Final estimate</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Created</th>
              <th className="px-4 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => (
              <tr
                className="align-top transition hover:bg-emerald-50/40"
                key={booking.id}
              >
                <td className="px-4 py-4 font-bold text-slate-950">
                  {booking.bookingReference}
                </td>

                <td className="px-4 py-4">
                  <span className="block font-semibold text-slate-900">
                    {booking.importerEmail}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <span className="block font-semibold text-slate-900">
                    {booking.exporterCity}
                  </span>
                  <span className="text-slate-500">
                    {booking.exporterState}
                  </span>
                </td>

                <td className="px-4 py-4 text-slate-700">
                  {getPackageTitle(booking.packageId)}
                </td>

                <td className="px-4 py-4 font-bold text-slate-950">
                  {formatGbp(booking.importValueGbp)}
                </td>

                <td className="px-4 py-4 font-bold text-slate-950">
                  {formatGbp(booking.finalEstimatedPriceGbp)}
                </td>

                <td className="px-4 py-4">
                  <span className={getStatusClassName(booking.status)}>
                    {formatLabel(booking.status)}
                  </span>
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {formatDate(booking.createdAt)}
                </td>

                <td className="px-4 py-4">
                  <Link
                    className="inline-flex min-h-10 items-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                    href={`/admin/bookings/${encodeURIComponent(
                      booking.bookingReference,
                    )}`}
                  >
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getPackageTitle(packageId: string) {
  return (
    BOOKING_PACKAGES.find((bookingPackage) => bookingPackage.id === packageId)
      ?.title ?? packageId
  );
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

function formatLabel(value: string) {
  return value
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getStatusClassName(status: string) {
  const baseClassName =
    "inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]";

  if (status === "prepared") {
    return `${baseClassName} border-emerald-200 bg-emerald-50 text-emerald-800`;
  }

  return `${baseClassName} border-slate-200 bg-slate-50 text-slate-700`;
}