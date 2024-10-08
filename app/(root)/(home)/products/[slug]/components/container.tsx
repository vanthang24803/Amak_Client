"use client";

import { ProductDetail } from "@/types/product";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DetailCard } from "./card-detail";
import { Introduce } from "./introduce";
import { Reviews } from "./reviews";
import { Suggest } from "./suggest";
import useClient from "@/hooks/use-client";
import { Separator } from "@/components/ui/separator";
import useSWR from "swr";
import { Fragment } from "react";

type Props = {
  id: string | null;
};

export const Container = ({ id }: Props) => {
  const { isClient } = useClient();

  const { data, isLoading, error } = useSWR<ProductDetail>(`/Products/${id}`);

  if (!isClient) return null;

  if (error) console.log(error);

  if (isLoading)
    return (
      <div className="md:max-w-screen-xl mx-auto px-4 md:p-4 flex flex-col space-y-6 pb-8 md:pb-12">
        <Separator className="w-full md:w-[500px] h-8 rounded-md bg-primary-foreground" />
        <Separator className="w-full h-[50vh] bg-primary-foreground rounded-md" />
      </div>
    );

  return (
    <div className="md:max-w-screen-xl mx-auto px-4 md:p-4 flex flex-col space-y-6 pb-8 md:pb-12">
      <div className="hidden md:flex items-center  text-sm space-x-2 text-neutral-800">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/collections/sach-moi">
                Sách mới
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {data && (
        <Fragment>
          <DetailCard product={data} />
          <Introduce data={data} />
          <Reviews id={id} />
          <Suggest category={data?.categories[0].name} />
        </Fragment>
      )}
    </div>
  );
};
