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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Check,
  Clock,
  Clock1,
  Clock2,
  Clock4,
  Clock8,
  Filter,
  KeyRound,
  Link2,
  RotateCcw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Image from "next/image";

const statusList: {
  [key: string]: {
    name: string;
    image: string;
  };
} = {
  Bronze: {
    image: "/3.png",
    name: "Đồng",
  },
  Silver: {
    image: "/2.png",
    name: "Bạc",
  },
  Gold: {
    image: "/1.png",
    name: "Vàng",
  },
  Platinum: {
    name: "Bạch kim",
    image: "/4.png",
  },
  Diamond: {
    name: "Kim cương",
    image: "/5.png",
  },
};

const roleType = [
  {
    name: "Khách hàng",
    icon: <UserRound className="w-3.5 h-3.5" />,
    type: false,
  },
  {
    name: "Quản trị viên",
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    type: true,
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
  const [timeFilter, setTimeFilter] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [clear, setClear] = useState(true);
  const [row, setRow] = useState(10);

  const handleRowChange = (value: string) => {
    const newRow = Number(value);
    setRow(newRow);
    table.setPageSize(newRow);
  };

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
        pageSize: row,
      },
    },
  });

  const handleStatusFilter = (rank: string) => {
    if (filter == rank) {
      setFilter(null), table.getColumn("rank")?.setFilterValue(null);
    } else {
      if (clear) {
        setClear(false);
      }
      setFilter(rank), table.getColumn("rank")?.setFilterValue(rank);
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

  const handleRoleFilter = (isManager: boolean, name: string) => {
    table.getColumn("isManager")?.setFilterValue(isManager);
    setRole(name);
  };

  const handlerResetFilter = () => {
    setRole(null);
    setFilter(null);
    setClear(true);
    setTimeFilter(null);
    table.getColumn("isManager")?.setFilterValue(null);
    setFilter(null), table.getColumn("rank")?.setFilterValue(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4 w-full">
          <Input
            placeholder="Email"
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
              Lọc tài khoản
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <div className="flex space-x-2 items-center">
                  <Link2 className="w-3.5 h-3.5" />
                  <span className="text-[13px] font-semibold tracking-tight scroll-m-20">
                    Hạng
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
                      <Image
                        src={action.image}
                        alt="icon-rank"
                        width={20}
                        height={20}
                      />
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
                  <KeyRound className="w-3.5 h-3.5" />
                  <span className="text-[13px] font-semibold tracking-tight scroll-m-20">
                    Role
                  </span>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-48">
                {roleType.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center justify-between cursor-pointer"
                    onSelect={() => handleRoleFilter(item.type, item.name)}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="text-[12.5px]">{item.name}</span>
                    </div>
                    {role === item.name && <Check className="w-4 h-4" />}
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
        <div className="flex-1 text-[12px] text-muted-foreground flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {table.getState().pagination.pageIndex + 1} trên{" "}
            {table.getPageCount()} trang
          </div>
          <div className="flex items-center space-x-2">
            <span>Số hàng:</span>
            <Select
              defaultValue={row.toString()}
              onValueChange={handleRowChange}
            >
              <SelectTrigger className="w-16">
                <SelectValue placeholder={row.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="w-30">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
