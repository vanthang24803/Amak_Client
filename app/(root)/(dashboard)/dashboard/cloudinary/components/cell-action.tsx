"use client";

import { Fragment, useState } from "react";
import { Copy, MoreHorizontal, Trash } from "lucide-react";
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
import { Cloudinary } from "@/types/cloudinary";

interface CellActionProps {
  data: Cloudinary;
}

export const CellAction = ({ data }: CellActionProps) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    const jsonSend = {
      items: [
        {
          id: data.publicId,
        },
      ],
    };

    try {
      setLoading(true);

      const handleUpdate = _http.post(`/Cloudinary/Delete`, jsonSend);

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: async () => {
          await queryClient.invalidateQueries({
            queryKey: [`dashboard-cloudinary-photos`],
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
    toast.info("Đã sao chép url hình ảnh!", {
      style: {
        fontSize: 13,
        fontWeight: 500,
      },
      duration: 800,
    });
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
              onClick={() => onCopy(data.url)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Url hình ảnh
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
    </Fragment>
  );
};
