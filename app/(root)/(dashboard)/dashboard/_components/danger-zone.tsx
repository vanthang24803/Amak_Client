"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const DangerZone = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-20">
          <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
            Xóa tài khoản
          </span>
          <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight w-[355px]">
            Tài khoản sẽ bị xóa vĩnh viễn và không thể khôi phục được. Dịch vụ
            sẽ bị chấm dứt và việc thanh toán sẽ dừng lại.
          </span>
        </div>
        <Button
          variant="destructive"
          className="text-[12px]"
          onClick={() => toast.success("=)) Không xóa được đâu")}
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};
