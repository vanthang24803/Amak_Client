import { Base } from "./base";

export type Order = Base & {
  customer: string;
  email: string;
  address: string;
  numberPhone: string;
  payment: string;
  status: string;
  quantity: number;
  totalPrice: number;
  updateAt: string;
  isReviewed: boolean;
  orderDetails: OrderDetails[];
  statusOrders: StatusOrder[];
};

export type OrderDetails = {
  productId: string;
  thumbnail: string;
  name: string;
  optionName: string;
  optionId: string;
  quantity: number;
  price: number;
  sale: number;
};

export type StatusOrder = {
  status: string;
  timestamp: string;
};
