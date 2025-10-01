import { inferRouterOutputs } from "@trpc/server"

import { AppRouter } from "@/trpc/routers/_app"


export type MeetingsGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"] 
export type MeetingsGetManyItems = inferRouterOutputs<AppRouter>["meetings"]["getAll"]["items"];

export enum MeetingStatus  {
    Upcoming = "upcoming",
    Active = "active",
    Processing=  "processing",
    Cancelled = "cancelled",
    Completed = "completed"
}


export type StreamTranscriptItem = {
    speaker_id: string;
    type: string;
    text: string;
    start_ts: number;
    stop_ts: number
}