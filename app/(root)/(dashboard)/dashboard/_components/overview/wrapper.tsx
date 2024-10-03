"use client";
import _http from "@/utils/http";
import { Chart as BarChart } from "./bar-chart";
import { Chart as AreaChart } from "./area-chart";
import { Chart as PieChart } from "./pie-chart";
import { HeaderOverview } from "./header";
import { TopProductTable } from "./table/product";
import { TopCustomerTable } from "./table/customer";
import { AiDialogDashboard } from "./ai";

export const Wrapper = () => {
  return (
    <div className="flex-col">
      <AiDialogDashboard />
      <div className="flex-1 space-y-4 p-8 pt-6 mb-12">
        <HeaderOverview />
        <BarChart />
        <div className="flex gap-4">
          <div className="w-2/3">
            <AreaChart />
          </div>
          <div className="w-1/3">
            <PieChart />
          </div>
        </div>
        <div className="flex gap-4">
          <TopProductTable />
          <TopCustomerTable />
        </div>
      </div>
    </div>
  );
};
