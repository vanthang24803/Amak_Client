import { Base } from "./base";

export type Analytic = {
  archive: number;
  active: number;
  orders: number;
  categories: number;
  customers: number;
};

export type UserAnalytic = Base & {
  fullName: string;
  avatar: string;
  isAdmin: boolean;
  isManager: boolean;
  updateAt: string;
};
