"use client";

import Link from "next/link";
import {
  ChartPie,
  ChevronsUpDown,
  Database,
  LogOutIcon,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/shared/view/ui/sidebar";
import { cn } from "~/shared/view/ui/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/shared/view/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/shared/view/ui/dropdown-menu";
import { Viewer } from "~/domain/viewer";
import { LogoutModal } from "~/core/auth/view/logout.modal";
import { useViewer } from "~/core/auth/selectors";
import { Option } from "~/shared/types/option";

export function ApplicationSidebar() {
  const viewer = useViewer();
  const pathname = usePathname();
  const menuItems = getMenuItems({ bucketsCount: 2 });

  return (
    <Sidebar className="mt-[52px] !max-h-[calc(100dvh-53px)] !h-[calc(100dvh-53px)] !border-0 relative">
      <SidebarContent>
        <SidebarGroup className="flex flex-auto">
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "transition-colors duration-150",
                        !isActive && "hover:bg-primary/5 active:bg-primary/5",
                        isActive && "bg-primary/10 hover:bg-primary/10",
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className={cn("text-primary/90")} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.count && (
                      <SidebarMenuBadge>{item.count}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <ViewerPreview viewer={viewer} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="min-w-56 z-50"
                sideOffset={7}
                onEscapeKeyDown={(e) => e.preventDefault()}
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Terms of use</DropdownMenuItem>
                  <LogoutModal
                    triggerSlot={
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <LogOutIcon />
                        Log Out
                      </DropdownMenuItem>
                    }
                  />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function getMenuItems(params: { bucketsCount: number }) {
  const items = [
    {
      title: "Overview",
      url: "/dashboard",
      icon: ChartPie,
    },
    {
      title: "Buckets",
      url: "/dashboard/buckets",
      icon: Database,
      count: params.bucketsCount,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  return items;
}

function ViewerPreview(props: { viewer: Option<Viewer> }) {
  const initials = props.viewer?.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  if (!props.viewer) return;
  return (
    <div className="flex w-full on-focus cursor-pointer items-center justify-between rounded-sm py-1 transition hover:bg-gray-500/10 lg:px-2">
      <Avatar className="mr-3">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="mr-1 hidden w-full flex-col items-start justify-start lg:flex">
        <span className="w-fit max-w-[142px] truncate text-sm">
          {props.viewer.name}
        </span>
        <span className="w-fit max-w-[142px] truncate text-xs text-gray-500">
          {props.viewer.sessionEmail}
        </span>
      </div>
      <ChevronsUpDown className="hidden h-4 min-h-4 w-4 min-w-4 lg:block" />
    </div>
  );
}
