"use client";
import { ResponsiveDialong } from "@/components/responsive-dialog";
import { useState } from "react";
import { AgentForm } from "./new-agent-form";

interface NewAgentDialogProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProp) => {
  return (
    <ResponsiveDialong
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    ><div className="px-4 pb-4 md:p-0">
      <AgentForm onCancel={()=> onOpenChange(false)} onSuccess={()=> onOpenChange(false)}/>
    </div>
    </ResponsiveDialong>
  );
};
