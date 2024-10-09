/* eslint-disable @next/next/no-img-element */
"use client";

import { Billboard } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

type Props = {
  billboards: Billboard[];
};

export const Slider = ({ billboards }: Props) => {
  return (
    <Carousel
      className="w-full max-w-screen-md"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 1500,
        }),
      ]}
    >
      <CarouselContent>
        {billboards?.map((item, index) => (
          <CarouselItem key={index}>
            <Link href={item.url}>
              <img
                src={item.thumbnail}
                alt={item.thumbnail}
                loading="lazy"
                width={500}
                height={500}
                className="object-cover w-full"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
