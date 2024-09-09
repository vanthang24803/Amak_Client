"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Chart = () => {
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#0891b2",
    },
  } satisfies ChartConfig;
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full min-h-[80vh] max-w-screen-xl">
        <CardHeader>
          <CardTitle>Biểu đồ cột</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="w-full max-w-md h-auto"
          >
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
