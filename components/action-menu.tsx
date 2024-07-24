"use client";

import Link from "next/link";
import { User } from "@/components/svg";
import CartAction from "./cart/cart-action";
import { MobileMenu } from "./mobile/mobile-menu";
import useAuth from "@/hooks/use-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { LogOut, MapPinned, UserIcon } from "lucide-react";

export default function ActionMenu() {
  const { isLogin, profile, logout } = useAuth();

  const router = useRouter();

  return (
    <div className="flex items-center space-x-8">
      {isLogin ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={profile?.avatar}
                className="hover:cursor-pointer"
              />
              <AvatarFallback>
                {profile?.lastName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              {profile?.lastName} {profile?.firstName}
              {profile?.roles.includes("ADMIN") && (
                <b className="uppercase text-destructive tracking-tighter">
                  {" "}
                  - Admin
                </b>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="h-[1.5px]" />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span className="text-[13px] font-medium tracking-tighter">
                  Trang cá nhân
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/profile/address")}>
                <MapPinned className="mr-2 h-4 w-4" />
                <span className="text-[13px] font-medium tracking-tighter">
                  Địa chỉ
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span className="text-[13px] font-medium tracking-tighter">
                  Đăng xuất
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <User />
        </Link>
      )}

      <CartAction />
      <MobileMenu />
    </div>
  );
}
