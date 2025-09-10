"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { CallProvider } from "../components/call-provider"

interface Prop {
    meetingId: string
}

export const CallView = ({meetingId}: Prop) =>{
    const trpc = useTRPC()
    const {data} = useSuspenseQuery(trpc.meetings.getOne.queryOptions({id:meetingId}))

    if(data.status==="completed"){
      return(
        <div  className="flex h-screen items-center justify-center">
          <ErrorState 
            title="Meeting ahs ended"
            description="You can no longer join this meeting"
            />
        </div>
      )
    }

    return (
        <CallProvider meetingId={meetingId} meetingName={data.name}/>
    )
}


export const CallLoadingView = () => {
  return (
    <LoadingState
      title="Loading agent"
      description="This may take few seconds"
    />
  );
};

export const CallErrorView = () => {
  return (
    <ErrorState
      title="Error loading agent"
      description="Try again after sometime"
    />
  );
};