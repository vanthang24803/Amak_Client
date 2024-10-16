import { Order } from "./order";
import { Product } from "./product";

export type Search = {
  orders: Order[];
  products: Product[];
};
