import { CommandDialog ,CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dispatch, SetStateAction, useEffect } from "react";

interface props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommands = ({ open, setOpen }: props) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  
  return (
     <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find a meeting or agent" />
        <CommandList>
          <CommandItem>
            List
          </CommandItem>
        </CommandList>
      </CommandDialog>
  );
};
