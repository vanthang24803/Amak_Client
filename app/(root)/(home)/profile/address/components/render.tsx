"use client";

import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/use-auth";
import { Address } from "@/types";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Remove } from "./remove";
import { Update } from "./update";

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const Render = () => {
  const { profile, getProfile } = useAuth();

  const address: Address[] | undefined = profile?.addresses.filter(
    (a) => !a.isActive
  );

  const activeAddress: Address | undefined = profile?.addresses?.filter(
    (address) => address.isActive
  )[0];

  return (
    <div className={`${font.className} flex flex-col space-y-2`}>
      {activeAddress && (
        <div className="flex flex-col">
          <div className="flex items-center justify-between ">
            <div className="flex items-center space-x-3">
              <p className="uppercase tracking-tighter">
                {activeAddress?.firstName} {activeAddress?.lastName}
              </p>
              <Image width={16} height={16} alt="active" src="/check.png" />
            </div>
            <Update address={activeAddress} />
          </div>
          <div className="flex flex-col text-[13px]">
            <div className="flex items-center space-x-1">
              <span className="text-neutral-600 ">Địa chỉ:</span>
              <p>{activeAddress?.addressName}</p>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-neutral-600 ">Điện thoại:</span>
              <p>{activeAddress?.numberPhone}</p>
            </div>
          </div>
        </div>
      )}

      <Separator />

      {address?.map((item) => (
        <>
          <div className="flex flex-col" key={item.id}>
            <div className="flex items-center justify-between ">
              <p className="uppercase tracking-tighter">
                {item?.firstName} {item?.lastName}
              </p>
              <div className="flex items-center">
                <Update address={item} />

                <Remove id={item.id} />
              </div>
            </div>
            <div className="flex flex-col text-[13px]">
              <div className="flex items-center space-x-1">
                <span className="text-neutral-600 ">Địa chỉ:</span>
                <p>{item?.addressName}</p>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-neutral-600 ">Điện thoại:</span>
                <p>{item?.numberPhone}</p>
              </div>
            </div>
          </div>
          <Separator />
        </>
      ))}
    </div>
  );
};
