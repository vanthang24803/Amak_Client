"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type SocialType = "google" | "facebook" | "instagram";

const icons: Record<SocialType, string> = {
  google: "/google.svg",
  facebook: "/fb.png",
  instagram: "/instagram.svg",
};

const mockData = [
  {
    type: "google",
    connected: true,
  },
  {
    type: "facebook",
    connected: false,
  },
  {
    type: "instagram",
    connected: false,
  },
];

type ConnectionItemProps = {
  data: {
    type: SocialType;
    connected: boolean;
  };
};

export const Connection = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold tracking-tight">
          Kết nối tài khoản với
        </h1>
        <Separator />
      </div>

      <div className="flex flex-col gap-6 text-[12px] p-4">
        {mockData.map((item) => (
          <ConnectionItem
            key={item.type}
            data={item as { type: SocialType; connected: boolean }}
          />
        ))}
      </div>
    </div>
  );
};

const ConnectionItem = ({ data }: ConnectionItemProps) => {
  function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-10">
        <Image
          src={icons[data.type]}
          alt={data.type}
          width={22}
          height={22}
          className="hover:cursor-pointer"
        />
        <div className="flex flex-col">
          <h3 className="text-[14px] font-medium capitalize">{data.type}</h3>
          <span>
            {data.connected
              ? `Sau khi kết nối ${capitalize(data.type)}, bạn có thể đăng nhập vào AMAK bằng Google`
              : `Bạn chưa kết nối ${capitalize(data.type)}, với tài khoản AMAK`}
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant={data.connected ? "gooeyLeft" : "outline"}
        className={`bg-${data.connected ? "[#CFC5B6]" : "[#B6C5CF]"} rounded-lg font-medium text-[12px]`}
      >
        {data.connected ? "Hủy kết nối" : "Kết nối"}
      </Button>
    </div>
  );
};
