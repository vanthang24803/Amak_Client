"use client";

import Link from "next/link";
import { User } from "@/components/svg";
import CartAction from "./cart/cart-action";
import { MobileMenu } from "./mobile/mobile-menu";
import useAuth from "@/hooks/use-auth";

import { UserMenu } from "./user-menu";
import { Notification } from "./notification";
import useClient from "@/hooks/use-client";
import { Separator } from "@radix-ui/react-separator";

export default function ActionMenu() {
  const { isLogin } = useAuth();

  const { isClient } = useClient();

  return (
    <div className="flex items-center space-x-4">
      <CartAction />

      {isClient && (
        <>
          {isLogin ? (
            <div className="flex items-center space-x-4">
              <Notification />
              <UserMenu />
            </div>
          ) : (
            <Link href="/login">
              <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-200">
                <User />
              </div>
            </Link>
          )}
        </>
      )}
      <MobileMenu />
    </div>
  );
}
