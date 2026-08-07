"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { EMAIL_VERIFICATION_COPY } from "@/lib/constants";

type EmailVerificationPlaceholderProps = Readonly<{
  email: string;
  isVerified: boolean;
  onVerified: () => void;
}>;

export function EmailVerificationPlaceholder({
  email,
  isVerified,
  onVerified,
}: EmailVerificationPlaceholderProps) {
  const [code, setCode] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  function handleSendCode() {
    // Future integration point: call the Java Spring Boot API to send
    // a real email OTP to the importer email address.
    setStatusMessage(EMAIL_VERIFICATION_COPY.sentMessage);
  }

  function handleVerifyCode() {
    // Future integration point: replace this demo comparison with a
    // Java Spring Boot API request that verifies the submitted OTP.
    if (code.trim() === "123456") {
      onVerified();
      setStatusMessage(EMAIL_VERIFICATION_COPY.successMessage);
      return;
    }

    setStatusMessage(EMAIL_VERIFICATION_COPY.invalidMessage);
  }

  return (
    <section aria-labelledby="email-verification-title">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {EMAIL_VERIFICATION_COPY.eyebrow}
        </p>
        <h2
          className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
          id="email-verification-title"
        >
          {EMAIL_VERIFICATION_COPY.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {EMAIL_VERIFICATION_COPY.description}
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <label className="block" htmlFor="verification-email">
            <span className="text-sm font-semibold text-slate-700">
              {EMAIL_VERIFICATION_COPY.emailLabel}
            </span>
            <input
              className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-slate-100 px-4 text-sm font-medium text-slate-700 outline-none"
              id="verification-email"
              readOnly
              value={email}
            />
          </label>

          <Button className="mt-5" onClick={handleSendCode} variant="secondary">
            {EMAIL_VERIFICATION_COPY.sendButton}
          </Button>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <label className="block" htmlFor="verification-code">
            <span className="text-sm font-semibold text-slate-700">
              {EMAIL_VERIFICATION_COPY.codeLabel}
            </span>
            <input
              className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              id="verification-code"
              inputMode="numeric"
              onChange={(event) => setCode(event.target.value)}
              placeholder={EMAIL_VERIFICATION_COPY.codePlaceholder}
              value={code}
            />
          </label>

          <Button className="mt-5 w-full" onClick={handleVerifyCode}>
            {EMAIL_VERIFICATION_COPY.verifyButton}
          </Button>
        </div>
      </div>

      {(statusMessage || isVerified) && (
        <div
          aria-live="polite"
          className={`mt-6 rounded-lg border p-4 ${
            isVerified
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-sky-200 bg-sky-50 text-sky-900"
          }`}
        >
          <p className="text-sm font-bold">
            {isVerified ? EMAIL_VERIFICATION_COPY.successMessage : statusMessage}
          </p>
        </div>
      )}
    </section>
  );
}
