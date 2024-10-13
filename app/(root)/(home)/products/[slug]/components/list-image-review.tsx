"use client";

import { useState } from "react";
import { Photo } from "@/types";
import FsLightbox from "fslightbox-react";

type Props = {
  images: Photo[];
};

export const ListImage = ({ images }: Props) => {
  const [toggler, setToggler] = useState(false);

  const urls = images.map((item) => item.url);

  return (
    <div className="hidden md:block">
      <h2 className="font-semibold tracking-wide text-sm">
        Tất cả hình ảnh ({images.length})
      </h2>
      <div className="grid md:grid-cols-5 lg:grid-cols-6 gap-4 mt-2">
        {images.map((item) => (
          <div
            key={item.id}
            onClick={() => setToggler(!toggler)}
            className="rounded-md w-[80px] h-[80px] object-cover hover:cursor-pointer bg-cover"
            style={{
              backgroundImage: `url(${item.url})`,
            }}
          />
        ))}
      </div>

      <FsLightbox toggler={toggler} sources={urls} />
    </div>
  );
};
