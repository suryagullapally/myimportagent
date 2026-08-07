import {
  PAYMENT_STATUS_OPTIONS,
  PRODUCT_ORDER_DETAILS_COPY,
  VERIFICATION_CHECKLIST_ITEMS,
} from "@/lib/constants";
import type {
  PaymentStatus,
  ProductOrderDetails,
  ProductOrderDetailsErrors,
  ProductOrderDetailsField,
} from "@/types";

type ProductOrderDetailsFormProps = Readonly<{
  details: ProductOrderDetails;
  errors: ProductOrderDetailsErrors;
  onChange: (field: ProductOrderDetailsField, value: string) => void;
  onToggleChecklistItem: (item: string) => void;
}>;

export function ProductOrderDetailsForm({
  details,
  errors,
  onChange,
  onToggleChecklistItem,
}: ProductOrderDetailsFormProps) {
  return (
    <section aria-labelledby="product-order-details-title">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {PRODUCT_ORDER_DETAILS_COPY.eyebrow}
        </p>
        <h2
          className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
          id="product-order-details-title"
        >
          {PRODUCT_ORDER_DETAILS_COPY.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {PRODUCT_ORDER_DETAILS_COPY.description}
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <TextField
          error={errors.productCategory}
          id="product-category"
          label={PRODUCT_ORDER_DETAILS_COPY.productCategoryLabel}
          onChange={(value) => onChange("productCategory", value)}
          placeholder={PRODUCT_ORDER_DETAILS_COPY.productCategoryPlaceholder}
          value={details.productCategory}
        />
        <TextField
          error={errors.quantity}
          id="product-quantity"
          label={PRODUCT_ORDER_DETAILS_COPY.quantityLabel}
          onChange={(value) => onChange("quantity", value)}
          placeholder={PRODUCT_ORDER_DETAILS_COPY.quantityPlaceholder}
          value={details.quantity}
        />
        <TextField
          error={errors.importValueGbp}
          id="product-import-value"
          label={PRODUCT_ORDER_DETAILS_COPY.importValueLabel}
          onChange={(value) => onChange("importValueGbp", value)}
          placeholder={PRODUCT_ORDER_DETAILS_COPY.importValuePlaceholder}
          type="number"
          value={details.importValueGbp}
        />
        <label className="block" htmlFor="payment-status">
          <span className="text-sm font-semibold text-slate-700">
            {PRODUCT_ORDER_DETAILS_COPY.paymentStatusLabel}
          </span>
          <select
            className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            id="payment-status"
            onChange={(event) =>
              onChange("paymentStatus", event.target.value as PaymentStatus)
            }
            value={details.paymentStatus}
          >
            {PAYMENT_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <div className="md:col-span-2">
          <TextAreaField
            error={errors.productDescription}
            id="product-description"
            label={PRODUCT_ORDER_DETAILS_COPY.productDescriptionLabel}
            onChange={(value) => onChange("productDescription", value)}
            placeholder={PRODUCT_ORDER_DETAILS_COPY.productDescriptionPlaceholder}
            value={details.productDescription}
          />
        </div>
        <TextField
          hint={PRODUCT_ORDER_DETAILS_COPY.expectedDateHint}
          id="expected-verification-date"
          label={PRODUCT_ORDER_DETAILS_COPY.expectedDateLabel}
          onChange={(value) => onChange("expectedVerificationDate", value)}
          placeholder={PRODUCT_ORDER_DETAILS_COPY.expectedDatePlaceholder}
          value={details.expectedVerificationDate}
        />
        <div className="md:col-span-2">
          <TextAreaField
            id="special-instructions"
            label={PRODUCT_ORDER_DETAILS_COPY.specialInstructionsLabel}
            onChange={(value) => onChange("specialInstructions", value)}
            placeholder={PRODUCT_ORDER_DETAILS_COPY.specialInstructionsPlaceholder}
            value={details.specialInstructions}
          />
        </div>
      </div>

      <fieldset className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <legend className="text-sm font-bold text-foreground">
          {PRODUCT_ORDER_DETAILS_COPY.checklistTitle}
        </legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VERIFICATION_CHECKLIST_ITEMS.map((item) => {
            const isChecked = details.checklistItems.includes(item);

            return (
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 text-sm font-medium transition ${
                  isChecked
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200"
                }`}
                key={item}
              >
                <input
                  checked={isChecked}
                  className="mt-1 h-4 w-4 accent-emerald-600"
                  onChange={() => onToggleChecklistItem(item)}
                  type="checkbox"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
        {errors.checklistItems && (
          <p className="mt-3 text-sm font-semibold text-rose-700">
            {errors.checklistItems}
          </p>
        )}
      </fieldset>
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

type TextAreaFieldProps = Readonly<{
  error?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}>;

function TextAreaField({
  error,
  id,
  label,
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
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
      {error && <p className="mt-2 text-sm font-semibold text-rose-700">{error}</p>}
    </label>
  );
}
