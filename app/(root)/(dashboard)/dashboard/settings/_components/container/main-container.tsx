"use client";

import { Theme } from "./theme";
import { Languages } from "./languages";
import { Timezones } from "./time-zone";

export const MainContainer = () => {
  return (
    <div className="flex flex-col gap-4">
      <Theme />
      <Languages />
      <Timezones />
    </div>
  );
};
