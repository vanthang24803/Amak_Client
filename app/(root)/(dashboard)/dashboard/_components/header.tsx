"use client";

import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/use-auth";
import { ThemeToggle } from "./theme-toggle";
import { SearchBar } from "./search-bar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Info, Languages, Package, UserCircle2Icon } from "lucide-react";
import { useState } from "react";
import { Logout } from "./logout";
import { Profile } from "./profile";
import { Connection } from "./connection";
import { About } from "./about";
import { Language } from "./language";

const nav = [
  {
    key: "account",
    content: (
      <div className="flex items-center gap-3 p-2">
        <UserCircle2Icon className="w-4 h-4" /> Tài khoản
      </div>
    ),
  },
  {
    key: "connection",
    content: (
      <div className="flex items-center gap-3   p-2">
        <Package className="w-4 h-4" /> Kết nối
      </div>
    ),
  },
  {
    key: "language",
    content: (
      <div className="flex items-center gap-3   p-2">
        <Languages className="w-4 h-4" /> Ngôn ngữ
      </div>
    ),
  },
  {
    key: "about",
    content: (
      <div className="flex items-center gap-3   p-2">
        <Info className="w-4 h-4" /> Phiên bản
      </div>
    ),
  },
];

export const Header = () => {
  const { profile } = useAuth();

  const [active, setActive] = useState<string>("account");

  const getComponent = (key: string) => {
    switch (key) {
      case "account":
        return <Profile />;
      case "connection": {
        return <Connection />;
      }
      case "language": {
        return <Language />;
      }
      case "about": {
        return <About />;
      }
    }
  };

  return (
    <header className="flex items-center justify-between border-b-[1px] py-2 px-4">
      <SearchBar />
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <Dialog>
          <DialogTrigger>
            <Avatar>
              <AvatarImage
                src={profile?.avatar}
                className="hover:cursor-pointer"
              />
              <AvatarFallback>
                {profile?.lastName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent className="md:rounded-lg md:max-w-screen-lg h-[80vh] flex overflow-hidden dark:bg-neutral-900 md:p-4">
            <div className="w-1/4  border-r dark:border-neutral-700 flex flex-col justify-between">
              <div className=" flex flex-col gap-2 px-2">
                <span className="pl-2 text-[12.5px] font-semibold text-neutral-600 tracking-tight">
                  Cài đặt
                </span>
                {nav.map((item) => (
                  <div
                    key={item.key}
                    className={`text-[12px] w-full cursor-pointer ${
                      active === item.key
                        ? "dark:bg-[#242A31] bg-neutral-200 rounded"
                        : ""
                    }`}
                    onClick={() => setActive(item.key)}
                  >
                    {item.content}
                  </div>
                ))}
              </div>
              <Logout />
            </div>
            <div className="w-3/4 py-4 px-2">{getComponent(active)}</div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};
