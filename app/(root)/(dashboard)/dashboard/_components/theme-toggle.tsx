"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <span className="text-[12px] font-medium tracking-tighter capitalize">
            {resolvedTheme == "light" ? "Dark" : "Light"} mode
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
