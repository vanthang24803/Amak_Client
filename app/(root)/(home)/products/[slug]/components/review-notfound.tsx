"use client";

import Image from "next/image";

export const ReviewNotFound = () => {
  return (
    <div className="flex items-center justify-center flex-col space-y-3 ">
      <Image
        src="https://cdn-icons-png.flaticon.com/512/6381/6381554.png"
        width={60}
        height={60}
        alt="icon"
      />
      <p className="text-center text-sm  tracking-tight">
        Chưa có đánh giá nào cho sản phẩm này
      </p>
    </div>
  );
};
