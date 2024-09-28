import { Order, Response } from "@/types";
import _http from "@/utils/http";

const fetchOrders = async () => {
  const response = await _http.get<Response<Order[]>>(`/Orders`);
  if (response.status === 200) {
    return response.data.result;
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
