"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  handleReset: () => void;
};

export const Success = ({ handleReset }: Props) => {
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <Image src="/verify.png" width={100} height={100} alt="success" />
      <div className="flex flex-col items-center align-center pb-4">
        <h1 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0 text-center">
          Đã gửi lại mã đổi mật khẩu thành công!
        </h1>
        <span className="text-[14px] text-muted-foreground text-center">
          Vui lòng kiểm tra email của bạn
        </span>
      </div>

      <Button variant="primary" className="w-full" onClick={handleReset}>
        Quay lại
      </Button>
    </div>
  );
};
