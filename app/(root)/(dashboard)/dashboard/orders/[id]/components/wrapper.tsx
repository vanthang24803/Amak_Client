"use client";

import { Loading } from "../../../_components/loading";
import { OrderDetail } from "./order-detail";
import { OrderTimeline } from "./order-timeline";
import _http from "@/utils/http";
import { toast } from "sonner";
import { ArrowBack } from "../../../_components/arrow-back";
import { fetchOrderDetail } from "@/services/api/order";
import useSWR, { mutate } from "swr";

type Props = {
  id: string;
};

export const Wrapper = ({ id }: Props) => {
  const { data, isLoading: loading } = useSWR(`/Order-${id}`, () =>
    fetchOrderDetail(id)
  );

  const handlerUpdateStatus = async (id: string, type: string) => {
    const updateStatusPromise = _http.put(`/Orders/${id}/Status`, {
      status: type,
    });

    toast.promise(updateStatusPromise, {
      loading: "Đang xử lý...",
      success: () => {
        mutate(`/Order-${id}`);
        return "Cập nhật thành công!";
      },
      error: () => "Oops!",
    });
  };

  if (loading)
    return (
      <div className="h-svh flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-1 flex-col gap-1">
      <div className="px-4 ">
        <ArrowBack path="/dashboard/orders" />
      </div>
      <div className="flex justify-between gap-4 m-4 flex-1">
        <OrderDetail order={data} handlerUpdateStatus={handlerUpdateStatus} />
        <OrderTimeline data={data?.statusOrders} />
      </div>
    </div>
  );
};
