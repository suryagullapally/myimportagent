"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { submitAgentVisitResult } from "@/lib/api/agentJobs";

type VisitResultFormProps = Readonly<{
  agentId: string;
  bookingReference: string;
  onSubmitted?: () => void;
}>;

const visitResultOptions = [
  {
    label: "Passed",
    value: "passed",
  },
  {
    label: "Passed with minor issues",
    value: "passed-with-minor-issues",
  },
  {
    label: "Failed",
    value: "failed",
  },
  {
    label: "Could not verify",
    value: "could-not-verify",
  },
];

export function VisitResultForm({
  agentId,
  bookingReference,
  onSubmitted,
}: VisitResultFormProps) {
  const [visitSummary, setVisitSummary] = useState("");
  const [issuesFound, setIssuesFound] = useState("");
  const [agentNextAction, setAgentNextAction] = useState("");
  const [visitResultStatus, setVisitResultStatus] = useState("passed");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    try {
      setIsSubmitting(true);
      setSuccessMessage("");
      setErrorMessage("");

      await submitAgentVisitResult(bookingReference, agentId, {
        visitResultStatus,
        visitSummary: visitSummary.trim(),
        issuesFound: issuesFound.trim(),
        agentNextAction: agentNextAction.trim(),
      });

      setSuccessMessage(
        "Visit result submitted successfully. This booking is now completed.",
      );

      onSubmitted?.();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not submit visit result.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const isSubmitDisabled =
    isSubmitting || !visitResultStatus.trim() || !visitSummary.trim();

  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
        Visit result
      </p>
      <h3 className="mt-2 text-2xl font-black text-slate-950">
        Submit visit result
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        This form submits the visit result to Spring Boot and saves it in
        PostgreSQL.
      </p>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm font-bold text-slate-700">
            Visit summary
          </span>
          <textarea
            className={fieldClassName}
            onChange={(event) => setVisitSummary(event.target.value)}
            placeholder="Summarise what happened during the visit."
            value={visitSummary}
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">
            Red flags or issues found
          </span>
          <textarea
            className={fieldClassName}
            onChange={(event) => setIssuesFound(event.target.value)}
            placeholder="Mention refused entry, mismatch, missing stock, damaged packing, or other concerns."
            value={issuesFound}
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">
            Agent next action
          </span>
          <textarea
            className={fieldClassName}
            onChange={(event) => setAgentNextAction(event.target.value)}
            placeholder="Example: Admin can prepare customer report."
            value={agentNextAction}
          />
        </label>

        <fieldset>
          <legend className="text-sm font-bold text-slate-700">
            Result option
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {visitResultOptions.map((option) => (
              <label
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-200 hover:bg-emerald-50"
                key={option.value}
              >
                <input
                  checked={visitResultStatus === option.value}
                  className="size-4 accent-emerald-600"
                  name="visit-result"
                  onChange={() => setVisitResultStatus(option.value)}
                  type="radio"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p>
            <strong>Booking:</strong> {bookingReference}
          </p>
          <p className="mt-1">
            <strong>Agent:</strong> {agentId}
          </p>
        </div>

        <Button
          className="w-full sm:w-auto"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting..." : "Submit visit result"}
        </Button>

        {successMessage && (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-900">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
}

const fieldClassName =
  "mt-2 min-h-32 w-full resize-y rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100";