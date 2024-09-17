/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useClient from "@/hooks/use-client";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { UpdateCart } from "@/components/cart/cart-update";
import { convertPrice, formatPrice } from "@/utils/price";
import { Dot, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useCartV2 } from "@/hooks/use-cart.v2";

export const Container = () => {
  const router = useRouter();

  const {
    totalItems,
    totalPrice,
    data: cart,
    removeOptionToCart,
  } = useCartV2();

  const { isClient } = useClient();

  if (!isClient) return null;

  return (
    <main className="md:max-w-screen-xl mx-auto p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Giỏ hàng ({totalItems})</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex lg:flex-row flex-col justify-between  lg:space-x-4 w-full my-2 md:my-6">
        <div className="lg:w-2/3 w-full  bg-white rounded p-4 flex flex-col space-y-3">
          <h1 className="text-xl font-bold">Giỏ hàng của bạn</h1>
          <Separator />

          <span>
            Bạn đang có <b>{totalItems} sản phẩm</b> trong giỏ hàng
          </span>

          <div className="w-full rounded-md border border-neutral-200 p-4">
            <ScrollArea className="h-[50vh]" scrollHideDelay={10} type="scroll">
              {totalItems > 0 ? (
                <div className="flex flex-col space-y-4 my-4 w-full">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col space-y-2 text-sm hover:cursor-pointer"
                    >
                      <div className="flex md:space-x-8 space-x-4">
                        <img
                          src={item.thumbnail}
                          alt="thumbnail"
                          className="w-[20%] md:w-[10%] object-cover"
                          onClick={() =>
                            router.push(`/products/${item.productId}`)
                          }
                        />
                        <div className="flex flex-col w-full">
                          <div className="flex items-center justify-between ">
                            <Link
                              href={`/products/${item.productId}`}
                              target="_blank"
                              className="font-semibold line-clamp-2"
                            >
                              {item.productName}
                            </Link>
                            <X
                              className="w-6 h-6"
                              onClick={() => removeOptionToCart(item)}
                            />
                          </div>
                          <span className="text-neutral-400 text-[12px]">
                            {item.productName}
                          </span>
                          <div className="flex items-center justify-between my-2">
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
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col space-y-4 h-[45vh]">
                  <Image src="/box.png" alt="box" width={120} height={120} />
                  <Label>Giỏ hàng của bạn đang trống!</Label>
                </div>
              )}
            </ScrollArea>
          </div>

          <span className="text-sm font-bold py-3">Ghi chú đơn hàng</span>
          <textarea
            role="60"
            color="10"
            className="w-full rounded-md border border-neutral-200 p-4"
          ></textarea>
        </div>
        <div className="lg:w-1/3 w-full lg:h-[38vh]  bg-white rounded p-4 flex flex-col space-y-3">
          <h1 className="text-xl font-bold">Giỏ hàng của bạn</h1>
          <Separator />
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">Tổng tiền:</h2>
            <p className="text-2xl font-bold text-[#ff0000]">
              {convertPrice(totalPrice)}₫
            </p>
          </div>
          <Separator />
          <div className="text-[13px] tracking-tighter text-neutral-600 space-y-1 pb-4">
            <p className="flex items-center space-x-2">
              {" "}
              <Dot /> Đổi trả sản phẩm trong 7 ngày do lỗi sản xuất.
            </p>
            <p className="flex items-center space-x-2">
              <Dot />
              Sản phẩm còn đủ tem mác, chưa qua sử dụng.
            </p>
          </div>
          <Button
            variant="destructive"
            disabled={totalItems == 0}
            onClick={() => router.push(`/checkout`)}
            className="bg-[#ff0000] uppercase font-semibold"
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </main>
  );
};
