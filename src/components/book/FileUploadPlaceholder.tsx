import { FILE_UPLOAD_COPY } from "@/lib/constants";
import type { SupportingFileCategory, SupportingFiles } from "@/types";

type FileUploadPlaceholderProps = Readonly<{
  files: SupportingFiles;
  onAddDemoFile: (category: SupportingFileCategory) => void;
  onRemoveDemoFile: (
    category: SupportingFileCategory,
    fileName: string,
  ) => void;
}>;

export function FileUploadPlaceholder({
  files,
  onAddDemoFile,
  onRemoveDemoFile,
}: FileUploadPlaceholderProps) {
  return (
    <section aria-labelledby="file-upload-title">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {FILE_UPLOAD_COPY.eyebrow}
        </p>
        <h2
          className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
          id="file-upload-title"
        >
          {FILE_UPLOAD_COPY.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {FILE_UPLOAD_COPY.description}
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {FILE_UPLOAD_COPY.sections.map((section) => {
          const category = section.category as SupportingFileCategory;
          const selectedFiles = files[category];

          return (
            <article
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5"
              key={section.category}
            >
              <div className="flex h-full flex-col">
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {section.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {section.description}
                  </p>
                  <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {section.acceptedTypes}
                  </p>
                </div>

                <button
                  className="mt-6 flex min-h-36 w-full flex-col items-center justify-center rounded-lg border border-dashed border-emerald-300 bg-emerald-50/60 p-5 text-center transition duration-200 group-hover:bg-emerald-50"
                  onClick={() => onAddDemoFile(category)}
                  type="button"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-lg font-bold text-white">
                    +
                  </span>
                  <span className="mt-3 text-sm font-bold text-emerald-950">
                    {FILE_UPLOAD_COPY.fakeUploadButton}
                  </span>
                  <span className="mt-1 text-xs leading-5 text-emerald-800">
                    Frontend demo only. No real upload happens.
                  </span>
                </button>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Selected demo files
                  </p>
                  {selectedFiles.length === 0 ? (
                    <p className="mt-3 text-sm text-slate-500">
                      {FILE_UPLOAD_COPY.noFilesSelected}
                    </p>
                  ) : (
                    <ul className="mt-3 grid gap-2">
                      {selectedFiles.map((fileName) => (
                        <li
                          className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2"
                          key={fileName}
                        >
                          <span className="break-all text-sm font-semibold text-slate-800">
                            {fileName}
                          </span>
                          <button
                            className="shrink-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                            onClick={() =>
                              onRemoveDemoFile(category, fileName)
                            }
                            type="button"
                          >
                            {FILE_UPLOAD_COPY.removeFileLabel}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg border border-sky-200 bg-sky-50 p-4">
        <p className="text-sm font-semibold leading-6 text-sky-900">
          {FILE_UPLOAD_COPY.note}
        </p>
      </div>
    </section>
  );
}
