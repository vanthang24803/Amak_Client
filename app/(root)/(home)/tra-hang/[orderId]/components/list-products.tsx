"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Order } from "@/types";
import { convertPrice } from "@/utils/price";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  order: Order;
};

export const ListProducts = ({ order }: Props) => {
  const router = useRouter();

  return (
    <Card>
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8">
        <CardHeader className="flex flex-col w-full">
          <h1 className="font-semibold text-lg md:text-xl lg:text-2xl flex items-center gap-1">
            Sản phẩm đã chọn
            <p className="text-base">
              (
              {order.orderDetails.reduce(
                (total, order) => total + order.quantity,
                0,
              )}
              )
            </p>
          </h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col space-y-4 my-4">
              {order.orderDetails.map((item) => (
                <div key={item.productId} className="cursor-pointer">
                  <div className="flex space-x-4">
                    <Image
                      src={item.thumbnail}
                      alt="thumbnail"
                      width={1000}
                      height={1000}
                      className="w-[22%] md:w-[10%] lg:w-[6%]"
                      objectFit="cover"
                      onClick={() => router.push(`/products/${item.productId}`)}
                      style={{ cursor: "pointer" }}
                    />
                    <div className="flex flex-col w-full gap-1">
                      <div className="flex items-center justify-between">
                        <span
                          className="font-medium line-clamp-2 text-[12px] md:text-md"
                          onClick={() =>
                            router.push(`/products/${item.productId}`)
                          }
                        >
                          {item.name}
                        </span>
                        <X
                          className="w-4 h-4 text-gray-600 hover:scale-125 transition ease-in-out"
                          onClick={() => toast.success("Đang phát triển")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400 text-[12px]">
                          {item.optionName}
                        </span>
                        <span className="text-neutral-500 text-sm">
                          x{item.quantity}
                        </span>
                      </div>

                      <span className="text-sm font-medium">
                        {convertPrice(item.price)}₫
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </div>
    </Card>
  );
};
