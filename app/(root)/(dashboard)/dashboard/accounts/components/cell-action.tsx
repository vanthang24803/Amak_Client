"use client";

import { Fragment, useState } from "react";
import { CircleUserRound, Copy, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import _http from "@/utils/http";
import { UserAnalytic as AccountColumn } from "@/types/analytic";
import { ProfileInfo } from "./profile-info";

interface CellActionProps {
  data: AccountColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.info("Đã sao chép mã tài khoản!");
  };

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="text-[12px]"
              onClick={() => onCopy(data.id)}
            >
              <Copy className="mr-2 h-4 w-4" />
              {data.isManager ? "Mã nhân viên" : "Mã khách hàng"}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[12px]" onClick={handleToggle}>
              <CircleUserRound className="mr-2 h-4 w-4" />
              Thông tin tài khoản
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileInfo
        open={open}
        handleToggle={handleToggle}
        id={data.id}
        isAdmin={data.isManager}
      />
    </Fragment>
  );
};
