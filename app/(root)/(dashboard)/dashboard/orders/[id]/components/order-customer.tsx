"use client";

import { Order } from "@/types";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
  data: Order | undefined;
};

export const OrderCustomer = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-lg tracking-tighter scroll-m-20">
          Thông tin giao hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col w-full overflow-hidden gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-[12px] scroll-m-20">
              Khách hàng
            </p>
            <p className="font-medium tracking-tighter text-[12.75px] scroll-m-20">
              {data?.customer}
            </p>
          </div>
          <Separator />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-[12px] scroll-m-20">
              Email
            </p>
            <p className="font-medium tracking-tighter text-[12.75px] scroll-m-20">
              {data?.email}
            </p>
          </div>
          <Separator />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-[12px] scroll-m-20">
              Số điện thoại
            </p>
            <p className="font-medium tracking-tighter text-[12.75px] scroll-m-20">
              {data?.numberPhone}
            </p>
          </div>
          <Separator />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-[12px] scroll-m-20">
              Địa chỉ giao hàng
            </p>
            <p className="font-medium tracking-tighter text-[12.75px] scroll-m-20">
              {data?.address}
            </p>
          </div>
          <Separator />
        </div>
      </CardContent>
    </Card>
  );
};
