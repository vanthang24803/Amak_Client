"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
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
import { Fragment, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlertModal } from "@/components/modal/alert-modal";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.info("Đã sao chép id sản phẩm!");
  };

  const onConfirm = async () => {
    try {
      setLoading(true);

      const handleUpdate = _http.delete(`/Products/${data.id}`);

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: async () => {
          await queryClient.invalidateQueries({
            queryKey: [`dashboard-products`],
          });
          setIsOpen(false);
          return "Chuyển vào thùng rác thành công!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
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
            <DropdownMenuItem
              className="text-[12px]"
              onClick={() => setIsOpen(true)}
            >
              <Trash className="mr-2 h-4 w-4" /> Chuyển vào thùng rác
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
};
