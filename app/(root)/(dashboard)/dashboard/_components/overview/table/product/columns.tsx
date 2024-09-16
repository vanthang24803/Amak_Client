"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TopProductTableColumn = {
  id: string;
  name: string;
  brand: string;
  sold: number;
  thumbnail: string;
};

export const columns: ColumnDef<TopProductTableColumn>[] = [
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
    accessorKey: "sold",
    header: "Đã bán",
    cell: ({ row }) => <span className="mx-2">{row.original.sold}</span>,
  },
];
