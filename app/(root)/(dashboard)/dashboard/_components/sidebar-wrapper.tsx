"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  MessagesSquare,
  ChartNoAxesColumnIncreasing,
  ShoppingCart,
  Trash2,
  Package,
  ClipboardEdit,
  Users2,
} from "lucide-react";
import { Nav } from "./nav";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "./header";
import useClient from "@/hooks/use-client";

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
              title: "Đơn hàng",
              label: "9",
              path: "/dashboard/orders",
              icon: ShoppingCart,
            },
            {
              title: "Sản phẩm",
              label: "100",
              path: "/dashboard/products",
              icon: Package,
            },
            {
              title: "Danh mục",
              label: "6",
              path: "/dashboard/categories",
              icon: ClipboardEdit,
            },
            {
              title: "Thùng rác",
              label: "10",
              path: "/dashboard/product-deleted",
              icon: Trash2,
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Khách hàng",
              label: "972",
              path: "",
              icon: Users2,
            },
            {
              title: "Tin nhắn",
              label: "128",
              icon: MessagesSquare,
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
        <div className="bg-zinc-50 dark:bg-primary-foreground h-full">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
