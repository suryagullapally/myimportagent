"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui";
import {
  AVAILABLE_REGIONS,
  BOOKING_FLOW_COPY,
  BOOKING_PACKAGES,
  EXPORTER_DETAILS_VALIDATION,
  FILE_UPLOAD_COPY,
  IMPORTER_DETAILS_VALIDATION,
  OTHER_STATE_OPTION,
  PRODUCT_ORDER_DETAILS_VALIDATION,
} from "@/lib/constants";
import { calculateVerificationPrice } from "@/lib/utils";
import type {
  ActiveBookingStep,
  ExporterDetails,
  ExporterDetailsErrors,
  ExporterDetailsField,
  ExporterDetailsTouchedFields,
  ImporterDetails,
  ImporterDetailsErrors,
  ImporterDetailsField,
  ImporterDetailsTouchedFields,
  ProductOrderDetails,
  ProductOrderDetailsErrors,
  ProductOrderDetailsField,
  ProductOrderDetailsTouchedFields,
  ReviewConfirmationKey,
  ReviewConfirmations,
  SupportingFileCategory,
  SupportingFiles,
} from "@/types";
import { BookingStepIndicator } from "./BookingStepIndicator";
import { EmailVerificationPlaceholder } from "./EmailVerificationPlaceholder";
import { ExporterDetailsForm } from "./ExporterDetailsForm";
import { FileUploadPlaceholder } from "./FileUploadPlaceholder";
import { ImporterDetailsForm } from "./ImporterDetailsForm";
import { PackageSelector } from "./PackageSelector";
import { ProductOrderDetailsForm } from "./ProductOrderDetailsForm";
import { QuoteSummary } from "./QuoteSummary";
import { ReviewConfirm } from "./ReviewConfirm";

const EMPTY_IMPORTER_DETAILS: ImporterDetails = {
  fullName: "",
  companyName: "",
  country: "",
  phone: "",
  email: "",
};

const EMPTY_EXPORTER_DETAILS: ExporterDetails = {
  businessName: "",
  contactPerson: "",
  phone: "",
  email: "",
  fullAddress: "",
  state: "",
  city: "",
  googleMapsLink: "",
  gstNumber: "",
  profileLink: "",
};

const EMPTY_PRODUCT_ORDER_DETAILS: ProductOrderDetails = {
  productCategory: "",
  productDescription: "",
  quantity: "",
  importValueGbp: "",
  paymentStatus: "not-paid",
  expectedVerificationDate: "",
  specialInstructions: "",
  checklistItems: [],
};

const EMPTY_REVIEW_CONFIRMATIONS: ReviewConfirmations = {
  verificationOnly: false,
  accurateInformation: false,
  priceAndAvailabilityReview: false,
};

const EMPTY_SUPPORTING_FILES: SupportingFiles = {
  invoice: [],
  productImages: [],
  supplierDocuments: [],
};

