"use client";

import _http from "@/utils/http";
import { Loading } from "../../_components/loading";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticAccounts } from "@/services/api/account";

export const AccountTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`dashboard-analytic-accounts`],
    queryFn: () => fetchAnalyticAccounts(),
  });

  if (isLoading) return <Loading />;

  return (
    <DataTable
      searchKey="email"
      columns={columns}
      data={data?.data.result ?? []}
    />
  );
};
