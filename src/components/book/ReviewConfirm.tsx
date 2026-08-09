import {
  PAYMENT_STATUS_OPTIONS,
  PRICING_ADD_ONS,
  REVIEW_CONFIRM_COPY,
  QUOTE_SUMMARY_COPY,
} from "@/lib/constants";
import { calculateVerificationPrice, formatGbp } from "@/lib/utils";
import type {
  BookingPackage,
  ExporterDetails,
  ImporterDetails,
  PricingResult,
  ProductOrderDetails,
  ReviewConfirmationKey,
  ReviewConfirmations,
  SupportingFiles,
} from "@/types";

type ReviewConfirmProps = Readonly<{
  exporterDetails: ExporterDetails;
  importerDetails: ImporterDetails;
  isEmailVerified: boolean;
  productOrderDetails: ProductOrderDetails;
  selectedAddOnIds: readonly string[];
  selectedPackage: BookingPackage | undefined;
  supportingFiles: SupportingFiles;
  confirmations: ReviewConfirmations;
  onToggleConfirmation: (key: ReviewConfirmationKey) => void;
}>;

export function ReviewConfirm({
  exporterDetails,
  importerDetails,
  isEmailVerified,
  productOrderDetails,
  selectedAddOnIds,
  selectedPackage,
  supportingFiles,
  confirmations,
  onToggleConfirmation,
}: ReviewConfirmProps) {
  const importValue = Number(productOrderDetails.importValueGbp);
  const pricing = calculateVerificationPrice({
    exporterState: exporterDetails.state,
    importValueGbp: Number.isFinite(importValue) ? importValue : 0,
    selectedAddOnIds,
  });
  const selectedAddOns = PRICING_ADD_ONS.filter((addOn) =>
    selectedAddOnIds.includes(addOn.id),
  );
  const paymentStatusLabel =
    PAYMENT_STATUS_OPTIONS.find(
      (option) => option.value === productOrderDetails.paymentStatus,
    )?.label ?? productOrderDetails.paymentStatus;

  return (
    <section aria-labelledby="review-confirm-title">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {REVIEW_CONFIRM_COPY.eyebrow}
        </p>
        <h2
          className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
          id="review-confirm-title"
        >
          {REVIEW_CONFIRM_COPY.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {REVIEW_CONFIRM_COPY.description}
        </p>
      </div>

      {!isEmailVerified && (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-bold text-amber-900">
            {REVIEW_CONFIRM_COPY.emailNotVerified}
          </p>
        </div>
      )}

      <div className="mt-10 grid gap-6">
        <ReviewSection title={REVIEW_CONFIRM_COPY.selectedPackageTitle}>
          <ReviewRow
            label="Package name"
            value={selectedPackage?.title ?? REVIEW_CONFIRM_COPY.notProvided}
          />
          <ReviewRow
            label="Package description"
            value={
              selectedPackage?.description ?? REVIEW_CONFIRM_COPY.notProvided
            }
          />
        </ReviewSection>

        <ReviewSection title={REVIEW_CONFIRM_COPY.importerTitle}>
          <ReviewGrid>
            <ReviewRow label="Full name" value={importerDetails.fullName} />
            <OptionalReviewRow
              label="Company name"
              value={importerDetails.companyName}
            />
            <ReviewRow label="Country" value={importerDetails.country} />
            <ReviewRow
              label="Phone / WhatsApp"
              value={importerDetails.phone}
            />
            <ReviewRow label="Email" value={importerDetails.email} />
            <ReviewRow
              label="Email verification status"
              value={
                isEmailVerified
                  ? REVIEW_CONFIRM_COPY.emailVerified
                  : "Not verified"
              }
            />
          </ReviewGrid>
        </ReviewSection>

        <ReviewSection title={REVIEW_CONFIRM_COPY.exporterTitle}>
          <ReviewGrid>
            <ReviewRow
              label="Exporter business name"
              value={exporterDetails.businessName}
            />
            <OptionalReviewRow
              label="Exporter contact person"
              value={exporterDetails.contactPerson}
            />
            <ReviewRow
              label="Exporter phone"
              value={exporterDetails.phone}
            />
            <OptionalReviewRow
              label="Exporter email"
              value={exporterDetails.email}
            />
            <ReviewRow
              label="Full address"
              value={exporterDetails.fullAddress}
            />
            <ReviewRow label="State" value={exporterDetails.state} />
            <ReviewRow label="City" value={exporterDetails.city} />
            <OptionalLinkReviewRow
              label="Google Maps link"
              value={exporterDetails.googleMapsLink}
            />
            <OptionalReviewRow
              label="GST number"
              value={exporterDetails.gstNumber}
            />
            <OptionalLinkReviewRow
              label="Website/profile link"
              value={exporterDetails.profileLink}
            />
          </ReviewGrid>
        </ReviewSection>

        <ReviewSection title={REVIEW_CONFIRM_COPY.productOrderTitle}>
          <ReviewGrid>
            <ReviewRow
              label="Product category"
              value={productOrderDetails.productCategory}
            />
            <ReviewRow
              label="Quantity"
              value={productOrderDetails.quantity}
            />
            <ReviewRow
              label="Total import value in GBP"
              value={formatGbp(Number(productOrderDetails.importValueGbp))}
            />
            <ReviewRow
              label="Payment already made status"
              value={paymentStatusLabel}
            />
            <OptionalReviewRow
              label="Expected verification date/time"
              value={productOrderDetails.expectedVerificationDate}
            />
          </ReviewGrid>
          <ReviewRow
            label="Product description"
            value={productOrderDetails.productDescription}
          />
          <OptionalReviewRow
            label="Special instructions"
            value={productOrderDetails.specialInstructions}
          />
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Selected verification checklist items
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {productOrderDetails.checklistItems.map((item) => (
                <li
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ReviewSection>

        <ReviewSection title={REVIEW_CONFIRM_COPY.supportingFilesTitle}>
          <SupportingFilesReview files={supportingFiles} />
        </ReviewSection>

        <ReviewSection title={REVIEW_CONFIRM_COPY.quoteTitle}>
          <QuoteReview pricing={pricing} selectedAddOns={selectedAddOns} />
          <div className="rounded-lg border border-sky-200 bg-sky-50 p-4">
            <p className="text-sm font-semibold leading-6 text-sky-900">
              {REVIEW_CONFIRM_COPY.quoteNote}
            </p>
          </div>
        </ReviewSection>

        <fieldset className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <legend className="text-lg font-bold text-foreground">
            {REVIEW_CONFIRM_COPY.confirmationsTitle}
          </legend>
          <div className="mt-4 grid gap-3">
            {Object.entries(REVIEW_CONFIRM_COPY.confirmationLabels).map(
              ([key, label]) => {
                const confirmationKey = key as ReviewConfirmationKey;
                const isChecked = confirmations[confirmationKey];

                return (
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 text-sm font-semibold leading-6 transition ${
                      isChecked
                        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                        : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200"
                    }`}
                    key={key}
                  >
                    <input
                      checked={isChecked}
                      className="mt-1 h-4 w-4 accent-emerald-600"
                      onChange={() => onToggleConfirmation(confirmationKey)}
                      type="checkbox"
                    />
                    <span>{label}</span>
                  </label>
                );
              },
            )}
          </div>
        </fieldset>
      </div>
    </section>
  );
}

type ReviewSectionProps = Readonly<{
  children: React.ReactNode;
  title: string;
}>;

function ReviewSection({ children, title }: ReviewSectionProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <div className="mt-5 grid gap-4">{children}</div>
    </article>
  );
}

type ReviewGridProps = Readonly<{
  children: React.ReactNode;
}>;

function ReviewGrid({ children }: ReviewGridProps) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

type ReviewRowProps = Readonly<{
  label: string;
  value: string;
}>;

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-bold leading-6 text-slate-950">
        {value || REVIEW_CONFIRM_COPY.notProvided}
      </p>
    </div>
  );
}

function OptionalReviewRow({ label, value }: ReviewRowProps) {
  if (!value.trim()) {
    return null;
  }

  return <ReviewRow label={label} value={value} />;
}

function OptionalLinkReviewRow({ label, value }: ReviewRowProps) {
  if (!value.trim()) {
    return null;
  }

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <a
        className="mt-2 block break-words text-sm font-bold leading-6 text-primary hover:text-primary-dark"
        href={value}
        rel="noreferrer"
        target="_blank"
      >
        {value}
      </a>
    </div>
  );
}

type SupportingFilesReviewProps = Readonly<{
  files: SupportingFiles;
}>;

function SupportingFilesReview({ files }: SupportingFilesReviewProps) {
  const fileGroups = [
    { label: "Invoice / Proforma Invoice", fileNames: files.invoice },
    { label: "Product Reference Images", fileNames: files.productImages },
    { label: "Supplier Documents", fileNames: files.supplierDocuments },
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
              {REVIEW_CONFIRM_COPY.notProvided}
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

type QuoteReviewProps = Readonly<{
  pricing: PricingResult;
  selectedAddOns: readonly {
    id: string;
    title: string;
    priceGbp: number;
  }[];
}>;

function QuoteReview({ pricing, selectedAddOns }: QuoteReviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ReviewRow
        label="State minimum fee"
        value={
          pricing.stateMinimumFee === null
            ? REVIEW_CONFIRM_COPY.notProvided
            : formatGbp(pricing.stateMinimumFee)
        }
      />
      <ReviewRow
        label="1% of import value"
        value={formatGbp(pricing.onePercentValue)}
      />
      <ReviewRow
        label="Selected base price"
        value={
          pricing.basePrice === null
            ? REVIEW_CONFIRM_COPY.notProvided
            : formatGbp(pricing.basePrice)
        }
      />
      <ReviewRow
        label="Base price reason"
        value={getBaseReason(pricing)}
      />
      <ReviewRow
        label="Add-ons selected"
        value={
          selectedAddOns.length === 0
            ? QUOTE_SUMMARY_COPY.noAddOnsLabel
            : selectedAddOns.map((addOn) => addOn.title).join(", ")
        }
      />
      <ReviewRow
        label="Add-ons total"
        value={formatGbp(pricing.addOnsTotal)}
      />
      <ReviewRow
        label="Final estimated price"
        value={
          pricing.finalPrice === null
            ? REVIEW_CONFIRM_COPY.notProvided
            : formatGbp(pricing.finalPrice)
        }
      />
    </div>
  );
}

function getBaseReason(pricing: PricingResult) {
  if (pricing.selectedBaseReason === "state-minimum") {
    return QUOTE_SUMMARY_COPY.stateMinimumReason;
  }

  if (pricing.selectedBaseReason === "one-percent") {
    return QUOTE_SUMMARY_COPY.onePercentReason;
  }

  return REVIEW_CONFIRM_COPY.notProvided;
}
