"use client";

import { ProductDetail } from "@/types";

type Props = {
  data: ProductDetail | undefined;
};

export const AttributeContainer = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="scroll-m-20 text-2xl font-bold tracking-tight">
        {data?.name}
      </h3>

      <div className="flex flex-col">
        <p className="text-base font-semibold leading-none tracking-tighter">
          Nhà xuất bản
        </p>
        <p className="leading-7 text-[0.75rem] [&:not(:first-child)]:mt-1 tracking-tight">
          {data?.brand ?? "Chưa có thông tin nhà xuất bản"}
        </p>
      </div>

      <div className="flex flex-col">
        <p className="text-base font-semibold leading-none tracking-tighter">
          Mô tả sản phẩm
        </p>
        {data && data.introduction ? (
          <p
            className="leading-7 text-[0.875rem]  [&:not(:first-child)]:mt-1 tracking-tight"
            dangerouslySetInnerHTML={{
              __html: data.introduction,
            }}
          />
        ) : (
          <p className="leading-7 text-[0.875rem]  [&:not(:first-child)]:mt-1 tracking-tight">
            Chưa có mô tả sản phẩm
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-base font-semibold leading-none tracking-tighter">
          Thông tin sản phẩm
        </p>
        {data && data.specifications ? (
          <p
            className="leading-7 text-[0.875rem]  [&:not(:first-child)]:mt-1 tracking-tight"
            dangerouslySetInnerHTML={{
              __html: data.specifications,
            }}
          />
        ) : (
          <p className="leading-7 text-[0.875rem]  [&:not(:first-child)]:mt-1 tracking-tight">
            Chưa có thông tin sản phẩm
          </p>
        )}
      </div>
    </div>
  );
};
