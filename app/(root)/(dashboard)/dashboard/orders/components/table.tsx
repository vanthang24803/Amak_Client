"use client";

import { useEffect, useState } from "react";
import { Loading } from "../../_components/loading";
import _http from "@/utils/http";
import { Order, Pagination } from "@/types";
import { DataTable } from "./data-table";
import { columns, OrderColumn } from "./columns";

export const OrderTable = () => {
  const [data, setData] = useState<Pagination<Order[]>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await _http.get(`/Orders`);

      if (response.status === 200) {
        console.log(response.data);
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  const orderColumns: OrderColumn[] =
    data?.result.map((order) => ({
      id: order.id,
      customer: order.customer,
      address: order.address,
      email: order.email,
      payment: order.payment,
      status: order.status,
      totalPrice: order.totalPrice,
      createAt: order.createAt,
    })) || [];

  return <DataTable searchKey="id" columns={columns} data={orderColumns} />;
};
