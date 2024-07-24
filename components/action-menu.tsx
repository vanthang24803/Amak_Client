"use client";

import Link from "next/link";
import { User } from "@/components/svg";
import CartAction from "./cart/cart-action";
import { MobileMenu } from "./mobile/mobile-menu";

export default function ActionMenu() {
  return (
    <div className="flex items-center space-x-8">
      <Link href="/login">
        <User />
      </Link>
      <CartAction />
      <MobileMenu />
    </div>
  );
}
