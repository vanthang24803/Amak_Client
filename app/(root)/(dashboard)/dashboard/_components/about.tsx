"use client";

import { Separator } from "@radix-ui/react-separator";
import { format } from "date-fns";
import Image from "next/image";

export const About = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold tracking-tight">Phiên bản</h1>
        <Separator />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <Image
            src="/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="dark:bg-[#d3cfc9] bg-[#f3ebda] p-4 rounded"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold tracking-tighter">Amak Store</h1>
            <span className="text-[12px] dark:text-destructive-foreground">
              Version 1.0.0-release.{format(new Date(), "MM.dd.yyyy")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
