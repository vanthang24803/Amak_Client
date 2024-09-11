"use client";
import _http from "@/utils/http";
import { Chart as BarChart } from "./bar-chart";
import { Chart as AreaChart } from "./area-chart";

export const Wrapper = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BarChart />
        <div className="flex">
          <div className="basis-3/4">
            <AreaChart />
          </div>
        </div>
      </div>
    </div>
  );
};
