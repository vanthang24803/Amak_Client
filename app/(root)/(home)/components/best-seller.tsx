"use client";

import { Card } from "@/components/card/cart-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/use-fetch";
import { Product } from "@/types/product";

export const BestSeller = () => {

  const action = "Top-selling";

  const { data } = useFetch<Product[]>({
    url: `/Products?Action=${action}&Limit=6`,
  });

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
            <Skeleton key={index} className="w-full h-full bg-white " />
          ))}
        </div>
      )}
    </div>
  );
};
