"use client";

import _http from "@/utils/http";
import { useEffect } from "react";
import { Loading } from "../../_components/loading";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useAccountAnalytic } from "@/hooks/analytic/use-account";

export const AccountTable = () => {
  const { data, fetchAccounts, loading } = useAccountAnalytic();

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  if (loading) return <Loading />;

  return <DataTable searchKey="email" columns={columns} data={data ?? []} />;
};
