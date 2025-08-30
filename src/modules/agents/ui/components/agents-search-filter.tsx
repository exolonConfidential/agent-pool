"use client"

import { Input } from "@/components/ui/input";
import { useAgentsFilter } from "../../hooks/use-agents-filters"
import { SearchIcon } from "lucide-react";



export const SearchFilter = () =>{
    const [filter, setFilter] = useAgentsFilter();

    return (
        <div className="relative">
            <Input
                placeholder="Filter by name"
                className="h-9 w-[200px] bg-white pl-7"
                value={filter.search}
                onChange={(e) => setFilter({search: e.target.value})}
            />
            <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
    )
}