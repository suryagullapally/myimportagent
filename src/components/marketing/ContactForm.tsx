"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { CONTACT_PAGE } from "@/lib/constants";

export function ContactForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(CONTACT_PAGE.formBackendMessage);
  }

  return (
    <form
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Name"
          name="name"
          placeholder="Jane Smith"
          required
        />
        <FormField
          label="Email"
          name="email"
          placeholder="jane@example.com"
          required
          type="email"
        />
        <FormField
          label="Country"
          name="country"
          placeholder="United Kingdom"
          required
        />
        <div />
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-bold text-slate-900">Message</span>
        <textarea
          className="mt-2 min-h-36 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          name="message"
          placeholder="Tell us what you want to verify."
          required
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit">Send Message</Button>
        {message && (
          <p className="text-sm font-semibold text-primary" role="status">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

type FormFieldProps = Readonly<{
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: "email" | "text";
}>;

function FormField({
  label,
  name,
  placeholder,
  required = false,
  type = "text",
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-900">{label}</span>
      <input
        className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}
