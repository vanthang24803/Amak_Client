"use client";

import { Loading } from "../../_components/loading";
import _http from "@/utils/http";
import { DataTable } from "./data-table";
import { columns, OrderColumn } from "./columns";
import { fetchOrders } from "@/services/api/order";
import useSWR from "swr";

export const OrderTable = () => {
  const { data, isLoading: loading } = useSWR(`/Orders`, fetchOrders);

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
