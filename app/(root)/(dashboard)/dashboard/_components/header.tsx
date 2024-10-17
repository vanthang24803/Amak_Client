"use client";

import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/use-auth";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CommandBar } from "./command";
import { SearchBar } from "./search-bar";

export const Header = () => {
  const { profile, logout } = useAuth();

  const router = useRouter();
  return (
    <header className="flex items-center justify-between border-b-[1px] py-2 px-4">
      <SearchBar />
      <div className="flex items-center space-x-3">
        <ThemeToggle />
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
              </div>
              {profile?.roles.includes("ADMIN") && (
                <Image width={16} height={16} src="/verify.png" alt="admin" />
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="h-[1.5px]" />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span className="text-[13.25px] font-medium tracking-tighter">
                  Trang cá nhân
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span className="text-[13.25px] font-medium tracking-tighter">
                  Đăng xuất
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
