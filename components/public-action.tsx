"use client";

import { User } from "@/components/svg";
import { PackageSearch } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

export const PublicAction = () => {
  return (
    <div className={`${font.className} flex items-center space-x-2`}>
      <Link href="/login">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-200">
                <User />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className={`text-[13px] capitalize`}>Đăng nhập</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
      <Link href="/tra-cuu">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-200">
                <PackageSearch strokeWidth={1.25} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className={`text-[13px] capitalize`}>Tra cứu đơn hàng</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    </div>
  );
};
