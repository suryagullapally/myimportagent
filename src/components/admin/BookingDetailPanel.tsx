"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import {
  ADMIN_AGENTS,
  ADMIN_BOOKING_STATUS_OPTIONS,
  getAdminAgentById,
  getAdminBookingStatusLabel,
  getAdminPaymentStatusLabel,
} from "@/lib/mock";
import { formatGbp } from "@/lib/utils/pricing";
import type { AdminBooking, AdminBookingStatus } from "@/types";
import {
  getBookingStatusTone,
  getPaymentStatusTone,
  StatusBadge,
} from "./StatusBadge";

type BookingDetailPanelProps = Readonly<{
  booking: AdminBooking;
}>;

export function BookingDetailPanel({ booking }: BookingDetailPanelProps) {
  const [assignedAgentId, setAssignedAgentId] = useState(
    booking.assignedAgentId ?? "",
  );
  const [bookingStatus, setBookingStatus] = useState<AdminBookingStatus>(
    booking.status,
  );
  const [internalNotes, setInternalNotes] = useState(booking.internalNotes);
  const [demoMessage, setDemoMessage] = useState("");

  const assignedAgent = getAdminAgentById(assignedAgentId);

  function handleSaveChanges() {
    // Future integration point:
    // PATCH /api/admin/bookings/{id}/status
    // PATCH /api/admin/bookings/{id}/assign-agent
    // PATCH /api/admin/bookings/{id}/notes
    setDemoMessage(
      "Demo changes updated on screen only. Backend saving will be connected later.",
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
            Booking details
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            {booking.reference}
          </h2>
          <p className="mt-2 text-slate-600">
            Created on {formatDate(booking.createdDate)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge
            label={getAdminBookingStatusLabel(bookingStatus)}
            tone={getBookingStatusTone(bookingStatus)}
          />
          <StatusBadge
            label={getAdminPaymentStatusLabel(booking.paymentStatus)}
            tone={getPaymentStatusTone(booking.paymentStatus)}
          />
        </div>
      </div>

      {demoMessage && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          {demoMessage}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <SummaryCard title="Customer / importer details">
            <DetailRow label="Name" value={booking.importer.fullName} />
            <DetailRow label="Company" value={booking.importer.companyName} />
            <DetailRow label="Country" value={booking.importer.country} />
            <DetailRow label="Phone" value={booking.importer.phone} />
            <DetailRow label="Email" value={booking.importer.email} />
            <DetailRow
              label="Email verified"
              value={booking.importer.isEmailVerified ? "Verified" : "Not verified"}
            />
          </SummaryCard>

          <SummaryCard title="Exporter details">
            <DetailRow label="Business name" value={booking.exporter.businessName} />
            <DetailRow label="Contact person" value={booking.exporter.contactPerson} />
            <DetailRow label="Phone" value={booking.exporter.phone} />
            <DetailRow label="Address" value={booking.exporter.fullAddress} />
            <DetailRow label="State" value={booking.exporter.state} />
            <DetailRow label="City" value={booking.exporter.city} />
            <DetailLink label="Maps link" href={booking.exporter.googleMapsLink} />
            <DetailRow label="GST" value={booking.exporter.gstNumber} />
            <DetailLink label="Profile link" href={booking.exporter.profileLink} />
          </SummaryCard>

          <SummaryCard title="Product / order details">
            <DetailRow label="Product category" value={booking.productOrder.productCategory} />
            <DetailRow
              label="Description"
              value={booking.productOrder.productDescription}
            />
            <DetailRow label="Quantity" value={booking.productOrder.quantity} />
            <DetailRow
              label="Import value"
              value={formatGbp(booking.productOrder.importValueGbp)}
            />
            <DetailRow
              label="Payment made"
              value={booking.productOrder.paymentStatus.replaceAll("-", " ")}
            />
            <DetailRow
              label="Expected visit"
              value={booking.productOrder.expectedVerificationDate}
            />
            <DetailRow
              label="Special instructions"
              value={booking.productOrder.specialInstructions}
            />
            <DetailList
              items={booking.productOrder.checklistItems}
              label="Verification checklist"
            />
          </SummaryCard>

          <SummaryCard title="Package and quote">
            <DetailRow label="Package" value={booking.package.title} />
            <DetailRow label="Package description" value={booking.package.description} />
            <DetailRow
              label="State minimum fee"
              value={formatGbp(booking.quote.stateMinimumFee)}
            />
            <DetailRow
              label="1% of import value"
              value={formatGbp(booking.quote.onePercentValue)}
            />
            <DetailRow
              label="Selected base price"
              value={`${booking.quote.selectedBaseReason}: ${formatGbp(
                booking.quote.selectedBasePrice,
              )}`}
            />
            <DetailList
              items={booking.quote.addOns.map(
                (addOn) => `${addOn.title} (${formatGbp(addOn.priceGbp)})`,
              )}
              label="Add-ons"
            />
            <DetailRow
              label="Final estimate"
              value={formatGbp(booking.quote.finalEstimatedPrice)}
            />
          </SummaryCard>
        </div>

        <aside className="space-y-6">
          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-bold text-slate-950">
              Admin actions placeholder
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              These controls update this page only. They do not persist changes
              or call any backend service.
            </p>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Assign agent
                </span>
                <select
                  className={fieldClassName}
                  onChange={(event) => setAssignedAgentId(event.target.value)}
                  value={assignedAgentId}
                >
                  <option value="">Unassigned</option>
                  {ADMIN_AGENTS.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name} - {agent.city}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Booking status
                </span>
                <select
                  className={fieldClassName}
                  onChange={(event) =>
                    setBookingStatus(event.target.value as AdminBookingStatus)
                  }
                  value={bookingStatus}
                >
                  {ADMIN_BOOKING_STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Internal admin notes
                </span>
                <textarea
                  className={`${fieldClassName} min-h-32 resize-y`}
                  onChange={(event) => setInternalNotes(event.target.value)}
                  value={internalNotes}
                />
              </label>

              <Button className="w-full" onClick={handleSaveChanges}>
                Save changes
              </Button>
            </div>
          </section>

          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-950">
              Current local assignment
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {assignedAgent
                ? `${assignedAgent.name}, ${assignedAgent.city}`
                : "No agent selected"}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Future API
            </p>
            <p className="mt-1 text-sm text-slate-600">
              GET /api/admin/bookings/{booking.id} will load this page, then
              PATCH endpoints will save admin changes.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

const fieldClassName =
  "mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100";

type SummaryCardProps = Readonly<{
  children: React.ReactNode;
  title: string;
}>;

function SummaryCard({ children, title }: SummaryCardProps) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-xl font-bold text-slate-950">{title}</h3>
      <dl className="mt-5 divide-y divide-slate-100">{children}</dl>
    </section>
  );
}

function DetailRow({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <div className="grid gap-2 py-3 sm:grid-cols-[12rem_1fr]">
      <dt className="text-sm font-bold text-slate-500">{label}</dt>
      <dd className="break-words text-sm font-semibold text-slate-900">
        {value || "Not provided"}
      </dd>
    </div>
  );
}

function DetailLink({
  href,
  label,
}: Readonly<{ href: string; label: string }>) {
  if (!href) {
    return <DetailRow label={label} value="" />;
  }

  return (
    <div className="grid gap-2 py-3 sm:grid-cols-[12rem_1fr]">
      <dt className="text-sm font-bold text-slate-500">{label}</dt>
      <dd className="break-words text-sm font-semibold">
        <a
          className="text-emerald-700 underline-offset-4 hover:underline"
          href={href}
          rel="noreferrer"
          target="_blank"
        >
          {href}
        </a>
      </dd>
    </div>
  );
}

function DetailList({
  items,
  label,
}: Readonly<{ items: readonly string[]; label: string }>) {
  return (
    <div className="grid gap-2 py-3 sm:grid-cols-[12rem_1fr]">
      <dt className="text-sm font-bold text-slate-500">{label}</dt>
      <dd>
        {items.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {items.map((item) => (
              <li
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-sm font-semibold text-slate-500">
            Not provided
          </span>
        )}
      </dd>
    </div>
  );
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateValue));
}
