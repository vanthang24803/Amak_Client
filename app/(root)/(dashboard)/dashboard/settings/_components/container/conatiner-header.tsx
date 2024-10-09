"use client";

import { Separator } from "@/components/ui/separator";

type Props = {
  title: string;
  desc: string;
};

export const ContainerHeader = ({ title, desc }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
          {title}
        </h2>
        <span className="text-[12px] text-muted-foreground tracking-tight">
          {desc}
        </span>
      </div>
      <Separator />
    </div>
  );
};
