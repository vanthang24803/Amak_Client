import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center h-screen bg-zinc-200/90">
      <h1 className="text-6xl md:text-9xl  font-bold tracking-tight">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Không tìm thấy trang
      </h2>
      <p className="text-sm md:text-base text-muted-foreground text-center">
        Trang bạn đang tìm kiếm có thể đã bị xóa, chuyển đi, thay đổi link hoặc
        chưa bao giờ tồn tại!
      </p>
      <Link href="/">
        <Button>Trở về trang chủ</Button>
      </Link>
    </div>
  );
}
