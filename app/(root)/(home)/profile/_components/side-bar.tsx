"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { Inter } from "next/font/google";
import useClient from "@/hooks/use-client";
import { Skeleton } from "@/components/ui/skeleton";

const menu = [
  {
    name: "Thông tin tài khoản",
    url: "/profile",
  },
  {
    name: "Địa chỉ",
    url: "/profile/address",
  },
  {
    name: "Đơn hàng",
    url: "/profile/order",
  },
];

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const Sidebar = () => {
  const { profile, logout } = useAuth();

  const { isClient } = useClient();

  const pathname = usePathname();
  const router = useRouter();

  if (!isClient)
    return (
      <div className="hidden md:flex items-center justify-between mx-3">
        <div className="flex flex-col space-y-3 h-[30vh] lg:h-[50vh] basis-1/3">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className=" md:w-[200px] h-12 bg-white " />
          ))}
        </div>
      </div>
    );

  return (
    <div className="lg:flex flex-col space-y-4 md:mt-20 m-4 hidden lg:w-1/6">
      <h2 className="uppercase font-bold mx-4 text-lg tracking-tighter">
        TÀI KHOẢN
      </h2>
      {menu.map((item, _) => (
        <Link href={item.url} key={_}>
          <Button
            variant={pathname === item.url ? "primary" : "ghost"}
            className="w-full md:w-[160px] rounded-sm justify-start tracking-tighter font-semibold"
          >
            {item.name}
          </Button>
        </Link>
      ))}
      {profile?.roles.includes("ADMIN") && (
        <Button
          variant={pathname === "/profile/blogs" ? "primary" : "ghost"}
          onClick={() => router.push(`/profile/blogs`)}
          className="w-full md:w-[160px] justify-start tracking-tighter font-semibold"
        >
          Bài viết
        </Button>
      )}
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex justify-start">
            <Button
              variant="ghost"
              className="hover:text-green-700 font-semibold text-sm hover:cursor-pointer justify-normal"
            >
              Đăng xuất
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className={`${font.className}`}>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có muốn đăng xuất không?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể quay trở lại!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Thoát</AlertDialogCancel>
            <AlertDialogAction onClick={() => logout()}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
