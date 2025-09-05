"use client"

import { AgentGetOne } from "@/modules/agents/types"
import { ColumnDef } from "@tanstack/react-table"
import { GeneratedAvatar } from "../../../../components/generated-avatar"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"
import { Badge } from "../../../../components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: (({row})=> (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar varient="botttsNeutral" seed={row.original.name} className="size-6"/>
          <div className="font-semibold capitalize">
            {row.original.name}
          </div>
        </div>
        <div className="flex items-center gap-x-1.5">
          <CornerDownRightIcon className="text-muted-foreground size-3"/>
          <span className="text-muted-foreground truncate max-w-[200px] text-sm capitalize">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ))
  },
  // {
  //   accessorFn: "meetingCount",
  //   header: "Meetings Count",
  //   cell: (({row})=>(
  //     <Badge className="flex items-center gap-x-2 [&>svg]:size-4 p-1" variant={'outline'}>
  //       <VideoIcon className="text-primary" />
  //       {row.original.meetingCount} {row.original.meetingCount === 1 ? "meeting" : "meetings"}
  //     </Badge>
  //   ))
  // }
]