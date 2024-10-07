"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
import Image from "next/image";

const themeSchema = [
  {
    name: "Light Mode",
    img: "/light-mode.svg",
    type: "light",
  },
  {
    name: "Dark Mode",
    img: "/dark-mode.svg",
    type: "dark",
  },
  {
    name: "System Mode",
    img: "/system-mode.svg",
    type: "system",
  },
];

export const Theme = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
        Theme
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {themeSchema.map((theme, index) => (
          <Card key={index} onClick={() => setTheme(theme.type)}>
            <CardContent
              className={`flex flex-col gap-3 cursor-pointer ${resolvedTheme === theme.type && " border-[3.5px] border-sky-600 rounded-none shadow-md"}`}
            >
              <Image
                src={theme.img}
                alt={theme.name}
                width={300}
                height={100}
              />
              <div className="flex justify-between items-center">
                <p className="text-md font-bold tracking-tighter">
                  {theme.name}
                </p>
                {resolvedTheme === theme.type && (
                  <Image width={20} height={20} src="/check.png" alt="active" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
