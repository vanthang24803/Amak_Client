"use client";

import useSWR from "swr";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { OptionTrash } from "@/types/trash";
import { Loading } from "../../../_components/loading";

export default function TrashProductContainer() {
  const { data, isLoading } = useSWR<OptionTrash[]>(`/Trash/Option`);

  if (isLoading) return <Loading />;

  return <DataTable searchKey="name" data={data ?? []} columns={columns} />;
}
