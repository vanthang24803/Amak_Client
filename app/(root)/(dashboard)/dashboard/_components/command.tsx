"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  AppWindowMac,
  ClipboardList,
  Plus,
  SearchIcon,
  Settings,
  ShoppingCart,
  Ticket,
  Trash2,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

// Dữ liệu cho Command Items
const commandData = [
  {
    heading: "Hay dùng",
    items: [
      {
        href: "/dashboard/products",
        label: "Danh sách sản phẩm",
        icon: ShoppingCart,
      },
      {
        href: "/dashboard/orders",
        label: "Danh sách đơn hàng",
        icon: ClipboardList,
      },
      {
        href: "/dashboard/accounts",
        label: "Quản lý tài khoản",
        icon: UsersRound,
      },
      {
        href: "/dashboard/products/new",
        label: "Tạo mới sản phẩm",
        icon: Plus,
      },
      { href: "/dashboard/trash", label: "Thùng rác", icon: Trash2 },
    ],
  },
  {
    heading: "Chức năng",
    items: [
      { href: "/dashboard/categories", label: "Danh mục", icon: AppWindowMac },
      { href: "/dashboard/tickets", label: "Mã giảm giá", icon: Ticket },
      { href: "/dashboard/settings", label: "Cài đặt", icon: Settings },
    ],
  },
  {
    heading: "Dịch vụ",
    items: [
      { href: "/dashboard/mail", label: "Gmail", icon: "/gmail.png" },
      { href: "/dashboard/mail", label: "Google", icon: "/google.svg" },
      { href: "/dashboard/momo", label: "Momo", icon: "/momo-icon.ico" },
      {
        href: "/dashboard/cloudinary",
        label: "Cloudinary",
        icon: "/cloudinary.png",
      },
    ],
  },
  {
    heading: "AI",
    items: [
      { href: "/dashboard/gemini", label: "Gemini", icon: "/gemini.svg" },
      { href: "/dashboard/chatgpt", label: "ChatGPT", icon: "/chat-gpt.svg" },
    ],
  },
];

export const CommandBar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group p-2 rounded-md border flex items-center gap-x-2 w-[300px] hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition"
      >
        <SearchIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <span className="font-medium text-[12px] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Tìm kiếm
        </span>
        <kbd className="pointer-events-auto inline-flex h-5 select-none items-center border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Nhập lệnh hoặc tìm kiếm..." />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center justify-center gap-1">
              <Image src="/box.png" width={100} height={100} alt="box" />
              <span className="text-[13px]">Không tìm thấy yêu cầu</span>
            </div>
          </CommandEmpty>
          {commandData.map((group, index) => (
            <Fragment key={index}>
              <CommandGroup heading={group.heading}>
                {group.items.map((item, idx) => (
                  <CommandItem key={idx}>
                    <Link
                      href={item.href}
                      className="flex items-center"
                      onClick={handleClose}
                    >
                      {typeof item.icon === "string" ? (
                        <Image
                          src={item.icon}
                          alt="icon"
                          width={16}
                          height={16}
                          className="mr-2"
                        />
                      ) : (
                        <item.icon className="mr-2 h-4 w-4" />
                      )}
                      <span className="text-[13px]">{item.label}</span>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
              {index < commandData.length - 1 && <CommandSeparator />}
            </Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </Fragment>
  );
};
