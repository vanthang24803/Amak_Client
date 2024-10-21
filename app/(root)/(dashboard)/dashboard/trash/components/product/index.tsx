"use client";

import useSWR from "swr";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ProductTrash } from "@/types/trash";
import { Loading } from "../../../_components/loading";

export default function TrashProductContainer() {
  const { data, isLoading } = useSWR<ProductTrash[]>(`/Trash/Product`);

  if (isLoading) return <Loading />;

  return <DataTable searchKey="name" data={data ?? []} columns={columns} />;
}
