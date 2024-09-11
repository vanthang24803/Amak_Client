"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { format, subDays } from "date-fns";
import { AreaChart as ChartType } from "@/types";
import _http from "@/utils/http";
import { Loading } from "../../loading";

export function Chart() {
  const [timeRange, setTimeRange] = useState<"month" | "week">("month");
  const [chartData, setData] = useState<ChartType | null>(null);
  const [loading, setLoading] = useState(false);

  const currentDate = new Date();

  const startOfWeek = format(subDays(currentDate, 7), "dd/MM/yyyy");
  const startOfMonth = format(subDays(currentDate, 30), "dd/MM/yyyy");
  const endDate = format(currentDate, "dd/MM/yyyy");

  const chartConfig = {
    input: {
      label: "Nhập",
      color: "hsl(var(--chart-1))",
    },
    output: {
      label: "Xuất",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const fetchChart = async () => {
    try {
      setLoading(true);
      const response = await _http.get(`/Analytic/AreaChart`);
      if (response.status === 200) {
        setData(response.data.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = timeRange === "month" ? chartData?.month : chartData?.week;

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="font-bold text-lg tracking-tight scroll-m-20">
            Biểu đồ nhập xuất kho hàng
          </CardTitle>
          <CardDescription className="text-[12px] flex items-center gap-2">
            {timeRange === "month" &&
              `Thông tin nhập xuất từ ${startOfMonth} - ${endDate}`}
            {timeRange === "week" &&
              `Thông tin nhập xuất từ ${startOfWeek} - ${endDate}`}
          </CardDescription>
        </div>
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as "month" | "week")}
        >
          <SelectTrigger
            className="w-[160px] h-10 rounded-lg sm:ml-auto leading-4"
            aria-label="Select a value"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="month" className="rounded-lg text-[12px]">
              30 ngày trước
            </SelectItem>
            <SelectItem value="week" className="rounded-lg text-[12px]">
              7 ngày trước
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[32vh] w-full"
        >
          {loading ? (
            <Loading />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorInput" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-2))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-2))"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("vi", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("vi", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="input"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorInput)"
                  name="Nhập"
                />
                <Area
                  type="monotone"
                  dataKey="output"
                  stackId="1"
                  stroke="hsl(var(--chart-2))"
                  fillOpacity={1}
                  fill="url(#colorOutput)"
                  name="Xuất"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
