"use client";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
  
}

export const ActiveState = ({
  meetingId,
  
}: Props) => {
  return (
    <div className="bg-white flex flex-col gap-y-8 items-center justify-center px-4 py-5">
      <EmptyState
        title="Meeting is active."
        description="Meeting will end when all partivipants have left"
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center lg:items-center gap-2 w-full">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
