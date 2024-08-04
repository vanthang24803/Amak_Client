"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inter } from "next/font/google";
import { Order, Response } from "@/types";
import _http from "@/utils/http";

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const Render = () => {
  const [select, setSelect] = useState("All");

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<Response<Order[]>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await _http.get(`/Orders`, {
          params: {
            Limit: 5,
            OrderBy: select,
          },
        });
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (e: any) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [select]);

  return (
    <Tabs
      defaultValue={select}
      onValueChange={(value) => setSelect(value)}
      className={`w-full hidden md:block ${font.className}`}
    >
      <TabsList className="grid w-full grid-cols-7 ">
        <TabsTrigger value="All">Tất cả</TabsTrigger>
        <TabsTrigger value="Pending">Đang xử lý</TabsTrigger>
        <TabsTrigger value="Create">Xác nhận</TabsTrigger>
        <TabsTrigger value="Shipping">Đang giao hàng</TabsTrigger>
        <TabsTrigger value="Success">Hoàn thành</TabsTrigger>
        <TabsTrigger value="Cancel">Đã hủy</TabsTrigger>
        <TabsTrigger value="Return">Trả hàng</TabsTrigger>
      </TabsList>

      <TabsContent value={select}>{JSON.stringify(data?.result.length)}</TabsContent>
    </Tabs>
  );
};
