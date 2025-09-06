"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { MeetingStatus } from "../../types";


export const MeetingsStatusFilter = () => {
  const [filter, setFilter] = useMeetingsFilter();

  return (
    <>
      {
        // NOTE: Why we use `value={filter.status || ""}` instead of just `filter.status`
        //
        // - `MeetingStatus` is a string enum, so each value (e.g. "active") is valid for Select's `value` (which expects a string).
        // - However, `filter.status` can also be `null` or `undefined` (from nuqs when no query param is set).
        // - Radix Select (used by shadcn) does not accept `null` as a controlled value.
        // - Passing `""` tells Radix that nothing is selected, which makes the placeholder show correctly.
        // - Therefore, we normalize `null`/`undefined` to an empty string with `|| ""`.
      }
      <Select
        onValueChange={(value) => setFilter({ status: value as MeetingStatus})}
        value={filter.status || ""}
      >
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Selct a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.values(MeetingStatus).map((value)=>(
                <SelectItem value={value} key={value}>
                    {value.charAt(0).toUpperCase()+value.slice(1)}
                </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
