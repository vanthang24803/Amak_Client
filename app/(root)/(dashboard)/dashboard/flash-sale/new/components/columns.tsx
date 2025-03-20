"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Option, Photo } from "@/types";
import Link from "next/link";
import { CellAction } from "./cell-action";
import Image from "next/image";

export type ProductColumn = {
  id: string;
  name: string;
  brand: string;
  sold: number;
  options: Option[];
  createAt: string;
  thumbnail: string;
  photos: Photo[];
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "thumbnail",
    header: "Hình ảnh",
    cell: ({ row }) => (
      <Link href={row.original.thumbnail} target="_blank">
        <Image
          src={row.original.thumbnail}
          width={48}
          height={48}
          alt={row.original.name}
          objectFit="cover"
        />
        {/* <img src={row.original.thumbnail} className="w-12 h-12 object-cover" /> */}
      </Link>
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
