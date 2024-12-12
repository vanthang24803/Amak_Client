"use client";

import {
  Card as Container,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Countdown } from "./countdown";
import _http from "@/utils/http";
import useSWR from "swr";
import { Product } from "@/types";
import useClient from "@/hooks/use-client";
import { Fragment } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductSkeleton } from "@/components/product-skeleton";
import { Card } from "@/components/card/cart-item";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const handleFetcher = (url: string) =>
  _http
    .get(url, {
      params: {
        Action: "Top-selling",
        Limit: 6,
      },
    })
    .then((res) => res.data.result);

export const FlashSale = () => {
  const { data, isLoading } = useSWR<Product[]>("/Products", handleFetcher);

  const { isClient } = useClient();
  const router = useRouter();

  if (!isClient) return null!;

  return (
    <Container>
      <CardContent className="bg-red-600 w-full rounded-lg">
        <CardHeader className="md:p-3">
          <div className="flex items-center justify-between flex-col md:flex-row gap-3 md:gap-8">
            <Link
              href={`/collections/sale`}
              className={` text-xl md:text-2xl font-bold tracking-tight uppercase text-white flex items-center gap-4`}
            >
              <div className="relative w-3 h-3">
                <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 bg-yellow-400 rounded-full"></div>
              </div>
              <h1>Sản phẩm khuyến mãi</h1>
            </Link>
            <Countdown />
          </div>
        </CardHeader>
        <div className="flex flex-col md:gap-4">
          {!isLoading && (
            <Fragment>
              {data ? (
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {data &&
                      data.map((item, index) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-1/2 lg:basis-1/5"
                        >
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-[50vh] md:gap-8 pb-10">
                  {[...Array(4)].map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              )}
            </Fragment>
          )}

          <div className="flex items-center justify-center">
            <Button
              variant="gooeyLeft"
              className="bg-green-500/90 w-[200px] uppercase font-bold group"
              onClick={() => router.push(`/collections/sale`)}
            >
              Xem tất cả{" "}
              <ArrowRight className="group-hover:translate-x-1 transition ease-in-out" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Container>
  );
};
