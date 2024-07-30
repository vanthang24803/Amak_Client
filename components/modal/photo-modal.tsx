/* eslint-disable @next/next/no-img-element */
'use client';

import { Photo } from '@/types/photo';
import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

type Props = {
  photos?: Photo[];
};

export default function PhotoModal({ photos }: Props) {
  return (
    <Carousel
      className="w-full max-w-xs"
      opts={{
        align: 'start',
        loop: true,
      }}
    >
      <CarouselContent>
        {photos?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img src={item.url} alt={item.id} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
