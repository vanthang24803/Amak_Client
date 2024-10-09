"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "../ui/button";
import { Cart } from "@/types";

type Props = {
  cart: Cart;
};

export const UpdateCart = ({ cart }: Props) => {
  const { addToCart, removeToCart } = useCart();

  const jsonSend = {
    ...cart,
    quantity: 1,
  } as Cart;

  return (
    <div className="flex items-center space-x-1">
      <Button
        className="w-8 h-8"
        variant="outline"
        onClick={() => removeToCart(jsonSend)}
      >
        -
      </Button>

      <Button disabled className="w-8 h-8" variant="ghost">
        {cart.quantity}
      </Button>

      <Button
        className="w-8 h-8"
        variant="outline"
        onClick={() => addToCart(jsonSend)}
      >
        +
      </Button>
    </div>
  );
};
