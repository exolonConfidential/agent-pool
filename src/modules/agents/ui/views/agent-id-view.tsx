"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import {  useSuspenseQuery } from "@tanstack/react-query"
import { AgentsIdHeader } from "../components/agent-id-header"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { Badge } from "@/components/ui/badge"
import { VideoIcon } from "lucide-react"

interface AgentIdViewProp {
    agentId: string
}

export const AgentIdView =  ({ agentId }: AgentIdViewProp) =>{
    const trpc = useTRPC()
    const {data} = useSuspenseQuery( trpc.agents.getOne.queryOptions({id: agentId}))
    return (
        <>
            <AgentsIdHeader agentId={agentId} agentName={data.name} onEdit={() => {}} onRemove={()=> {}}/>
            <div className="w-full py-4 px-4 md:px-8 flex-1 flex flex-col gap-y-6">
              <div className="rounded-lg bg-white border">
                <div className="flex flex-col px-4 py-5 gap-y-5 col-span-5 ">
                  <div className="flex gap-x-3 items-center">
                    <GeneratedAvatar seed={data.name} varient="botttsNeutral" className="size-10"/>
                    <h1 className="text-2xl font-medium">{data.name}</h1>
                  </div>
                  <Badge className="flex items-center gap-x-2 [&>svg]:size-4" variant={"outline"}>
                    <VideoIcon  className="text-blue-700"/>
                    5 {/** {data.meetingCount} {data.meetingCount === 1 ? "meeting" : meetings} */}Meetings
                  </Badge>
                  <div className="flex flex-col gap-y-4">
                    <p className="text-lg font-medium">Instructions</p>
                    <p className="text-neutral-800">{data.instructions}</p>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}


export const AgentIdLoadingView = () => {
  return (
    <LoadingState
      title="Loading agent"
      description="This may take few seconds"
    />
  );
};

export const AgentIdErrorView = () => {
  return (
    <ErrorState title="Error loading agent" description="Try again after sometime" />
  );
};
