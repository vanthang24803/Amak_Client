"use client";

import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-3 pl-8">{children}</div>;
};
