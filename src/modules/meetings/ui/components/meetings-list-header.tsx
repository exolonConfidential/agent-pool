"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon} from "lucide-react";
import { useState } from "react";
import { NewMeetingDialog } from "./new-meeting-dialog";


export const MeetingsListHeaders = () => {
 const [isOpen, setIsOpen] = useState(false);
  
  

  return (
    <>
      <NewMeetingDialog open={isOpen} onOpenChange={setIsOpen}/>
      <div className="w-full flex flex-col gap-y-2 ">
        <div className="py-4 flex items-center justify-between w-full px-4">
          <h1 className="text-xl font-medium">My Meetings</h1>
          <Button className="bg-primary" onClick={() => setIsOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <div className="w-full px-4 md:px-8 flex gap-x-2 ">
          todo: search filter
        </div>
      </div>
    </>
  );
};
