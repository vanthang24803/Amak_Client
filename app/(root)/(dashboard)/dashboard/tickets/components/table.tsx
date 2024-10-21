"use client";

import { fetchTickets } from "@/services/api/ticket";
import { Loading } from "../../_components/loading";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useSWR from "swr";

export const TableTicket = () => {
  const { data, isLoading } = useSWR(`/Tickets`, fetchTickets);

  if (isLoading) return <Loading />;

  return <DataTable columns={columns} data={data ?? []} searchKey="name" />;
};
