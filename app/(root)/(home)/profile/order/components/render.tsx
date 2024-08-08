"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inter } from "next/font/google";
import { Order, Pagination } from "@/types";
import _http from "@/utils/http";
import Image from "next/image";
import { OrderData } from "./order-data";
import { Spinner } from "@/components/spinner";
import PaginationComponent from "@/components/pagination";

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const Render = () => {
  const [select, setSelect] = useState("All");

  const [loading, setLoading] = useState(false);
  const [_, setCurrentPage] = useState(1);

  const [data, setData] = useState<Pagination<Order[]>>();

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await _http.get(`/Orders`, {
        params: {
          Limit: 3,
          Page: page,
          OrderBy: select,
        },
      });
      if (response.status === 200) {
        setData(response.data);
        setCurrentPage(page);
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  return (
    <Tabs
      defaultValue={select}
      onValueChange={(value) => setSelect(value)}
      className={`w-full  ${font.className}`}
    >
      <TabsList className="md:grid hidden w-full grid-cols-7">
        <TabsTrigger value="All">Tất cả</TabsTrigger>
        <TabsTrigger value="Pending">Đang xử lý</TabsTrigger>
        <TabsTrigger value="Create">Xác nhận</TabsTrigger>
        <TabsTrigger value="Shipping">Đang giao hàng</TabsTrigger>
        <TabsTrigger value="Success">Hoàn thành</TabsTrigger>
        <TabsTrigger value="Cancel">Đã hủy</TabsTrigger>
        <TabsTrigger value="Return">Trả hàng</TabsTrigger>
      </TabsList>

      <TabsContent value={select}>
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            {data && data.result.length > 0 ? (
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2 p pt-3">
                  {data.result.map((item) => (
                    <OrderData key={item.id} order={item} />
                  ))}
                </div>
                <PaginationComponent
                  currentPage={data.currentPage}
                  totalPage={data.totalPage}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col space-y-2 w-full min-h-[30vh]">
                <Image
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                  alt="cart"
                  width={120}
                  height={120}
                />
                <p className="tracking-tighter text-[14px]">
                  Chưa có đơn hàng!
                </p>
              </div>
            )}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
};
