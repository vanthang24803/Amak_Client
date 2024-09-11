"use client";

import { convertPrice } from "@/utils/price";

export const CustomTooltip = ({ active, payload, text, label }: any) => {
  if (!active) return null;
  return (
    <div className="p-4 bg-neutral-100 dark:bg-slate-900 flex flex-col gap-4 rounded-md overflow-hidden">
      <div className="flex flex-col gap-1">
        <span className="capitalize">{(label)}</span>
        <div className="text-sm text-primary font-medium flex items-center space-x-1 ">
          <p className="text-[11px] text-muted-foreground">{text}:</p>
          <span
            className={`ml-2 font-semibold text-[12px] ${payload[0].value > 0 ? "text-emerald-500" : "text-destructive"}`}
          >
            {payload[0].value > 0
              ? `${convertPrice(payload[0].value)}₫ `
              : "Không có dữ liệu"}
          </span>
        </div>
      </div>
    </div>
  );
};
