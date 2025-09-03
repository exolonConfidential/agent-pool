"use client";
import { ResponsiveDialong } from "@/components/responsive-dialog";

import { AgentForm } from "./new-agent-form";
import { AgentGetOne } from "../../types";

interface NewAgentDialogProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne
}

export const UpdateAgentDialog = ({ open, onOpenChange ,initialValues}: NewAgentDialogProp) => {
  return (
    <ResponsiveDialong
      title="Update Agent"
      description="Update a created agent"
      open={open}
      onOpenChange={onOpenChange}
    ><div className="px-4 pb-4 md:p-0">
      <AgentForm onCancel={()=> onOpenChange(false)} onSuccess={()=> onOpenChange(false)} initialValues={ initialValues }/>
    </div>
    </ResponsiveDialong>
  );
};
