"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon} from "lucide-react";
import { useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";
import { SearchFilter } from "./agents-search-filter";
import { useAgentsFilter } from "../../hooks/use-agents-filters";
import { DEFAULT_PAGE } from "@/constants";

export const AgentListHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useAgentsFilter()
  const isFilterModified = !!filter.search
  
  const onClearFilter = () =>{
    setFilter({
      search: "",
      page: DEFAULT_PAGE
    })
  }

  return (
    <>
      <NewAgentDialog open={isOpen} onOpenChange={setIsOpen} />
      <div className="w-full flex flex-col gap-y-2 ">
        <div className="py-4 flex items-center justify-between w-full px-4">
          <h1 className="text-xl font-medium">My Agents</h1>
          <Button className="bg-primary" onClick={() => setIsOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className="w-full px-4 md:px-8 flex gap-x-2 ">
          <SearchFilter/>
          {isFilterModified && (
            <Button variant={"outline"} size={"sm"} onClick={onClearFilter}>
              <XCircleIcon/>
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
