import { MeetingsErrorView, MeetingsLoadingView, MeetingsVeiw } from "@/modules/meetings/ui/views/meetings-veiw"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"


const page = () =>{
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.meetings.getAll.queryOptions({}))
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsLoadingView/>}>
                <ErrorBoundary fallback={<MeetingsErrorView/>}>
                    <MeetingsVeiw />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default page