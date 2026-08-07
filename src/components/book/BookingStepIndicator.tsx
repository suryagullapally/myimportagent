import { ACTIVE_BOOKING_STEPS } from "@/lib/constants";
import type { ActiveBookingStep } from "@/types";

type BookingStepIndicatorProps = Readonly<{
  activeStep: ActiveBookingStep;
}>;

export function BookingStepIndicator({ activeStep }: BookingStepIndicatorProps) {
  return (
    <nav aria-label="Booking progress">
      <ol className="grid gap-3 md:grid-cols-3">
        {ACTIVE_BOOKING_STEPS.map((step) => {
          const isActive = step.number === activeStep;
          const isComplete = step.number < activeStep;

          return (
            <li
              className={`rounded-lg border p-4 transition ${
                isActive
                  ? "border-emerald-300 bg-emerald-50 shadow-lg shadow-emerald-950/5"
                  : "border-slate-200 bg-white"
              }`}
              key={step.number}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold ${
                    isComplete || isActive
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {isComplete ? "✓" : step.number}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Step {step.number}
                  </p>
                  <p className="font-bold text-foreground">{step.title}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
