"use client";

import { useEffect, useMemo, useState } from "react";
import { BOOKING_PACKAGES } from "@/lib/constants";
import {
  getAgentJobByReference,
  type AgentJobDetail as AgentJobDetailResponse,
} from "@/lib/api/agentJobs";
import { formatGbp } from "@/lib/utils/pricing";
import { EvidenceUploadPlaceholder } from "./EvidenceUploadPlaceholder";
import { VisitResultForm } from "./VisitResultForm";

const temporaryAgentId = "agent-hyderabad-1494";

type AgentJobDetailProps = Readonly<{
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
  selectedAddOns: {
    id: string;
    name: string;
    priceGbp: number;
  }[];
  finalEstimatedPriceGbp: number;
  currency: string;
};

export function AgentJobDetail({ bookingReference }: AgentJobDetailProps) {
  const [job, setJob] = useState<AgentJobDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadJob();
  }, [bookingReference]);

  async function loadJob() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getAgentJobByReference(
        bookingReference,
        temporaryAgentId,
      );

      setJob(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not load job details from the backend.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const bookingRequest = useMemo(
    () => (job ? parseJson<BookingRequestPayload>(job.bookingRequestJson) : null),
    [job],
  );

  const trustedQuote = useMemo(
    () => (job ? parseJson<TrustedQuotePayload>(job.trustedQuoteJson) : null),
    [job],
  );

  const videoEvidenceRequested =
    trustedQuote?.selectedAddOns.some(
      (addOn) => addOn.id === "video_recording",
    ) ?? false;

  if (isLoading) {
    return (
      <div className="rounded-md border border-sky-200 bg-sky-50 p-5 text-sm font-bold text-sky-900">
        Loading assigned job from Spring Boot backend...
      </div>
    );
  }

  if (errorMessage || !job) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-900">
        {errorMessage || "Job was not found."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
              Job summary
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">
              {job.bookingReference}
            </h2>
            <p className="mt-2 text-slate-600">
              {getPackageTitle(job.packageId)}
            </p>
          </div>
          <span className={getStatusClassName(job.status)}>
            {formatLabel(job.status)}
          </span>
        </div>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryItem
            label="Expected visit"
            value={
              bookingRequest?.productOrderDetails.expectedVerificationDate ||
              "Not provided"
            }
          />
          <SummaryItem label="Assigned agent" value={job.assignedAgentId} />
          <SummaryItem label="Exporter city" value={job.exporterCity} />
          <SummaryItem
            label="Requested checks"
            value={`${
              bookingRequest?.productOrderDetails.checklistItems.length ?? 0
            } items`}
          />
        </dl>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
            Exporter location
          </p>
          <h3 className="mt-2 text-2xl font-black text-slate-950">
            {bookingRequest?.exporterDetails.businessName ?? "Exporter"}
          </h3>

          <dl className="mt-5 divide-y divide-slate-100">
            <DetailRow
              label="Contact person"
              value={bookingRequest?.exporterDetails.contactPerson ?? ""}
            />
            <DetailRow
              label="Phone"
              value={bookingRequest?.exporterDetails.phone ?? ""}
            />
            <DetailRow
              label="Full address"
              value={bookingRequest?.exporterDetails.fullAddress ?? ""}
            />
            <DetailRow label="City" value={job.exporterCity} />
            <DetailRow label="State" value={job.exporterState} />
            <DetailLink
              label="Google Maps link"
              href={bookingRequest?.exporterDetails.googleMapsLink ?? ""}
            />
          </dl>
        </article>

        <aside className="rounded-md border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
          <h3 className="text-xl font-bold">On-site reminder</h3>
          <p className="mt-2 text-sm text-slate-300">
            Verify only the customer-requested scope. Do not arrange freight,
            customs, insurance, or logistics services.
          </p>
          {bookingRequest?.exporterDetails.googleMapsLink ? (
            <a
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark"
              href={bookingRequest.exporterDetails.googleMapsLink}
              rel="noreferrer"
              target="_blank"
            >
              Open in Google Maps
            </a>
          ) : (
            <p className="mt-5 rounded-md border border-white/10 bg-white/5 p-3 text-sm font-semibold text-slate-200">
              No Google Maps link was provided.
            </p>
          )}
        </aside>
      </section>

      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          Verification instructions
        </p>
        <h3 className="mt-2 text-2xl font-black text-slate-950">
          What to verify
        </h3>

        <dl className="mt-5 divide-y divide-slate-100">
          <DetailRow
            label="Product category"
            value={bookingRequest?.productOrderDetails.productCategory ?? ""}
          />
          <DetailRow
            label="Product description"
            value={bookingRequest?.productOrderDetails.productDescription ?? ""}
          />
          <DetailRow
            label="Quantity"
            value={bookingRequest?.productOrderDetails.quantity ?? ""}
          />
          <DetailRow
            label="Import value"
            value={formatGbp(job.importValueGbp)}
          />
          <DetailRow
            label="Final estimated price"
            value={formatGbp(job.finalEstimatedPriceGbp)}
          />
          <DetailRow
            label="Special instructions"
            value={bookingRequest?.productOrderDetails.specialInstructions ?? ""}
          />
          <DetailRow
            label="Video requested"
            value={videoEvidenceRequested ? "Yes" : "No"}
          />
        </dl>

        <div className="mt-6">
          <h4 className="text-lg font-bold text-slate-950">
            Customer request scope
          </h4>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(bookingRequest?.productOrderDetails.checklistItems ?? []).map(
              (item) => (
                <div
                  className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800"
                  key={item}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <EvidenceUploadPlaceholder
        videoEvidenceRequested={videoEvidenceRequested}
      />
      <VisitResultForm
  agentId={temporaryAgentId}
  bookingReference={job.bookingReference}
  onSubmitted={loadJob}
/>

      <p className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Backend source: GET /api/agent/jobs/{job.bookingReference}?agentId=
        {temporaryAgentId}. Evidence upload and visit result submission will be
        connected later.
      </p>
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-bold text-slate-950">{value}</dd>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <div className="grid gap-2 py-3 sm:grid-cols-[11rem_1fr]">
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
    <div className="grid gap-2 py-3 sm:grid-cols-[11rem_1fr]">
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

function formatLabel(value: string) {
  return value
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getStatusClassName(status: string) {
  const baseClassName =
    "inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]";

  if (status === "assigned") {
    return `${baseClassName} border-violet-200 bg-violet-50 text-violet-800`;
  }

  if (status === "in-review") {
    return `${baseClassName} border-sky-200 bg-sky-50 text-sky-800`;
  }

  if (status === "completed") {
    return `${baseClassName} border-emerald-200 bg-emerald-50 text-emerald-800`;
  }

  return `${baseClassName} border-slate-200 bg-slate-50 text-slate-700`;
}