"use client";

import { EmptyState } from "@/components/empty-state";




export const ProcessingState = () => {
  return (
    <div className="flex felx-col gap-y-8 items-center justify-center px-4 py-5">
      <EmptyState
        title="Meeting completed."
        description="This meeting was completed, a summary will appear soon"
        image="/processing.svg"
      />
    </div>
  );
};
