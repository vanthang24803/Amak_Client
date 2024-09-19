"use client";

import { Order } from "@/types";
import { OrderCart } from "./order-cart";
import { OrderPayment } from "./order-payment";
import { OrderStatus } from "./order-status";
import { OrderCustomer } from "./order-customer";

type Props = {
  order: Order | undefined;
  handlerUpdateStatus: (id: string, type: string) => Promise<void>;
};

export const OrderDetail = ({ order, handlerUpdateStatus }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-2/3 pb-20">
      <OrderCart data={order} />
      <OrderPayment data={order} />
      <OrderStatus data={order} handlerUpdateStatus={handlerUpdateStatus} />
      <OrderCustomer data={order} />
    </div>
  );
};
