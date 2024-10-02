import { Base } from "./base";

export type Address = Base & {
  addressName: string;
  firstName: string;
  lastName: string;
  numberPhone: string;
  isActive: boolean;
};
