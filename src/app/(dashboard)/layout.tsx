import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar"

interface props {
    children: React.ReactNode
}

const Layout = ({children}: props)=>{
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex items-center justify-center w-screen h-screen bg-muted">
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout