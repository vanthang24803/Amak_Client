"use client";
import useAuth from "@/hooks/use-auth";
import { AvatarProfile } from "./avatar-upload";
import Image from "next/image";
import { statusRank, statusRankIcon } from "@/constants";
import { convertPrice } from "@/utils/price";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

type Props = {
  setActive: Dispatch<SetStateAction<boolean>>;
};

export const Information = ({ setActive }: Props) => {
  const { profile } = useAuth();

  return (
    <div className="flex flex-col text-[14px] space-y-3 pb-4">
      <div className="flex items-center justify-center my-4 ">
        <div className="relative">
          <AvatarProfile />
          {profile?.roles.includes("ADMIN") && (
            <Image
              width={16}
              height={16}
              className="absolute -top-1 -right-3  rotate-45"
              src="/crown.png"
              alt="admin"
            />
          )}
        </div>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 py-4 ${font.className}`}
      >
        <div className="flex gap-2 items-center tracking-tighter text-[15px] font-medium">
          Tên: {profile?.firstName} {profile?.lastName}{" "}
          {profile?.roles.includes("ADMIN") && (
            <div className="flex items-center space-x-2">
              <b className="uppercase text-destructive">- Admin</b>
              <Image width={16} height={16} src="/verify.png" alt="admin" />
            </div>
          )}
        </div>
        <p className="tracking-tighter text-[15px] font-medium">
          Email: {profile?.email}
        </p>
        <div className="flex items-start space-x-2">
          <p className="tracking-tighter text-[15px] font-medium">
            Thành viên: {profile?.rank ? statusRank[profile.rank] : ""}
          </p>
          {profile?.rank && (
            <Image
              src={statusRankIcon[profile?.rank]}
              alt="icon-rank"
              width={20}
              height={20}
              objectFit="cover"
            />
          )}
        </div>
        <p className="tracking-tighter text-[15px] font-medium">
          Số đơn hàng đang xử lý:{" "}
          {profile && profile?.processOrder > 0 ? (
            <>
              <b>{profile?.processOrder}</b> đơn hàng
            </>
          ) : (
            "Trống"
          )}
        </p>
        <p className="tracking-tighter text-[15px] font-medium">
          Tổng đơn hàng đã mua: <b>{profile?.totalOrder}</b> đơn hàng
        </p>
        <p className="tracking-tighter text-[15px] font-medium">
          Tổng chi tiêu:{" "}
          <b className="text-[18px]">{convertPrice(profile?.totalPrice)}₫</b>
        </p>
      </div>
      <Button
        className="w-[200px]"
        variant="mix"
        onClick={() => setActive(true)}
      >
        Cập nhật thông tin
      </Button>
    </div>
  );
};
