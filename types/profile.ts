import { Address } from "./address";
import { Base } from "./base";

export type Profile = Base & {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  roles: string[];
  cheatAt: string;
  addresses: Address[];
  totalPrice: number;
  totalOrder: number;
  processOrder: number;
  rank: Rank;
  updateAt: string;
  numberPhone: string;
};

export type Rank = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
