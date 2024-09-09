"use client";

import { Chart as BarChart } from "./bar-chart";


export const Wrapper = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
      <BarChart />
    </div>
    </div>
  );
};
