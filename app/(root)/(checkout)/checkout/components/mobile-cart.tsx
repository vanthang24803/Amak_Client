/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/use-cart";
import { Voucher } from "@/types";
import { convertPrice, formatPrice } from "@/utils/price";
import { format } from "date-fns";
import { ArrowUpRight, Check, ShoppingCart, Trash } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  ship: boolean;
  totalPrice: number;
  priceShip: number;
  setCode: Dispatch<SetStateAction<string>>;
  voucher: Voucher | null;
  error: string;
  handlerFindVoucher: () => void;
  setVoucher: Dispatch<SetStateAction<Voucher | null>>;
}

export const MobileCart = ({
  ship,
  totalPrice,
  priceShip,
  error,
  handlerFindVoucher,
  voucher,
  setCode,
  setVoucher,
}: Props) => {
  const cart = useCart();

  const finalPrice = voucher?.discount
    ? totalPrice - voucher.discount * 1000
    : totalPrice;

  const finalPriceShipping = voucher?.discount
    ? priceShip - voucher.discount * 1000
    : priceShip;

  return (
    <div className="lg:hidden">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="w-full flex items-center justify-between px-2">
              <div className="flex items-center space-x-3">
                <ShoppingCart />
                <span className="md:block hidden">
                  Hiển thị thông tin đơn hàng
                </span>
              </div>
              <span className="font-bold mx-2">
                {convertPrice(!ship ? finalPrice : finalPriceShipping)}₫
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="flex flex-col max-h-[50vh]">
              {cart.items.map((item, index) => (
                <Link
                  href={`/products/${item.product.id}`}
                  key={index}
                  target="_blank"
                  className="flex space-x-4 mb-4"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-[15%] md:w-[12%] relative"
                  />
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col text-sm w-[180px] space-y-1">
                      <span className="text-[12px] line-clamp-2 font-medium">
                        {item.product.name}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {item.product.options[0].name}
                      </span>
                      <span className=" text-neutral-700">
                        x{item.quantity}
                      </span>
                    </div>

                    <p className="text-[13px] text-neutral-700 font-bold">
                      {formatPrice(
                        item.product.options[0].price,
                        item.product.options[0].sale
                      )}
                      ₫
                    </p>
                  </div>
                </Link>
              ))}
            </ScrollArea>

            <Separator className="my-4" />

            {voucher ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3837/3837136.png"
                    alt="voucher"
                    className="w-14 h-14"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{voucher.name}</span>
                    <span className="text-[12px] tracking-tighter">
                      {voucher.code} - Hạn sử dụng:{" "}
                      {format(voucher.shelfLife, "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => {
                    setVoucher(null);
                    setCode("");
                  }}
                >
                  <Trash />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between space-x-3">
                  <Input
                    placeholder="Mã giảm giá"
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <Button onClick={handlerFindVoucher} variant="primary">
                    <ArrowUpRight />
                  </Button>
                </div>
                {error && (
                  <p className="text-destructive text-sm font-medium">
                    {error}
                  </p>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
