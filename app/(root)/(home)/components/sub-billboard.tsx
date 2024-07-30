/* eslint-disable @next/next/no-img-element */
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { subBillboard } from '@/constants';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { Card } from '@/components/ui/card';

export const SubBillboard = () => {
  return (
    <>
      <div className="lg:flex hidden flex-col space-y-3.5">
        {subBillboard.map((item, index) => (
          <Link href={item.url} key={index} className="overflow-hidden">
            <img
              src={item.thumbnail}
              alt={item.name}
              width={350}
              height={350}
              className=" object-cover hover:scale-105 transform transition-transform duration-500"
            />
          </Link>
        ))}
      </div>

      <div className="lg:hidden">
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {subBillboard.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full object-cover"
                    />
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};
