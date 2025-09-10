"use client";

import { EmptyState } from "@/components/empty-state";




export const CancelledState = () => {
  return (
    <div className="bg-white flex flex-col gap-y-8 items-center justify-center px-4 py-5">
      <EmptyState
        title="Meeting is cancelled."
        description="This meeting was cancelled"
        image="/cancelled.svg"
      />
    </div>
  );
};
