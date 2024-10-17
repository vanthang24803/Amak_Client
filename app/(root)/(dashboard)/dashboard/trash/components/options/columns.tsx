import { formatStringToDate } from "@/utils/date";
import { convertPrice } from "@/utils/price";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { OptionTrash } from "@/types/trash";

export const columns: ColumnDef<OptionTrash>[] = [
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
    accessorKey: "deleteAt",
    header: "Xóa lúc",
    cell: ({ row }) => (
      <span>{formatStringToDate(row.original.deletedAt)}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
