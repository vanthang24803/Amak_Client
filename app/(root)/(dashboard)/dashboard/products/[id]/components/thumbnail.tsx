/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { ProductDetail } from "@/types";
import { Trash } from "lucide-react";

type Props = {
  product: ProductDetail | undefined;
};

export const Thumbnail = ({ product }: Props) => {
  return (
    <div className="w-full bg-white dark:bg-black rounded h-auto p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="scroll-m-20 text-xl font-bold tracking-tight w-1/2 line-clamp-1">
          Thumbnail
        </h4>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="text-black text-[12px] font-semibold tracking-tighter"
          >
            Edit
          </Button>
          <Button variant="outline" size="icon">
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <img
        className="w-[160px] h-[160px] object-contain rounded"
        src={product?.thumbnail}
        alt="thumbnail"
      />
    </div>
  );
};
