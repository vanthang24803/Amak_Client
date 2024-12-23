"use client";

import { Button } from "@/components/ui/button";
import { ProductColumn } from "./columns";
import _http from "@/utils/http";
import { Fragment, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, Plus } from "lucide-react";
import PhotoModal from "@/components/modal/photo-modal";
import { Option } from "@/types";
import { convertPrice, formatPrice } from "@/utils/price";
import { Quicksand } from "next/font/google";
import { toast } from "sonner";

const font = Quicksand({ subsets: ["latin"] });

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const [option, setOption] = useState<Option | undefined>(data.options[0]);

  const handleOptionChange = (id: string) => {
    const newOption = data?.options.find((option) => option.id === id);
    setOption(newOption);
  };

  return (
    <Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Plus className="w-3 h-3" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] md:rounded">
          <div className="flex items-start justify-between">
            <div className="basis-1/2">
              <PhotoModal photos={data.photos} />
            </div>
            <div className="basis-1/2 mx-2">
              <div className="flex flex-col space-y-4 p-4">
                <DialogTitle
                  className={`${font.className} text-base font-bold tracking-tighter`}
                >
                  {data.name}
                </DialogTitle>

                <div className="text-[12px] tracking-tighter">
                  Mã sản phẩm:{" "}
                  <span className="text-[#417505] font-bold">{option?.id}</span>
                </div>

                <div className="flex items-center space-x-12 text-sm py-2">
                  <span className="font-semibold">Giá:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500 font-bold text-lg">
                      {formatPrice(option?.price, option?.sale)}₫
                    </span>
                    {Number(option?.sale) > 0 && (
                      <span className="text-neutral-400 text-md line-through">
                        {convertPrice(option?.price)}₫
                      </span>
                    )}
                  </div>
                  {Number(option?.sale) > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mx-2 border-red-500 hover:bg-transparent h-6 w-8 text-red-500 text-[11px] font-semibold hover:text-red-500"
                    >
                      -{option?.sale}%
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-sm py-2">
                  <span className="font-semibold">Phiên bản:</span>
                  <div className="flex items-center space-x-2">
                    {data.options.map((item, index) => (
                      <Button
                        variant={item.id === option?.id ? "primary" : "outline"}
                        key={index}
                        onClick={() => handleOptionChange(item.id)}
                        className="rounded-sm h-8 px-3 py-4 text-[12px] tracking-tighter"
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="mix"
                  className="mt-8 group"
                  onClick={() => toast.success("OK")}
                >
                  Thêm{" "}
                  <ArrowRight className="group-hover:translate-x-2 transition-all ease-in-out" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
