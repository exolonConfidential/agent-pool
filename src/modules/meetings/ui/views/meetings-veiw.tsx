"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsVeiw = () =>{
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getAll.queryOptions({}));
  return (
    <div>
        {JSON.stringify(data, null, 2)}
    </div>
  )   
}

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
    <ErrorState title="Error loading meetings" description="Try after sometime" />
  );
};
