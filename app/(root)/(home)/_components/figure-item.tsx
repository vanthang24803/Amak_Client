"use client";

import { Separator } from "@/components/ui/separator";
import { Product } from "@/types";
import _http from "@/utils/http";
import { convertPrice } from "@/utils/price";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: Product;
};

export const FigureItem = ({ data }: Props) => {
  const options = data.options;
  const totalPrice = data.options.reduce(
    (total, option) => total + option.price,
    0,
  );
  const avgPrice = (totalPrice / options.length).toFixed(0);

  return (
    <Link
      href={`/products/${data.id}`}
      className="flex flex-col gap-2 flex-shrink-0"
    >
      <div className="flex gap-3">
        <Image src={data.thumbnail} width={80} height={80} alt="thumbnail" />
        <div className="flex flex-col gap-1 md:gap-2">
          <h2 className="text-[0.75rem] font-semibold tracking-tight line-clamp-2 leading-4">
            {data.name}
          </h2>
          <p className="font-bold text-[14px]">{convertPrice(avgPrice)}₫</p>
        </div>
      </div>
      <Separator className="h-[0.5px]" />
    </Link>
  );
};
