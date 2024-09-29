"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
  ChartStyle,
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
import { Skeleton } from "@/components/ui/skeleton";
import _http from "@/utils/http";
import { Loading } from "../../loading";
import { useQuery } from "@tanstack/react-query";
import { fetchPieChart } from "@/services/dashboard/overview";

export type PieChartType = {
  month: string;
  account: number;
};

const monthTranslations: { [key: string]: string } = {
  Jan: "Tháng 1",
  Feb: "Tháng 2",
  Mar: "Tháng 3",
  Apr: "Tháng 4",
  May: "Tháng 5",
  Jun: "Tháng 6",
  Jul: "Tháng 7",
  Aug: "Tháng 8",
  Sep: "Tháng 9",
  Oct: "Tháng 10",
  Nov: "Tháng 11",
  Dec: "Tháng 12",
};

const translateMonth = (month: string): string => {
  return monthTranslations[month] || month;
};

const generateChartConfig = (data: PieChartType[]): ChartConfig => {
  const config: ChartConfig = {
    accounts: {
      label: "Tài khoản",
    },
  };

  data.forEach((item, index) => {
    const key = item.month.toLowerCase();
    config[key] = {
      label: translateMonth(item.month),
      color: `hsl(var(--chart-${(index % 12) + 1}))`,
    };
  });

  return config;
};

export const Chart = () => {
  const id = "dynamic-pie-chart";

  const [activeMonth, setActiveMonth] = React.useState<string | null>(null);

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<PieChartType[]>({
    queryKey: ["dashboard-analytic-pie-chart"],
    queryFn: fetchPieChart,
  });

  React.useEffect(() => {
    if (data && data.length > 0) {
      setActiveMonth(data[0].month);
    }
  }, [data]);

  const chartConfig = React.useMemo(
    () => (data ? generateChartConfig(data) : {}),
    [data]
  );

  const accountData = React.useMemo(
    () =>
      data
        ? data.map((item) => ({
            ...item,
            month: translateMonth(item.month),
            fill: `var(--color-${item.month.toLowerCase()})`,
          }))
        : [],
    [data]
  );

  const activeIndex = React.useMemo(
    () =>
      accountData.findIndex(
        (item) => item.month === translateMonth(activeMonth || "")
      ),
    [activeMonth, accountData]
  );

  const months = React.useMemo(
    () => (data ? data.map((item) => item.month) : []),
    [data]
  );

  if (loading) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <Skeleton className="w-[300px] h-[300px] rounded-full" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <p className="text-red-500">{error.message}</p>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <p>Không có dữ liệu</p>
      </Card>
    );
  }

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle className="font-bold text-lg tracking-tight scroll-m-20">
            Biểu đồ khách hàng
          </CardTitle>
          <CardDescription className="text-[12px] flex items-center gap-2">
            {`${translateMonth(data[data.length - 1].month)}/${new Date().getFullYear()} -${translateMonth(data[0].month)}/${new Date().getFullYear()}`}
          </CardDescription>
        </div>
        <Select value={activeMonth || ""} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Chọn tháng"
          >
            <SelectValue placeholder="Chọn tháng" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((month) => {
              const key = month.toLowerCase();
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={month}
                  value={month}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        {loading ? (
          <Loading />
        ) : (
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={accountData}
                dataKey="account"
                nameKey="month"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {accountData[
                              activeIndex
                            ]?.account.toLocaleString() || "0"}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Tài khoản
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
