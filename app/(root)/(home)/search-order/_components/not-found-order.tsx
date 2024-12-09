/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";

type Props = {
  handleReset: () => void;
};

export const NotFoundOrder = ({ handleReset }: Props) => {
  return (
    <div className="flex flex-col gap-4 items-center mb-24">
      <img
        src="https://tokyolife.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnodata.50b1efeb.png&w=640&q=75"
        className="w-[200px] md:w-[400px] h-auto"
      />
      <h4 className="text-base font-bold">Không tìm thấy đơn hàng của bạn</h4>
      <p className="w-[200px] md:w-[350px] text-[14px] text-center">
        Chúng tôi không tìm thấy mã đơn hàng của bạn trong hệ thống. Vui lòng
        kiểm tra lại mã đơn hàng
      </p>
      <Button variant="mix" className="w-[200px]" onClick={handleReset}>
        Trở lại
      </Button>
    </div>
  );
};
