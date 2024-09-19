/* eslint-disable @next/next/no-img-element */
"use client";

import { Order, OrderDetails } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { convertPrice } from "@/utils/price";

type Props = {
  data: Order | undefined;
};

export const OrderCart = ({ data }: Props) => {
  function totalPrice(item: OrderDetails) {
    return (
      item.quantity * item.price -
      (item.quantity * item.price * item.sale) / 100
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-lg tracking-tighter scroll-m-20">
          Danh sách sản phẩm
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <>
          <ScrollArea className="h-[250px] w-full overflow-hidden">
            <div className="pr-4 overflow-y-auto h-full">
              {data?.orderDetails?.map((item) => (
                <div
                  key={item.productId}
                  className="border-b py-4 flex items-stretch justify-between"
                >
                  <div className="flex items-start gap-2 flex-1">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col gap-1.5 flex-1">
                      <h2 className="text-sm font-medium tracking-tight scroll-m-20">
                        {item.name}
                      </h2>
                      <p className="text-[12px] text-muted-foreground">
                        {item.optionName}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-[12px]">x{item.quantity}</p>
                        <p className="text-[14px] font-semibold tracking-tighter self-end">
                          {convertPrice(totalPrice(item))}₫
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex-1 flex flex-col gap-1 px-4 py-2">
            <div className="flex items-end justify-between text-[14px]">
              <p className="text-muted-foreground text-[12px]">Shipping</p>
              <p className="font-medium tracking-tighter">
                {convertPrice(35000)}₫
              </p>
            </div>
            <div className="flex items-end justify-between text-[14px]">
              <p className="text-muted-foreground text-[12px]">Voucher</p>
              <p className="font-medium tracking-tighter">{convertPrice(0)}₫</p>
            </div>
            <div className="flex items-end font-bold tracking-tighter justify-between text-base mt-4">
              <p>Tổng:</p>
              <p className="tracking-tighter">
                {convertPrice(data?.totalPrice)}₫
              </p>
            </div>
          </div>
        </>
      </CardContent>
    </Card>
  );
};
