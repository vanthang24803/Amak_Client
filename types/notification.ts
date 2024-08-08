import { Base } from "./base";

export type Notification = Base & {
  title: string;
  content: string;
  isOpened: boolean;
  isSeen: boolean;
  seenAt: string;
};
