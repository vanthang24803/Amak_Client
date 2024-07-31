"use client";

import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/use-auth";
import Link from "next/link";

export const Auth = () => {
  const { profile, logout } = useAuth();

  return (
    <>
      {profile ? (
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="tracking-tighter text-[15px] font-semibold">
              {profile.firstName} {profile.lastName}
            </p>
            <span
              className="hover:cursor-pointer hover:underline text-[12px] font-medium"
              onClick={() => logout()}
            >
              Đăng xuất
            </span>
          </div>
        </div>
      ) : (
        <span className="text-sm text-neutral-600">
          Bạn đã có tài khoản?{" "}
          <Link href={`/login`} className="font-semibold mx-1">
            Đăng nhập
          </Link>
        </span>
      )}
    </>
  );
};
