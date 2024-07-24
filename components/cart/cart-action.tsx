"use client";

import useClient from "@/hooks/use-client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cart } from "../svg";
import Link from "next/link";

export default function CartAction() {
  const { isClient } = useClient();

  if (!isClient) return <Cart />;

  const total = 10;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center space-x-2 hover:cursor-pointer">
          <div className="relative">
            <Cart />
            {/* {cart.totalItems() > 0 && (
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 absolute -top-2 -right-2">
                <span className="text-white text-[12px]">
                  {cart.totalItems()}
                </span>
              </div>
            )} */}

              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 absolute -top-2 -right-2">
                <span className="text-white text-[12px]">
                  {total}
                </span>
              </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <Link href="/cart">
            <SheetTitle>Giỏ Hàng</SheetTitle>
          </Link>
          <SheetDescription>
            {/* Số sản phẩm trong giỏ hàng: {cart.totalItems()} */}
            Số sản phẩm trong giỏ hàng: {total}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-2"></div>
      </SheetContent>
    </Sheet>
  );
}
