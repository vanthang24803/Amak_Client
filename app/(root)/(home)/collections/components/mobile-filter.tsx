'use client';

import { FilterType, PriceType } from '@/types';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Check, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type Props = {
  price: PriceType | null;
  totalProduct: number;
  filter: FilterType | null;
  handlePriceFilter: (priceType: PriceType) => void;
  handleFilter: (filterType: FilterType) => void;
  reset: () => void;
};

export const MobileFilter = ({
  price,
  filter,
  handleFilter,
  totalProduct,
  handlePriceFilter,
  reset,
}: Props) => {
  const [open, setOpen] = useState(true);
  const [filterOpen, setFilterOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  return (
    <div className="lg:hidden flex items-center justify-between w-full pb-2">
      <div className="flex items-center space-x-1">
        <span className="font-bold text-[13px]">{totalProduct}</span>
        <span className="text-[13px] text-gray-700 font-medium">sản phẩm</span>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex items-center space-x-2 text-sm bg-white p-2  px-3">
            <span className="font-medium">Bộ lọc</span>
            <Filter className="w-5 h-5" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Bộ lọc</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-4 pt-6">
            <div className="w-full bg-white rounded-md py-2">
              <div
                className="flex flex-1 items-center justify-between py-1 font-medium transition-all hover:font-bold [&[data-state=open]>svg]:rotate-180 hover:cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <h1 className="font-bold">Danh mục sản phẩm</h1>
                {open ? (
                  <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                )}
              </div>
              {open && (
                <div className="my-2 flex flex-col space-y-4 text-sm font-medium">
                  <Separator />
                  <Link href={`/collections/sale`}>Sản phẩm khuyến mãi</Link>
                  <Link href={`/collections/hot-products`}>
                    Sản phẩm nổi bật
                  </Link>
                  <Link href={`/collections/all`}>Tất cả sản phẩm</Link>
                </div>
              )}
            </div>

            <div className="w-full bg-white rounded-md ">
              <div
                className="flex flex-1 items-center justify-between py-1 font-medium transition-all hover:font-bold [&[data-state=open]>svg]:rotate-180 hover:cursor-pointer"
                onClick={() => setPriceOpen(!priceOpen)}
              >
                <h1 className="font-bold">Lọc giá</h1>
                {priceOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                )}
              </div>
              {priceOpen && (
                <div className="my-2 flex flex-col space-y-4 text-sm font-medium">
                  <Separator />
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
                      onClick={() => handleFilter('LowToHigh')}
                    >
                      {filter === 'LowToHigh' && <Check className="w-4 h-4" />}
                    </div>
                    <Label>Giá: Tăng dần</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
                      onClick={() => handleFilter('HighToLow')}
                    >
                      {filter === 'HighToLow' && <Check className="w-4 h-4" />}
                    </div>
                    <Label>Giá: Giảm dần</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
                      onClick={() => handleFilter('Alphabet')}
                    >
                      {filter === 'Alphabet' && <Check className="w-4 h-4" />}
                    </div>
                    <Label>Tên: A - Z</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
                      onClick={() => handleFilter('ReverseAlphabet')}
                    >
                      {filter === 'ReverseAlphabet' && (
                        <Check className="w-4 h-4" />
                      )}
                    </div>
                    <Label>Tên: Z - A</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
                      onClick={() => handleFilter('Lasted')}
                    >
                      {filter === 'Lasted' && <Check className="w-4 h-4" />}
                    </div>
                    <Label>Mới nhất</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
                      onClick={() => handleFilter('Oldest')}
                    >
                      {filter === 'Oldest' && <Check className="w-4 h-4" />}
                    </div>
                    <Label>Cũ nhất</Label>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full bg-white rounded-md ">
              <div
                className="flex flex-1 items-center justify-between py-1 font-medium transition-all hover:font-bold [&[data-state=open]>svg]:rotate-180 hover:cursor-pointer"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <h1 className="font-bold">Lọc giá</h1>
                {filterOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                )}
              </div>
              {filterOpen && (
                <div className="my-2 flex flex-col space-y-4 text-sm font-medium">
                  <Separator />
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
                      onClick={() => handlePriceFilter('Low')}
                    >
                      {price === 'Low' && <Check className="w-4 h-4" />}
                    </div>
                    <Label>Dưới 100.000₫</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
                      onClick={() => handlePriceFilter('Medium')}
                    >
                      {price === 'Medium' && <Check className="w-4 h-4" />}
                    </div>
                    <Label>100.000₫ - 200.000₫</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
                      onClick={() => handlePriceFilter('High')}
                    >
                      {price === 'High' && <Check className="w-4 h-4" />}
                    </div>
                    <Label>200.000₫ - 300.000₫</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
                      onClick={() => handlePriceFilter('Highest')}
                    >
                      {price === 'Highest' && <Check className="w-4 h-4" />}
                    </div>
                    <Label>300.000₫ - 400.000₫</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
                      onClick={() => handlePriceFilter('Max')}
                    >
                      {price === 'Max' && <Check className="w-4 h-4" />}
                    </div>
                    <Label>Trên 400.000₫</Label>
                  </div>
                </div>
              )}
            </div>

            <SheetClose className="absolute bottom-5 w-[90%]">
              <Button variant="primary" className="w-full" onClick={reset}>
                Bỏ Lọc
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
