"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";

export const AgentListHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <NewAgentDialog open={isOpen} onOpenChange={setIsOpen} />
      <div className="py-4 flex items-center justify-between w-full px-4 ">
        <h1 className="text-xl font-medium">My Agents</h1>
        <Button className="bg-primary" onClick={() => setIsOpen(true)}>
          <PlusIcon />
          New Agent
        </Button>
      </div>
    </>
  );
};
