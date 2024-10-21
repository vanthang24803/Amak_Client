"use client";

import { Loading } from "../../../_components/loading";
import _http from "@/utils/http";
import { ProductAttribute as Attribute } from "./attribute";
import { Thumbnail } from "./thumbnail";
import { Media } from "./media";
import { ArrowBack } from "../../../_components/arrow-back";
import { fetchDetailProduct } from "@/services/api/product";
import { CategoryProduct } from "./category";
import { OptionProduct } from "./option";
import useSWR from "swr";

type Props = {
  id: string;
};

export const Wrapper = ({ id }: Props) => {
  const { data: product, isLoading } = useSWR(`/Products/${id}`, () =>
    fetchDetailProduct(id)
  );

  if (isLoading) return <Loading />;

  const data = product?.data.result;

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-screen-xl mb-20 p-4 flex flex-col gap-4">
        <ArrowBack path="/dashboard/products" />
        <div className="w-full flex justify-between gap-x-8">
          <div className="w-2/3 flex flex-col gap-4">
            <Attribute product={data} />
            <CategoryProduct product={data} />
            <OptionProduct product={data} />
          </div>
          <div className="w-1/3 flex flex-col gap-4">
            <Thumbnail product={data} />
            <Media product={data} />
          </div>
        </div>
      </div>
    </div>
  );
};
