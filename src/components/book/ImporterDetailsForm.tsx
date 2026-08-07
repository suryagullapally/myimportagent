import { IMPORTER_DETAILS_COPY } from "@/lib/constants";
import type {
  ImporterDetails,
  ImporterDetailsErrors,
  ImporterDetailsField,
} from "@/types";

type ImporterDetailsFormProps = Readonly<{
  details: ImporterDetails;
  errors: ImporterDetailsErrors;
  onChange: (field: ImporterDetailsField, value: string) => void;
}>;

export function ImporterDetailsForm({
  details,
  errors,
  onChange,
}: ImporterDetailsFormProps) {
  return (
    <section aria-labelledby="importer-details-title">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {IMPORTER_DETAILS_COPY.eyebrow}
        </p>
        <h2
          className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
          id="importer-details-title"
        >
          {IMPORTER_DETAILS_COPY.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {IMPORTER_DETAILS_COPY.description}
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <TextField
          error={errors.fullName}
          id="importer-full-name"
          label={IMPORTER_DETAILS_COPY.fullNameLabel}
          onChange={(value) => onChange("fullName", value)}
          placeholder={IMPORTER_DETAILS_COPY.fullNamePlaceholder}
          value={details.fullName}
        />
        <TextField
          hint={IMPORTER_DETAILS_COPY.companyNameHint}
          id="importer-company-name"
          label={IMPORTER_DETAILS_COPY.companyNameLabel}
          onChange={(value) => onChange("companyName", value)}
          placeholder={IMPORTER_DETAILS_COPY.companyNamePlaceholder}
          value={details.companyName}
        />
        <TextField
          error={errors.country}
          id="importer-country"
          label={IMPORTER_DETAILS_COPY.countryLabel}
          onChange={(value) => onChange("country", value)}
          placeholder={IMPORTER_DETAILS_COPY.countryPlaceholder}
          value={details.country}
        />
        <TextField
          error={errors.phone}
          id="importer-phone"
          label={IMPORTER_DETAILS_COPY.phoneLabel}
          onChange={(value) => onChange("phone", value)}
          placeholder={IMPORTER_DETAILS_COPY.phonePlaceholder}
          type="tel"
          value={details.phone}
        />
        <div className="md:col-span-2">
          <TextField
            error={errors.email}
            id="importer-email"
            label={IMPORTER_DETAILS_COPY.emailLabel}
            onChange={(value) => onChange("email", value)}
            placeholder={IMPORTER_DETAILS_COPY.emailPlaceholder}
            type="email"
            value={details.email}
          />
        </div>
      </div>
    </section>
  );
}

type TextFieldProps = Readonly<{
  error?: string;
  hint?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}>;

function TextField({
  error,
  hint,
  id,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: TextFieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-700">
        {label}
        {hint && <span className="text-xs font-medium text-slate-400">{hint}</span>}
      </span>
      <input
        aria-invalid={Boolean(error)}
        className={`mt-2 h-12 w-full rounded-md border bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none transition focus:bg-white focus:ring-4 ${
          error
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
            : "border-slate-200 focus:border-emerald-400 focus:ring-emerald-100"
        }`}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && <p className="mt-2 text-sm font-semibold text-rose-700">{error}</p>}
    </label>
  );
}
