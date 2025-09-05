"use client";

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/column";
import { EmptyState } from "@/components/empty-state";

export const MeetingsVeiw = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getAll.queryOptions({}));
  return (
    <div className="w-full py-4 px-4 md:px-8 flex-1 flex flex-col pb-4 gap-y-6">
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and intereact with participants in real time."
        />
      )}
    </div>
  );
};

export const MeetingsLoadingView = () => {
  return (
    <LoadingState
      title="Loading meetings"
      description="This may take few seconds"
    />
  );
};

export const MeetingsErrorView = () => {
  return (
    <ErrorState
      title="Error loading meetings"
      description="Try after sometime"
    />
  );
};
