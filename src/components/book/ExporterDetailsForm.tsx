import {
  AVAILABLE_REGIONS,
  EXPORTER_DETAILS_COPY,
  OTHER_STATE_OPTION,
  STATE_OPTIONS,
} from "@/lib/constants";
import type {
  ExporterDetails,
  ExporterDetailsErrors,
  ExporterDetailsField,
} from "@/types";

type ExporterDetailsFormProps = Readonly<{
  details: ExporterDetails;
  errors: ExporterDetailsErrors;
  isUnavailableState: boolean;
  onBlur: (field: ExporterDetailsField) => void;
  onChange: (field: ExporterDetailsField, value: string) => void;
}>;

export function ExporterDetailsForm({
  details,
  errors,
  isUnavailableState,
  onBlur,
  onChange,
}: ExporterDetailsFormProps) {
  const selectedRegion = AVAILABLE_REGIONS.find(
    (region) => region.state === details.state,
  );
  const cityOptions = selectedRegion?.cities ?? [];
  const isCityDisabled = !details.state || isUnavailableState;

  return (
    <section aria-labelledby="exporter-details-title">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {EXPORTER_DETAILS_COPY.eyebrow}
        </p>
        <h2
          className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
          id="exporter-details-title"
        >
          {EXPORTER_DETAILS_COPY.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {EXPORTER_DETAILS_COPY.description}
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <TextField
          error={errors.businessName}
          id="exporter-business-name"
          label={EXPORTER_DETAILS_COPY.businessNameLabel}
          onBlur={() => onBlur("businessName")}
          onChange={(value) => onChange("businessName", value)}
          placeholder={EXPORTER_DETAILS_COPY.businessNamePlaceholder}
          value={details.businessName}
        />
        <TextField
          hint={EXPORTER_DETAILS_COPY.contactPersonHint}
          id="exporter-contact-person"
          label={EXPORTER_DETAILS_COPY.contactPersonLabel}
          onBlur={() => onBlur("contactPerson")}
          onChange={(value) => onChange("contactPerson", value)}
          placeholder={EXPORTER_DETAILS_COPY.contactPersonPlaceholder}
          value={details.contactPerson}
        />
        <TextField
          error={errors.phone}
          id="exporter-phone"
          label={EXPORTER_DETAILS_COPY.phoneLabel}
          onBlur={() => onBlur("phone")}
          onChange={(value) => onChange("phone", value)}
          placeholder={EXPORTER_DETAILS_COPY.phonePlaceholder}
          type="tel"
          value={details.phone}
        />
        <TextField
          hint={EXPORTER_DETAILS_COPY.emailHint}
          id="exporter-email"
          label={EXPORTER_DETAILS_COPY.emailLabel}
          onBlur={() => onBlur("email")}
          onChange={(value) => onChange("email", value)}
          placeholder={EXPORTER_DETAILS_COPY.emailPlaceholder}
          type="email"
          value={details.email}
        />
        <div className="md:col-span-2">
          <TextAreaField
            error={errors.fullAddress}
            id="exporter-full-address"
            label={EXPORTER_DETAILS_COPY.fullAddressLabel}
            onBlur={() => onBlur("fullAddress")}
            onChange={(value) => onChange("fullAddress", value)}
            placeholder={EXPORTER_DETAILS_COPY.fullAddressPlaceholder}
            value={details.fullAddress}
          />
        </div>
        <SelectField
          error={errors.state}
          id="exporter-state"
          label={EXPORTER_DETAILS_COPY.stateLabel}
          onBlur={() => onBlur("state")}
          onChange={(value) => {
            onChange("state", value);
            onChange("city", "");
          }}
          placeholder={EXPORTER_DETAILS_COPY.statePlaceholder}
          value={details.state}
        >
          {STATE_OPTIONS.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </SelectField>
        <SelectField
          disabled={isCityDisabled}
          error={errors.city}
          id="exporter-city"
          label={EXPORTER_DETAILS_COPY.cityLabel}
          onBlur={() => onBlur("city")}
          onChange={(value) => onChange("city", value)}
          placeholder={
            isUnavailableState
              ? EXPORTER_DETAILS_COPY.unavailableCityPlaceholder
              : EXPORTER_DETAILS_COPY.cityPlaceholder
          }
          value={details.city}
        >
          {cityOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </SelectField>
        <TextField
          hint={EXPORTER_DETAILS_COPY.googleMapsHint}
          id="exporter-google-maps"
          label={EXPORTER_DETAILS_COPY.googleMapsLabel}
          onBlur={() => onBlur("googleMapsLink")}
          onChange={(value) => onChange("googleMapsLink", value)}
          placeholder={EXPORTER_DETAILS_COPY.googleMapsPlaceholder}
          type="url"
          value={details.googleMapsLink}
        />
        <TextField
          hint={EXPORTER_DETAILS_COPY.gstNumberHint}
          id="exporter-gst-number"
          label={EXPORTER_DETAILS_COPY.gstNumberLabel}
          onBlur={() => onBlur("gstNumber")}
          onChange={(value) => onChange("gstNumber", value)}
          placeholder={EXPORTER_DETAILS_COPY.gstNumberPlaceholder}
          value={details.gstNumber}
        />
        <div className="md:col-span-2">
          <TextField
            hint={EXPORTER_DETAILS_COPY.profileLinkHint}
            id="exporter-profile-link"
            label={EXPORTER_DETAILS_COPY.profileLinkLabel}
            onBlur={() => onBlur("profileLink")}
            onChange={(value) => onChange("profileLink", value)}
            placeholder={EXPORTER_DETAILS_COPY.profileLinkPlaceholder}
            type="url"
            value={details.profileLink}
          />
        </div>
      </div>

      {isUnavailableState && (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-bold text-amber-900">
            {EXPORTER_DETAILS_COPY.unavailableStateMessage}
          </p>
          <p className="mt-1 text-sm leading-6 text-amber-800">
            {EXPORTER_DETAILS_COPY.unavailableStateNote}
          </p>
        </div>
      )}

      {details.state === OTHER_STATE_OPTION && (
        <p className="mt-3 text-sm text-slate-500">
          You can go back and choose a currently covered state if the exporter
          has another address.
        </p>
      )}
    </section>
  );
}

type TextFieldProps = Readonly<{
  error?: string;
  hint?: string;
  id: string;
  label: string;
  onBlur: () => void;
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
  onBlur,
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
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && <p className="mt-2 text-sm font-semibold text-rose-700">{error}</p>}
    </label>
  );
}

type TextAreaFieldProps = Readonly<{
  error?: string;
  id: string;
  label: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}>;

function TextAreaField({
  error,
  id,
  label,
  onBlur,
  onChange,
  placeholder,
  value,
}: TextAreaFieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <textarea
        aria-invalid={Boolean(error)}
        className={`mt-2 min-h-28 w-full rounded-md border bg-slate-50 px-4 py-3 text-sm font-medium text-slate-950 outline-none transition focus:bg-white focus:ring-4 ${
          error
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
            : "border-slate-200 focus:border-emerald-400 focus:ring-emerald-100"
        }`}
        id={id}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
      {error && <p className="mt-2 text-sm font-semibold text-rose-700">{error}</p>}
    </label>
  );
}

type SelectFieldProps = Readonly<{
  children: React.ReactNode;
  disabled?: boolean;
  error?: string;
  id: string;
  label: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}>;

function SelectField({
  children,
  disabled = false,
  error,
  id,
  label,
  onBlur,
  onChange,
  placeholder,
  value,
}: SelectFieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select
        aria-invalid={Boolean(error)}
        className={`mt-2 h-12 w-full rounded-md border bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none transition disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 focus:bg-white focus:ring-4 ${
          error
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
            : "border-slate-200 focus:border-emerald-400 focus:ring-emerald-100"
        }`}
        disabled={disabled}
        id={id}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
      {error && <p className="mt-2 text-sm font-semibold text-rose-700">{error}</p>}
    </label>
  );
}
