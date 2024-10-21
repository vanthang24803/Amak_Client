"use client";

import _http from "@/utils/http";
import { Loading } from "../../_components/loading";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { fetchAnalyticAccounts } from "@/services/api/account";
import useSWR from "swr";

export const AccountTable = () => {
  const { data, error, isLoading } = useSWR(
    "/Analytic/Accounts",
    fetchAnalyticAccounts
  );

  if (isLoading) return <Loading />;

  if (error) console.log(error);

  return (
    <DataTable
      searchKey="email"
      columns={columns}
      data={data?.data.result ?? []}
    />
  );
};
