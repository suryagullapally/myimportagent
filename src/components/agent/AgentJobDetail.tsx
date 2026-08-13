import {
  getAgentJobStatusLabel,
} from "@/lib/mock";
import type { AgentJob } from "@/types";
import { AgentStatusBadge, getAgentJobStatusTone } from "./AgentStatusBadge";
import { EvidenceUploadPlaceholder } from "./EvidenceUploadPlaceholder";
import { VisitResultForm } from "./VisitResultForm";

type AgentJobDetailProps = Readonly<{
  job: AgentJob;
}>;

export function AgentJobDetail({ job }: AgentJobDetailProps) {
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
            <p className="mt-2 text-slate-600">{job.package.title}</p>
          </div>
          <AgentStatusBadge
            label={getAgentJobStatusLabel(job.status)}
            tone={getAgentJobStatusTone(job.status)}
          />
        </div>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryItem label="Scheduled visit" value={job.scheduledVisitDateTime} />
          <SummaryItem label="Assigned agent" value={job.assignedAgentName} />
          <SummaryItem label="Exporter city" value={job.exporter.city} />
          <SummaryItem
            label="Requested checks"
            value={`${job.instructions.checklistItems.length} items`}
          />
        </dl>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
            Exporter location
          </p>
          <h3 className="mt-2 text-2xl font-black text-slate-950">
            {job.exporter.businessName}
          </h3>

          <dl className="mt-5 divide-y divide-slate-100">
            <DetailRow label="Contact person" value={job.exporter.contactPerson} />
            <DetailRow label="Phone" value={job.exporter.phone} />
            <DetailRow label="Full address" value={job.exporter.fullAddress} />
            <DetailRow label="City" value={job.exporter.city} />
            <DetailRow label="State" value={job.exporter.state} />
            <DetailLink label="Google Maps link" href={job.exporter.googleMapsLink} />
          </dl>
        </article>

        <aside className="rounded-md border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
          <h3 className="text-xl font-bold">On-site reminder</h3>
          <p className="mt-2 text-sm text-slate-300">
            Verify only the customer-requested scope. Do not arrange freight,
            customs, insurance, or logistics services.
          </p>
          {job.exporter.googleMapsLink ? (
            <a
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark"
              href={job.exporter.googleMapsLink}
              rel="noreferrer"
              target="_blank"
            >
              Open in Google Maps
            </a>
          ) : (
            <p className="mt-5 rounded-md border border-white/10 bg-white/5 p-3 text-sm font-semibold text-slate-200">
              No Google Maps link was provided for this demo job.
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
            value={job.instructions.productCategory}
          />
          <DetailRow
            label="Product description"
            value={job.instructions.productDescription}
          />
          <DetailRow label="Quantity" value={job.instructions.quantity} />
          <DetailRow
            label="Special instructions"
            value={job.instructions.specialInstructions}
          />
          <DetailRow
            label="Video requested"
            value={job.instructions.videoEvidenceRequested ? "Yes" : "No"}
          />
        </dl>

        <div className="mt-6">
          <h4 className="text-lg font-bold text-slate-950">
            Customer request scope
          </h4>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {job.instructions.checklistItems.map((item) => (
              <div
                className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <EvidenceUploadPlaceholder
        videoEvidenceRequested={job.instructions.videoEvidenceRequested}
      />
      <VisitResultForm />

      <p className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Future integration point: GET /api/agent/jobs/{job.id} will load this
        job, POST /api/agent/jobs/{job.id}/evidence will upload secure evidence,
        and POST /api/agent/jobs/{job.id}/submit-result will submit the visit
        result.
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
