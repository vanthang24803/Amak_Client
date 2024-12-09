"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { Power } from "lucide-react";
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

export const Logout = () => {
  const { logout } = useAuth();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 p-2 text-[12px]  mr-2 justify-start "
        >
          <Power className="w-4 h-4" /> Đăng xuất
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-zinc-900/90">
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có muốn đăng xuất không?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn sẽ xuất khỏi trang quản trị hệ thống!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Thoát</AlertDialogCancel>
          <AlertDialogAction onClick={() => logout()}>Đông ý</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
