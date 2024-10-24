"use client";

import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
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
import { Option } from "@/types";
import { UpdateOption } from "./update-option";
import { AlertModal } from "@/components/modal/alert-modal";
import { useParams } from "next/navigation";
import _http from "@/utils/http";
import { mutate } from "swr";

interface CellActionProps {
  data: Option;
}

export const CellAction = ({ data }: CellActionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const params = useParams<{ id: string }>();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.info("Đã sao chép id đơn hàng!");
  };

  const handleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  const onConfirm = async () => {
    try {
      setIsLoading(true);

      const handleDelete = _http.delete(
        `/Products/${params.id}/Options/${data.id}`,
      );

      toast.promise(handleDelete, {
        loading: "Đang xử lý...",
        success: () => {
          mutate(`/Products/${params.id}`);
          setIsOpenDialog(false);
          return "Xóa thành công!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.log("Error updating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        onConfirm={onConfirm}
        loading={isLoading}
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
            <DropdownMenuItem className="text-[12px]" onClick={handleSheet}>
              <Edit className="mr-2 h-4 w-4" /> Cập nhật
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-[12px]"
              onClick={() => setIsOpenDialog(true)}
            >
              <Trash className="mr-2 h-4 w-4" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateOption open={isSheetOpen} handleOpen={handleSheet} option={data} />
    </>
  );
};
