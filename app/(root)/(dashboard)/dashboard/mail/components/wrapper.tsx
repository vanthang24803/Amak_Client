"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { GmailContainer } from "./gmail-container";
import { GoogleContainer } from "./google-container";

type SelectService = "google" | "gmail";

export const Wrapper = () => {
  const [selected, setSelected] = useState<SelectService>("gmail");

  return (
    <Card className="m-4  flex-1">
      <CardContent>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-end mb-2 gap-2">
              <Image
                src={selected === "gmail" ? "/gmail.png" : "/google.svg"}
                width={28}
                height={28}
                alt="Gmail"
              />
              <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
                {selected === "gmail" ? "Dịch vụ Gmail" : "Tài khoản google"}
              </h2>
            </div>
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
                  <SelectItem value="gmail">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/gmail.png"
                        width={18}
                        height={18}
                        alt="gmail"
                      />
                      <p>Gmail</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="google">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/google.svg"
                        width={14}
                        height={14}
                        alt="google"
                      />
                      <p>Tài khoản Google</p>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Separator />
        </CardHeader>
        <div className="flex flex-col gap-3 pl-8">
          {selected === "gmail" ? <GmailContainer /> : <GoogleContainer />}
        </div>
      </CardContent>
    </Card>
  );
};
