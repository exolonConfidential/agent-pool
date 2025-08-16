"use client"
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
   DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const isMobile = useIsMobile()

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in");
        },
      },
    });
  };

  if (!data?.user || isPending) {
    return null;
  }

  if(isMobile){
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg p-3 border border-border/10 flex items-center gap-4 bg-white/10 hover:bg-white/15 overflow-hidden">
          <Avatar>
            {data?.user.image ? (
              <AvatarImage src={data.user.image} />
            ) : (
              <GeneratedAvatar
                seed={data.user.name}
                varient="initials"
                className="size-9 mr-3"
              />
            )}
          </Avatar>
          <div className="flex flex-col text-left gap-0.5 overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{data.user.name}</p>
            <p className="text-xs truncate w-full">{data.user.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button className="flex justify-between" variant={"outline"} onClick={()=> {}}>
               Billings
              <CreditCardIcon className="size-4" />
            </Button>
            <Button className="flex justify-between" variant={"outline"} onClick={onLogout}>
               Logout
              <LogOutIcon className="size-4" />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg p-3 border border-border/10 flex items-center gap-4 bg-white/10 hover:bg-white/15 overflow-hidden">
        <Avatar>
          {data?.user.image ? (
            <AvatarImage src={data.user.image} />
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              varient="initials"
              className="size-9 mr-3"
            />
          )}
        </Avatar>
        <div className="flex flex-col text-left gap-0.5 overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="left" className="w-72">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="font-medium truncate">{data.user.name}</span>
          <span className="text-sm font-normal truncate text-muted-foreground">
            {data.user.email}
          </span>
        </DropdownMenuLabel>
     
      <DropdownMenuSeparator />
      <DropdownMenuItem className="flex items-center justify-between">
        Billings
        <CreditCardIcon className="size-4" />
      </DropdownMenuItem>
      <DropdownMenuItem className="flex items-center justify-between" onClick={onLogout}>
        LogOut
        <LogOutIcon className="size-4" />
      </DropdownMenuItem>
       </DropdownMenuContent>
    </DropdownMenu>
  );
};
