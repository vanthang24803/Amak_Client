"use client";

import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { Billboard } from "@/types";
import { Slider } from "./slider";
import { SubBillboard } from "./sub-billboard";

export const BillboardComponent = () => {
  const { data: billboards } = useSWR<Billboard[]>("/Billboards");

  if (!billboards) {
    return <Skeleton className="bg-white lg:h-[60vh] h-[30vh] w-full m-2" />;
  }

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between">
      <Slider billboards={billboards || []} />
      <SubBillboard />
    </div>
  );
};
