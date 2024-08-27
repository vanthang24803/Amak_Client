"use client";

import { ProductDetail } from "@/types";
import { MoreHorizontal, X } from "lucide-react";
import { useState } from "react";

type Props = {
  product: ProductDetail | undefined;
};

export const ProductAttribute = ({ product }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="h-screen w-full bg-white dark:bg-black rounded p-4">
      <div className="flex items-center justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-1/2 line-clamp-1">
          Thông tin sản phẩm
        </h4>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${product?.isDeleted ? "bg-destructive" : "bg-green-600"}`}
            ></div>
            <span className="text-[12.5px] font-medium tracking-tighter">
              {product?.isDeleted ? "Hided" : "Published"}
            </span>
          </div>
          <div onClick={() => setOpen(!open)}>
            {open ? (
              <X className="w-4 h-4 hover:cursor-pointer transition ease-in-out" />
            ) : (
              <MoreHorizontal className="w-4 h-4 hover:cursor-pointer transition ease-in-out" />
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
