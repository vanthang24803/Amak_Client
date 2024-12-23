"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { FlashSaleType, ListFlashSale } from "@/types";
import { formatStringToDate } from "@/utils/date";

const convertStatus = (format: FlashSaleType) => {
  switch (format) {
    case "PENDING":
      return "Khởi tạo";
    case "ACTIVE":
      return "Đang hoạt động";
    case "COMPLETED":
      return "Đã kết thúc";
    default:
      return "Khởi tạo";
  }
};

const getVariantByFormat = (format: FlashSaleType) => {
  switch (format) {
    case "PENDING":
      return "secondary";
    case "COMPLETED":
      return "destructive";
    case "ACTIVE":
      return "primary";
    default:
      return "default";
  }
};

export const columns: ColumnDef<ListFlashSale>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => (
      <Badge variant={getVariantByFormat(row.original.status)}>
        {convertStatus(row.original.status)}
      </Badge>
    ),
  },

  {
    accessorKey: "startAt",
    header: "Ngày bắt đầu",
    cell: ({ row }) => (
      <p>{formatStringToDate(row.original.startAt, "dd/MM/yyyy hh:ss")}</p>
    ),
  },
  {
    accessorKey: "endAt",
    header: "Ngày kết thúc",
    cell: ({ row }) => (
      <p>{formatStringToDate(row.original.endAt, "dd/MM/yyyy hh:ss")}</p>
    ),
  },
  {
    accessorKey: "products",
    header: "Số lượng sản phẩm",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
