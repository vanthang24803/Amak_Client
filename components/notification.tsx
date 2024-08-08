/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/use-auth";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { formatDateToNow } from "@/utils/date";
import { Inter } from "next/font/google";
import { useState } from "react";
import { AvatarFallback, Avatar } from "./ui/avatar";
import _http from "@/utils/http";
import { useRouter } from "next/navigation";
import { Notification } from "@/types";
import toast from "react-hot-toast";

const font = Inter({ weight: "400", subsets: ["latin"] });

export const NotificationComponent = () => {
  const { notifications, getNotification } = useAuth();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handlerOpen = () => {
    handlerOnend();
    setOpen(!open);
  };

  const handlerOnend = async () => {
    try {
      await _http.post(`/Notifications/Open`);
      getNotification();
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSeenAll = async () => {
    try {
      const response = await _http.post(`/Notifications/Seen`);
      if (response.status == 200) {
        getNotification();
        toast.success("Đã đọc hết thông báo!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerPushLink = async (item: Notification) => {
    try {
      const response = await _http.post(`/Notifications/Seen/${item.id}`);

      if (response.status === 200) {
        handlerOpen();
        router.push(item.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={handlerOpen}>
      <DropdownMenuTrigger>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-200 ${open && "bg-neutral-300"}`}
        >
          <div className="relative">
            <Bell className="w-5 h-5" strokeWidth={open ? 2 : 1.5} />
            {notifications &&
              notifications.filter((item) => !item.isOpened)?.length > 0 && (
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 absolute -top-3 -right-3">
                  <span className="text-white text-[12px]">
                    {notifications.filter((item) => !item.isOpened)?.length}
                  </span>
                </div>
              )}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[22rem]">
        <div className="flex items-center justify-between">
          <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
          <Button
            variant="ghost"
            onClick={handlerSeenAll}
            className={`${font.className} text-green-700 hover:text-green-700 tracking-tighter`}
          >
            Đánh dấu đã đọc
          </Button>
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="min-h-52 h-60 mt-2">
          {notifications && notifications?.length > 0 ? (
            <div className="flex flex-col space-y-1">
              {notifications?.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center p-3 rounded-md ${item.isSeen ? "hover:bg-neutral-100/90" : "hover:cursor-pointer bg-green-50"} `}
                  onClick={() => handlerPushLink(item)}
                >
                  <div className="flex items-center w-1/5 justify-center">
                    <Avatar>
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col ml-3 w-[75%]">
                    <p
                      className={`${font.className} text-[13px] line-clamp-3 leading-4`}
                      dangerouslySetInnerHTML={{
                        __html: item.content || "",
                      }}
                    />
                    <p className="font-bold text-[13px] text-green-700 mt-1">
                      {formatDateToNow(item.createAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-[13px] tracking-tighter">
                Bạn hiện không có thông báo nào!
              </p>
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
