"use client";

import { useEffect, useState } from "react";
import { Loading } from "../../_components/loading";
import _http from "@/utils/http";
import { Pagination, Product } from "@/types";
import { DataTable } from "./data-table";
import { columns, ProductColumn } from "./columns";

export const ProductTable = () => {
  const [data, setData] = useState<Pagination<Product[]>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await _http.get(`/Products`);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loading />;

  const productColumns: ProductColumn[] =
    data?.result.map((product) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      sold: product.sold,
      options: product.options,
      createAt: product.createAt,
    })) || [];

  return <DataTable searchKey="name" columns={columns} data={productColumns} />;
};
