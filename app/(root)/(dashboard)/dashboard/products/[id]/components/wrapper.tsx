"use client";

import { Loading } from "../../../_components/loading";
import _http from "@/utils/http";
import { ProductAttribute as Attribute } from "./attribute";
import { Thumbnail } from "./thumbnail";
import { Media } from "./media";
import { ArrowBack } from "../../../_components/arrow-back";
import { useQuery } from "@tanstack/react-query";
import { fetchDetailProduct } from "@/services/dashboard/product";

type Props = {
  id: string;
};

export const Wrapper = ({ id }: Props) => {
  const { data: product, isLoading } = useQuery({
    queryKey: [`dashboard-product-${id}`],
    queryFn: () => fetchDetailProduct(id),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-screen-xl p-4 flex flex-col gap-4">
        <ArrowBack path="/dashboard/products" />
        <div className="w-full flex justify-between gap-x-8">
          <div className="w-2/3 flex flex-col gap-4">
            <Attribute product={product?.data.result} />
          </div>
          <div className="w-1/3 flex flex-col gap-4">
            <Thumbnail product={product?.data.result} />
            <Media product={product?.data.result} />
          </div>
        </div>
      </div>
    </div>
  );
};
