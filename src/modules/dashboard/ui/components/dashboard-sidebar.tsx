"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agent",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];
export const DashboardSidebar = () => {
  const pathName = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex gap-2 items-center px-2 pt-4">
          <Image src="/logo.svg" width={36} height={36} alt="Agent.pool" />
          <p className="text-2xl font-semibold">Agent.pool</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-25 text-[#5D6B68]" />
      </div>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {firstSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B6B]/10 from-sidebar-accent from-[5%] via-sidebar/50 via-[30%] to-sidebar",
                    pathName === item.href && "bg-linear-to-r/oklch"
                  )}
                  isActive={pathName === item.href}
                >
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <div className="px-4 py-2">
          <Separator className="opacity-25 text-[#5D6B68]" />
        </div>
        <SidebarGroupContent>
          <SidebarMenu>
            {secondSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B6B]/10 from-sidebar-accent from-[5%] via-sidebar/50 via-[30%] to-sidebar",
                    pathName === item.href && "bg-linear-to-r/oklch"
                  )}
                  isActive={pathName === item.href}
                >
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
