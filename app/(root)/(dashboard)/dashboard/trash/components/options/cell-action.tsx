"use client";

import { MoreHorizontal, Trash, Undo2 } from "lucide-react";
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
import { OptionTrash } from "@/types/trash";
import { mutate } from "swr";
import { Fragment, useState } from "react";
import { AlertModal } from "@/components/modal/alert-modal";

interface CellActionProps {
  data: OptionTrash;
}

export const CellAction = ({ data }: CellActionProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const onRevert = async () => {
    const jsonSend = {
      reverts: [
        {
          id: data.id,
        },
      ],
    };

    try {
      const handleRevert = _http.post(`/Revert/Option`, jsonSend);

      toast.promise(handleRevert, {
        loading: "Đang xử lý...",
        success: async () => {
          mutate("/Trash/Option");
          return "Khôi phục thành công!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onDelete = async () => {
    toast.info("It's work");
    // try {
    //   const handleUpdate = _http.delete(`/Options/${data.id}`);
    //   toast.promise(handleUpdate, {
    //     loading: "Đang xử lý...",
    //     success: async () => {
    //       mutate("/Trash/Option");
    //       setOpen(false);
    //       return "Xóa thành công!";
    //     },
    //     error: () => "Oops!",
    //   });
    // } catch (error) {
    //   console.log("Error:", error);
    // }
  };

  return (
    <Fragment>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={false}
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
            <DropdownMenuItem className="text-[12px]" onClick={onRevert}>
              <Undo2 className="mr-2 h-4 w-4" />
              Khôi phục
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[12px]" onClick={onDelete}>
              <Trash className="mr-2 h-4 w-4" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
};
