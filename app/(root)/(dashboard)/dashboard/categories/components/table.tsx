"use client";

import _http from "@/utils/http";
import { useEffect } from "react";
import { Loading } from "../../_components/loading";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "./data-table";
import { useCategoriesAnalytic } from "@/hooks/analytic/use-categories";

export const Table = () => {
  const { fetchCategories, data, loading } = useCategoriesAnalytic();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) return <Loading />;

  const categoryColumns: CategoryColumn[] =
    data.map((product) => ({
      id: product.id,
      name: product.name,
      createAt: product.createAt,
    })) || [];

  return (
    <DataTable searchKey="name" columns={columns} data={categoryColumns} />
  );
};
