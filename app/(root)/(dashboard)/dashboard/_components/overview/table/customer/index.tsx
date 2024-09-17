"use client";

import { useEffect, useState } from "react";
import { TopCustomerTableColumn } from "./columns";
import _http from "@/utils/http";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, subDays } from "date-fns";
import { TimeRange } from "@/types";
import { Loading } from "../../../loading";

type TopCustomerTable = {
  day: TopCustomerTableColumn[];
  week: TopCustomerTableColumn[];
  month: TopCustomerTableColumn[];
};

export const TopCustomerTable = () => {
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("month");

  const currentDate = new Date();
  const startOfWeek = format(subDays(currentDate, 7), "dd/MM/yyyy");
  const startOfMonth = format(subDays(currentDate, 30), "dd/MM/yyyy");
  const endDate = format(currentDate, "dd/MM/yyyy");

  const [data, setData] = useState<TopCustomerTable | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await _http.get(`/Analytic/TopCustomer`);

      if (response.status === 200) {
        setData(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDataForTimeRange = () => {
    if (!data) return [];

    switch (timeRange) {
      case "day":
        return data.day;
      case "week":
        return data.week;
      case "month":
        return data.month;
      default:
        return [];
    }
  };

  return (
    <Card className="w-1/2 flex flex-col gap-1">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="font-bold text-lg tracking-tight scroll-m-20">
            Bảng khách hàng thân thiết
          </CardTitle>
          <CardDescription className="text-[12px] flex items-center gap-2">
            {timeRange === "day" &&
              `Thông tin hôm nay ${format(currentDate, "dd/MM/yyyy")}`}
            {timeRange === "month" &&
              `Thông tin từ ${startOfMonth} - ${endDate}`}
            {timeRange === "week" && `Thông tin từ ${startOfWeek} - ${endDate}`}
          </CardDescription>
        </div>
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as TimeRange)}
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
            <SelectItem value="day" className="rounded-lg text-[12px]">
              Hôm nay
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-4">
        {loading ? (
          <Loading />
        ) : (
          data && <DataTable columns={columns} data={getDataForTimeRange()} />
        )}
      </CardContent>
    </Card>
  );
};
