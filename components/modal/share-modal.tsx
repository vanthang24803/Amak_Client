"use client";

import { env } from "@/configs/env";
import { generateSlug } from "@/utils/slug";
import { Link, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  id: string;
  isActive: boolean;
  name: string;
};

export const ShareModal = ({ id, name, isActive = false }: Props) => {
  const router = useRouter();
  const [isCopying, setIsCopying] = useState(false);

  const onCopy = () => {
    if (!isCopying) {
      setIsCopying(true);
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_URL}/products/${generateSlug(name, id)}`
      );

      toast.success("Copy thành công!");

      setTimeout(() => {
        setIsCopying(false);
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2 text-sm py-2">
        <span className="font-semibold text-[13px] tracking-tighter">
          Chia sẻ:
        </span>
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
            isCopying
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:cursor-pointer"
          }`}
          onClick={onCopy}
        >
          {isCopying ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            <Link className="w-4 h-4" />
          )}
        </div>
      </div>

      {isActive && (
        <span
          className="underline hover:cursor-pointer text-[12px]"
          onClick={() => router.push(`/products/${generateSlug(name, id)}`)}
        >
          Xem chi tiết sản phẩm
        </span>
      )}
    </div>
  );
};
