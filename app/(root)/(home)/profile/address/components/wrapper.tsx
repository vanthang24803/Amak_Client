"use client";

import { Separator } from "@/components/ui/separator";
import { Modal } from "../../components/modal";
import { CreateAddress } from "./create";
import { Render } from "./render";

export const Wrapper = () => {
  return (
    <div className="w-full flex flex-col space-y-8">
      <div className="flex items-center justify-center flex-col  space-y-4 ">
        <h1 className="text-2xl  font-bold">Địa chỉ của bạn</h1>
        <Separator className="w-[100px] h-1 bg-black rounded" />
      </div>

      <Modal>
        <div className="flex items-center justify-between">
          <h2 className="uppercase font-bold tracking-tight">
            Danh sách địa chỉ
          </h2>
          <CreateAddress />
        </div>
        <Separator />
        <Render />
      </Modal>
    </div>
  );
};
