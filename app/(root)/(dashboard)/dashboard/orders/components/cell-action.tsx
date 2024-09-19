"use client";

import { Copy, Edit, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

import { OrderColumn } from "./columns";

interface CellActionProps {
  data: OrderColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.info("Đã sao chép id đơn hàng!");
  };

  return (
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
            Mã đơn hàng
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-[12px]"
            onClick={() => router.push(`/dashboard/orders/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Cập nhật
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
