"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchProducts } from "@/services/api/product";
import useSWR from "swr";
import { Loading } from "../../../_components/loading";
import { columns, ProductColumn } from "./columns";
import { DataTable } from "./data-table";

export const ProductFrom = () => {
  const { data, isLoading } = useSWR(`/Products`, fetchProducts);

  if (isLoading) return <Loading />;

  const productColumns: ProductColumn[] =
    (data &&
      data.data.result.map((product) => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        sold: product.sold,
        options: product.options,
        createAt: product.createAt,
        thumbnail: product.thumbnail,
        photos: product.photos,
      }))) ||
    [];

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="text-[15px]">Danh sách sản phẩm</CardTitle>
        <CardDescription className="text-[12px]">
          Hãy lựa chọn các sản phẩm được giảm giá
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <DataTable searchKey="name" columns={columns} data={productColumns} />
      </CardContent>
    </Card>
  );
};
