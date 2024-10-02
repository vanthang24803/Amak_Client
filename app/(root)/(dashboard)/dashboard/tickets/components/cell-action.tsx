"use client";

import { Fragment, useState } from "react";
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

import { AlertModal } from "@/components/modal/alert-modal";
import _http from "@/utils/http";
import { useQueryClient } from "@tanstack/react-query";
import { Ticket } from "@/types";
import { UpdateTicket } from "./update-ticket";

interface CellActionProps {
  data: Ticket;
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
      const handleDelete = _http.delete(`/Tickets/${data.id}`);
      toast.promise(handleDelete, {
        loading: "Đang xử lý...",
        success: async () => {
          await queryClient.invalidateQueries({
            queryKey: [`dashboard-tickets`],
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

  const onCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.info("Đã sao chép mã giảm giá");
  };

  return (
    <Fragment>
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
              onClick={() => onCopy(data.code)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Mã giảm giá
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

      <UpdateTicket
        open={openSheet}
        handleToggle={handleToggleSheet}
        ticket={data}
      />
    </Fragment>
  );
};
