"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Wrapper = () => {
  return (
    <div className="flex items-center justify-center">
      <Card className="m-4 max-w-screen-xl flex-1">
        <CardContent>
          <CardHeader>
            <div className="flex items-center mb-2">
              <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
                Thùng rác
              </h2>
            </div>
            <Separator />
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
};
