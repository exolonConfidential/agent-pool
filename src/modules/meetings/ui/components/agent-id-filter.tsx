"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { CommandSelect } from "./command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";

export const AgentIdFilter = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useMeetingsFilter();
  const trpc = useTRPC();
  const agents = useQuery(trpc.agents.getAll.queryOptions({ search, pageSize: 100 }));
  return (
    <CommandSelect
      options={(agents.data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              seed={agent.name}
              varient="botttsNeutral"
              className="size-5"
            />
            {agent.name}
          </div>
        ),
      }))}
      value={filter.agentId}
      onSearch={(value) => setSearch(value)}
      onSelect={(value) => setFilter({ agentId: value })}
      placeholder="Select an Agent"
    />
  );
};
