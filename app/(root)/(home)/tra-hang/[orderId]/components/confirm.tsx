"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types";
import { convertPrice } from "@/utils/price";
import toast from "react-hot-toast";

type Props = {
  order: Order;
};

export const ConfirmRefund = ({ order }: Props) => {
  return (
    <Card>
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8">
        <CardHeader className="flex flex-col w-full gap-4">
          <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">
            Thông tin hoàn tiền
          </h1>

          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <Label className="w-[150px]">Số tiền hoàn lại:</Label>
              <b className="text-xl font-bold ">
                {convertPrice(order.totalPrice)}₫
              </b>
            </div>
            <div className="flex items-center">
              <Label className="w-[150px]">Hoàn tiền vào:</Label>
              <Label>Số dư tài khoản cá nhân</Label>
            </div>
          </div>
          <Separator />

          <div className="flex justify-end">
            <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p className="text-xs">Số tiền có thể hoàn lại</p>
                <p>{convertPrice(order.totalPrice)}₫</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="tracking-tighter font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Số tiền hoàn nhận được
                </p>
                <b className="text-2xl font-bold text-[#ee4d2d]">
                  {convertPrice(order.totalPrice - 30000)}₫
                </b>
              </div>
              <Button
                variant="destructive"
                onClick={() => toast.success("Đang phát triển")}
              >
                Hoàn thành
              </Button>
            </div>
          </div>
        </CardHeader>
      </div>
    </Card>
  );
};
