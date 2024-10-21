"use client";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { CircleUserRound, Package, Tag } from "lucide-react";
import TrashProductContainer from "./product";
import TrashOptionContainer from "./options";
import TrashAccountContainer from "./account";

type SelectService = "product" | "option" | "account";

export const Wrapper = () => {
  const [selected, setSelected] = useState<SelectService>("product");

  function getComponents(service: string) {
    switch (service) {
      case "product":
        return <TrashProductContainer />;
      case "option":
        return <TrashOptionContainer />;
      case "account":
        return <TrashAccountContainer />;

      default:
        return <TrashProductContainer />;
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="m-4 max-w-screen-xl flex-1">
        <CardContent>
          <CardHeader>
            <div className="flex items-center mb-2 justify-between">
              <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
                Thùng rác
              </h2>
              <Select
                defaultValue={selected}
                onValueChange={(value) => {
                  const selectedValue = value as SelectService;
                  setSelected(selectedValue);
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="product">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Sản phẩm
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="option"
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Phiên bản
                      </div>
                    </SelectItem>
                    <SelectItem value="account" disabled>
                      <div className="flex items-center gap-2">
                        <CircleUserRound className="w-4 h-4" />
                        Tài khoản
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Separator />
          </CardHeader>
          {getComponents(selected)}
        </CardContent>
      </Card>
    </div>
  );
};
