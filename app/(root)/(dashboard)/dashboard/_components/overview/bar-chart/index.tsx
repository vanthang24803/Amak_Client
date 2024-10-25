"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, getYear, subDays } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import _http from "@/utils/http";
import { BarChart } from "@/types";
import { YearChart } from "./year-chart";
import { Loading } from "../../loading";
import { DayChart } from "./day-chart";
import { TrendingUp } from "lucide-react";
import { convertPrice } from "@/utils/price";
import { fetchBarOverviewChart } from "@/services/api/overview";
import useSWR from "swr";

export const Chart = () => {
  const [timeRange, setTimeRange] = useState<"year" | "month" | "week">("year");
  const currentDate = new Date();

  const startOfWeek = format(subDays(currentDate, 7), "dd/MM/yyyy");
  const startOfMonth = format(subDays(currentDate, 30), "dd/MM/yyyy");
  const endDate = format(currentDate, "dd/MM/yyyy");

  const { data, isLoading: loading } = useSWR<BarChart>(
    "/Analytic/Bar-Chart",
    fetchBarOverviewChart,
  );

  const total = useMemo(() => {
    if (!data) return 0;

    const total = Object.values(data[timeRange]).reduce(
      (acc, value) => acc + value,
      0,
    );
    return total;
  }, [data, timeRange]);

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-bold text-lg tracking-tight scroll-m-20">
                Biểu đồ doanh thu
              </CardTitle>
              <CardDescription className="text-[12px] flex items-center gap-2">
                {timeRange === "year" &&
                  `Thông tin doanh thu trong năm ${getYear(currentDate)}`}
                {timeRange === "month" &&
                  `Thông tin doanh thu từ ${startOfMonth} - ${endDate}`}
                {timeRange === "week" &&
                  `Thông tin doanh thu từ ${startOfWeek} - ${endDate}`}
                <TrendingUp className="w-4 h-4" />
              </CardDescription>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  Tổng doanh thu
                </span>
                <span className="text-lg font-bold leading-none sm:text-xl">
                  {convertPrice(total)}₫
                </span>
              </div>
              <Select
                value={timeRange}
                onValueChange={(value) =>
                  setTimeRange(value as "year" | "month" | "week")
                }
              >
                <SelectTrigger
                  className="w-[160px] h-10 rounded-lg sm:ml-auto leading-4"
                  aria-label="Select a value"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="year" className="rounded-lg text-[12px]">
                    Tổng quát
                  </SelectItem>
                  <SelectItem value="month" className="rounded-lg text-[12px]">
                    30 ngày trước
                  </SelectItem>
                  <SelectItem value="week" className="rounded-lg text-[12px]">
                    7 ngày trước
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loading />
          ) : (
            <>
              {timeRange === "year" && <YearChart data={data?.year} />}
              {timeRange === "month" && <DayChart data={data?.month} />}
              {timeRange === "week" && <DayChart data={data?.week} />}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
