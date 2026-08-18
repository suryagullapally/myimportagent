"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui";
import { BOOKING_PACKAGES, PAYMENT_STATUS_OPTIONS } from "@/lib/constants";
import {
  getAdminBookingByReference,
  type AdminBookingDetail,
} from "@/lib/api/adminBookings";
import { formatGbp } from "@/lib/utils/pricing";

type BookingDetailPanelProps = Readonly<{
  bookingReference: string;
}>;

type BookingRequestPayload = {
  packageId: string;
  importerDetails: {
    fullName: string;
    companyName: string;
    country: string;
    phone: string;
    email: string;
    emailVerified: boolean;
  };
  exporterDetails: {
    businessName: string;
    contactPerson: string;
    phone: string;
    email: string;
    fullAddress: string;
    state: string;
    city: string;
    googleMapsLink: string;
    gstNumber: string;
    profileLink: string;
  };
  productOrderDetails: {
    productCategory: string;
    productDescription: string;
    quantity: string;
    importValueGbp: number;
    paymentStatus: string;
    expectedVerificationDate: string;
    specialInstructions: string;
    checklistItems: string[];
  };
  selectedAddOnIds: string[];
  supportingFiles: Record<string, string[]>;
};

type TrustedQuotePayload = {
  state: string;
  stateMinimumFeeGbp: number;
  onePercentValueGbp: number;
  selectedBasePriceGbp: number;
  basePriceReason: string;
  selectedAddOns: {
    id: string;
    name: string;
    priceGbp: number;
  }[];
  addOnsTotalGbp: number;
  finalEstimatedPriceGbp: number;
  currency: string;
  note: string;
};

