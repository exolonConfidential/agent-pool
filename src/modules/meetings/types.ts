import { inferRouterOutputs } from "@trpc/server"

import { AppRouter } from "@/trpc/routers/_app"


export type MeetingsGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"] 