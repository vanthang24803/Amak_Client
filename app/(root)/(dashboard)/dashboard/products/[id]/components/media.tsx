/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ProductDetail } from "@/types";
import { Button } from "@/components/ui/button";

type Props = {
  product: ProductDetail | undefined;
};

export const Media = ({ product }: Props) => {
  return (
    <div className="w-full bg-white dark:bg-black rounded h-auto p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="scroll-m-20 text-xl font-bold tracking-tight w-1/2 line-clamp-1">
          Media
        </h4>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="text-black text-[12px] font-semibold tracking-tighter"
          >
            Edit Media
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {product?.photos.map((item) => (
          <img key={item.id} src={item.url} className="rounded" />
        ))}
      </div>
    </div>
  );
};
