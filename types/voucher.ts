import { Base } from "./base";

export type Voucher = Base & {
  name: string;
  code: string;
  quantity: number;
  isExpire: boolean;
  day: number;
  discount: number;
  expire: boolean;
  shelfLife: string;
};
