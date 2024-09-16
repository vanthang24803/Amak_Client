"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { statusRank, statusRankIcon } from "@/constants";
import { convertPrice } from "@/utils/price";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type TopCustomerTableColumn = {
  id: string;
  customerName: string;
  email: string;
  avatar: string;
  rank: string;
  totalPrice: number;
};

export const columns: ColumnDef<TopCustomerTableColumn>[] = [
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span
        className="w-[100px] block truncate"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {row.original.email}
      </span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Họ và tên",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={row.original.avatar} />
        </Avatar>
        <p>{row.original.customerName}</p>
      </div>
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
    accessorKey: "totalPrice",
    header: "Thanh toán",
    cell: ({ row }) => <p>{convertPrice(row.original.totalPrice)}₫</p>,
  },
];
