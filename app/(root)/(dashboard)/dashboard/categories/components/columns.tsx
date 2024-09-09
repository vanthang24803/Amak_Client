"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatStringToDate } from "@/utils/date";
import { CellAction } from "./cell-action";

export type CategoryColumn = {
  id: string;
  name: string;
  createAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "id",
    header: "Mã danh mục",
  },
  {
    accessorKey: "name",
    header: "Tên danh mục",
  },
  {
    accessorKey: "createAt",
    header: "Ngày khởi tạo",
    cell: ({ row }) => <span>{formatStringToDate(row.original.createAt)}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
