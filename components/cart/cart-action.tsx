/* eslint-disable @next/next/no-img-element */
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
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";
import { convertPrice, formatPrice } from "@/utils/price";
import { Button } from "../ui/button";
import { UpdateCart } from "./cart-update";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";

export default function CartAction() {
  const router = useRouter();
  const { isClient } = useClient();
  const [open, setOpen] = useState(false);

  const { data: cart, totalItems, totalPrice, removeOptionToCart } = useCart();

  const handleOpen = () => {
    setOpen(!open);
  };

  if (!isClient)
    return (
      <div className="flex items-center space-x-2">
        {[...Array(3)].map((_, index) => (
          <Separator
            key={index}
            className="w-10 h-10 rounded-full flex items-center justify-center"
          />
        ))}
      </div>
    );

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetTrigger>
        <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-200">
          <div className="relative">
            <Cart />
            {totalItems > 0 && (
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 absolute -top-3 -right-3">
                <span className="text-white text-[12px]">{totalItems}</span>
              </div>
            )}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <h2
            className="cursor-pointer"
            onClick={() => {
              router.push(`/cart`);
              handleOpen();
            }}
          >
            <SheetTitle>Giỏ Hàng</SheetTitle>
          </h2>
          <SheetDescription>
            Số sản phẩm trong giỏ hàng: {totalItems}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-2">
          <ScrollArea className="lg:h-[75vh] h-[78vh] w-full ">
            <div className="flex flex-col space-y-4 my-4">
              {totalItems > 0 ? (
                <>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col space-y-2 text-sm hover:cursor-pointer"
                    >
                      <div className="flex gap-1 md:gap-0  md:justify-between">
                        <img
                          src={item.thumbnail}
                          alt="thumbnail"
                          className="h-24 w-1/4 object-contain"
                          onClick={() => {
                            router.push(`/products/${item.productId}`);
                            handleOpen();
                          }}
                        />
                        <div className="flex flex-col gap-1">
                          <div className="relative w-[220px]">
                            <span
                              className="font-semibold text-[12px] md:w-[160px] line-clamp-1 md:line-clamp-2 leading-4 tracking-tight"
                              onClick={() => {
                                router.push(`/products/${item.productId}`);
                                handleOpen();
                              }}
                            >
                              {item.productName}
                            </span>
                            <X
                              className="absolute top-0 right-0 w-4 h-4"
                              onClick={() => removeOptionToCart(item)}
                            />
                          </div>
                          <div className="flex items-center justify-between w-[220px]">
                            <span className="text-neutral-400 text-[11px] tracking-tighter line-clamp-1 w-[100px]">
                              {item.optionName}
                            </span>
                            {item.sale > 0 && (
                              <div className="w-8 h-5 flex items-center justify-center text-[12px] font-medium tracking-tighter text-white bg-red-500 rounded">
                                {item.sale}%
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 mt-2 mb-4">
                            <UpdateCart cart={item} />

                            <div className="flex items-center space-x-2">
                              <span className="font-semibold ">
                                {formatPrice(item.price, item.sale)}₫
                              </span>

                              <span className="text-[12px] line-through hidden md:block">
                                {convertPrice(item.price)}₫
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center flex-col space-y-4 my-8">
                  <Image src="/box.png" alt="box" width={120} height={120} />
                  <span className="tracking-tighter font-medium text-sm">
                    Hiện chưa có sản phẩm
                  </span>
                </div>
              )}
            </div>
          </ScrollArea>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold uppercase">Tổng tiền:</span>
            <span className="font-bold text-[#ff0000]">
              {convertPrice(totalPrice)}₫
            </span>
          </div>
          <Button
            variant="gooeyLeft"
            className="w-full bg-[#417505] hover:bg-[#65b10d]"
            onClick={() => {
              router.push("/checkout");
              handleOpen();
            }}
            disabled={totalItems == 0}
          >
            Thanh toán
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
