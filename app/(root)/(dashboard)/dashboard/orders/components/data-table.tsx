"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  subDays,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BadgeDollarSign,
  Check,
  Clock,
  Clock1,
  Clock2,
  Clock4,
  Clock8,
  CreditCard,
  Filter,
  Link2,
  RotateCcw,
  Store,
  Truck,
} from "lucide-react";

const statusList: {
  [key: string]: {
    color: string;
    name: string;
  };
} = {
  PENDING: {
    color: "#dc2626",
    name: "Đang chờ xử lý",
  },
  CREATE: {
    color: "#f59e0b",
    name: "Khởi tạo",
  },
  SHIPPING: {
    color: "#0284c7",
    name: "Đang giao hàng",
  },
  SUCCESS: {
    name: "Giao hàng thành công",
    color: "#16a34a",
  },
  RETURN: {
    name: "Trả hàng",
    color: "#573875",
  },
  CANCEL: {
    name: "Đơn hàng hủy",
    color: "#d44f48",
  },
};

const paymentType = [
  {
    name: "Giao hàng",
    type: "COD",
    icon: <Truck className="w-3.5 h-3.5" />,
  },
  {
    name: "MoMo",
    type: "MOMO",
    icon: <BadgeDollarSign className="w-3.5 h-3.5" />,
  },
  {
    name: "Ngân hàng",
    type: "BANK",
    icon: <CreditCard className="w-3.5 h-3.5" />,
  },
  {
    name: "Nhận tại cửa hàng",
    type: "STORE",
    icon: <Store className="w-3.5 h-3.5" />,
  },
];

const timeType = [
  {
    name: "Hôm nay",
    icon: <Clock1 className="w-3.5 h-3.5" />,
  },
  {
    name: "Tuần này",

    icon: <Clock2 className="w-3.5 h-3.5" />,
  },
  {
    name: "Tháng này",
    icon: <Clock4 className="w-3.5 h-3.5" />,
  },
  {
    name: "3 Tháng gần nhất",
    icon: <Clock8 className="w-3.5 h-3.5" />,
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  statusFilter?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<string | null>(null);
  const [clear, setClear] = useState(true);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const handleStatusFilter = (status: string) => {
    if (filter == status) {
      setFilter(null), table.getColumn("status")?.setFilterValue(null);
    } else {
      if (clear) {
        setClear(false);
      }
      setFilter(status), table.getColumn("status")?.setFilterValue(status);
    }
  };

  const handlePaymentFilter = (type: string) => {
    if (payment == type) {
      setPayment(null);
      table.getColumn("payment")?.setFilterValue(null);
    } else {
      setPayment(type);
      table.getColumn("payment")?.setFilterValue(type);
      if (clear) {
        setClear(false);
      }
    }
  };

  const handleTimeFilter = (time: string) => {
    if (timeFilter === time) {
      setTimeFilter(null);
    } else {
      setTimeFilter(time);
      if (clear) {
        setClear(false);
      }
    }
  };

  const dateRangeFilterFn = (row: any, columnId: string, filterValue: any) => {
    const rowDate = new Date(row.getValue(columnId));
    const [startDate, endDate] = filterValue || [];
    return rowDate >= startDate && rowDate <= endDate;
  };

  const handlerResetFilter = () => {
    setPayment(null);
    setFilter(null);
    setClear(true);
    setTimeFilter(null);
    table.getColumn("payment")?.setFilterValue(null);
    setFilter(null), table.getColumn("status")?.setFilterValue(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4 w-full">
          <Input
            placeholder="Tìm kiếm theo mã đơn hàng"
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm text-[12px] rounded"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel className="text-sm font-semibold tracking-tight scroll-m-20">
              Lọc đơn hàng
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <div className="flex space-x-2 items-center">
                  <Link2 className="w-3.5 h-3.5" />
                  <span className="text-[13px] font-semibold tracking-tight scroll-m-20">
                    Trạng thái
                  </span>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-48">
                {Object.entries(statusList).map(([status, action], index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center justify-between cursor-pointer"
                    onSelect={() => handleStatusFilter(status)}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: action.color,
                        }}
                      ></div>
                      <span className="text-[12px]">{action.name}</span>
                    </div>
                    {filter == status && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <div className="flex space-x-2 items-center">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span className="text-[13px] font-semibold tracking-tight scroll-m-20">
                    Thanh toán
                  </span>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-48">
                {paymentType.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center justify-between cursor-pointer"
                    onSelect={() => handlePaymentFilter(item.type)}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="text-[12.5px]">{item.name}</span>
                    </div>
                    {payment == item.type && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <div className="flex space-x-2 items-center">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[13px] font-semibold tracking-tight scroll-m-20">
                    Thời gian
                  </span>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-48">
                {timeType.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center justify-between cursor-pointer"
                    onSelect={() => handleTimeFilter(item.name)}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="text-[12.5px]">{item.name}</span>
                    </div>
                    {timeFilter === item.name && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => handlerResetFilter()}
              disabled={clear}
            >
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-4 h-4" />
                <span className="text-[12px]">Xóa lọc</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="text-[12.5px] font-medium leading-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-[12.5px] leading-none">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không tìm thấy đơn hàng
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-[12.5px] text-muted-foreground">
          {table.getState().pagination.pageIndex + 1} trên{" "}
          {table.getPageCount()} trang
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="text-[12.5px]">Trang trước</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="text-[12px]">Trang sau</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
