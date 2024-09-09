"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatStringToDate, formatDateToNow } from "@/utils/date";
import { CellAction } from "./cell-action";

import { UserAnalytic as AccountColumn } from "@/types/analytic";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import Image from "next/image";
import { statusRank, statusRankIcon } from "@/constants";

export const columns: ColumnDef<AccountColumn>[] = [
  {
    accessorKey: "id",
    header: "Mã tài khoản",
    cell: ({ row }) => (
      <span className="line-clamp-1 w-[120px]">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "fullName",
    header: "Họ và tên",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={row.original.avatar} />
        </Avatar>
        <p>{row.original.fullName}</p>
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="line-clamp-1 w-[200px]">{row.original.email}</span>
    ),
  },

  {
    accessorKey: "rank",
    header: "Hạng",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Image
          src={statusRankIcon[row.original.rank]}
          alt="icon-rank"
          width={20}
          height={20}
        />
        <p>{statusRank[row.original.rank]}</p>
      </div>
    ),
  },
  {
    accessorKey : "isManager",
    header: "Manager",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.isManager && <Check className="w-4 h-4 text-green-500" />}
      </div>
    ),
  },

  {
    accessorKey: "createAt",
    header: "Ngày khởi tạo",
    cell: ({ row }) => <span>{formatDateToNow(row.original.createAt)}</span>,
  },
  {
    accessorKey: "updateAt",
    header: "Cập nhật",
    cell: ({ row }) => <span>{formatStringToDate(row.original.updateAt)}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
