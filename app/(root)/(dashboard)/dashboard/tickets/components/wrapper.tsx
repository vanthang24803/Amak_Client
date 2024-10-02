"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { CreateTicket } from "./create-ticket";

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
              <CreateTicket reload={() => {}} />
            </div>
            <Separator className="h-[0.1px] bg-neutral-200" />
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
};
