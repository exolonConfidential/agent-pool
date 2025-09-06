"use client"

import { Input } from "@/components/ui/input";

import { SearchIcon } from "lucide-react";

interface props {
    filter: { search: string},
    setFilter: (value: string) => void
}


export const SearchFilter = ({filter, setFilter}: props) =>{
    

    return (
        <div className="relative">
            <Input
                placeholder="Filter by name"
                className="h-9 w-[200px] bg-white pl-7"
                value={filter.search}
                onChange={(e) => setFilter(e.target.value)}
            />
            <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
    )
}