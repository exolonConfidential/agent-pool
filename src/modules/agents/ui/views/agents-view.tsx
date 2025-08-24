"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";


export const AgentView = () => {
    const trpc  = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getAll.queryOptions())


    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}

export const AgentLoadingView = ()=>{
    return (
        <LoadingState title="Loading agents" description="This may take few seconds"/>
    )
}

export const AgentErrorView = ()=>{
    return (
        <ErrorState title="Error loading agents" description="Try after sometime" />
    )
}