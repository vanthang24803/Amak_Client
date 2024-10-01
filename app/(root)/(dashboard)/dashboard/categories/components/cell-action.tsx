"use client";

import { useState } from "react";
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

import { CategoryColumn } from "./columns";
import { AlertModal } from "@/components/modal/alert-modal";
import _http from "@/utils/http";
import { UpdateCategory } from "./update-categories";
import { useQueryClient } from "@tanstack/react-query";

interface CellActionProps {
  data: CategoryColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const queryClient = useQueryClient();

  const [openSheet, setOpenSheet] = useState(false);
  const handleToggleSheet = () => setOpenSheet((prev) => !prev);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);

      const handleUpdate = _http.delete(`/Categories/${data.id}`);

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: async () => {
          await queryClient.invalidateQueries({
            queryKey: [`dashboard-categories`],
          });
          setOpen(false);
          return "Xóa thành công!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.info("Đã sao chép id danh mục!", {
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
              Mã danh mục
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-[12px]"
              onClick={handleToggleSheet}
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

      <UpdateCategory
        json={data}
        open={openSheet}
        handleToggle={handleToggleSheet}
      />
    </>
  );
};
