"use client";

import { Button } from "@/components/ui/button";
import { ProductDetail } from "@/types";
import { Wrench } from "lucide-react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { UpdateThumbnail } from "./update-thumbnail";
import FsLightbox from "fslightbox-react";

type Props = {
  product: ProductDetail | undefined;
};

export const Thumbnail = ({ product }: Props) => {
  const [open, setOpen] = useState(false);
  const [toggler, setToggler] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Fragment>
      <div className="w-full bg-white dark:bg-black rounded h-auto p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-lg font-bold tracking-tighter w-1/2 line-clamp-1">
            Hình minh họa
          </h4>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="text-[12px] font-semibold tracking-tighter"
              onClick={handleToggle}
            >
              <Wrench className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Image
          width={160}
          height={160}
          className="rounded cursor-pointer"
          src={product?.thumbnail || ""}
          onClick={() => setToggler(!toggler)}
          alt="thumbnail"
        />
      </div>
      <UpdateThumbnail
        open={open}
        handleToggle={handleToggle}
        product={product}
      />
      <FsLightbox toggler={toggler} sources={[product?.thumbnail ?? ""]} />
    </Fragment>
  );
};
