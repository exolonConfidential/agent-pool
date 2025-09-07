"use client";
import { ResponsiveDialong } from "@/components/responsive-dialog";


import { MeetingsGetOne } from "../../types";
import { MeetingForm } from "./meeting-form";

interface UpdateMeetinigDialogProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingsGetOne
}

export const UpdateMeetingDialog = ({ open, onOpenChange ,initialValues}: UpdateMeetinigDialogProp) => {
  return (
    <ResponsiveDialong
      title="Update Meeting"
      description="Update a created meeting"
      open={open}
      onOpenChange={onOpenChange}
    ><div className="px-4 pb-4 md:p-0">
      <MeetingForm onCancel={()=> onOpenChange(false)} onSuccess={()=> onOpenChange(false)} initialValues={ initialValues }/>
    </div>
    </ResponsiveDialong>
  );
};
