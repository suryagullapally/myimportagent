type MarketingSectionProps = Readonly<{
  children: React.ReactNode;
  description?: string;
  eyebrow?: string;
  title?: string;
  tone?: "surface" | "muted";
}>;

export function MarketingSection({
  children,
  description,
  eyebrow,
  title,
  tone = "surface",
}: MarketingSectionProps) {
  return (
    <section
      className={`px-6 py-16 sm:px-8 lg:px-10 ${
        tone === "muted"
          ? "border-y border-slate-200 bg-slate-50"
          : "bg-surface"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || description) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-7 text-slate-600">
                {description}
              </p>
            )}
          </div>
        )}
        <div className={eyebrow || title || description ? "mt-10" : ""}>
          {children}
        </div>
      </div>
    </section>
  );
}
