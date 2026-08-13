export function Hero3DVisual() {
  return (
    <div
      aria-label="Illustration showing an importer connected to India with verification, package, checklist, and trust symbols."
      className="hero-scene group relative isolate mx-auto min-h-[420px] w-full max-w-[560px] overflow-hidden sm:min-h-[520px]"
      role="img"
    >
      <div className="hero-glow absolute inset-8 z-0 rounded-lg bg-sky-400/20 blur-3xl" />

      <div className="hero-plane absolute left-10 right-10 top-40 z-0 h-56 rounded-lg border border-white/15 bg-white/[0.07] shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:left-16 sm:right-12 sm:top-44 sm:h-64" />

      <svg
        aria-hidden="true"
        className="absolute left-4 top-20 z-10 h-72 w-[92%] text-emerald-300/80 sm:left-8 sm:top-24 sm:h-80"
        fill="none"
        viewBox="0 0 520 320"
      >
        <path
          d="M72 210 C160 92 294 256 432 104"
          stroke="currentColor"
          strokeDasharray="8 12"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <circle cx="72" cy="210" fill="#38bdf8" r="7" />
        <circle cx="432" cy="104" fill="#34d399" r="7" />
      </svg>

      <div className="float-soft absolute left-2 top-24 z-30 rounded-lg border border-white/15 bg-white/95 p-4 text-slate-950 shadow-2xl shadow-slate-950/25 sm:left-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Importer
        </p>
        <p className="mt-2 text-lg font-bold">United Kingdom</p>
        <div className="mt-3 h-2 w-28 rounded-full bg-slate-100">
          <div className="h-2 w-20 rounded-full bg-sky-400" />
        </div>
      </div>

      <div className="float-soft-delayed absolute right-3 top-8 z-30 rounded-lg border border-emerald-200/60 bg-emerald-50 p-4 text-slate-950 shadow-2xl shadow-emerald-950/20 sm:right-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/20">
            IN
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Local visit
            </p>
            <p className="mt-1 font-bold">India agent</p>
          </div>
        </div>
      </div>

      <div className="hero-card absolute left-[22%] top-[34%] z-40 w-64 rounded-lg border border-white/20 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/30 transition duration-500 group-hover:-translate-y-2 group-hover:rotate-0 sm:w-72">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Verification card
            </p>
            <h3 className="mt-2 text-xl font-bold">Exporter check</h3>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
            ✓
          </span>
        </div>

        <ul className="mt-5 space-y-3 text-sm text-slate-600">
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Seller address reviewed
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            Product evidence collected
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Dispatch risk noted
          </li>
        </ul>
      </div>

      <div className="float-soft absolute bottom-16 left-6 z-40 rounded-lg border border-white/15 bg-slate-950/85 p-4 text-white shadow-2xl shadow-slate-950/30 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">
          Evidence
        </p>
        <div className="mt-3 space-y-2">
          <div className="h-2 w-28 rounded-full bg-white/75" />
          <div className="h-2 w-20 rounded-full bg-white/40" />
          <div className="h-2 w-24 rounded-full bg-emerald-300/80" />
        </div>
      </div>

      <div className="package-cube absolute bottom-14 right-8 z-30 h-24 w-28 text-slate-900 sm:right-12">
        <div className="box-top" />
        <div className="box-front">
          <span>BOX</span>
        </div>
        <div className="box-side" />
        <div className="box-label">✓</div>
      </div>

      <div className="float-soft-delayed absolute bottom-2 right-20 z-40 rounded-lg border border-white/15 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-slate-950/20">
        Trust shield active
      </div>
    </div>
  );
}
