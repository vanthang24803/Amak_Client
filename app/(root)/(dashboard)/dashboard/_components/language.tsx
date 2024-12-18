"use client";

import { Separator } from "@/components/ui/separator";
import { LanguageSelector } from "./language-selector";

export const Language = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold tracking-tight">Ngôn ngữ</h1>
        <Separator />
      </div>

      <LanguageSelector />
    </div>
  );
};
