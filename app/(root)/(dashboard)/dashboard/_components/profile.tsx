"use client";

import { Separator } from "@/components/ui/separator";
import { AvatarDashboardDialog } from "./avatar";
import { EmailDialogDashboard } from "./email";
import { FullNameDialogDashboard } from "./username";
import { PasswordDialogDashboard } from "./password";
import { DangerZone } from "./danger-zone";

export const Profile = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold tracking-tight">Tài khoản của tôi</h1>
        <Separator />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
            Thông tin
          </span>

          <div className="w-full p-4 flex flex-col gap-3 border  rounded-lg">
            <AvatarDashboardDialog />
            <EmailDialogDashboard />
            <FullNameDialogDashboard />
            <PasswordDialogDashboard />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
            Cảnh báo
          </span>

          <div className="w-full p-4 flex flex-col gap-3 border  rounded-lg">
            <DangerZone />
          </div>
        </div>
      </div>
    </div>
  );
};
