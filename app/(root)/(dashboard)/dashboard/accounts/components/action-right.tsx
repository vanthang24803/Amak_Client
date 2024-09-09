"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import FileSaver from "file-saver";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import _http from "@/utils/http";
import toast from "react-hot-toast";
import { format } from "date-fns";

export const ActionRight = () => {
  const router = useRouter();

  const timestamp = format(new Date(), "dd-MM-yyyy");

  const onExportExcel = async () => {
    // const response = await _http.get(`/Products/ExportExcel`, {
    //   responseType: "blob",
    // });

    // FileSaver.saveAs(
    //   new Blob([response.data]),
    //   `export-product-${timestamp}.xlsx`
    // );
    // toast.success("File downloaded");
  };

  const onExportCSV = async () => {
    // const response = await _http.get(`/Products/ExportCSV`, {
    //   responseType: "blob",
    // });

    // FileSaver.saveAs(
    //   new Blob([response.data]),
    //   `export-product-${timestamp}.csv`
    // );
    // toast.success("File downloaded");
  };

  const onExportJson = async () => {
    // const response = await _http.get(`/Products/ExportJson`, {
    //   responseType: "blob",
    // });

    // FileSaver.saveAs(
    //   new Blob([response.data]),
    //   `export-product-${timestamp}.json`
    // );
    // toast.success("File downloaded");
  };

  return (
    <div className="flex items-center space-x-3 text-[12px]">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            className="flex items-center space-x-2 text-[12px] h-9"
          >
            <Upload className="w-4 h-4" />
            <span>Xuất danh sách tài khoản</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={onExportExcel}
            >
              <Image src="/excel.png" width={14} height={14} alt="icon" />
              <span className="text-[12px] font-medium tracking-tighter">
                Xuất Excel
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={onExportCSV}
            >
              <Image src="/csv.png" width={14} height={14} alt="icon" />
              <span className="text-[12px] font-medium tracking-tighter">
                Xuất CSV
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={onExportJson}
            >
              <Image src="/json.png" width={14} height={14} alt="icon" />
              <span className="text-[12px] font-medium tracking-tighter">
                Xuất Json
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