export function BookingFlow() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<ActiveBookingStep>(1);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [importerDetails, setImporterDetails] = useState<ImporterDetails>(
    EMPTY_IMPORTER_DETAILS,
  );
  const [touchedImporterFields, setTouchedImporterFields] =
    useState<ImporterDetailsTouchedFields>({});
  const [exporterDetails, setExporterDetails] = useState<ExporterDetails>(
    EMPTY_EXPORTER_DETAILS,
  );
  const [touchedExporterFields, setTouchedExporterFields] =
    useState<ExporterDetailsTouchedFields>({});
  const [productOrderDetails, setProductOrderDetails] =
    useState<ProductOrderDetails>(EMPTY_PRODUCT_ORDER_DETAILS);
  const [touchedProductOrderFields, setTouchedProductOrderFields] =
    useState<ProductOrderDetailsTouchedFields>({});
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<readonly string[]>(
    [],
  );
  const [supportingFiles, setSupportingFiles] = useState<SupportingFiles>(
    EMPTY_SUPPORTING_FILES,
  );
  const [reviewConfirmations, setReviewConfirmations] =
    useState<ReviewConfirmations>(EMPTY_REVIEW_CONFIRMATIONS);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSubmittingDemo, setIsSubmittingDemo] = useState(false);
  const [flowMessage, setFlowMessage] = useState("");

  const selectedPackage = useMemo(
    () => BOOKING_PACKAGES.find((item) => item.id === selectedPackageId),
    [selectedPackageId],
  );

  const importerErrors = validateImporterDetails(importerDetails);
  const isExporterUnavailableState = isUnavailableExporterState(
    exporterDetails.state,
  );
  const exporterErrors = validateExporterDetails(
    exporterDetails,
    isExporterUnavailableState,
  );
  const productOrderErrors = validateProductOrderDetails(productOrderDetails);
  const visibleImporterErrors = getVisibleErrors(
    importerErrors,
    touchedImporterFields,
  );
  const visibleExporterErrors = getVisibleErrors(
    exporterErrors,
    touchedExporterFields,
  );
  const visibleProductOrderErrors = getVisibleErrors(
    productOrderErrors,
    touchedProductOrderFields,
  );
  const quotePricing = calculateVerificationPrice({
    exporterState: exporterDetails.state,
    importValueGbp: Number(productOrderDetails.importValueGbp),
    selectedAddOnIds,
  });
  const isImporterDetailsValid = Object.keys(importerErrors).length === 0;
  const isExporterDetailsValid = Object.keys(exporterErrors).length === 0;
  const isProductOrderDetailsValid =
    Object.keys(productOrderErrors).length === 0;
  const areReviewConfirmationsComplete = Object.values(
    reviewConfirmations,
  ).every(Boolean);
  const canContinue =
    (activeStep === 1 && Boolean(selectedPackage)) ||
    (activeStep === 2 && isImporterDetailsValid) ||
    (activeStep === 3 && isEmailVerified) ||
    (activeStep === 4 && isExporterDetailsValid) ||
    (activeStep === 5 && isProductOrderDetailsValid) ||
    activeStep === 6 ||
    (activeStep === 7 && quotePricing.finalPrice !== null) ||
    (activeStep === 8 &&
      areReviewConfirmationsComplete &&
      !isSubmittingDemo);

  function handleSelectPackage(packageId: string) {
    setSelectedPackageId(packageId);
    setFlowMessage("");
  }

  function handleImporterDetailsChange(
    field: ImporterDetailsField,
    value: string,
  ) {
    setImporterDetails((currentDetails) => ({
      ...currentDetails,
      [field]: value,
    }));
    setFlowMessage("");

    if (field === "email") {
      setIsEmailVerified(false);
    }
  }

  function handleImporterDetailsBlur(field: ImporterDetailsField) {
    setTouchedImporterFields((currentFields) => ({
      ...currentFields,
      [field]: true,
    }));
  }

  function handleExporterDetailsChange(
    field: ExporterDetailsField,
    value: string,
  ) {
    setExporterDetails((currentDetails) => ({
      ...currentDetails,
      [field]: value,
    }));
    setFlowMessage("");

    if (field === "state") {
      setTouchedExporterFields((currentFields) => ({
        ...currentFields,
        city: false,
      }));
    }
  }

  function handleExporterDetailsBlur(field: ExporterDetailsField) {
    setTouchedExporterFields((currentFields) => ({
      ...currentFields,
      [field]: true,
    }));
  }

  function handleProductOrderDetailsChange(
    field: ProductOrderDetailsField,
    value: string,
  ) {
    setProductOrderDetails((currentDetails) => ({
      ...currentDetails,
      [field]: value,
    }));
    setFlowMessage("");
  }

  function handleProductOrderDetailsBlur(
    field: ProductOrderDetailsField | "checklistItems",
  ) {
    setTouchedProductOrderFields((currentFields) => ({
      ...currentFields,
      [field]: true,
    }));
  }

  function handleChecklistItemToggle(item: string) {
    setProductOrderDetails((currentDetails) => {
      const isAlreadySelected = currentDetails.checklistItems.includes(item);

      return {
        ...currentDetails,
        checklistItems: isAlreadySelected
          ? currentDetails.checklistItems.filter(
              (selectedItem) => selectedItem !== item,
            )
          : [...currentDetails.checklistItems, item],
      };
    });
    setFlowMessage("");
  }

  function handleAddOnToggle(addOnId: string) {
    setSelectedAddOnIds((currentAddOns) =>
      currentAddOns.includes(addOnId)
        ? currentAddOns.filter((selectedAddOnId) => selectedAddOnId !== addOnId)
        : [...currentAddOns, addOnId],
    );
    setFlowMessage("");
  }

  function handleAddDemoFile(category: SupportingFileCategory) {
    const demoFileName = FILE_UPLOAD_COPY.sections.find(
      (section) => section.category === category,
    )?.demoFileName;

    if (!demoFileName) {
      return;
    }

    setSupportingFiles((currentFiles) => {
      if (currentFiles[category].includes(demoFileName)) {
        return currentFiles;
      }

      return {
        ...currentFiles,
        [category]: [...currentFiles[category], demoFileName],
      };
    });
    setFlowMessage("");
  }

  function handleRemoveDemoFile(
    category: SupportingFileCategory,
    fileName: string,
  ) {
    setSupportingFiles((currentFiles) => ({
      ...currentFiles,
      [category]: currentFiles[category].filter(
        (selectedFileName) => selectedFileName !== fileName,
      ),
    }));
    setFlowMessage("");
  }

  function handleReviewConfirmationToggle(key: ReviewConfirmationKey) {
    setReviewConfirmations((currentConfirmations) => ({
      ...currentConfirmations,
      [key]: !currentConfirmations[key],
    }));
    setFlowMessage("");
  }

  function handleBack() {
    if (activeStep === 1 || isSubmittingDemo) {
      return;
    }

    setActiveStep((currentStep) => (currentStep - 1) as ActiveBookingStep);
    setFlowMessage("");
  }

  function handleContinue() {
    if (!canContinue) {
      setFlowMessage(getStepRequirementMessage(activeStep));
      return;
    }

    if (activeStep === 1) {
      setActiveStep(2);
      setFlowMessage("");
      return;
    }

    if (activeStep === 2) {
      // Future integration point: create or update a booking draft through
      // the Java Spring Boot REST API before moving to email verification.
      setActiveStep(3);
      setFlowMessage("");
      return;
    }

    if (activeStep === 3) {
      // Future integration point: persist email verification status through
      // the Java Spring Boot REST API before collecting exporter details.
      setActiveStep(4);
      setFlowMessage("");
      return;
    }

    if (activeStep === 4) {
      // Future integration point: save exporter address and coverage details
      // to the Java Spring Boot booking draft API.
      setActiveStep(5);
      setFlowMessage("");
      return;
    }

    if (activeStep === 5) {
      // Future integration point: send product/order details and checklist
      // selections to the Java Spring Boot API before supporting files are
      // attached to the booking draft.
      setActiveStep(6);
      setFlowMessage("");
      return;
    }

    if (activeStep === 6) {
      // Future integration point: replace these fake file names with secure
      // uploads handled by the Java Spring Boot API and object storage.
      setActiveStep(7);
      setFlowMessage("");
      return;
    }

    if (activeStep === 7) {
      // Future integration point: ask the Java Spring Boot pricing API to
      // verify the quote before moving into the review step.
      setActiveStep(8);
      setFlowMessage("");
      return;
    }

    handleDemoSubmit();
  }

  function handleDemoSubmit() {
    setIsSubmittingDemo(true);
    setFlowMessage(BOOKING_FLOW_COPY.finalSubmitLoadingMessage);

    // Future integration point: create booking draft, verify final price,
    // save the booking to PostgreSQL, and start the Stripe payment flow from
    // the Java Spring Boot REST API. This demo only prepares local UI state.
    window.setTimeout(() => {
      const demoReference = `MIA-DEMO-${Math.floor(
        10000 + Math.random() * 90000,
      )}`;
      const params = new URLSearchParams({
        reference: demoReference,
      });

      if (selectedPackage?.title) {
        params.set("package", selectedPackage.title);
      }

      router.push(`/book/confirmation?${params.toString()}`);
    }, 700);
  }

  return (
    <section className="bg-surface px-6 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-950/10 backdrop-blur sm:p-6 lg:p-8">
          <BookingStepIndicator activeStep={activeStep} />

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-foreground">
              {BOOKING_FLOW_COPY.selectedPackageLabel}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {selectedPackage?.title ?? BOOKING_FLOW_COPY.noPackageSelected}
            </p>
          </div>

          <div className="mt-10">
            {activeStep === 1 && (
              <PackageSelector
                onSelectPackage={handleSelectPackage}
                selectedPackageId={selectedPackageId}
              />
            )}

            {activeStep === 2 && (
              <ImporterDetailsForm
                details={importerDetails}
                errors={visibleImporterErrors}
                onBlur={handleImporterDetailsBlur}
                onChange={handleImporterDetailsChange}
              />
            )}

            {activeStep === 3 && (
              <EmailVerificationPlaceholder
                email={importerDetails.email}
                isVerified={isEmailVerified}
                onVerified={() => {
                  setIsEmailVerified(true);
                  setFlowMessage("");
                }}
              />
            )}

            {activeStep === 4 && (
              <ExporterDetailsForm
                details={exporterDetails}
                errors={visibleExporterErrors}
                isUnavailableState={isExporterUnavailableState}
                onBlur={handleExporterDetailsBlur}
                onChange={handleExporterDetailsChange}
              />
            )}

            {activeStep === 5 && (
              <ProductOrderDetailsForm
                details={productOrderDetails}
                errors={visibleProductOrderErrors}
                onBlur={handleProductOrderDetailsBlur}
                onChange={handleProductOrderDetailsChange}
                onToggleChecklistItem={handleChecklistItemToggle}
              />
            )}

            {activeStep === 6 && (
              <FileUploadPlaceholder
                files={supportingFiles}
                onAddDemoFile={handleAddDemoFile}
                onRemoveDemoFile={handleRemoveDemoFile}
              />
            )}

            {activeStep === 7 && (
              <QuoteSummary
                exporterDetails={exporterDetails}
                onToggleAddOn={handleAddOnToggle}
                productOrderDetails={productOrderDetails}
                selectedAddOnIds={selectedAddOnIds}
                selectedPackage={selectedPackage}
              />
            )}

            {activeStep === 8 && (
              <ReviewConfirm
                confirmations={reviewConfirmations}
                exporterDetails={exporterDetails}
                importerDetails={importerDetails}
                isEmailVerified={isEmailVerified}
                onToggleConfirmation={handleReviewConfirmationToggle}
                productOrderDetails={productOrderDetails}
                selectedAddOnIds={selectedAddOnIds}
                selectedPackage={selectedPackage}
                supportingFiles={supportingFiles}
              />
            )}
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Button
              disabled={activeStep === 1 || isSubmittingDemo}
              onClick={handleBack}
              variant="secondary"
            >
              {BOOKING_FLOW_COPY.backButton}
            </Button>

            <div className="flex flex-col gap-3 sm:items-end">
              {flowMessage && (
                <p
                  aria-live="polite"
                  className="text-sm font-semibold text-primary"
                >
                  {flowMessage}
                </p>
              )}
              <Button
                className="sm:min-w-40"
                disabled={!canContinue}
                onClick={handleContinue}
              >
                {getPrimaryButtonLabel(activeStep, isSubmittingDemo)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function validateImporterDetails(
  details: ImporterDetails,
): ImporterDetailsErrors {
  const errors: ImporterDetailsErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!details.fullName.trim()) {
    errors.fullName = IMPORTER_DETAILS_VALIDATION.fullNameRequired;
  }

  if (!details.country.trim()) {
    errors.country = IMPORTER_DETAILS_VALIDATION.countryRequired;
  }

  if (!details.phone.trim()) {
    errors.phone = IMPORTER_DETAILS_VALIDATION.phoneRequired;
  }

  if (!details.email.trim()) {
    errors.email = IMPORTER_DETAILS_VALIDATION.emailRequired;
  } else if (!emailPattern.test(details.email)) {
    errors.email = IMPORTER_DETAILS_VALIDATION.emailInvalid;
  }

  return errors;
}

function validateExporterDetails(
  details: ExporterDetails,
  isUnavailableState: boolean,
): ExporterDetailsErrors {
  const errors: ExporterDetailsErrors = {};

  if (!details.businessName.trim()) {
    errors.businessName = EXPORTER_DETAILS_VALIDATION.businessNameRequired;
  }

  if (!details.phone.trim()) {
    errors.phone = EXPORTER_DETAILS_VALIDATION.phoneRequired;
  }

  if (!details.fullAddress.trim()) {
    errors.fullAddress = EXPORTER_DETAILS_VALIDATION.fullAddressRequired;
  }

  if (!details.state.trim()) {
    errors.state = EXPORTER_DETAILS_VALIDATION.stateRequired;
  } else if (isUnavailableState) {
    errors.stateAvailability = EXPORTER_DETAILS_VALIDATION.stateUnavailable;
  }

  if (details.state && !isUnavailableState && !details.city.trim()) {
    errors.city = EXPORTER_DETAILS_VALIDATION.cityRequired;
  }

  return errors;
}

function validateProductOrderDetails(
  details: ProductOrderDetails,
): ProductOrderDetailsErrors {
  const errors: ProductOrderDetailsErrors = {};
  const importValue = Number(details.importValueGbp);

  if (!details.productCategory.trim()) {
    errors.productCategory =
      PRODUCT_ORDER_DETAILS_VALIDATION.productCategoryRequired;
  }

  if (!details.productDescription.trim()) {
    errors.productDescription =
      PRODUCT_ORDER_DETAILS_VALIDATION.productDescriptionRequired;
  }

  if (!details.quantity.trim()) {
    errors.quantity = PRODUCT_ORDER_DETAILS_VALIDATION.quantityRequired;
  }

  if (!details.importValueGbp.trim()) {
    errors.importValueGbp =
      PRODUCT_ORDER_DETAILS_VALIDATION.importValueRequired;
  } else if (!Number.isFinite(importValue) || importValue <= 0) {
    errors.importValueGbp = PRODUCT_ORDER_DETAILS_VALIDATION.importValueInvalid;
  }

  if (details.checklistItems.length === 0) {
    errors.checklistItems = PRODUCT_ORDER_DETAILS_VALIDATION.checklistRequired;
  }

  return errors;
}

function isUnavailableExporterState(state: string) {
  if (!state) {
    return false;
  }

  return (
    state === OTHER_STATE_OPTION ||
    !AVAILABLE_REGIONS.some((region) => region.state === state)
  );
}

function getVisibleErrors<TField extends string>(
  errors: Partial<Record<TField, string>>,
  touchedFields: Partial<Record<TField, boolean>>,
) {
  const visibleErrors: Partial<Record<TField, string>> = {};

  for (const field of Object.keys(errors) as TField[]) {
    if (touchedFields[field]) {
      visibleErrors[field] = errors[field];
    }
  }

  return visibleErrors;
}

function getStepRequirementMessage(activeStep: ActiveBookingStep) {
  if (activeStep === 1) {
    return BOOKING_FLOW_COPY.packageRequiredMessage;
  }

  if (activeStep === 2) {
    return BOOKING_FLOW_COPY.completeRequiredMessage;
  }

  if (activeStep === 3) {
    return BOOKING_FLOW_COPY.emailRequiredMessage;
  }

  if (activeStep === 4) {
    return BOOKING_FLOW_COPY.exporterRequiredMessage;
  }

  if (activeStep === 5) {
    return BOOKING_FLOW_COPY.productRequiredMessage;
  }

  if (activeStep === 6) {
    return BOOKING_FLOW_COPY.completeRequiredMessage;
  }

  if (activeStep === 7) {
    return BOOKING_FLOW_COPY.quoteRequiredMessage;
  }

  return BOOKING_FLOW_COPY.confirmationsRequiredMessage;
}

function getPrimaryButtonLabel(
  activeStep: ActiveBookingStep,
  isSubmittingDemo: boolean,
) {
  if (activeStep === 6) {
    return BOOKING_FLOW_COPY.continueToQuoteButton;
  }

  if (activeStep === 7) {
    return BOOKING_FLOW_COPY.continueToReviewButton;
  }

  if (activeStep === 8) {
    if (isSubmittingDemo) {
      return BOOKING_FLOW_COPY.submittingButton;
    }

    return BOOKING_FLOW_COPY.submitButton;
  }

  return BOOKING_FLOW_COPY.continueButton;
}
