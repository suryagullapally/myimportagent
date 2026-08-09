type InfoCardProps = Readonly<{
  children?: React.ReactNode;
  description: string;
  eyebrow?: string;
  title: string;
}>;

export function InfoCard({
  children,
  description,
  eyebrow,
  title,
}: InfoCardProps) {
  return (
    <article className="group h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-950/10">
      {eyebrow && (
        <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      )}
      <h3 className={eyebrow ? "mt-3 text-xl font-bold" : "text-xl font-bold"}>
        {title}
      </h3>
      <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
      {children && <div className="mt-5">{children}</div>}
    </article>
  );
}
