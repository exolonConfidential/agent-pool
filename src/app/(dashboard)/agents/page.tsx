import {
  AgentErrorView,
  AgentLoadingView,
  AgentView,
} from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { AgentListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const agent_page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.agents.getAll.queryOptions());

  return (
    <>
      <AgentListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentLoadingView />}>
          <ErrorBoundary fallback={<AgentErrorView />}>
            <AgentView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default agent_page;

/**
 * AgentPage explanation:
 *
 * 1. Data Prefetching (Server-side):
 *    - We create a queryClient and prefetch queries using trpc.agents.getAll.queryOptions().
 *    - `dehydrate(queryClient)` turns the query cache into a JSON object (dehydrated state).
 *      - **Dehydration** = converting the server-side query cache into a plain JS object (JSON) to send to the client.
 *    - This state is passed to <HydrationBoundary /> so the client starts with data already cached.
 *
 * 2. HydrationBoundary:
 *    - **Hydration** = restoring the dehydrated JSON cache back into the client-side queryClient.
 *    - Prevents double-fetching and removes flicker/loading spinners on first render.
 *
 * 3. Suspense:
 *    - Catches Promises thrown by components (e.g., when data is still loading).
 *    - While the Promise is unresolved, Suspense shows the fallback UI (<AgentLoadingView />).
 *    - Once the Promise resolves, control is handed back to the component (AgentView).
 *
 * 4. ErrorBoundary:
 *    - Catches errors thrown by child components (e.g., network errors, render crashes).
 *    - Instead of crashing the whole app, it shows the fallback UI (<AgentErrorView />).
 *    - Think of it as similar to Suspense but for errors instead of Promises.
 *
 * 5. Combined Flow:
 *    - If data is still loading → Suspense shows <AgentLoadingView />.
 *    - If an error occurs → ErrorBoundary shows <AgentErrorView />.
 *    - If data loads successfully → <AgentView /> renders with cached data.
 *
 * Summary:
 * - **Dehydration** → serialize server-side query cache to JSON.
 * - **Hydration** → restore the JSON cache into client-side queryClient.
 * - HydrationBoundary → rehydrate prefetched query cache (SSR → Client).
 * - Suspense → handles loading states (Promises).
 * - ErrorBoundary → handles error states (Errors).
 */
