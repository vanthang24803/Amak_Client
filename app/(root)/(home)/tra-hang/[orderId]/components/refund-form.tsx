"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const RefundForm = () => {
  return (
    <Card>
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8">
        <CardHeader className="flex flex-col w-full">
          <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">
            Chọn sản phẩm cần Trả hàng và Hoàn tiền
          </h1>

          <form className="flex flex-col gap-4 pt-2 ">
            <div className="flex  items-center justify-between md:justify-start gap-6">
              <Label>Lý do:</Label>
              <Input className="w-full md:w-[500px]" />
            </div>
            <div className="flex  items-center justify-between md:justify-start gap-6">
              <Label>Mô tả:</Label>
              <Textarea
                className="w-full md:w-[500px] rounded-none"
                cols={30}
              />
            </div>
          </form>
        </CardHeader>
      </div>
    </Card>
  );
};
