"use client";

import { Suspense } from "react";

import VerifyAccountHandler from "./verify-handler";

export const Wrapper = () => {
  return (
    <Suspense fallback>
      <VerifyAccountHandler />
    </Suspense>
  );
};
