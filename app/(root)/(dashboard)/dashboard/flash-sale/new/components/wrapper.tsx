"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { CreateFlashSaleForm } from "./create-flash-sale-form";
import { Separator } from "@/components/ui/separator";

export const Wrapper = () => {
  return (
    <Card className="m-4 flex-1">
      <CardContent>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-end mb-2 gap-2">
              <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
                Khởi tạo
              </h2>
            </div>
          </div>
          <Separator />
        </CardHeader>
        <div className="flex flex-col gap-3 pl-8">
          <CreateFlashSaleForm />
        </div>
      </CardContent>
    </Card>
  );
};
