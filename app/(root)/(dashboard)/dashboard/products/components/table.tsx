"use client";

import _http from "@/utils/http";
import { Loading } from "../../_components/loading";
import { DataTable } from "./data-table";
import { columns, ProductColumn } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/dashboard/product";

export const ProductTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`dashboard-products`],
    queryFn: () => fetchProducts(),
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

  return <DataTable searchKey="name" columns={columns} data={productColumns} />;
};
