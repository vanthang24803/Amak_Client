"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import _http from "@/utils/http";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { OverviewTooltip } from "./overview-tooltip";
import { convertToVietnameseMonth } from "@/utils/date";

type Props = {
  data: any;
};

export const YearChart = ({ data }: Props) => {
  const chartConfig = {
    desktop: {
      color: "#0891b2",
    },
  } satisfies ChartConfig;

  const convertChart = (data: any) => {
    if (data) {
      return Object.entries(data).map(([month, product]) => ({
        month,
        total: product,
      }));
    }
  };

  return (
    <ChartContainer config={chartConfig} className="h-[60vh] w-full aspect-auto">
      <BarChart data={convertChart(data)} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => {
            let newValue = value.slice(0, 3);
            
            return convertToVietnameseMonth(newValue) || newValue;
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<OverviewTooltip text="Doanh thu" />}
        />
        <Bar dataKey="total" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
