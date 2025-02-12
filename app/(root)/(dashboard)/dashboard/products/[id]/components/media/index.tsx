/* eslint-disable @next/next/no-img-element */
"use client";

import { ProductDetail } from "@/types";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Fragment, useState } from "react";
import { UpdateMedia } from "./update-media";

type Props = {
  product: ProductDetail | undefined;
};

export const Media = ({ product }: Props) => {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false); // Trạng thái hiển thị thêm hình ảnh

  const handleToggle = () => setOpen(!open);

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div className="w-full bg-white dark:bg-black rounded h-auto p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="scroll-m-20 text-lg font-bold tracking-tighter w-1/2 line-clamp-1">
          Hình ảnh{" "}
          {product &&
            product?.photos.length > 0 &&
            `(${product.photos.length})`}
        </h4>
        <Button variant="outline" size="sm" onClick={handleToggle}>
          <Settings className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {product && product?.photos.length > 0 ? (
          <Fragment>
            {product?.photos
              .slice(0, showMore ? product.photos.length : 5)
              .map((item) => (
                <img
                  key={item.id}
                  src={item.url}
                  className="rounded"
                  alt={`Product photo ${item.id}`}
                />
              ))}
            {product?.photos.length > 5 && !showMore && (
              <div className="col-span-3 flex justify-center">
                <Button onClick={handleShowMore}>+ Xem thêm</Button>
              </div>
            )}
          </Fragment>
        ) : (
          <p className="text-[13px] tracking-tighter">Chưa có hình ảnh</p>
        )}
      </div>
      <UpdateMedia
        handleClose={handleToggle}
        open={open}
        photos={product?.photos}
      />
    </div>
  );
};
