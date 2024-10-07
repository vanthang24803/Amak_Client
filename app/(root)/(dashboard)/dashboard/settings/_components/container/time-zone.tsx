"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Timezones = () => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
        Múi giờ
      </h2>
      <Select defaultValue="+7">
        <SelectTrigger className="w-1/2 h-10" disabled>
          <SelectValue placeholder="Lựa múi giờ" />
          <SelectContent>
            <SelectGroup>
              <SelectItem value="+7">
                (UTC +7) Hanoi - Bangkok - Jakarta
              </SelectItem>
              <SelectItem value="+9">(UTC +9) Japan</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectTrigger>
      </Select>
    </div>
  );
};
