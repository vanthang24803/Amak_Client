"use client";

import { StatusOrder } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check, Package, Settings, Truck, X } from "lucide-react";

type Props = {
  data: StatusOrder[] | undefined;
};

export const statusIcons = {
  PENDING: <Bell className="w-3 h-3" />,
  CREATE: <Package className="w-3 h-3" />,
  SHIPPING: <Truck className="w-3 h-3" />,
  SUCCESS: <Check className="w-3 h-3" />,
  CANCEL: <X className="w-3 h-3" />,
  RETURN: <Settings className="w-3 h-3" />,
};

export const statusTexts = {
  PENDING: "Đang chờ xử lý",
  CREATE: "Đang chuẩn bị hàng",
  SHIPPING: "Đang giao hàng",
  SUCCESS: "Đã giao hàng thành công",
  CANCEL: "Đã huỷ đơn hàng",
  RETURN: "Đã trả hàng",
};

export const OrderTimeline = ({ data }: Props) => {
  return (
    <Card className="w-full md:w-1/3 lg:h-[45vh]">
      <CardHeader>
        <CardTitle className="font-bold text-lg tracking-tighter scroll-m-20">
          Trạng thái
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {data?.map((item, index) => (
            <li key={index} className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-300 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                {statusIcons[item.status as keyof typeof statusIcons]}
              </span>
              <h3 className="flex items-center mb-1 text-[13.5px] font-semibold text-gray-900 dark:text-white">
                {statusTexts[item.status as keyof typeof statusTexts]}
              </h3>
              <p className="text-[12px] text-muted-foreground">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};
