import Link from "next/link";
import {
  getAdminAgentById,
  getAdminBookingStatusLabel,
  getAdminPaymentStatusLabel,
} from "@/lib/mock";
import { formatGbp } from "@/lib/utils/pricing";
import type { AdminBooking } from "@/types";
import {
  getBookingStatusTone,
  getPaymentStatusTone,
  StatusBadge,
} from "./StatusBadge";

type BookingsTableProps = Readonly<{
  bookings: readonly AdminBooking[];
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
        <table className="min-w-[1100px] divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-4 py-4">Reference</th>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Exporter</th>
              <th className="px-4 py-4">Package</th>
              <th className="px-4 py-4">Estimate</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Payment</th>
              <th className="px-4 py-4">Agent</th>
              <th className="px-4 py-4">Created</th>
              <th className="px-4 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => {
              const assignedAgent = getAdminAgentById(booking.assignedAgentId);

              return (
                <tr className="align-top transition hover:bg-emerald-50/40" key={booking.id}>
                  <td className="px-4 py-4 font-bold text-slate-950">
                    {booking.reference}
                  </td>
                  <td className="px-4 py-4">
                    <span className="block font-semibold text-slate-900">
                      {booking.importer.fullName}
                    </span>
                    <span className="text-slate-500">{booking.importer.country}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="block font-semibold text-slate-900">
                      {booking.exporter.city}
                    </span>
                    <span className="text-slate-500">{booking.exporter.state}</span>
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {booking.package.title}
                  </td>
                  <td className="px-4 py-4 font-bold text-slate-950">
                    {formatGbp(booking.quote.finalEstimatedPrice)}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge
                      label={getAdminBookingStatusLabel(booking.status)}
                      tone={getBookingStatusTone(booking.status)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge
                      label={getAdminPaymentStatusLabel(booking.paymentStatus)}
                      tone={getPaymentStatusTone(booking.paymentStatus)}
                    />
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {assignedAgent?.name ?? "Unassigned"}
                  </td>
                  <td className="px-4 py-4 text-slate-500">
                    {formatDate(booking.createdDate)}
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      className="inline-flex min-h-10 items-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                      href={`/admin/bookings/${booking.id}`}
                    >
                      View details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}
