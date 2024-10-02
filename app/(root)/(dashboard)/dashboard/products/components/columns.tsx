"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Option } from "@/types";
import { formatStringToDate } from "@/utils/date";
import { CellAction } from "./cell-action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ProductColumn = {
  id: string;
  name: string;
  brand: string;
  sold: number;
  options: Option[];
  createAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: "Mã sản phẩm",
    cell: ({ row }) => (
      <span className="line-clamp-1 w-[120px]">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
    cell: ({ row }) => (
      <span className="line-clamp-1 w-[250px]">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "brand",
    header: "Thương hiệu",
    cell: ({ row }) => <span>{row.original.brand}</span>,
  },
  {
    accessorKey: "options",
    header: "Phiên bản",
    cell: ({ row }) => (
      <span className="mx-4">{row.original.options.length}</span>
    ),
  },
  {
    accessorKey: "sold",
    header: "Đã bán",
    cell: ({ row }) => <span className="mx-2">{row.original.sold}</span>,
  },
  {
    accessorKey: "sold",
    header: "Còn lại",
    cell: ({ row }) => (
      <span className="mx-2">
        {row.original.options.reduce((acc, x) => acc + x.quantity, 0)}
      </span>
    ),
  },
  {
    accessorKey: "createAt",
    header: "Ngày tạo",
    cell: ({ row }) => <span>{formatStringToDate(row.original.createAt)}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CellAction data={row.original} />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="text-[12px] tracking-tighter text-slate-700">
              Lựa chọn
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
];
