"use client";

import { Separator } from "@/components/ui/separator";
import { Container } from "../../_components/container";
import { Table } from "./table";

export const Wrapper = () => {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
          Danh mục
        </h2>
      </div>
      <Separator />
      <Table />
    </Container>
  );
};
