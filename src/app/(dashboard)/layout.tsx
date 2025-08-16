import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar"
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar"

interface props {
    children: React.ReactNode
}

const Layout = ({children}: props)=>{
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="w-screen h-screen bg-muted">
                <DashboardNavbar/>
                <div className="flex items-center justify-center w-full h-full">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}

export default Layout