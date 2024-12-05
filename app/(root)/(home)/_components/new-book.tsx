/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { Products } from "./products";
import { useRouter } from "next/navigation";
import _http from "@/utils/http";
import { Category } from "@/utils/category";
import useSWR from "swr";
import { Pagination } from "@/types";

const fetcher = (url: string, params: unknown) =>
  _http.get(url, { params }).then((res) => res.data);

export const NewBook = () => {
  const { data, error, isLoading } = useSWR<Pagination<Product[]>>(
    ["/Products", { Category: Category.SachMoi, Limit: 10 }],
    ([url, params]) => fetcher(url, params),
  );

  if (error) {
    console.log(error);
  }

  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mx-2 tracking-tighter">
          Bộ sưu tập mới
        </h2>
        <Button
          variant="gooeyLeft"
          className="bg-[#417505] text-white font-medium  hover:bg-[#65b10d] h-8 rounded-sm"
          onClick={() => router.push(`/collections/all`)}
        >
          Sách mới
        </Button>
      </div>

      <div className="flex flex-col space-y-4">
        <Products products={data?.result || []} isLoading={isLoading} />
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            className="px-20 hover:text-white hover:bg-[#65b10d] font-medium"
            onClick={() => router.push(`/collections/all`)}
          >
            Xem tất cả
          </Button>
        </div>
      </div>
    </div>
  );
};
