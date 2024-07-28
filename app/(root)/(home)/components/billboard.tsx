"use client";

import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/use-fetch";
import { Billboard } from "@/types/biilborad";
import { Slider } from "./slider";
import { SubBillboard } from "./sub-billboard";

export const BillboardComponent = () => {
  const { data, loading } = useFetch<Billboard[]>({
    url: `/Billboards`,
  });

  if (!data) {
    return <Skeleton className="bg-white lg:h-[60vh] h-[30vh] w-full m-2" />;
  }

 
  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between">
      <Slider billboards={data || []} />
      <SubBillboard />
    </div>
  );
};
