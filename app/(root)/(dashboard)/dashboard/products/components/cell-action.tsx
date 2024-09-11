"use client";

import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
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
import { AlertModal } from "@/components/modal/alert-modal";
import _http from "@/utils/http";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onConfirm = async () => {
    toast.loading("Waiting");
    try {
      setLoading(true);
      await _http.delete(`/api/product/${data.id}`);
      toast.dismiss();
      toast.success("Product deleted.");
      router.refresh();
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      toast.dismiss();
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Đã sao chép id sản phẩm!", {
      style: {
        fontSize: 13,
        fontWeight: 500,
      },
      duration: 800,
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
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
            <DropdownMenuItem
              className="text-[12px]"
              onClick={() => setOpen(true)}
            >
              <Trash className="mr-2 h-4 w-4" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};