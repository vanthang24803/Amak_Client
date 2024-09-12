"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { CustomTooltip } from "./custom-tooltip";

type Props = {
  data: any;
};

export const DayChart = ({ data }: Props) => {
  const chartConfig = {
    total: {
      color: "#0891b2",
    },
  } satisfies ChartConfig;

  const convertChart = (data: any) => {
    if (data) {
      return Object.entries(data).map(([date, order]) => ({
        date,
        total: order,
      }));
    }
  };

  const [activeChart, _] = useState<keyof typeof chartConfig>("total");
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[50vh] w-full"
    >
      <BarChart
        accessibilityLayer
        data={convertChart(data)}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("vi", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip content={<CustomTooltip text="Doanh thu" />} />
        <Bar
          dataKey={activeChart}
          fill={`var(--color-${activeChart})`}
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
};
