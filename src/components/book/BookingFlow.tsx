"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui";
import {
  BOOKING_FLOW_COPY,
  BOOKING_PACKAGES,
  IMPORTER_DETAILS_VALIDATION,
} from "@/lib/constants";
import type {
  ActiveBookingStep,
  ImporterDetails,
  ImporterDetailsErrors,
  ImporterDetailsField,
} from "@/types";
import { BookingStepIndicator } from "./BookingStepIndicator";
import { EmailVerificationPlaceholder } from "./EmailVerificationPlaceholder";
import { ImporterDetailsForm } from "./ImporterDetailsForm";
import { PackageSelector } from "./PackageSelector";

const EMPTY_IMPORTER_DETAILS: ImporterDetails = {
  fullName: "",
  companyName: "",
  country: "",
  phone: "",
  email: "",
};

export function BookingFlow() {
  const [activeStep, setActiveStep] = useState<ActiveBookingStep>(1);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [importerDetails, setImporterDetails] = useState<ImporterDetails>(
    EMPTY_IMPORTER_DETAILS,
  );
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [flowMessage, setFlowMessage] = useState("");

  const selectedPackage = useMemo(
    () => BOOKING_PACKAGES.find((item) => item.id === selectedPackageId),
    [selectedPackageId],
  );

  const importerErrors = validateImporterDetails(importerDetails);
  const isImporterDetailsValid = Object.keys(importerErrors).length === 0;
  const canContinue =
    (activeStep === 1 && Boolean(selectedPackage)) ||
    (activeStep === 2 && isImporterDetailsValid) ||
    (activeStep === 3 && isEmailVerified);

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

  function handleBack() {
    if (activeStep === 1) {
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

    setFlowMessage(BOOKING_FLOW_COPY.finalPlaceholderMessage);
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
                errors={importerErrors}
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
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Button
              disabled={activeStep === 1}
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
                {BOOKING_FLOW_COPY.continueButton}
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

function getStepRequirementMessage(activeStep: ActiveBookingStep) {
  if (activeStep === 1) {
    return BOOKING_FLOW_COPY.packageRequiredMessage;
  }

  if (activeStep === 2) {
    return BOOKING_FLOW_COPY.completeRequiredMessage;
  }

  return BOOKING_FLOW_COPY.emailRequiredMessage;
}
