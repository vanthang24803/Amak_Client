"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { convertPrice } from "@/utils/price";
import { formatStringToDate } from "@/utils/date";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const statusList: { [key: string]: string } = {
  PENDING: "#dc2626",
  CREATE: "#f59e0b",
  SHIPPING: "#0284c7",
  SUCCESS: "#16a34a",
  RETURN: "#573875",
  CANCEL: "#d44f48",
};

const statusType: { [key: string]: string } = {
  PENDING: "Đang chờ xử lý",
  CREATE: "Khởi tạo",
  SHIPPING: "Đang giao hàng",
  SUCCESS: "Giao hàng thành công",
  RETURN: "Trả hàng",
  CANCEL: "Đơn hàng bị hủy",
};

const paymentType: { [key: string]: string } = {
  COD: "Giao hàng",
  MOMO: "Momo",
  BANK: "Ngân hàng",
  STORE: "Nhận tại cửa hàng",
};

export type OrderColumn = {
  id: string;
  email: string;
  status: string;
  payment: string;
  address: string;
  customer: string;
  totalPrice: number;
  createAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Mã sản phẩm",
    cell: ({ row }) => (
      <span className="line-clamp-1 w-[120px]">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Khách hàng",
    cell: ({ row }) => (
      <span className=" w-[200px] line-clamp-1">{row.original.customer}</span>
    ),
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
    cell: ({ row }) => (
      <span className="line-clamp-1 w-[120px]">{row.original.address}</span>
    ),
  },
  {
    accessorKey: "payment",
    header: "Thanh toán",
    cell: ({ row }) => (
      <span className="line-clamp-1 w-[100px]">
        {[paymentType[row.original.payment]]}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: statusList[row.original.status] }}
        ></div>

        <span>{statusType[row.original.status]}</span>
      </div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Thành tiền",
    cell: ({ row }) => <span>{convertPrice(row.original.totalPrice)}₫</span>,
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
