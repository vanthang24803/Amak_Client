import { Product } from "./product";

export type FlashSale = {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
  products: Product[];
};
