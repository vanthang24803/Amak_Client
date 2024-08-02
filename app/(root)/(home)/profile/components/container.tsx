"use client";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Information } from "./information";

export const Container = () => {
  const [isActive, setActive] = useState(false);

  return (
    <div className="w-full flex flex-col space-y-8">
      <div className="flex items-center justify-center flex-col  space-y-4 ">
        <h1 className="text-2xl  font-bold">Tài khoản của bạn</h1>
        <Separator className="w-[100px] h-1 bg-black rounded" />
      </div>

      <div className="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
        <h2 className="uppercase font-bold tracking-tight">
          THÔNG TIN TÀI KHOẢN
        </h2>
        {isActive ? <></> : <Information />}
      </div>
    </div>
  );
};
