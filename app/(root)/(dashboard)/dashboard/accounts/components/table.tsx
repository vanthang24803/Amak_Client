"use client";

import { UserAnalytic, Response } from "@/types";
import _http from "@/utils/http";
import { useEffect, useState } from "react";
import { Loading } from "../../_components/loading";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const AccountTable = () => {
  const [data, setData] = useState<Response<UserAnalytic[]>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await _http.get(`/Analytic/Accounts`);

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

  return (
    <DataTable searchKey="email" columns={columns} data={data?.result ?? []} />
  );
};
