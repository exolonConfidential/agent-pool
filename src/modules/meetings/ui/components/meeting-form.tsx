import { useTRPC } from "@/trpc/client";
import { MeetingsGetOne } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { meetingsInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useState } from "react";
import { CommandSelect } from "./command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingsGetOne;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const [search, setSearch] = useState("");
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const agents = useQuery(
    trpc.agents.getAll.queryOptions({
      pageSize: 100,
      search: search,
    })
  );
  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getAll.queryOptions({})
        );

        onSuccess?.(data.id);
        toast.success(`Created Meeting ${data.name}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async (success) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getAll.queryOptions({})
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
        toast.success(`Updated Meeting ${success.name}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ id: initialValues.id, ...values });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
    <NewAgentDialog open = {openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Math Consultation" onChange={(e)=> field.onChange(e.target.value)} value={field.value}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="agentId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <CommandSelect
                  options={(agents.data?.items ?? []).map((agent) => ({
                    id: agent.id,
                    value: agent.id,
                    children: (
                      <div className="flex items-center gap-x-2">
                        <GeneratedAvatar
                          seed={agent.name}
                          varient="botttsNeutral"
                        />
                        {agent.name}
                      </div>
                    ),
                  }))}
                  onSelect={field.onChange}
                  value={field.value}
                  onSearch={setSearch}
                  placeholder="Select an Agent"
                />
              </FormControl>
              <FormDescription>
                Not found what you are looking for?
                <Button type="button" className="text-primary hover:underline p-1" variant={"link"} onClick={() => setOpenNewAgentDialog(true)}> 
                  Create new Agent
                </Button>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              disabled={isPending}
              type="button"
              onClick={onCancel}
              variant={"outline"}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  </>
  );
};
