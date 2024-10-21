"use client";

import _http from "@/utils/http";
import { Loading } from "../../_components/loading";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchCategories } from "@/services/api/category";
import useSWR from "swr";

export const Table = () => {
  const { data, isLoading } = useSWR("/Categories", fetchCategories);

  if (isLoading) return <Loading />;

  const categoryColumns: CategoryColumn[] =
    data?.data.result.map((product) => ({
      id: product.id,
      name: product.name,
      createAt: product.createAt,
    })) || [];

  return (
    <DataTable searchKey="name" columns={columns} data={categoryColumns} />
  );
};
