"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, ChartNoAxesGantt, LucideIcon, Mail } from "lucide-react";

type Sidebar = {
  href: string;
  title: string;
  icon?: LucideIcon;
};

const sidebar: Sidebar[] = [
  {
    href: "/dashboard/settings",
    title: "Tổng quát",
    icon: ChartNoAxesGantt,
  },
  {
    href: "/dashboard/settings/email",
    title: "Email",
    icon: Mail,
  },
  {
    href: "/dashboard/settings/notification",
    title: "Thông báo",
    icon: Bell,
  },
];

export default function SidebarSettings() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-3 w-[180px] border-r-[1px] pr-6 h-[70vh]">
      {sidebar.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <Link href={item.href} key={index}>
            <Button
              className="w-full flex items-center justify-start"
              variant={isActive ? "primary" : "ghost"}
            >
              {item.icon && <item.icon className="h-4 w-4 mx-2" />}
              <p className="text-[0.825rem]">{item.title}</p>
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
