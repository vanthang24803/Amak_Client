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
import useCart from "@/hooks/use-cart";
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { convertPrice, formatPrice } from "@/utils/price";
import { Button } from "../ui/button";
import { UpdateCart } from "./cart-update";
import { useState } from "react";

export default function CartAction() {
  const { isClient } = useClient();
  const router = useRouter();
  const cart = useCart();
  const [open, setOpen] = useState(false);

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
            {cart.totalItems() > 0 && (
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 absolute -top-3 -right-3">
                <span className="text-white text-[12px]">
                  {cart.totalItems()}
                </span>
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
            Số sản phẩm trong giỏ hàng: {cart.totalItems()}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-2">
          <ScrollArea className="lg:h-[75vh] h-[78vh] w-full ">
            <div className="flex flex-col space-y-4 my-4">
              {cart.totalItems() > 0 ? (
                <>
                  {cart.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col space-y-2 text-sm hover:cursor-pointer"
                    >
                      <div className="flex space-x-4">
                        <img
                          src={item.product.thumbnail}
                          alt="thumbnail"
                          className="w-1/4 object-fill"
                          onClick={() => {
                            router.push(`/products/${item.product.id}`);
                            handleOpen();
                          }}
                        />
                        <div className="flex flex-col">
                          <div className="relative w-[250px]">
                            <span
                              className="font-semibold text-[12px] md:w-[160px] line-clamp-1 md:line-clamp-2"
                              onClick={() => {
                                router.push(`/products/${item.product.id}`);
                                handleOpen();
                              }}
                            >
                              {item.product.name}
                            </span>
                            <X
                              className="w-4 h-4 absolute top-0 -right-0"
                              onClick={() =>
                                cart.removeItem(
                                  item.product.id,
                                  item.product.options[0].id
                                )
                              }
                            />
                          </div>
                          <span className="text-neutral-400 text-[11px] tracking-tighter">
                            {item.product.options[0].name}
                          </span>
                          <div className="flex items-center space-x-4 mt-2 mb-4">
                            <UpdateCart
                              productId={item.product.id}
                              optionId={item.product.options[0].id}
                              quantity={item.quantity}
                            />

                            <div className="flex items-center space-x-2">
                              <span className="font-semibold ">
                                {formatPrice(
                                  item.product.options[0].price,
                                  item.product.options[0].sale
                                )}
                                ₫
                              </span>

                              <span className="text-[12px] line-through hidden md:block">
                                {convertPrice(item.product.options[0].price)}₫
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
                  <ShoppingCart className="w-20 h-20" />
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
              {convertPrice(cart.totalPrice())}₫
            </span>
          </div>
          <Button
            className="w-full bg-[#417505] hover:bg-[#65b10d]"
            onClick={() => {
              router.push("/checkout");
              handleOpen();
            }}
            disabled={cart.totalItems() == 0}
          >
            Thanh toán
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
