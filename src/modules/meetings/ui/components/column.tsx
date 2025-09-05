"use client";

import { MeetingsGetManyItems } from "@/modules/meetings/types";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { GeneratedAvatar } from "../../../../components/generated-avatar";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
} from "lucide-react";
import humanizeDuration from "humanize-duration";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// type of columns should be array of rows and the MeetingsGetManyItems is of type array of items therefore [number] is used to get type of single item(row)
const formatDuration = (seconds: number) => {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
};

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
  processing: "bg-gray-300/20 text-gray-800 border-gray-800/5",
};

export const columns: ColumnDef<MeetingsGetManyItems[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">{row.original.name}</span>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="text-muted-foreground size-3" />
            <GeneratedAvatar
              varient="botttsNeutral"
              seed={row.original.agent.name}
              className="size-4"
            />
          </div>
          <span className="text-muted-foreground truncate max-w-[200px] text-sm capitalize">
            {row.original.agent.name}
          </span>
          <span className="text-muted-foreground text-sm">
            {row.original.startedAt
              ? format(row.original.startedAt, "MMM d")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      /**
       * we can also access the values of an object like obName[variable/ key/ dynamicaly computed varialbe]
       * typeof "someVar" gives the type of "someVar" like -> { upcoming: string, active: string, inactive: string}
       * keyof converts this type into union of keys -> upcoming | active | inactive
       * now the whole [row.original.status as ...] syas that -> "Treat this status value as if it’s guaranteed to
       * be one of the keys of statusIconMap."
       */
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];

      return (
        <Badge
          className={cn(
            "capitalize [&>svg]:size-4 text-muted-foreground",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
          variant={"outline"}
        >
          <Icon
            className={cn(
              row.original.status === "processing" && "animate-spin"
            )}
          />
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className="capitalize [&>svg]:size-4 text-muted-foreground "
      >
        <ClockFadingIcon className="text-blue-700" />
        {row.original.duration
          ? formatDuration(row.original.duration)
          : "No duration"}
      </Badge>
    ),
  },
];
