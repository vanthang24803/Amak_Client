import { Base } from "./base";

export type Order = Base & {
  customer: string;
  email: string;
  address: string;
  numberPhone:string;
  payment: string;
  status: string;
  quantity: number;
  totalPrice: number;
  updateAt: string;
  orderDetails: OrderDetails[];
};

type OrderDetails = {
  productId: string;
  thumbnail: string;
  name: string;
  optionName: string;
  quantity:number;
  price: number;
  sale: number;
};
