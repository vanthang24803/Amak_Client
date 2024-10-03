"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { marked } from "marked";
import Image from "next/image";

type Props = {
  isLoading: boolean;
  message: string;
};

export const ReviewAI = ({ isLoading, message }: Props) => {
  return (
    <div className="text-[14px] tracking-tighter font-bold">
      <div className="flex items-center space-x-2">
        <Image
          src="https://salt.tikicdn.com/ts/ta/d3/d4/1c/1d4ee6bf8bc9c5795529ac50a6b439dd.png"
          width={24}
          height={24}
          alt="bot"
        />
        <div className="flex items-center gap-1">
          <h3 className="font-bold tracking-tighter text-md text-sky-600">
            Trợ lý AI
          </h3>
          <span className="font-semibold">
            tổng hợp từ các đánh giá mới nhất
          </span>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col my-1 gap-1">
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-[65%] h-4" />
          <Skeleton className="w-[75%] h-4" />
          <Skeleton className="w-[90%] h-4" />
          <Skeleton className="w-full h-4" />
        </div>
      ) : (
        <div
          className="text-[13px] leading-4 font-medium"
          dangerouslySetInnerHTML={{ __html: marked(message) }}
        />
      )}
    </div>
  );
};
