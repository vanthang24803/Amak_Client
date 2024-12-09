"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types";
import { OrderCart } from "@/app/(root)/(dashboard)/dashboard/orders/[id]/components/order-cart";
import { OrderPayment } from "@/app/(root)/(dashboard)/dashboard/orders/[id]/components/order-payment";
import { OrderCustomer } from "@/app/(root)/(dashboard)/dashboard/orders/[id]/components/order-customer";
import { OrderTimeline } from "@/app/(root)/(dashboard)/dashboard/orders/[id]/components/order-timeline";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";

const font = Inter({ subsets: ["latin"] });

type Props = {
  data: Order;
  handleReset: () => void;
};

export const RenderOrder = ({ data, handleReset }: Props) => {
  return (
    <div className="flex items-center flex-col">
      <CardHeader>
        <CardTitle className="uppercase font-bold text-lg md:text-xl text-center">
          Thông tin đơn hàng
        </CardTitle>
      </CardHeader>

      <CardContent
        className={`${font.className} w-full flex flex-col gap-4 m-2 md:m-4 flex-1`}
      >
        <div className="flex flex-col md:flex-row justify-between gap-4 ">
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <OrderCustomer data={data} />
            <OrderCart data={data} />
            <OrderPayment data={data} />
          </div>
          <OrderTimeline data={data?.statusOrders} />
        </div>
        <Button className="md:w-[200px]" variant="mix" onClick={handleReset}>
          Trở lại
        </Button>
      </CardContent>
    </div>
  );
};
