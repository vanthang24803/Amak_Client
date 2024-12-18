/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Products } from "./products";
import { useRouter } from "next/navigation";
import _http from "@/utils/http";
import { Category } from "@/utils/category";
import useSWR from "swr";
import { Product } from "@/types";

const handleFetcher = (url: string) =>
  _http
    .get(url, {
      params: {
        Category: Category.Manga,
        Limit: 10,
      },
    })
    .then((res) => res.data.result);

export const Manga = () => {
  const { data, isLoading } = useSWR<Product[]>("/Products", handleFetcher);

  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mx-2 tracking-tighter">
          Truyện tranh
        </h2>
        <Button
          className="bg-[#417505] text-white font-medium  hover:bg-[#65b10d] h-8 rounded-sm"
          variant="gooeyLeft"
          onClick={() => router.push(`/collections/manga-comic`)}
        >
          Manga-Commic
        </Button>
      </div>

      <div className="flex flex-col space-y-4">
        <Products products={data || []} isLoading={isLoading} />
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            className="px-20 hover:text-white hover:bg-[#65b10d] font-medium"
            onClick={() => router.push(`/collections/manga-comic`)}
          >
            Xem tất cả
          </Button>
        </div>
      </div>
    </div>
  );
};
