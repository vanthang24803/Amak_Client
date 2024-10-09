/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ActionType, Pagination, Product } from "@/types";
import _http from "@/utils/http";
import useFilterProduct from "@/hooks/use-filter-product";
import { Navigation } from "./navigation";
import PaginationComponent from "../../../../../components/pagination";
import { Filter } from "./filter";
import { SelectFilter } from "./select-filter";
import { MobileFilter } from "./mobile-filter";
import { ProductContainer } from "./product-container";
import useSWR from "swr";

type Props = {
  action: ActionType;
  thumbnail?: string;
};

const fetcher = (url: string, params: any) =>
  _http.get(url, { params }).then((res) => res.data);

export const Container = ({
  action,
  thumbnail = "https://theme.hstatic.net/200000294254/1001077164/14/collection_banner.jpg?v=407",
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { filter, handleFilter, reset, price, handlePriceFilter } =
    useFilterProduct();

  const { data, error } = useSWR<Pagination<Product[]>>(
    [
      "/Products",
      { Page: currentPage, OrderBy: filter, SortBy: price, Limit: 20 },
    ],
    ([url, params]) => fetcher(url, params),
    {
      revalidateOnFocus: false,
    }
  );

  if (error) {
    console.log(error);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="md:max-w-screen-xl mx-auto  p-4">
      <Navigation collection="Tất cả sản phẩm" />
      <div className="lg:flex w-full lg:space-x-12">
        <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 my-4">
          <Filter price={price} handlePriceFilter={handlePriceFilter} />
        </div>
        <div className="flex flex-col space-y-4">
          <img src={thumbnail} alt="billboard" />
          <div className="flex space-y-2 flex-col">
            <div className="flex items-center justify-between">
              <div className="flex lg:flex-row flex-col space-y-2 items-center justify-between lg:space-y-0 lg:space-x-6 w-full">
                <div className="flex-col flex lg:flex-row items-center md:space-x-4    ">
                  <h1 className="text-2xl font-bold tracking-tighter">
                    Tất cả sản phẩm
                  </h1>
                  <div className="lg:flex hidden items-center space-x-1">
                    <span className="font-bold text-[13px]">
                      {data?.result?.length || 0}
                    </span>
                    <span className="text-[13px] text-gray-700 font-medium">
                      sản phẩm
                    </span>
                  </div>
                </div>
                <SelectFilter handleFilter={handleFilter} />
                <MobileFilter
                  totalProduct={data?.result?.length || 0}
                  filter={filter}
                  price={price}
                  handleFilter={handleFilter}
                  handlePriceFilter={handlePriceFilter}
                  reset={reset}
                />
              </div>
            </div>
            <ProductContainer products={data?.result} />
            {data && (
              <PaginationComponent
                currentPage={data._currentPage}
                totalPage={data._totalPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
