"use client";

import { Loading } from "../../_components/loading";
import _http from "@/utils/http";
import { DataTable } from "./data-table";
import { columns, OrderColumn } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { Order, Pagination } from "@/types";
import { fetchOrders } from "@/services/api/order";
import { useState } from "react";
import { PaginationTable } from "@/types/pagination-table";

export const CategoriesTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<PaginationTable>(10);
  const { data, isLoading: loading } = useQuery<Pagination<Order[]>>({
    queryKey: [`dashboard-orders-${currentPage}-${limit}`],
    queryFn: () => fetchOrders(currentPage, limit),
  });

  if (loading) return <Loading />;

  const orderColumns: OrderColumn[] =
    data?.result?.map((order) => ({
      id: order.id,
      customer: order.email,
      address: order.address,
      email: order.email,
      payment: order.payment,
      status: order.status,
      totalPrice: order.totalPrice,
      createAt: order.createAt,
    })) || [];

  return (
    <DataTable
      searchKey="id"
      columns={columns}
      data={orderColumns}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      itemsPerPage={limit}
      onItemsPerPageChange={setLimit}
      totalItem={data?._totalItems || 10}
      totalPage={data?._totalPage || 1}
    />
  );
};
