"use client";

import useAuth from "@/hooks/use-auth";
import _http from "@/utils/http";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

type Props = {
  id: string;
};

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const Remove = ({ id }: Props) => {
  const { getProfile } = useAuth();

  const removeAddress = async (id: string) => {
    try {
      const response = await _http.delete(`/Addresses/${id}`);

      if (response.status == 200) {
        getProfile();
        toast.success("Xóa thành công!", {
          className: "text-[14px] tracking font-medium tracking-tighter",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra!", {
        className: "text-[14px] tracking font-medium tracking-tighter",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex justify-start">
          <Button
            variant="ghost"
            className="text-destructive font-medium hover:text-destructive/90"
          >
            Xoá
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className={font.className}>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có muốn xóa không?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể quay khôi phục!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Thoát</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => removeAddress(id)}
            className="bg-destructive hover:bg-destructive/90"
          >
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
