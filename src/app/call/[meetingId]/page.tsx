import { auth } from "@/lib/auth";
import { CallErrorView, CallLoadingView, CallView } from "@/modules/call/ui/views/call-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";


interface Prop {
    params: Promise<{meetingId: string}>
}


const callPage = async ({params}:Prop) =>{
    const { meetingId } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        redirect("/auth/sign-in");
    }
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id: meetingId}))

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback= {<CallLoadingView />}>
                <ErrorBoundary fallback= {<CallErrorView />}>
                    <CallView meetingId={meetingId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default callPage