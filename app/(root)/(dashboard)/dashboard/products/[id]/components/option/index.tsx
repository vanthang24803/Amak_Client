"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ProductDetail } from "@/types";
import { useState } from "react";
import { ListOptions } from "./list-options";
import { CreateOption } from "./create-option";

type Props = {
  product: ProductDetail | undefined;
};

export const OptionProduct = ({ product }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Card className="h-auto w-full bg-white dark:bg-black rounded pt-5">
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-lg font-bold tracking-tighter w-1/2 line-clamp-1">
            {open ? "Cập nhật" : `Phiên bản`}
          </h4>
          <CreateOption open={open} setOpen={setOpen} product={product} />
        </div>

        <ListOptions options={product?.options} />
      </CardContent>
    </Card>
  );
};
