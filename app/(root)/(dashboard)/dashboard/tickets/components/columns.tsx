"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatStringToDate } from "@/utils/date";
import { Ticket } from "@/types";
import { CellAction } from "./cell-action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "name",
    header: "Tên mã giảm giá",
  },
  {
    accessorKey: "code",
    header: "Mã giảm giá",
    cell: ({ row }) => (
      <div className="relative group w-[100px] ease-in-out transition ml-4">
        <span className="group-hover:hidden">...</span>

        <span className="hidden group-hover:inline hover:cursor-pointer">
          {row.original.code}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Số lượng",
    cell: ({ row }) => <span className="ml-3">{row.original.quantity}</span>,
  },
  {
    accessorKey: "startDate",
    header: "Ngày khởi tạo",
    cell: ({ row }) => (
      <span>{formatStringToDate(row.original.startDate)}</span>
    ),
  },
  {
    accessorKey: "endDate",
    header: "Ngày hết hạn",
    cell: ({ row }) => <span>{formatStringToDate(row.original.endDate)}</span>,
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
