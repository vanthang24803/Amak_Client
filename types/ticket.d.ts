import { Base } from "./base";

export type Ticket = Base & {
  name: string;
  code: string;
  quantity: number;
  discount: number;
  startDate: string;
  endDate: string;
};
