"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MeetingIdHeaderView } from "../components/meeting-id-header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/useConfirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";

interface prop {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: prop) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [UpdateMeetingOpen, setUpdateMeetingOpen] = useState(false);
  const [ConfirmDialog, confirmRemove] = useConfirm({
    title: "Are you sure ?",
    description: "Following action will remove this meeting",
  });
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async (success) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getAll.queryOptions({})
        );

        router.push("/meetings");
        toast.success(`Deleted Agent ${success.name}`);
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  );

  

  const handleRemove = async () =>{
    const ok = await confirmRemove();
    if(!ok) return
    await removeMeeting.mutateAsync({id: meetingId})
  }

  return (
    <>
      <ConfirmDialog />
      <UpdateMeetingDialog
        open={UpdateMeetingOpen}
        onOpenChange={setUpdateMeetingOpen}
        initialValues={data}
      />

      <MeetingIdHeaderView
        meetingId={meetingId}
        meetingName={data.name}
        onEdit={() => setUpdateMeetingOpen(true)}
        onRemove={handleRemove}
      />
      <div className="w-full py-4 px-4 md:px-8 flex-1 flex flex-col gap-y-6">
        {JSON.stringify(data, null, 2)}
      </div>
    </>
  );
};

export const MeetingIdLoadingView = () => {
  return (
    <LoadingState
      title="Loading agent"
      description="This may take few seconds"
    />
  );
};

export const MeetingIdErrorView = () => {
  return (
    <ErrorState
      title="Error loading agent"
      description="Try again after sometime"
    />
  );
};
