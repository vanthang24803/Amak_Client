"use client";

import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Inter } from "next/font/google";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSocket } from "../providers/socket-provider";

const font = Inter({ subsets: ["latin"], weight: "400" });

type Props = {
  id: string;
};

export const ChatAction = ({ id }: Props) => {
  const { connection, isConnected } = useSocket();

  const handleDeleteMessage = async () => {
    if (isConnected) {
      try {
        await connection.invoke("DeleteMessage", id);
      } catch (error) {
        console.log("Error deleting message:", error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden group-hover:flex items-center justify-center w-6 h-6 rounded-full bg-gray-500 text-white text-xs cursor-pointer">
          <MoreHorizontal className="w-3 h-3" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-24 ${font.className}`}>
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-[12px] flex items-center gap-x-3">
            <Pencil className="w-3 h-3" />
            <span>Chỉnh sửa</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-[12px] flex items-center gap-x-3"
            onClick={handleDeleteMessage}
          >
            <Trash className="w-3 h-3" />
            <span>Xóa</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
