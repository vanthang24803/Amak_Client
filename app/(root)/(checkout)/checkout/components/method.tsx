"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, MapPin, Package2 } from "lucide-react";
import { address } from "@/constants";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Address } from "./address";

export type CheckboxType = "send" | "store";

interface MethodProps {
  sendChecked: boolean;
  storeChecked: boolean;
  handleCheckboxChange: (checkboxType: CheckboxType) => void;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const Method = ({
  sendChecked,
  storeChecked,
  handleCheckboxChange,
  setAddress,
}: MethodProps) => {
  const { control } = useFormContext();

  return (
    <>
      <div className="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
            onClick={() => handleCheckboxChange("send")}
          >
            {sendChecked && <Check className="w-4 h-4" />}
          </div>
          <Label htmlFor="send">Giao tận nơi</Label>
        </div>
        {sendChecked && (
          <div className="flex flex-col space-y-2">
            <Separator />
            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Địa chỉ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Address setAddress={setAddress} />
          </div>
        )}

        <Separator />
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
            onClick={() => handleCheckboxChange("store")}
          >
            {storeChecked && <Check className="w-4 h-4" />}
          </div>
          <Label htmlFor="store">Nhận tại cửa hàng</Label>
        </div>
      </div>

      {sendChecked && (
        <>
          <span className="font-bold text-lg">Phương thức vận chuyển</span>
          <div className="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-2">
            <div className="flex items-center justify-center">
              <Package2 className="w-20 h-20" />
            </div>
            <span className="text-[12px] text-center">
              Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.
            </span>
          </div>
        </>
      )}

      {storeChecked && (
        <>
          <span className="font-bold text-lg">Chi nhánh còn hàng</span>
          <div className="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin />
              <span>{address.address}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};
