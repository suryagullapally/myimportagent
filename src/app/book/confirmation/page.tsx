import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/layout";
import { BOOKING_CONFIRMATION_COPY, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Booking Request Prepared | ${SITE_CONFIG.name}`,
  description:
    "Demo confirmation page for a prepared myimportagent booking request.",
};

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const demoReference = getFirstParam(params.reference) || "MIA-DEMO-PENDING";
  const selectedPackage = getFirstParam(params.package);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-surface px-6 py-20 sm:px-8 lg:px-10">
        <section className="mx-auto max-w-5xl">
          <div className="rounded-lg border border-slate-200 bg-white/90 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Demo confirmation
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-normal text-foreground sm:text-5xl">
              {BOOKING_CONFIRMATION_COPY.headline}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              {BOOKING_CONFIRMATION_COPY.supportingText}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <SummaryCard
                label={BOOKING_CONFIRMATION_COPY.referenceLabel}
                value={demoReference}
              />
              <SummaryCard
                label={BOOKING_CONFIRMATION_COPY.packageLabel}
                value={
                  selectedPackage ||
                  BOOKING_CONFIRMATION_COPY.missingPackageLabel
                }
              />
            </div>

            <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-bold text-foreground">
                {BOOKING_CONFIRMATION_COPY.nextStepsTitle}
              </h2>
              <ol className="mt-5 grid gap-3">
                {BOOKING_CONFIRMATION_COPY.nextSteps.map((step, index) => (
                  <li
                    className="flex items-start gap-3 rounded-md border border-slate-200 bg-white p-4"
                    key={step}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-sm font-semibold leading-6 text-slate-800">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                href="/"
              >
                {BOOKING_CONFIRMATION_COPY.homeButton}
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                href="/book"
              >
                {BOOKING_CONFIRMATION_COPY.startAnotherButton}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

type SummaryCardProps = Readonly<{
  label: string;
  value: string;
}>;

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 break-words text-lg font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function getFirstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}
