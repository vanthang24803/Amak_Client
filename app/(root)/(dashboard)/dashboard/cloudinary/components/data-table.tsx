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
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloudinary } from "./cloudinary-upload";
import { Check, Filter, RotateCcw } from "lucide-react";

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
  const [row, setRow] = useState(10);
  const [extension, setExtension] = useState<string | null>(null);
  const [clear, setClear] = useState(true);

  const handleRowChange = (value: string) => {
    const newRow = Number(value);
    setRow(newRow);
    table.setPageSize(newRow);
  };

  const formatImage = [
    {
      type: "jpg",
      color: "bg-sky-600",
    },
    {
      type: "png",
      color: "bg-secondary",
    },
    {
      type: "webp",
      color: "bg-destructive",
    },
  ];

  const handleExtensionFilter = (format: string) => {
    if (extension == format) {
      setExtension(null), table.getColumn("format")?.setFilterValue(null);
    } else {
      if (clear) {
        setClear(false);
      }
      setExtension(format), table.getColumn("format")?.setFilterValue(format);
    }
  };

  const handlerResetFilter = () => {
    setExtension(null);
    setClear(true);
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <div
          className="flex items-center py-4 w-full justify-between
        "
        >
          <Input
            placeholder="Tìm kiếm theo Id hình ảnh"
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm text-[12px] rounded"
          />
          <div className="flex items-center gap-2">
            <UploadCloudinary />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel className="text-sm font-semibold tracking-tight scroll-m-20">
                  Lọc hình ảnh
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {formatImage.map((format, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="flex items-center justify-between"
                      onSelect={() => handleExtensionFilter(format.type)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded ${format.color}`} />
                        <span className=" text-[13px] tracking-tight">
                          {format.type}
                        </span>
                      </div>
                      {format.type === extension && (
                        <Check className="w-4 h-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
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
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="rounded border">
        <Table>
          <TableHeader className="text-[12px] font-medium leading-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-[12px] leading-none">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="h-10"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  Không tìm thấy kết quả
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
            <span className="text-[12px]">Trang trước</span>
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
