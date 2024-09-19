"use client";

import { Order } from "@/types";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { convertPrice } from "@/utils/price";
import { Separator } from "@/components/ui/separator";

type Props = {
  data: Order | undefined;
};

export const OrderPayment = ({ data }: Props) => {
  const paymentType: { [key: string]: { name: string; isBank: boolean } } = {
    COD: {
      name: "COD",
      isBank: false,
    },
    BANK: {
      name: "Thanh toán qua ngân hàng",
      isBank: true,
    },
    MOMO: {
      name: "Thanh toán qua MoMo",
      isBank: true,
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-lg tracking-tighter scroll-m-20">
          Phuơng thức thanh toán
        </CardTitle>
        <CardContent className="flex flex-col gap-2 w-full overflow-hidden">
          <div className="flex-1 flex flex-col gap-2 py-2">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-[12px] scroll-m-20">
                Kiểu thanh toán
              </p>
              <div className="flex items-center gap-1">
                <div
                  className={`w-3 h-3 rounded ${data?.payment && paymentType[data?.payment].isBank ? "bg-green-600" : "bg-red-500"}`}
                ></div>
                <p className="font-medium tracking-tighter text-[12.75px] scroll-m-20">
                  {data?.payment && !paymentType[data?.payment].isBank
                    ? "Thanh toán trực tiếp"
                    : "Thanh toán online"}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-[12px] scroll-m-20">
                Loại hình thanh toán
              </p>
              <p className="font-medium tracking-tighter text-[12.75px] scroll-m-20">
                {data?.payment && paymentType[data?.payment].name}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-[12px] scroll-m-20">
                Phụ phí
              </p>
              <p className="font-medium tracking-tighter text-[12.75px] scroll-m-20">
                {convertPrice(0)}₫
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex items-end font-bold tracking-tighter justify-between text-base mt-4">
            <p>Tổng:</p>
            <p className="tracking-tighter">
              {convertPrice(data?.totalPrice)}₫
            </p>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
