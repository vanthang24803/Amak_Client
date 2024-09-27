"use client";

import { Option } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type Props = {
  options: Option[] | undefined;
};

export const ListOptions = ({ options }: Props) => {
  return <DataTable searchKey="name" columns={columns} data={options || []} />;
};
