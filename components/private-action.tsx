"use client";

import CartAction from "./cart/cart-action";
import { UserMenu } from "./user-menu";
import { NotificationComponent } from "./notification";

export const PrivateAction = () => {
  return (
    <div className="flex items-center space-x-2">
      <CartAction />
      <NotificationComponent />
      <UserMenu />
    </div>
  );
};
