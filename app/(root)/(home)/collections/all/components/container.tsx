/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Navigation } from "../../_components/navigation";
import { Pagination, Product } from "@/types";
import _http from "@/utils/http";
import PaginationComponent from "../../_components/pagination";
import { Filter } from "../../_components/filter";
import useFilterProduct from "@/hooks/use-filter-product";
import { SelectFilter } from "../../_components/select-filter";
import { ProductContainer } from "../../_components/product-container";
import { MobileFilter } from "../../_components/mobile-filter";

export const Container = () => {
  const [data, setData] = useState<Pagination<Product[]>>();

  const [_, setCurrentPage] = useState(1);

  const { filter, handleFilter, reset, price, handlePriceFilter } =
    useFilterProduct();

  const fetchData = async (page: number = 1) => {
    try {
      const response = await _http.get(`/Products`, {
        params: {
          Page: page,
          OrderBy: filter,
          SortBy: price,
        },
      });

      if (response.status === 200) {
        setData(response.data);
        setCurrentPage(page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, filter]);

  return (
    <main className="md:max-w-screen-xl mx-auto  p-4">
      <Navigation collection="Tất cả sản phẩm" />
      <div className="lg:flex w-full lg:space-x-12">
        <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 my-4">
          <Filter price={price} handlePriceFilter={handlePriceFilter} />
        </div>
        <div className="flex flex-col space-y-4">
          <img
            src="https://theme.hstatic.net/200000294254/1001077164/14/collection_banner.jpg?v=323"
            alt="billboard"
          />
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
                currentPage={data.currentPage}
                totalPage={data.totalPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
