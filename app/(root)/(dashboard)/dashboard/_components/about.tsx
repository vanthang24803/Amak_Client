"use client";

import { Separator } from "@radix-ui/react-separator";

export const About = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold tracking-tight">Phiên bản</h1>
        <Separator />
      </div>
    </div>
  );
};
