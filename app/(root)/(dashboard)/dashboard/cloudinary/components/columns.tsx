"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Cloudinary } from "@/types/cloudinary";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";
import { convertBytes } from "@/utils/comvert-byte";

const getVariantByFormat = (format: string) => {
  switch (format) {
    case "jpg":
      return "secondary";
    case "png":
      return "destructive";
    case "webp":
      return "default";
    default:
      return "default";
  }
};

export const columns: ColumnDef<Cloudinary>[] = [
  {
    accessorKey: "publicId",
    header: "Mã hình ảnh",
  },
  {
    accessorKey: "url",
    header: "Url",
    cell: ({ row }) => (
      <Link
        href={row.original.url}
        target="_blank"
        className="inline-block w-[200px] truncate"
      >
        {row.original.url}
      </Link>
    ),
  },
  {
    accessorKey: "format",
    header: "Định dạng",
    cell: ({ row }) => (
      <Badge variant={getVariantByFormat(row.original.format)}>
        {row.original.format}
      </Badge>
    ),
  },
  {
    accessorKey: "resourceType",
    header: "Loại",
  },
  {
    accessorKey: "bytes",
    header: "Bytes",
    cell: ({ row }) => <span>{convertBytes(row.original.bytes)}</span>,
  },

  {
    accessorKey: "createdAt",
    header: "Ngày khởi tạo",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