export function BookingDetailPanel({
  bookingReference,
}: BookingDetailPanelProps) {
  const [booking, setBooking] = useState<AdminBookingDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [demoMessage, setDemoMessage] = useState("");

  useEffect(() => {
    loadBooking();
  }, [bookingReference]);

  async function loadBooking() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getAdminBookingByReference(bookingReference);
      setBooking(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not load booking details from the backend.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const bookingRequest = useMemo(
    () =>
      booking
        ? parseJson<BookingRequestPayload>(booking.bookingRequestJson)
        : null,
    [booking],
  );

  const trustedQuote = useMemo(
    () =>
      booking ? parseJson<TrustedQuotePayload>(booking.trustedQuoteJson) : null,
    [booking],
  );

  const packageTitle = getPackageTitle(
    bookingRequest?.packageId ?? booking?.packageId ?? "",
  );

  const packageDescription = getPackageDescription(
    bookingRequest?.packageId ?? booking?.packageId ?? "",
  );

  const paymentStatusLabel =
    PAYMENT_STATUS_OPTIONS.find(
      (option) =>
        option.value === bookingRequest?.productOrderDetails.paymentStatus,
    )?.label ??
    bookingRequest?.productOrderDetails.paymentStatus ??
    "Not provided";

  function handleSaveChanges() {
    setDemoMessage(
      "Admin update endpoints are not connected yet. This page is currently read-only from PostgreSQL.",
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-md border border-sky-200 bg-sky-50 p-5 text-sm font-bold text-sky-900">
        Loading booking details from Spring Boot backend...
      </div>
    );
  }

  if (errorMessage || !booking) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-900">
        {errorMessage || "Booking was not found."}
      </div>
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
            {booking.bookingReference}
          </h2>
          <p className="mt-2 text-slate-600">
            Created on {formatDate(booking.createdAt)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={getStatusClassName(booking.status)}>
            {formatLabel(booking.status)}
          </span>
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-700">
            {booking.currency}
          </span>
        </div>
      </div>

      {demoMessage && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          {demoMessage}
        </div>
      )}

      {!bookingRequest && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-900">
          Full booking request JSON could not be parsed. Showing database
          summary fields only.
        </div>
      )}

      {!trustedQuote && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-900">
          Trusted quote JSON could not be parsed. Showing saved database price
          fields only.
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <SummaryCard title="Customer / importer details">
            <DetailRow
              label="Name"
              value={bookingRequest?.importerDetails.fullName ?? ""}
            />
            <DetailRow
              label="Company"
              value={bookingRequest?.importerDetails.companyName ?? ""}
            />
            <DetailRow
              label="Country"
              value={bookingRequest?.importerDetails.country ?? ""}
            />
            <DetailRow
              label="Phone"
              value={bookingRequest?.importerDetails.phone ?? ""}
            />
            <DetailRow
              label="Email"
              value={bookingRequest?.importerDetails.email ?? booking.importerEmail}
            />
            <DetailRow
              label="Email verified"
              value={
                bookingRequest?.importerDetails.emailVerified
                  ? "Verified"
                  : "Not verified"
              }
            />
          </SummaryCard>

          <SummaryCard title="Exporter details">
            <DetailRow
              label="Business name"
              value={bookingRequest?.exporterDetails.businessName ?? ""}
            />
            <DetailRow
              label="Contact person"
              value={bookingRequest?.exporterDetails.contactPerson ?? ""}
            />
            <DetailRow
              label="Phone"
              value={bookingRequest?.exporterDetails.phone ?? ""}
            />
            <DetailRow
              label="Email"
              value={bookingRequest?.exporterDetails.email ?? ""}
            />
            <DetailRow
              label="Address"
              value={bookingRequest?.exporterDetails.fullAddress ?? ""}
            />
            <DetailRow
              label="State"
              value={bookingRequest?.exporterDetails.state ?? booking.exporterState}
            />
            <DetailRow
              label="City"
              value={bookingRequest?.exporterDetails.city ?? booking.exporterCity}
            />
            <DetailLink
              label="Maps link"
              href={bookingRequest?.exporterDetails.googleMapsLink ?? ""}
            />
            <DetailRow
              label="GST"
              value={bookingRequest?.exporterDetails.gstNumber ?? ""}
            />
            <DetailLink
              label="Profile link"
              href={bookingRequest?.exporterDetails.profileLink ?? ""}
            />
          </SummaryCard>

          <SummaryCard title="Product / order details">
            <DetailRow
              label="Product category"
              value={bookingRequest?.productOrderDetails.productCategory ?? ""}
            />
            <DetailRow
              label="Description"
              value={
                bookingRequest?.productOrderDetails.productDescription ?? ""
              }
            />
            <DetailRow
              label="Quantity"
              value={bookingRequest?.productOrderDetails.quantity ?? ""}
            />
            <DetailRow
              label="Import value"
              value={formatGbp(booking.importValueGbp)}
            />
            <DetailRow label="Payment made" value={paymentStatusLabel} />
            <DetailRow
              label="Expected visit"
              value={
                bookingRequest?.productOrderDetails
                  .expectedVerificationDate ?? ""
              }
            />
            <DetailRow
              label="Special instructions"
              value={
                bookingRequest?.productOrderDetails.specialInstructions ?? ""
              }
            />
            <DetailList
              items={bookingRequest?.productOrderDetails.checklistItems ?? []}
              label="Verification checklist"
            />
          </SummaryCard>

          <SummaryCard title="Package and trusted quote">
            <DetailRow label="Package" value={packageTitle} />
            <DetailRow
              label="Package description"
              value={packageDescription}
            />
            <DetailRow
              label="State minimum fee"
              value={
                trustedQuote
                  ? formatGbp(trustedQuote.stateMinimumFeeGbp)
                  : "Not provided"
              }
            />
            <DetailRow
              label="1% of import value"
              value={
                trustedQuote
                  ? formatGbp(trustedQuote.onePercentValueGbp)
                  : "Not provided"
              }
            />
            <DetailRow
              label="Selected base price"
              value={
                trustedQuote
                  ? formatGbp(trustedQuote.selectedBasePriceGbp)
                  : "Not provided"
              }
            />
            <DetailRow
              label="Base price reason"
              value={trustedQuote?.basePriceReason ?? ""}
            />
            <DetailList
              items={
                trustedQuote?.selectedAddOns.map(
                  (addOn) => `${addOn.name} (${formatGbp(addOn.priceGbp)})`,
                ) ?? []
              }
              label="Add-ons"
            />
            <DetailRow
              label="Add-ons total"
              value={
                trustedQuote
                  ? formatGbp(trustedQuote.addOnsTotalGbp)
                  : "Not provided"
              }
            />
            <DetailRow
              label="Final estimate"
              value={formatGbp(booking.finalEstimatedPriceGbp)}
            />
          </SummaryCard>

          <SummaryCard title="Supporting files">
            <SupportingFilesReview
              files={bookingRequest?.supportingFiles ?? {}}
            />
          </SummaryCard>
        </div>

        <aside className="space-y-6">
          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-bold text-slate-950">
              Admin actions placeholder
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              This page is now reading from PostgreSQL. Updating status,
              assigning agents, and saving internal notes will be connected with
              PATCH APIs later.
            </p>

            <div className="mt-5 space-y-4">
              <DetailRow label="Current status" value={formatLabel(booking.status)} />
              <DetailRow label="Database ID" value={String(booking.id)} />

              <Button className="w-full" onClick={handleSaveChanges}>
                Save changes later
              </Button>

              <Button className="w-full" onClick={loadBooking} variant="secondary">
                Refresh from backend
              </Button>
            </div>
          </section>

          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-950">
              Backend source
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Loaded from GET /api/bookings/{booking.bookingReference}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Saved in PostgreSQL
            </p>
            <p className="mt-1 text-sm text-slate-600">
              This booking was saved through Spring Data JPA.
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

function SupportingFilesReview({
  files,
}: Readonly<{ files: Record<string, string[]> }>) {
  const fileGroups = [
    { label: "Invoice / Proforma Invoice", fileNames: files.invoice ?? [] },
    {
      label: "Product Reference Images",
      fileNames: files.productImages ?? [],
    },
    {
      label: "Supplier Documents",
      fileNames: files.supplierDocuments ?? [],
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {fileGroups.map((group) => (
        <div
          className="rounded-md border border-slate-200 bg-slate-50 p-4"
          key={group.label}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {group.label}
          </p>
          {group.fileNames.length === 0 ? (
            <p className="mt-2 text-sm font-bold leading-6 text-slate-950">
              Not provided
            </p>
          ) : (
            <ul className="mt-3 grid gap-2">
              {group.fileNames.map((fileName) => (
                <li
                  className="break-all rounded-md border border-emerald-100 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
                  key={fileName}
                >
                  {fileName}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function parseJson<TValue>(jsonValue: string): TValue | null {
  try {
    return JSON.parse(jsonValue) as TValue;
  } catch {
    return null;
  }
}

function getPackageTitle(packageId: string) {
  return (
    BOOKING_PACKAGES.find((bookingPackage) => bookingPackage.id === packageId)
      ?.title ?? packageId
  );
}

function getPackageDescription(packageId: string) {
  return (
    BOOKING_PACKAGES.find((bookingPackage) => bookingPackage.id === packageId)
      ?.description ?? "Not provided"
  );
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
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