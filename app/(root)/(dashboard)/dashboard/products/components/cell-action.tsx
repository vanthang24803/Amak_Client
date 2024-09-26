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

import { ProductColumn } from "./columns";
import _http from "@/utils/http";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.info("Đã sao chép id sản phẩm!");
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
            Mã sản phẩm
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-[12px]"
            onClick={() => router.push(`/dashboard/products/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Cập nhật
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
