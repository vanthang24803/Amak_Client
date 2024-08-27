"use client";

import { Button } from "@/components/ui/button";
import { Upload, CloudDownload, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export const ActionRight = () => {
  const router = useRouter();
  return (
    <div className="flex items-center space-x-3 text-[12px]">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            className="flex items-center space-x-2 text-[12px] h-9"
          >
            <CloudDownload className="w-4 h-4" />
            <span>Nhập sản phầm</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-2">
              <Image src="/excel.png" width={14} height={14} alt="icon" />
              <span className="text-[12px] font-medium tracking-tighter">
                Nhập Excel
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Image src="/csv.png" width={14} height={14} alt="icon" />
              <span className="text-[12px] font-medium tracking-tighter">
                Nhập CSV
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            className="flex items-center space-x-2 text-[12px] h-9"
          >
            <Upload className="w-4 h-4" />
            <span>Xuất sản phầm</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex items-center gap-2">
              <Image src="/excel.png" width={14} height={14} alt="icon" />
              <span className="text-[12px] font-medium tracking-tighter">
                Xuất Excel
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Image src="/csv.png" width={14} height={14} alt="icon" />
              <span className="text-[12px] font-medium tracking-tighter">
                Xuất CSV
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        onClick={() => router.push("/dashboard/products/new")}
        className="flex items-center space-x-2 text-[12px] h-9"
      >
        <Plus className="w-4 h-4" />
        <span>Thêm mới</span>
      </Button>
    </div>
  );
};
