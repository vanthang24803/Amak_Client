"use client";

import { Category, Response } from "@/types";
import _http from "@/utils/http";
import { useEffect, useState } from "react";
import { Loading } from "../../_components/loading";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "./data-table";

export const Table = () => {
  const [data, setData] = useState<Response<Category[]>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await _http.get(`/Categories`);

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
    fetchData();
  }, []);

  if (loading) return <Loading />;
  const categoryColumns: CategoryColumn[] =
    data?.result.map((product) => ({
      id: product.id,
      name: product.name,
      createAt: product.createAt,
    })) || [];

  return (
    <DataTable searchKey="name" columns={columns} data={categoryColumns} />
  );
};
