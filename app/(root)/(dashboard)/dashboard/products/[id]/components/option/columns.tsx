import { Option } from "@/types";
import { formatStringToDate } from "@/utils/date";
import { convertPrice } from "@/utils/price";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Option>[] = [
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "sale",
    header: "Sale",
    cell: ({ row }) => (
      <span>{row.original.sale > 0 ? `${row.original.sale}% ` : "Không"}</span>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Số lượng",
    cell: ({ row }) => <span className="ml-2">{row.original.quantity}</span>,
  },
  {
    accessorKey: "price",
    header: "Giá gốc",
    cell: ({ row }) => <span>{convertPrice(row.original.price)}</span>,
  },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${row.original.isActive ? "bg-green-600" : "bg-red-600"}`}
        />
        <p>{row.original.isActive ? "Còn hàng" : "Hết hàng"}</p>
      </div>
    ),
  },
  {
    accessorKey: "createAt",
    header: "Ngày nhập",
    cell: ({ row }) => <span>{formatStringToDate(row.original.createAt)}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
