/* eslint-disable @next/next/no-img-element */
'use client';

import { Photo } from '@/types/photo';
import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

type Props = {
  sale: number | undefined;
  data: Photo[] | undefined;
};

export const Thumbnail = ({ sale, data }: Props) => {
  return (
    <div className="lg:basis-1/3 w-full">
      <Carousel
        className="w-full max-w-xs"
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
      >
        <CarouselContent>
          {data?.map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-1 relative">
                <img
                  src={item.url}
                  alt={item.id}
                  className="flex items-center justify-center"
                />
                {sale != undefined && sale > 0 && (
                  <div className="w-12 h-12 bg-[#ff0000] text-white absolute top-4 left-4 flex items-center justify-center font-medium text-sm rounded-b-lg">
                    <div className="flex flex-col items-center justify-center">
                      <span> -{sale}%</span>
                      <span className="text-[12px]">OFF</span>
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
