"use client";

import { columns } from "@/components/column";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getAll.queryOptions());

  return (
    <div className="w-full py-4 px-4 flex-1 flex flex-col pb-4">
      <DataTable data={data} columns={columns} />
      {data.length === 0 && (
        <EmptyState
          title="Create your first Agent"
          description="Create an agent to join your meetings. Each agent will follow you instructions
           and can interact with the participants during the call."
        />
      )}
    </div>
  );
};

export const AgentLoadingView = () => {
  return (
    <LoadingState
      title="Loading agents"
      description="This may take few seconds"
    />
  );
};

export const AgentErrorView = () => {
  return (
    <ErrorState title="Error loading agents" description="Try after sometime" />
  );
};
