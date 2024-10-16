"use client";

import { Loading } from "../../_components/loading";
import _http from "@/utils/http";
import { DataTable } from "./data-table";
import { columns, OrderColumn } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types";
import { fetchOrders } from "@/services/api/order";

export const OrderTable = () => {
  const { data, isLoading: loading } = useQuery<Order[]>({
    queryKey: [`dashboard-orders`],
    queryFn: fetchOrders,
  });

  if (loading) return <Loading />;

  const orderColumns: OrderColumn[] =
    data?.map((order) => ({
      id: order.id,
      customer: order.email,
      address: order.address,
      email: order.email,
      payment: order.payment,
      status: order.status,
      totalPrice: order.totalPrice,
      createAt: order.createAt,
    })) || [];

  return <DataTable searchKey="id" columns={columns} data={orderColumns} />;
};
