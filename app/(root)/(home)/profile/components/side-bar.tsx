"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

export const Sidebar = () => {
  const { profile, logout } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="lg:flex flex-col space-y-4 md:mt-20 m-4 hidden lg:w-1/6">
      <h2 className="uppercase font-bold mx-4 text-lg tracking-tighter">
        TÀI KHOẢN
      </h2>
      {menu.map((item, _) => (
        <Link href={item.url} key={_}>
          <Button
            variant={pathname === item.url ? "primary" : "ghost"}
            className="w-full md:w-[160px] justify-start tracking-tighter font-semibold"
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
      <Button
        variant="ghost"
        className="hover:text-green-700 font-semibold text-sm hover:cursor-pointer justify-normal"
        onClick={() => logout()}
      >
        Đăng xuất
      </Button>
    </div>
  );
};
