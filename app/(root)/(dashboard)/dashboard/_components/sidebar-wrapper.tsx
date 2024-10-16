"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  MessagesSquare,
  ChartNoAxesColumnIncreasing,
  ShoppingCart,
  Trash2,
  Package,
  ClipboardEdit,
  Users2,
  PanelTopOpen,
  Settings,
  TicketCheck,
} from "lucide-react";
import { Nav } from "./nav";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "./header";
import useClient from "@/hooks/use-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAnalytic } from "@/hooks/use-analytic";

type Props = {
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children?: React.ReactNode;
};

export const SidebarWrapper = ({
  defaultLayout = [10],
  defaultCollapsed = false,
  navCollapsedSize = 4,
  children,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const router = useRouter();

  const { isClient } = useClient();

  const { getAnalytic, analytic } = useAnalytic();

  useEffect(() => {
    getAnalytic();
  }, [getAnalytic]);

  if (!isClient) return null;

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onResize={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <div
          className={cn(
            "flex h-[52px] items-center justify-center mb-4",
            isCollapsed ? "h-[52px]" : "px-2"
          )}
        >
          <Image
            width={30}
            height={30}
            src="/logo.png"
            alt="logo"
            onClick={() => router.push("/")}
          />
        </div>
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Tổng quát",
              icon: ChartNoAxesColumnIncreasing,
              path: "/dashboard",
            },
            {
              title: "Quảng cáo",
              icon: PanelTopOpen,
              path: "/dashboard/billboards",
            },
            {
              title: "Đơn hàng",
              label: `${analytic?.orders}`,
              path: "/dashboard/orders",
              icon: ShoppingCart,
            },
            {
              title: "Sản phẩm",
              label: `${analytic?.active}`,
              path: "/dashboard/products",
              icon: Package,
            },
            {
              title: "Danh mục",
              label: `${analytic?.categories}`,
              path: "/dashboard/categories",
              icon: ClipboardEdit,
            },
            {
              title: "Mã giảm giá",
              path: "/dashboard/tickets",
              icon: TicketCheck,
            },
            {
              title: "Thùng rác",
              label: `${analytic?.archive}`,
              path: "/dashboard/trash",
              icon: Trash2,
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Tài khoản",
              label: `${analytic?.customers}`,
              path: "/dashboard/accounts",
              icon: Users2,
            },
            {
              title: "Tin nhắn",
              icon: MessagesSquare,
              path: "",
            },
            {
              title: "Cài đặt",
              icon: Settings,
              path: "/dashboard/settings",
            },
          ]}
        />
        <Separator />

        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Gmail",
              image: "/gmail.png",
              path: "/dashboard/mail",
            },
            {
              title: "Momo",
              image: "/momo-icon.ico",
              path: "/dashboard/momo",
            },
            {
              title: "Cloudinary",
              image: "/cloudinary.png",
              path: "/dashboard/cloudinary",
            },
          ]}
        />

        <Separator />

        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Gemini",
              image: "/gemini.svg",
              path: "/dashboard/gemini",
            },
            {
              title: "ChatGPT",
              image: "/chat-gpt.svg",
              path: "",
            },
          ]}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={defaultLayout[1]}
        minSize={60}
        className="text-sm font-base leading-none scroll-m-20"
      >
        <Header />
        <ScrollArea className="bg-zinc-100 dark:bg-primary-foreground h-full">
          {children}
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
