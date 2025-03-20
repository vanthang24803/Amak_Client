"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";

export const Reason = () => {
  return (
    <Card>
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8">
        <CardHeader className="flex flex-col">
          <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">
            Tình huống bạn đang gặp?
          </h1>
          <p className="text-sm">Tôi chưa nhận hàng/nhận thiếu hàng</p>
        </CardHeader>
        <Button
          variant="ghost"
          onClick={() => toast.success("Đang phát triển")}
        >
          Thay đổi
        </Button>
      </div>
    </Card>
  );
};
