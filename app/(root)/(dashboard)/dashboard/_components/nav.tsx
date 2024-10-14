"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon?: LucideIcon;
    path: string;
    image?: string;
  }[];
};

export const Nav = ({ isCollapsed, links }: Props) => {
  const pathname = usePathname();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.path}
                    className={cn(
                      buttonVariants({
                        variant: pathname === link.path ? "secondary" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      pathname === link.path &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    {link.icon && !link.image ? (
                      <link.icon className="h-4 w-4" />
                    ) : (
                      <Image
                        src={link.image || ""}
                        alt="image"
                        width={16}
                        height={16}
                      />
                    )}

                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4 text-sm"
                >
                  <span className="text-[13px] font-medium leading-none scroll-m-20">
                    {link.title}
                  </span>
                  {link.label && Number(link.label) > 0 && (
                    <span className="ml-auto text-[12px] text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href={link.path}
              className={cn(
                buttonVariants({
                  variant: pathname === link.path ? "secondary" : "ghost",
                  size: "sm",
                }),
                pathname === link.path &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <div className="mr-2">
                {link.icon && !link.image ? (
                  <link.icon className="h-4 w-4" />
                ) : (
                  <Image
                    src={link.image || ""}
                    alt="image"
                    width={16}
                    height={16}
                  />
                )}
              </div>
              <p className="scroll-m-20 text-[13px] font-medium tracking-tight">
                {link.title}
              </p>
              {link.label && Number(link.label) > 0 && (
                <span
                  className={cn(
                    "ml-auto text-xs  tracking-tight scroll-m-20",
                    pathname === link.path && "text-background dark:text-white "
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  );
};
