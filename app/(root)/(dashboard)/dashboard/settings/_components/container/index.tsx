"use client";

import { ContainerHeader } from "./conatiner-header";
import { MainContainer } from "./main-container";

export const Container = () => {
  return (
    <div className="flex flex-col gap-3 pl-8">
      <ContainerHeader title="Tổng quát" desc="Chỉnh sửa tổng quát hệ thống" />
      <MainContainer />
    </div>
  );
};
