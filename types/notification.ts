import { Base } from "./base";

export type Notification = Base & {
  url: string;
  content: string;
  isOpened: boolean;
  isSeen: boolean;
  seenAt: string;
};
