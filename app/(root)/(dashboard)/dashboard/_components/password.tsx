"use client";

import { Button } from "@/components/ui/button";

export const PasswordDialogDashboard = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-20">
          <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
            Mật khẩu
          </span>
          <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
            ************
          </span>
        </div>
        <Button variant="outline" className="dark:bg-neutral-900 text-[12px]">
          Cập nhật
        </Button>
      </div>
    </div>
  );
};
