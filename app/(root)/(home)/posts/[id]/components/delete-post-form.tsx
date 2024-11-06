"use client";

import { Inter } from "next/font/google";
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
import { Trash2 } from "lucide-react";

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

type Props = {
  handleDelete: () => void;
};

export const DeletePostFrom = ({ handleDelete }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex justify-start">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="absolute top-0 right-0"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className={`${font.className}`}>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có muốn xóa không?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể quay trở lại!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Thoát</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
