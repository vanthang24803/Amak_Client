"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreateTicket } from "./create-ticket";
import { Separator } from "@/components/ui/separator";
import { TableTicket as Table } from "./table";

export const Wrapper = () => {
  return (
    <div className="flex items-center justify-center">
      <Card className="m-4 max-w-screen-xl flex-1">
        <CardContent>
          <CardHeader>
            <div className="flex items-center mb-2 justify-between">
              <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
                Mã giảm giá
              </h2>
              <CreateTicket />
            </div>
            <Separator />
          </CardHeader>
          <Table />
        </CardContent>
      </Card>
    </div>
  );
};
