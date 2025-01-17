"use client";

import { Suspense } from "react";
import { ResetPasswordHandler } from "./reset-password-handler";

export const Wrapper = () => {
  return (
    <Suspense fallback>
      <ResetPasswordHandler />
    </Suspense>
  );
};
