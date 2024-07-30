"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import _http from "@/utils/http";
import { Card } from "@/components/card/cart-item";
import { Product } from "@/types/product";

interface SuggestProps {
  category: string;
}

export const Suggest = ({ category }: SuggestProps) => {
  const [data, setData] = useState<Product[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await _http.get(`/Products`, {
        params: {
          Category: category,
          Limit: 10,
        },
      });

      if (response.status == 200) {
        setData(response.data.result);
      }
    };

    fetchData();
  }, [category]);


  return (
    <div className="flex flex-col space-y-4 md:space-y-4 my-6">
      <span className="text-2xl font-bold">Sản phẩm liên quan</span>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {data?.map((item, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/5">
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
    </div>
  );
};
