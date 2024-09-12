"use client";

import { Bookmark, DollarSign, Inbox, Package } from "lucide-react";
import { CustomCard } from "./card-overview";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { AnalyticStatistic } from "@/types/statistic";
import _http from "@/utils/http";
import { Separator } from "@/components/ui/separator";

export const HeaderOverview = () => {
  const [data, setData] = useState<AnalyticStatistic | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAnalytic = async () => {
    setLoading(true);
    try {
      const response = await _http.get(`/Analytic/Statistic`);
      if (response.status === 200) {
        setData(response.data.result);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytic();
  }, []);

  const renderCard = (
    title: string,
    isStock: boolean,
    icon: React.ReactNode,
    total: number,
    stock: number
  ) => (
    <CustomCard
      title={title}
      isStock={isStock}
      icon={icon}
      content={
        <div className="text-2xl font-bold">
          <CountUp end={total} start={0} duration={1.25} />
        </div>
      }
      percentChange={stock}
    />
  );

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <Separator key={index} className="w-full h-[16vh] rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-[18vh] grid grid-cols-4 gap-3">
      {data?.revenue && (
        <CustomCard
          title="Doanh thu"
          isStock={data?.revenue.isStock}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          content={
            <div className="text-2xl font-bold">
              <CountUp end={data.revenue.total} start={0} duration={1.25} />₫
            </div>
          }
          percentChange={data.revenue.stock}
        />
      )}
      {data?.order &&
        renderCard(
          "Đơn hàng",
          data.order.isStock,
          <Package className="h-4 w-4 text-muted-foreground" />,
          data.order.total,
          data.order.stock
        )}
      {data?.warehouse &&
        renderCard(
          "Kho hàng",
          data.warehouse.isStock,
          <Inbox className="h-4 w-4 text-muted-foreground" />,
          data.warehouse.total,
          data.warehouse.stock
        )}
      {data?.saleOut &&
        renderCard(
          "Đã bán",
          data.saleOut.isStock,
          <Bookmark className="h-4 w-4 text-muted-foreground" />,
          data.saleOut.total,
          data.saleOut.stock
        )}
    </div>
  );
};
