import { cn } from "@/lib/utils";

type ButtonProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}>;

export function Button({
  children,
  className,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-md px-5 py-3 text-center text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300",
        variant === "primary" &&
          "bg-primary text-white shadow-lg shadow-emerald-950/20 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-950 shadow-sm hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50",
        variant === "outline" &&
          "border border-white/25 bg-white/10 text-white shadow-sm backdrop-blur hover:-translate-y-0.5 hover:bg-white/20",
        className,
      )}
      type="button"
    >
      {children}
    </button>
  );
}
