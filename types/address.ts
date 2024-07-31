import { Base } from "./base";

export type Address = Base & {
  name: string;
  isActive: boolean;
};
