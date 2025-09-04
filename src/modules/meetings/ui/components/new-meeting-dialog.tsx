"use client";
import { ResponsiveDialong } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";



interface NewAgentDialogProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({ open, onOpenChange }: NewAgentDialogProp) => {
  const router = useRouter()
  return (
    <ResponsiveDialong
      title="New Meeting"
      description="Create a new Meeting"
      open={open}
      onOpenChange={onOpenChange}
    ><div className="px-4 pb-4 md:p-0">
      <MeetingForm onSuccess={(id) => {onOpenChange(false); router.push(`/meetings/${id}`) }} onCancel={() => onOpenChange(false)} />
    </div>
    </ResponsiveDialong>
  );
};
