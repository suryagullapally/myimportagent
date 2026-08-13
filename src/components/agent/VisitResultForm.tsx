"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { VISIT_RESULT_OPTIONS } from "@/lib/mock";
import type { VisitResult } from "@/types";

export function VisitResultForm() {
  const [agentNotes, setAgentNotes] = useState("");
  const [redFlags, setRedFlags] = useState("");
  const [visitResult, setVisitResult] = useState<VisitResult>("verified");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit() {
    // Future integration point:
    // PATCH /api/agent/jobs/{id}/status
    // POST /api/agent/jobs/{id}/submit-result
    // The Java backend will validate the agent identity and attach evidence.
    setIsSubmitting(true);
    setSuccessMessage("");

    window.setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(
        "Demo evidence submitted successfully. Backend upload and admin review will be connected later.",
      );
    }, 650);
  }

  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
        Visit result
      </p>
      <h3 className="mt-2 text-2xl font-black text-slate-950">
        Submit visit result
      </h3>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm font-bold text-slate-700">Agent notes</span>
          <textarea
            className={fieldClassName}
            onChange={(event) => setAgentNotes(event.target.value)}
            placeholder="Summarise what happened during the visit."
            value={agentNotes}
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">
            Red flags or issues found
          </span>
          <textarea
            className={fieldClassName}
            onChange={(event) => setRedFlags(event.target.value)}
            placeholder="Mention refused entry, mismatch, missing stock, damaged packing, or other concerns."
            value={redFlags}
          />
        </label>

        <fieldset>
          <legend className="text-sm font-bold text-slate-700">
            Result option
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {VISIT_RESULT_OPTIONS.map((option) => (
              <label
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-200 hover:bg-emerald-50"
                key={option.value}
              >
                <input
                  checked={visitResult === option.value}
                  className="size-4 accent-emerald-600"
                  name="visit-result"
                  onChange={() => setVisitResult(option.value)}
                  type="radio"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <Button
          className="w-full sm:w-auto"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting demo..." : "Submit Evidence"}
        </Button>

        {successMessage && (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
            {successMessage}
          </p>
        )}
      </div>
    </section>
  );
}

const fieldClassName =
  "mt-2 min-h-32 w-full resize-y rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100";
