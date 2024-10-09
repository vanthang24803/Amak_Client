"use client";

import { Dispatch, SetStateAction, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationTable } from "@/types/pagination-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  statusFilter?: boolean;
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  onItemsPerPageChange: Dispatch<SetStateAction<PaginationTable>>;
  totalItem: number;
  totalPage: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  currentPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItem,
  totalPage,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleRowChange = (value: string) => {
    const newRow = Number(value) as PaginationTable;
    onItemsPerPageChange(newRow);
    table.setPageSize(newRow);
  };

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    table.setPageIndex(newPage - 1);
  };

  const table = useReactTable({
    data: data,
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
        pageSize: itemsPerPage,
        pageIndex: currentPage - 1,
      },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4 w-full justify-end">
          <Input
            placeholder="Tìm kiếm theo tên sản phẩm"
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm text-[12px] rounded"
          />
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
                            header.getContext()
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
            {currentPage} trên {Math.ceil(totalItem / itemsPerPage)}
          </div>
          <div className="flex items-center space-x-2">
            <span>Số hàng:</span>
            <Select
              defaultValue={itemsPerPage.toString()}
              onValueChange={handleRowChange}
            >
              <SelectTrigger className="w-16">
                <SelectValue placeholder={itemsPerPage.toString()} />
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
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="text-[12px]">Trang trước</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPage}
          >
            <span className="text-[12px]">Trang sau</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
