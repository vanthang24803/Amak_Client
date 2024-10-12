"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { MomoContainer } from "./momo-container";

export const Wrapper = () => {
  return (
    <Card className="m-4  flex-1">
      <CardContent>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-end mb-2 gap-2">
              <Image src="/momo-icon.ico" width={28} height={28} alt="Gmail" />
              <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
                Thanh toán Momo
              </h2>
            </div>
          </div>
          <Separator />
          <MomoContainer />
        </CardHeader>
      </CardContent>
    </Card>
  );
};
