"use client";

import { ProductDetail } from "@/types";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { AttributeContainer } from "./attribute-container";
import { AttributeForm } from "./attribute-update";

type Props = {
  product: ProductDetail | undefined;
};

export const ProductAttribute = ({ product }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(!open);

  return (
    <div className="h-auto w-full bg-white dark:bg-black rounded p-5">
      <div className="flex flex-col gap-2">
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
            <div
              onClick={() => setOpen(!open)}
              className="transition ease-in-out"
            >
              {open ? (
                <X className="w-4 h-4 hover:cursor-pointer transition ease-in-out" />
              ) : (
                <Pencil className="w-4 h-4 hover:cursor-pointer transition ease-in-out" />
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          {open ? (
            <AttributeForm product={product} handleClose={handleClose} />
          ) : (
            <AttributeContainer data={product} />
          )}
        </div>
      </div>
    </div>
  );
};
