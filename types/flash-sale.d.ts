import { Product } from "./product";

export type FlashSale = {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
  products: Product[];
};

export type ListFlashSale = {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
  status: FlashSaleType;
  products: number;
};

export type FlashSaleType = "PENDING" | "ACTIVE" | "COMPLETED";

export type FlashSaleProduct = {
  id: string;
  name: string;
  thumbnail: string;
  optionName: string;
  optionId: string;
};
