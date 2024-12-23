"use client";

import { fetchAllFlashSale } from "@/services/api/flash-sale";
import useSWR from "swr";
import { Loading } from "../../_components/loading";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const Render = () => {
  const { data, isLoading } = useSWR(`/FlashSale`, () => fetchAllFlashSale());

  return (
    <div className="pb-20">
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable searchKey="id" columns={columns} data={data || []} />
      )}
    </div>
  );
};
