"use client";

import { fetchTickets } from "@/services/api/ticket";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../_components/loading";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const TableTicket = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`dashboard-tickets`],
    queryFn: () => fetchTickets(),
  });

  if (isLoading) return <Loading />;

  return <DataTable columns={columns} data={data ?? []} searchKey="name" />;
};
