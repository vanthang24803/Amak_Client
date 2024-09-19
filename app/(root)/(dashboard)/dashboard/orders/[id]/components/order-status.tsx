"use client";

import { useState, useEffect } from "react";
import { Order } from "@/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusList: { [key: string]: { color: string; value: string } } = {
  PENDING: {
    color: "#dc2626",
    value: "Đang chờ xử lý",
  },
  CREATE: {
    color: "#f59e0b",
    value: "Đang chuẩn bị hàng",
  },
  SHIPPING: {
    color: "#0284c7",
    value: "Đang giao hàng",
  },
  SUCCESS: {
    color: "#16a34a",
    value: "Đã giao hàng thành công",
  },
};

type Props = {
  data: Order | undefined;
  handlerUpdateStatus: (id: string, type: string) => Promise<void>;
};

export const OrderStatus = ({ data, handlerUpdateStatus }: Props) => {
  const [loading, setLoading] = useState<boolean>();
  const [status, setStatus] = useState<string>(data?.status || "");

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  useEffect(() => {
    if (data && status != data?.status) {
      try {
        setLoading(true);
        handlerUpdateStatus(data.id, status);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [status, data, handlerUpdateStatus]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex-1 flex items-center justify-between">
          <p className="font-bold text-lg tracking-tighter scroll-m-20">
            Trạng thái
          </p>
          <div className="w-[220px]">
            <Select
              value={status}
              onValueChange={handleStatusChange}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusList).map(([statusKey, item], index) => (
                  <SelectItem value={statusKey} key={index}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.value}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
