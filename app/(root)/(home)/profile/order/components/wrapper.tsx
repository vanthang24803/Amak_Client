"use client";

import { Separator } from "@/components/ui/separator";
import { Modal } from "../../_components/modal";
import { Render } from "./render";

export const Wrapper = () => {
  return (
    <div className="w-full flex flex-col space-y-8">
      <div className="flex items-center justify-center flex-col  space-y-4 ">
        <h1 className="text-2xl  font-bold">Đơn hàng của bạn</h1>
        <Separator className="w-[100px] h-1 bg-black rounded" />
      </div>

      <Modal>
        <h2 className="uppercase font-bold tracking-tight">
          Danh sách đơn hàng
        </h2>
        <Render />
        <Separator />
      </Modal>
    </div>
  );
};
