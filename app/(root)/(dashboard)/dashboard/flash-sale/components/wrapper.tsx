"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Render } from "./render";

export const Wrapper = () => {
  const router = useRouter();

  return (
    <Card className="m-4  flex-1">
      <CardContent>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-end mb-2 gap-2">
              <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
                Danh sách Flash-sale
              </h2>
            </div>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => router.push(`/dashboard/flash-sale/new`)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <Separator />
        </CardHeader>
        <div className="flex flex-col gap-3 pl-8">
          <Render />
        </div>
      </CardContent>
    </Card>
  );
};
