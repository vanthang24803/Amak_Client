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
};
