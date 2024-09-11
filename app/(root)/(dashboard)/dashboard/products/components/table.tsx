"use client";

import _http from "@/utils/http";
import { useEffect } from "react";
import { Loading } from "../../_components/loading";
import { DataTable } from "./data-table";
import { columns, ProductColumn } from "./columns";
import { useProductsAnalytic } from "@/hooks/analytic/use-product";

export const ProductTable = () => {
  const { fetchProducts, data, loading } = useProductsAnalytic();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <Loading />;

  const productColumns: ProductColumn[] =
    data.map((product) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      sold: product.sold,
      options: product.options,
      createAt: product.createAt,
    })) || [];

  return <DataTable searchKey="name" columns={columns} data={productColumns} />;
};
