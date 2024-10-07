"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Languages = () => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
        Ngôn ngữ
      </h2>
      <Select defaultValue="vi">
        <SelectTrigger className="w-1/2 h-10" disabled>
          <SelectValue placeholder="Lựa chọn ngôn ngữ" />
          <SelectContent>
            <SelectGroup>
              <SelectItem value="vi">Tiếng Việt</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="jpa">Japanese</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectTrigger>
      </Select>
    </div>
  );
};
