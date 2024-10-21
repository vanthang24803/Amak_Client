import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export const Warning = () => {
  return (
    <div className="h-svh lg:hidden flex flex-col space-y-4 items-center justify-center bg-zinc-700/90 text-white">
      <AlertTriangle className="w-24 h-24" />
      <div className="flex flex-col text-center text-sm md:text-base">
        <p>Trang này không hỗ trợ kích thước màn hình của bạn.</p>
        <p>Vui lòng truy cập trên thiết bị phù hợp!</p>
      </div>
      <Link href={"/"}>
        <Button variant="primary">Trở về trang chủ</Button>
      </Link>
    </div>
  );
};
