"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/use-auth";

export const EmailDialogDashboard = () => {
  const { profile, getProfile } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-24">
          <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
            Email
          </span>
          <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
            {profile?.email}
          </span>
        </div>
        <Button variant="outline" className="dark:bg-neutral-900 text-[12px]">
          Cập nhật
        </Button>
      </div>
      <Separator />
    </div>
  );
};
