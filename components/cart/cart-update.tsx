"use client";

import useCart from "@/hooks/use-cart";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  productId: string;
  optionId: string;
  quantity: number;
};

export const UpdateCart = ({ productId, optionId, quantity }: Props) => {
  const cart = useCart();

  const [total, setTotal] = useState(quantity);

  const handleMinus = () => {
    setTotal((prevTotal) => {
      const newTotal = prevTotal > 0 ? prevTotal - 1 : 0;
      if (newTotal < 1) {
        cart.removeItem(productId, optionId);
      } else {
        cart.updateItemQuantity(productId, optionId, newTotal);
      }
      return newTotal;
    });
  };

  const handlePlus = () => {
    setTotal((prevTotal) => {
      const newTotal = prevTotal + 1;
      cart.updateItemQuantity(productId, optionId, newTotal);
      return newTotal;
    });
  };

  return (
    <div className="flex items-center space-x-1">
      <Button className="w-8 h-8" variant="outline" onClick={handleMinus}>
        -
      </Button>

      <Button disabled className="w-8 h-8" variant="ghost">
        {total}
      </Button>

      <Button className="w-8 h-8" variant="outline" onClick={handlePlus}>
        +
      </Button>
    </div>
  );
};
