"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFlashSale } from "@/hooks/use-flash-sale";
import { FlashSaleProduct } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { BookmarkCheck, Trash, X } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import { toast } from "sonner";

export const ListProductPopup = () => {
  const { totalItems, data, removeProduct, clear } = useFlashSale();

  const handleRemove = (product: FlashSaleProduct) => {
    removeProduct(product);
    toast.success("Xóa thành công");
  };

  const handleClear = () => {
    clear();
    toast.success("Đã xóa tất cả!");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative cursor-pointer">
          <BookmarkCheck />
          {totalItems > 0 && (
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 absolute -top-2 -right-2">
              <span className="text-white text-[12px]">{totalItems}</span>
            </div>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <h2 className="cursor-pointer">
            <SheetTitle>Danh sách sản phẩm</SheetTitle>
          </h2>
          <SheetDescription>Số sản phẩm: {totalItems}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-2">
          <ScrollArea className="lg:h-[75vh] h-[78vh] w-full ">
            <div className="flex flex-col space-y-4 my-4">
              {totalItems > 0 ? (
                <Fragment>
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col space-y-2 text-sm hover:cursor-pointer"
                    >
                      <div className="flex gap-1 md:gap-0  md:justify-between">
                        <img
                          src={item.thumbnail}
                          alt="thumbnail"
                          className="h-24 w-1/4 object-contain"
                        />
                        <div className="flex flex-col gap-1">
                          <div className="relative w-[220px]">
                            <span className="font-semibold text-[13px] md:w-[160px] line-clamp-1 md:line-clamp-2 leading-4 tracking-tight">
                              {item.name}
                            </span>
                            <X
                              className="absolute top-0 right-0 w-4 h-4"
                              onClick={() => handleRemove(item)}
                            />
                          </div>
                          <div className="flex items-center justify-between w-[220px]">
                            <span className="text-neutral-400 text-[12.5px] tracking-tighter line-clamp-1 w-[100px]">
                              {item.optionName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Fragment>
              ) : (
                <div className="flex items-center justify-center flex-col space-y-4 my-8">
                  <Image src="/box.png" alt="box" width={120} height={120} />
                  <span className="tracking-tighter font-medium text-sm">
                    Danh sách trống
                  </span>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        <SheetFooter>
          <Button
            variant="destructive"
            disabled={totalItems === 0}
            onClick={handleClear}
          >
            <Trash /> Xóa tất cả
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
