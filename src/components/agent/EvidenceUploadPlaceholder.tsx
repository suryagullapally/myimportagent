"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import type { AgentEvidenceCategory, AgentEvidenceFiles } from "@/types";

type EvidenceUploadPlaceholderProps = Readonly<{
  videoEvidenceRequested: boolean;
}>;

const evidenceSections: readonly {
  category: AgentEvidenceCategory;
  title: string;
  description: string;
  demoFileName: string;
}[] = [
  {
    category: "locationPhotos",
    title: "Location photos",
    description: "Exterior, signage, entrance, or address evidence.",
    demoFileName: "location-photo-demo.jpg",
  },
  {
    category: "productPhotos",
    title: "Product photos",
    description: "Product availability, visible condition, labels, and quantity.",
    demoFileName: "product-photo-demo.jpg",
  },
  {
    category: "packingPhotos",
    title: "Packing photos",
    description: "Packing quality, labels, carton condition, and box count.",
    demoFileName: "packing-photo-demo.jpg",
  },
  {
    category: "dispatchPhotos",
    title: "Dispatch handover photos",
    description: "Dispatch area, handover evidence, and final cartons.",
    demoFileName: "dispatch-handover-demo.jpg",
  },
  {
    category: "videoEvidence",
    title: "Video evidence",
    description: "Short video clip if requested by the customer.",
    demoFileName: "verification-video-demo.mp4",
  },
];

const emptyFiles: AgentEvidenceFiles = {
  dispatchPhotos: [],
  locationPhotos: [],
  packingPhotos: [],
  productPhotos: [],
  videoEvidence: [],
};

export function EvidenceUploadPlaceholder({
  videoEvidenceRequested,
}: EvidenceUploadPlaceholderProps) {
  const [selectedFiles, setSelectedFiles] =
    useState<AgentEvidenceFiles>(emptyFiles);

  const visibleSections = evidenceSections.filter(
    (section) => section.category !== "videoEvidence" || videoEvidenceRequested,
  );

  function addDemoFile(category: AgentEvidenceCategory, demoFileName: string) {
    // Future secure upload integration:
    // POST /api/agent/jobs/{id}/evidence will upload files to backend-managed
    // storage after agent authentication is added.
    setSelectedFiles((currentFiles) => ({
      ...currentFiles,
      [category]: currentFiles[category].includes(demoFileName)
        ? currentFiles[category]
        : [...currentFiles[category], demoFileName],
    }));
  }

  function removeDemoFile(category: AgentEvidenceCategory, fileName: string) {
    setSelectedFiles((currentFiles) => ({
      ...currentFiles,
      [category]: currentFiles[category].filter((file) => file !== fileName),
    }));
  }

  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          Evidence upload placeholder
        </p>
        <h3 className="mt-2 text-2xl font-black text-slate-950">
          Add visit evidence
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Real secure evidence upload will be connected later through the Java
          Spring Boot backend.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {visibleSections.map((section) => (
          <article
            className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4"
            key={section.category}
          >
            <h4 className="text-lg font-bold text-slate-950">{section.title}</h4>
            <p className="mt-1 text-sm text-slate-600">{section.description}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              Frontend demo only
            </p>

            <Button
              className="mt-4 w-full"
              onClick={() =>
                addDemoFile(section.category, section.demoFileName)
              }
              variant="secondary"
            >
              Choose demo file
            </Button>

            <div className="mt-4 space-y-2">
              {selectedFiles[section.category].length > 0 ? (
                selectedFiles[section.category].map((fileName) => (
                  <div
                    className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                    key={fileName}
                  >
                    <span className="break-all font-semibold text-slate-700">
                      {fileName}
                    </span>
                    <button
                      className="font-bold text-rose-700 hover:text-rose-900"
                      onClick={() => removeDemoFile(section.category, fileName)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm font-semibold text-slate-500">
                  No demo files selected.
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
