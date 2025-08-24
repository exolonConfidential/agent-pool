import { AgentErrorView, AgentLoadingView, AgentView } from "@/modules/agents/ui/views/agents-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"

const agent_page = () =>{ 
const queryClient = getQueryClient()
void queryClient.prefetchQuery(trpc.agents.getAll.queryOptions())

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentLoadingView />}>
             <ErrorBoundary fallback= {<AgentErrorView />}>
                <AgentView/>
            </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default agent_page