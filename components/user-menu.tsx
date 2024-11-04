"use client";

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
import {
  LogOut,
  MapPinned,
  PencilLine,
  Settings,
  ShoppingBasket,
  UserIcon,
} from "lucide-react";
import { statusRank, statusRankIcon } from "@/constants";
import { convertPrice } from "@/utils/price";
import Image from "next/image";
import useAuth from "@/hooks/use-auth";
import { calculatePercentage } from "@/utils/calculator-rank";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
  const { profile, logout } = useAuth();

  let { percentage } = calculatePercentage(profile?.totalPrice);

  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <Avatar>
            <AvatarImage
              src={profile?.avatar}
              className="hover:cursor-pointer"
            />
            <AvatarFallback>
              {profile?.lastName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {profile?.roles.includes("ADMIN") && (
            <Image
              className="absolute -top-1 -right-3  rotate-45"
              src="/crown.png"
              alt="admin"
              width={14}
              height={14}
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center space-x-2">
          <div>
            {profile?.lastName} {profile?.firstName}
            {profile?.roles.includes("ADMIN") && (
              <b className="uppercase text-destructive tracking-tighter">
                {" "}
                - Admin
              </b>
            )}
          </div>
          {profile?.roles.includes("ADMIN") && (
            <Image width={16} height={16} src="/verify.png" alt="admin" />
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="h-[1.5px]" />
        <div className="flex flex-col text-[12px] p-2 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>
                Cấp bậc: {profile?.rank ? statusRank[profile.rank] : ""}
              </span>
              {profile?.rank && (
                <Image
                  src={statusRankIcon[profile?.rank]}
                  alt="icon-rank"
                  width={20}
                  height={20}
                />
              )}
            </div>
            {convertPrice(profile?.totalPrice)}₫
          </div>
          <div className="w-full rounded h-[3px] bg-neutral-200">
            <div
              className={`rounded h-[3px] ${
                percentage > 0 ? "bg-green-500" : "bg-neutral-100"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span className="text-[13.25px] font-medium tracking-tighter">
              Trang cá nhân
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/profile/address")}>
            <MapPinned className="mr-2 h-4 w-4" />
            <span className="text-[13.25px] font-medium tracking-tighter">
              Địa chỉ
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/profile/order")}>
            <ShoppingBasket className="mr-2 h-4 w-4" />
            <div className="flex items-center space-x-2">
              <span className="text-[13.25px] font-medium tracking-tighter">
                Đơn hàng
              </span>
            </div>
          </DropdownMenuItem>
          {profile?.roles.includes("ADMIN") && (
            <DropdownMenuItem onClick={() => router.push("/profile/blogs")}>
              <PencilLine className="mr-2 h-4 w-4" />
              <span className="text-[13.25px] font-medium tracking-tighter">
                Danh sách bài viết
              </span>
            </DropdownMenuItem>
          )}

          {profile?.roles.includes("ADMIN") && (
            <DropdownMenuItem onClick={() => router.push("/dashboard")}>
              <Settings className="mr-2 h-4 w-4" />
              <span className="text-[13.25px] font-medium tracking-tighter">
                Dashboard
              </span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span className="text-[13.25px] font-medium tracking-tighter">
              Đăng xuất
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
