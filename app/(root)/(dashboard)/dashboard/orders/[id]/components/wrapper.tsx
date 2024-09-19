"use client";

import { useEffect, useState } from "react";
import { Loading } from "../../../_components/loading";
import { OrderDetail } from "./order-detail";
import { OrderTimeline } from "./order-timeline";
import { Order } from "@/types";
import _http from "@/utils/http";
import { toast } from "sonner";

type Props = {
  id: string;
};

export const Wrapper = ({ id }: Props) => {
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<Order>();

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const response = await _http.get(`/Orders/${id}`);

      if (response.status === 200) {
        setData(response.data.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerUpdateStatus = async (id: string, type: string) => {
    const updateStatusPromise = _http.put(`/Orders/${id}/Status`, {
      status: type,
    });

    toast.promise(updateStatusPromise, {
      loading: "Đang xử lý...",
      success: () => {
        fetchOrderDetail();
        return "Cập nhật thành công!";
      },
      error: () => "Oops!",
    });
  };

  useEffect(() => {
    fetchOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading)
    return (
      <div className="h-svh flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="flex justify-between gap-4 m-4 flex-1">
      <OrderDetail order={data} handlerUpdateStatus={handlerUpdateStatus} />
      <OrderTimeline data={data?.statusOrders} />
    </div>
  );
};
