import { Base } from "./base";

export type Option = Base & {
  name: string;
  sale: number;
  price: number;
  quantity: number;
  isActive: boolean;
};
