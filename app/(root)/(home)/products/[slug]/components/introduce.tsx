"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductDetail } from "@/types/product";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  data: ProductDetail | undefined;
};

export const Introduce = ({ data }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full p-4 md:p-6 rounded-md bg-white flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <span className="text-xl font-bold uppercase">MÔ TẢ SẢN PHẨM</span>
        <Separator />
      </div>

      {data?.specifications || data?.introduction ? (
        <div className="flex flex-col space-y-1 text-sm">
          <div
            dangerouslySetInnerHTML={{
              __html: data.introduction || "",
            }}
          />
          {!show && (
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                className="hover:bg-transparent text-[#417505]  hover:text-[#65b10d] space-x-4"
                onClick={() => setShow(true)}
              >
                <Plus className="w-4 h-4" />
                <span> Xem thêm nội dung </span>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="font-medium text-[12px]">Đang cập nhật...</p>
        </div>
      )}

      {show && (
        <div className="flex flex-col space-y-1 text-sm">
          {data?.specifications && (
            <div
              dangerouslySetInnerHTML={{
                __html: data?.specifications,
              }}
            />
          )}
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              className="hover:bg-transparent text-[#417505]  hover:text-[#65b10d] space-x-4"
              onClick={() => setShow(false)}
            >
              <Minus className="w-4 h-4" />
              <span>Rút gọn nội dung </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
