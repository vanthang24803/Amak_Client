"use client";

import { Card } from "@/components/card/cart-item";
import { ProductSkeleton } from "@/components/product-skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/product";
import _http from "@/utils/http";
import useSWR from "swr";

const handleFetcher = (url: string) =>
  _http
    .get(url, {
      params: {
        Action: "Top-selling",
        Limit: 6,
      },
    })
    .then((res) => res.data.result);

export const BestSeller = () => {
  const { data } = useSWR<Product[]>("/Products", handleFetcher);

  return (
    <div className="flex flex-col space-y-4 md:space-y-4 py-6">
      <h1 className="uppercase text-2xl font-bold mx-2 tracking-tighter">
        Top sản phẩm bán chạy
      </h1>

      {data ? (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {data?.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                <div className="p-1">
                  <Card product={item} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden lg:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-[50vh] md:gap-8">
          {[...Array(4)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}
    </div>
  );
};
