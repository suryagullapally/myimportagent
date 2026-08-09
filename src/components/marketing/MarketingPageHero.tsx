import Link from "next/link";

type MarketingHeroAction = Readonly<{
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}>;

type MarketingPageHeroProps = Readonly<{
  actions?: readonly MarketingHeroAction[];
  description: string;
  eyebrow: string;
  title: string;
}>;

export function MarketingPageHero({
  actions = [],
  description,
  eyebrow,
  title,
}: MarketingPageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy px-6 py-20 text-white sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
            {description}
          </p>
          {actions.length > 0 && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {actions.map((action) => (
                <Link
                  className={`inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-center text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${
                    action.variant === "secondary"
                      ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                      : "bg-primary text-white shadow-lg shadow-emerald-950/20 hover:bg-primary-dark"
                  }`}
                  href={action.href}
                  key={action.href}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
