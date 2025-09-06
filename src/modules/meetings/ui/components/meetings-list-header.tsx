"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { SearchFilter } from "@/components/search-filter";
import { DEFAULT_PAGE } from "@/constants";

import { MeetingsStatusFilter } from "./meetings-status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MeetingsListHeaders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useMeetingsFilter();

  const isFilterModified = !!(filter.search || filter.agentId || filter.status);

  const onClearFilter = () => {
    setFilter({ search: "", page: DEFAULT_PAGE, agentId: "", status: null });
  };
  return (
    <>
      <NewMeetingDialog open={isOpen} onOpenChange={setIsOpen} />
      <div className="w-full flex flex-col gap-y-2 ">
        <div className="py-4 flex items-center justify-between w-full px-4">
          <h1 className="text-xl font-medium">My Meetings</h1>
          <Button className="bg-primary" onClick={() => setIsOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="w-full px-4 md:px-8 flex gap-x-2 ">
            <SearchFilter
              filter={filter}
              setFilter={(value) => setFilter({ search: value })}
            />
            <MeetingsStatusFilter />
            <AgentIdFilter />
            {isFilterModified && (
              <Button variant={"outline"} size={"sm"} onClick={onClearFilter}>
                <XCircleIcon />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
