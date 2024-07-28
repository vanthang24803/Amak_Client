"use client";

import { Card } from "@/components/card/cart-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useFetch from "@/hooks/use-fetch";
import { Product } from "@/types/product";

export const BestSeller = () => {
  const { data } = useFetch<Product[]>({
    url: `/Products?Limit=6`,
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
        <span>Hello</span>
      )}
    </div>
  );
};
