"use client";

import { ChartPie, Inbox, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export function ApplicationSidebar() {
  const items = getMenuItems({ bucketsCount: 2 });
  return (
    <Sidebar collapsible="icon" className="mt-[52px] !border-0">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.count && (
                    <SidebarMenuBadge>{item.count}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
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
      icon: Inbox,
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
