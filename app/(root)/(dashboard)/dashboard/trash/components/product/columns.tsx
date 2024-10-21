"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatStringToDate } from "@/utils/date";
import { CellAction } from "./cell-action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductTrash } from "@/types/trash";

export const columns: ColumnDef<ProductTrash>[] = [
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
    cell: ({ row }) => <span className="mx-4">{row.original.options}</span>,
  },
  {
    accessorKey: "sold",
    header: "Đã bán",
    cell: ({ row }) => <span className="mx-2">{row.original.sold}</span>,
  },

  {
    accessorKey: "createAt",
    header: "Xóa lúc",
    cell: ({ row }) => (
      <span>{formatStringToDate(row.original.deletedAt)}</span>
    ),
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
