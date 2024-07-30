/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { Card } from '@/components/card/cart-item';
import { Pagination, Product } from '@/types';
import _http from '@/utils/http';
import { Separator } from '@radix-ui/react-separator';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PaginationComponent from '../../collections/components/pagination';
import { Spinner } from '@/components/spinner';
import { Skeleton } from '@/components/ui/skeleton';

export const Container = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('product');

  const [data, setData] = useState<Pagination<Product[]>>();
  const [_, setCurrentPage] = useState(1);

  const fetchData = async (page: number = 1) => {
    try {
      const response = await _http.get(`/Products`, {
        params: {
          Name: search,
          Page: page,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  return (
    <main className="md:container p-4">
      <div className="flex items-center justify-center flex-col space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Tìm kiếm</h1>
        {data && data.result.length > 0 ? (
          <span className="text-sm">
            Có <b>{data?.result?.length} sản phẩm</b> cho tìm kiếm
          </span>
        ) : (
          <div className="flex items-center flex-col space-y-2 pt-4">
            <h2 className="font-bold text-[14px]">
              Không tìm thấy nội dung bạn yêu cầu
            </h2>
            <span className="text-[12px] font-medium text-gray-600 text-center">
              Không tìm thấy <b>`{search}`</b>. Vui lòng kiểm tra chính tả, sử
              dụng các từ tổng quát hơn và thử lại!
            </span>
          </div>
        )}
        <div className="py-4 w-[80px] ">
          <Separator className="bg-black h-1" />
        </div>
      </div>

      <div className="my-4 flex flex-col space-y-2">
        <span className="text-sm">
          Kết quả tìm kiếm cho <b>`{search}`</b>.
        </span>
        {data?.result ? (
          <>
            {data.result.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {data.result.map((item, index) => (
                  <Card product={item} key={index} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col space-y-2">
                <img src="/404.svg" className="w-[200px] my-4" />
                <span className="tracking-tight font-medium">
                  Không tìm thấy sản phẩm yêu cầu
                </span>
              </div>
            )}
            <PaginationComponent
              currentPage={data.currentPage}
              totalPage={data.totalPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full h-[50vh] md:gap-8">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-full h-full bg-white " />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
