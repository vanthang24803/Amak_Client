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
import { GeminiConfig } from "./gemini-setting";
import { GeminiPrompt } from "./gemini-prompt";

type SelectService = "config" | "prompt";

export const Wrapper = () => {
  const [selected, setSelected] = useState<SelectService>("config");

  return (
    <Card className="m-4  flex-1">
      <CardContent>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-end mb-2 gap-2">
              <Image src="/gemini.svg" width={28} height={28} alt="Gemini" />
              <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
                Gemini AI
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
                  <SelectItem value="config">Cấu hình</SelectItem>
                  <SelectItem value="prompt">Prompt</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Separator />
        </CardHeader>
        <div className="flex flex-col gap-3 pl-8">
          {selected === "config" ? <GeminiConfig /> : <GeminiPrompt />}
        </div>
      </CardContent>
    </Card>
  );
};
