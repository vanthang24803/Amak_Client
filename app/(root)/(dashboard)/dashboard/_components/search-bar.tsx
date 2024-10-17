"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "@/types/search";
import { Loader, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const context = useDebounce(search);

  const { data, isLoading } = useSWR<Search>(
    context ? `/Analytic/Search?Name=${context}` : null
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
        setSearch("");
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleToggle = () => {
    setOpen(!open);
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={handleToggle}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group p-2 rounded-md border flex items-center gap-x-2 w-[300px] hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition"
          onClick={handleToggle}
        >
          <SearchIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <span className="font-medium text-[12px] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
            Tìm kiếm sản phẩm và đơn hàng
          </span>
          <kbd className="pointer-events-auto inline-flex h-5 select-none items-center border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <DialogHeader>
          <div className="flex items-center border-b px-3">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-11 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-[13px]"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo tên sản phẩm và đơn hàng"
            />
          </div>
        </DialogHeader>
        <Command>
          <CommandList className="pb-4">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              <Fragment>
                {data ? (
                  <Fragment>
                    {data.products.length > 0 && (
                      <CommandGroup heading="Sản phẩm">
                        {data.products.map((product) => (
                          <CommandItem key={product.id}>
                            <Link
                              onClick={handleToggle}
                              href={`/dashboard/products/${product.id}`}
                              className="text-[12px]"
                            >
                              {product.name}
                            </Link>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                    {data.orders.length > 0 && (
                      <Fragment>
                        <CommandSeparator />
                        <CommandGroup heading="Đơn hàng">
                          {data.orders.map((order) => (
                            <CommandItem key={order.id}>
                              <Link
                                onClick={handleToggle}
                                href={`/dashboard/orders/${order.id}`}
                                className="flex flex-col"
                              >
                                <p className="text-muted-foreground text-[12px]">
                                  Mã đơn hàng: {order.id}
                                </p>
                                <span className="text-[12px]">
                                  {order.customer}
                                </span>
                              </Link>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Fragment>
                    )}
                    {data.products.length === 0 && data.orders.length === 0 && (
                      <CommandEmpty className="text-[13px] flex items-center justify-center h-20">
                        Không tìm thấy nội dung
                      </CommandEmpty>
                    )}
                  </Fragment>
                ) : (
                  <CommandEmpty className="text-[13px] flex items-center justify-center h-20">
                    Không tìm thấy nội dung
                  </CommandEmpty>
                )}
              </Fragment>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
