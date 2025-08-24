"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftIcon, PanelLeftCloseIcon, Search } from "lucide-react"
import { useState } from "react"
import { DashboardCommands } from "./dashboard-commands"



export const DashboardNavbar = () =>{
    const { state, toggleSidebar, isMobile } = useSidebar()
    const [commandOpen, setCommandOpen] = useState(false)
    

    return (
        <>
            <DashboardCommands open={commandOpen} setOpen={setCommandOpen} />
            <nav className="flex items-center px-4 py-3 gap-x-2 border-b bg-background">
                <Button className="size-9" variant={"outline"} onClick={toggleSidebar}>
                    {(state === "collapsed" || isMobile) ? <PanelLeftIcon className="size-4"/> : <PanelLeftCloseIcon className="size-4"/>}
                </Button>
                <Button onClick={()=> setCommandOpen((open) => !open)} className="h-9 w-[240px] text-muted-foreground hoever:text-muted-foreground justify-start font-normal" variant="outline">
                    <Search/>
                    Search...
                    <kbd className="h-5 pointer-events-none ml-auto inline-flex items-center gap-1 px-1 bg-muted rounded border select-none text-[15px] font-mono font-medium text-muted-foreground">
                        <span className="text-xs">
                            &#8984;
                        </span>K
                    </kbd>
                </Button>
            </nav>
        </>
    )
}