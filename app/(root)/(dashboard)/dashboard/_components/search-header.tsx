"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

type Props = {
  data: {
    label: string;
    type: "product" | "order";
    data:
      | {
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
};

export const SearchHeader = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const router = useRouter();

  const onClick = ({ id, type }: { id: string; type: "order" | "product" }) => {
    setOpen(false);

    if (type === "order") {
      return router.push(`/dashboard/orders/${id}`);
    }

    if (type === "product") {
      return router.push(`/dashboard/products/${id}`);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group p-2 rounded-md border flex items-center gap-x-2 w-[300px] hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <span className="font-medium text-[12px] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Tìm kiếm
        </span>
        <kbd className="pointer-events-auto inline-flex h-5 select-none items-center border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs ">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Tìm kiếm tất cả sản phẩm và đơn hàng" />
        <CommandList>
          <CommandEmpty>Không tìm thấy nội dung!</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                    >
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </Fragment>
  );
};
