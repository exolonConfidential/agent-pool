import { auth } from "@/lib/auth"
import { filterSearchParams, loadSearchParams } from "@/modules/meetings/params"
import { MeetingsListHeaders } from "@/modules/meetings/ui/components/meetings-list-header"
import { MeetingsErrorView, MeetingsLoadingView, MeetingsVeiw } from "@/modules/meetings/ui/views/meetings-veiw"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { SearchParams } from "nuqs"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface filterPorps {
  searchPrams: Promise<SearchParams>
}

const page = async ({searchPrams}:filterPorps) =>{
    const filters = await loadSearchParams(searchPrams)
    const queryClient = getQueryClient()
    const session = await auth.api.getSession({
            headers: await headers()
        })
    
        if(!session){
           redirect("/auth/sign-in")
        }
    void queryClient.prefetchQuery(trpc.meetings.getAll.queryOptions({
        ...filters
    }))
    return (
        <>
        <MeetingsListHeaders/>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsLoadingView/>}>
                <ErrorBoundary fallback={<MeetingsErrorView/>}>
                    <MeetingsVeiw />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
        </>
    )
}

export default page