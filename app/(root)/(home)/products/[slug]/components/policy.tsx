/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { Package, Phone, Truck } from "lucide-react";

export const Policy = () => {
  const router = useRouter();
  return (
    <div className="flex md:hidden lg:flex flex-col space-y-4 items-end lg:w-1/2">
      <div className="lg:w-1/2 w-full p-4 border border-neutral-300 rounded-md flex flex-col space-y-4 text-sm">
        <span className="font-bold mb-2">Chính sách bán hàng</span>

        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Đảm bảo chất lượng</span>
        </div>

        <div className="flex items-center space-x-2">
          <Truck className="w-5 h-5" />
          <span>Miễn phí giao hàng</span>
        </div>

        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5" />
          <span>Đổi trả 7 ngày</span>
        </div>
      </div>
      <img
        src="https://theme.hstatic.net/200000294254/1001077164/14/product_banner.jpg?v=323"
        alt="img"
        className="w-full md:w-1/2 hover:cursor-pointer"
        onClick={() => router.push("/")}
      />
    </div>
  );
};
