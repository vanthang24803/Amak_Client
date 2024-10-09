import { Order, Pagination, Response } from "@/types";
import _http from "@/utils/http";

const fetchOrders = async (page: number = 1, limit: number = 10) => {
  const response = await _http.get<Pagination<Order[]>>(`/Orders/Analytic`, {
    params: {
      Limit: limit,
      Page: page,
    },
  });
  if (response.status === 200) {
    return response.data;
  }

  throw new Error("Fetching Order Wrong!");
};

const fetchOrderDetail = async (id: string | undefined) => {
  const response = await _http.get<Response<Order>>(`/Orders/${id}`);
  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching Order Wrong!");
};

export { fetchOrders, fetchOrderDetail };
