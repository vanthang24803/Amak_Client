"use client";

import _http from "@/utils/http";
import { Loading } from "../../_components/loading";
import { DataTable } from "./data-table";
import { columns, ProductColumn } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/api/product";
import { useState } from "react";
import { PaginationTable } from "@/types/pagination-table";

export const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<PaginationTable>(10);

  const { data, isLoading } = useQuery({
    queryKey: [`dashboard-products-${currentPage}-${limit}`],
    queryFn: () => fetchProducts(currentPage, limit),
  });

  if (isLoading) return <Loading />;

  const productColumns: ProductColumn[] =
    data?.data.result.map((product) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      sold: product.sold,
      options: product.options,
      createAt: product.createAt,
    })) || [];

  return (
    <DataTable
      searchKey="name"
      data={productColumns}
      columns={columns}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      itemsPerPage={limit}
      onItemsPerPageChange={setLimit}
      totalItem={data?.data._totalItems || 10}
      totalPage={data?.data._totalPage || 1}
    />
  );
};
